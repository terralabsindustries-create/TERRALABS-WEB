# 🏗️ TERRALABS TECHNICAL ARCHITECTURE - PART 4 (FINAL)
## DevOps, APIs, Security & Performance Benchmarking

---

# 8. **DEVOPS & INFRASTRUCTURE**

## Kubernetes Architecture

### Cluster Setup (EKS/GKE)

```yaml
# cluster-config.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: terralabs-production
  region: us-east-1
  version: "1.28"

vpc:
  cidr: "10.0.0.0/16"
  nat:
    gateway: HighlyAvailable

managedNodeGroups:
  # General purpose nodes
  - name: general-purpose
    instanceType: t3.xlarge
    desiredCapacity: 5
    minSize: 3
    maxSize: 10
    volumeSize: 100
    labels:
      workload: general
    tags:
      environment: production
    
  # High-performance nodes (for trading engine)
  - name: trading-engine
    instanceType: c6i.4xlarge  # Compute optimized
    desiredCapacity: 3
    minSize: 2
    maxSize: 6
    volumeSize: 200
    labels:
      workload: trading
    taints:
      - key: workload
        value: trading
        effect: NoSchedule
    
  # GPU nodes (for AI/ML)
  - name: ml-inference
    instanceType: g4dn.xlarge  # NVIDIA T4 GPU
    desiredCapacity: 2
    minSize: 1
    maxSize: 4
    volumeSize: 300
    labels:
      workload: ml
    taints:
      - key: nvidia.com/gpu
        value: "true"
        effect: NoSchedule

addons:
  - name: vpc-cni
  - name: coredns
  - name: kube-proxy
  - name: aws-ebs-csi-driver

cloudWatch:
  clusterLogging:
    enableTypes: ["*"]

iam:
  withOIDC: true
  serviceAccounts:
    - metadata:
        name: cluster-autoscaler
        namespace: kube-system
      wellKnownPolicies:
        autoScaler: true
```

---

### Application Deployments

#### Trading Service (Rust - Critical)

```yaml
# deployments/trading-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: trading-service
  namespace: production
  labels:
    app: trading-service
    tier: critical
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0  # Zero downtime
  selector:
    matchLabels:
      app: trading-service
  template:
    metadata:
      labels:
        app: trading-service
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9090"
        prometheus.io/path: "/metrics"
    spec:
      # Deploy on dedicated trading nodes
      nodeSelector:
        workload: trading
      tolerations:
        - key: workload
          operator: Equal
          value: trading
          effect: NoSchedule
      
      # Anti-affinity (spread across nodes)
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            - labelSelector:
                matchExpressions:
                  - key: app
                    operator: In
                    values:
                      - trading-service
              topologyKey: kubernetes.io/hostname
      
      containers:
        - name: trading-service
          image: terralabs/trading-service:v1.5.2
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 8080
              protocol: TCP
            - name: metrics
              containerPort: 9090
              protocol: TCP
          
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: database-credentials
                  key: url
            - name: REDIS_URL
              valueFrom:
                configMapKeyRef:
                  name: redis-config
                  key: url
            - name: RUST_LOG
              value: "info"
          
          resources:
            requests:
              cpu: "2000m"      # 2 CPU cores
              memory: "4Gi"
            limits:
              cpu: "4000m"      # 4 CPU cores max
              memory: "8Gi"
          
          # Health checks
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 2
          
          # Graceful shutdown
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sh", "-c", "sleep 15"]

---
apiVersion: v1
kind: Service
metadata:
  name: trading-service
  namespace: production
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
spec:
  type: LoadBalancer
  selector:
    app: trading-service
  ports:
    - name: http
      port: 80
      targetPort: 8080
      protocol: TCP
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 3600

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: trading-service-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: trading-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5 min before scaling down
      policies:
        - type: Percent
          value: 50
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0  # Scale up immediately
      policies:
        - type: Percent
          value: 100
          periodSeconds: 30
```

---

#### AI/ML Service (Python)

```yaml
# deployments/ml-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-service
  namespace: production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ml-service
  template:
    metadata:
      labels:
        app: ml-service
    spec:
      # Deploy on GPU nodes
      nodeSelector:
        workload: ml
      tolerations:
        - key: nvidia.com/gpu
          operator: Exists
          effect: NoSchedule
      
      containers:
        - name: ml-service
          image: terralabs/ml-service:v2.1.0
          ports:
            - containerPort: 8000
          
          env:
            - name: MODEL_PATH
              value: "/models"
            - name: CUDA_VISIBLE_DEVICES
              value: "0"
          
          resources:
            requests:
              cpu: "4000m"
              memory: "16Gi"
              nvidia.com/gpu: 1
            limits:
              cpu: "8000m"
              memory: "32Gi"
              nvidia.com/gpu: 1
          
          volumeMounts:
            - name: models
              mountPath: /models
          
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 60
            periodSeconds: 30
          
          readinessProbe:
            httpGet:
              path: /ready
              port: 8000
            initialDelaySeconds: 30
            periodSeconds: 10
      
      volumes:
        - name: models
          persistentVolumeClaim:
            claimName: ml-models-pvc

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ml-models-pvc
  namespace: production
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Gi
  storageClassName: gp3
```

---

### PostgreSQL StatefulSet

```yaml
# statefulsets/postgresql.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql
  namespace: production
spec:
  serviceName: postgresql
  replicas: 3  # Primary + 2 replicas
  selector:
    matchLabels:
      app: postgresql
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
        - name: postgresql
          image: postgres:16-alpine
          ports:
            - containerPort: 5432
          
          env:
            - name: POSTGRES_DB
              value: terralabs
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: postgres-credentials
                  key: username
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-credentials
                  key: password
            - name: PGDATA
              value: /var/lib/postgresql/data/pgdata
          
          resources:
            requests:
              cpu: "4000m"
              memory: "16Gi"
            limits:
              cpu: "8000m"
              memory: "32Gi"
          
          volumeMounts:
            - name: postgresql-data
              mountPath: /var/lib/postgresql/data
            - name: postgresql-config
              mountPath: /etc/postgresql/postgresql.conf
              subPath: postgresql.conf
          
          livenessProbe:
            exec:
              command:
                - /bin/sh
                - -c
                - pg_isready -U postgres
            initialDelaySeconds: 30
            periodSeconds: 10
          
          readinessProbe:
            exec:
              command:
                - /bin/sh
                - -c
                - pg_isready -U postgres
            initialDelaySeconds: 5
            periodSeconds: 5
      
      volumes:
        - name: postgresql-config
          configMap:
            name: postgresql-config
  
  volumeClaimTemplates:
    - metadata:
        name: postgresql-data
      spec:
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 1Ti
        storageClassName: io2  # High IOPS SSD

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: postgresql-config
  namespace: production
data:
  postgresql.conf: |
    # Performance tuning
    max_connections = 500
    shared_buffers = 8GB
    effective_cache_size = 24GB
    maintenance_work_mem = 2GB
    checkpoint_completion_target = 0.9
    wal_buffers = 16MB
    default_statistics_target = 100
    random_page_cost = 1.1
    effective_io_concurrency = 200
    work_mem = 10485kB
    min_wal_size = 2GB
    max_wal_size = 8GB
    max_worker_processes = 8
    max_parallel_workers_per_gather = 4
    max_parallel_workers = 8
    max_parallel_maintenance_workers = 4
    
    # Replication
    wal_level = replica
    max_wal_senders = 10
    max_replication_slots = 10
    hot_standby = on
    
    # Logging
    logging_collector = on
    log_directory = 'log'
    log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
    log_rotation_age = 1d
    log_rotation_size = 1GB
    log_min_duration_statement = 1000  # Log slow queries (>1s)
```

---

## CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches:
      - main
    paths:
      - 'services/**'
      - 'deployments/**'

env:
  AWS_REGION: us-east-1
  ECR_REGISTRY: 123456789012.dkr.ecr.us-east-1.amazonaws.com
  EKS_CLUSTER: terralabs-production

jobs:
  # Lint and test
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Lint TypeScript
        run: |
          npm install
          npm run lint
      
      - name: Lint Rust
        run: |
          cd services/trading-service
          cargo fmt -- --check
          cargo clippy -- -D warnings
      
      - name: Unit tests
        run: |
          npm test
          cd services/trading-service && cargo test
          cd services/ml-service && pytest

  # Security scanning
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

  # Build and push Docker images
  build-and-push:
    needs: [quality-checks, security-scan]
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [trading-service, ml-service, user-service, market-data-service]
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      
      - name: Build, tag, and push image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd services/${{ matrix.service }}
          docker build -t $ECR_REGISTRY/${{ matrix.service }}:$IMAGE_TAG .
          docker tag $ECR_REGISTRY/${{ matrix.service }}:$IMAGE_TAG $ECR_REGISTRY/${{ matrix.service }}:latest
          docker push $ECR_REGISTRY/${{ matrix.service }}:$IMAGE_TAG
          docker push $ECR_REGISTRY/${{ matrix.service }}:latest

  # Deploy to Kubernetes
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      
      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig --name ${{ env.EKS_CLUSTER }} --region ${{ env.AWS_REGION }}
      
      - name: Deploy with kubectl
        env:
          IMAGE_TAG: ${{ github.sha }}
        run: |
          # Update image tags in deployments
          sed -i "s|IMAGE_TAG|$IMAGE_TAG|g" deployments/*.yaml
          
          # Apply deployments
          kubectl apply -f deployments/
          
          # Wait for rollout
          kubectl rollout status deployment/trading-service -n production
          kubectl rollout status deployment/ml-service -n production
      
      - name: Smoke tests
        run: |
          # Test critical endpoints
          curl -f https://api.terralabs.com/health || exit 1
          curl -f https://api.terralabs.com/ready || exit 1
      
      - name: Notify Slack
        if: always()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "Production deployment ${{ job.status }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Production deployment *${{ job.status }}*\nCommit: ${{ github.sha }}\nActor: ${{ github.actor }}"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## Infrastructure as Code (Terraform)

```hcl
# terraform/main.tf

terraform {
  required_version = ">= 1.5"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
  
  backend "s3" {
    bucket         = "terralabs-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"
  
  name = "terralabs-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  
  enable_nat_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Environment = "production"
    Project     = "terralabs"
  }
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  version = "19.16.0"
  
  cluster_name    = "terralabs-production"
  cluster_version = "1.28"
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  enable_irsa = true
  
  eks_managed_node_groups = {
    general = {
      instance_types = ["t3.xlarge"]
      min_size       = 3
      max_size       = 10
      desired_size   = 5
      
      labels = {
        workload = "general"
      }
    }
    
    trading = {
      instance_types = ["c6i.4xlarge"]
      min_size       = 2
      max_size       = 6
      desired_size   = 3
      
      labels = {
        workload = "trading"
      }
      
      taints = [{
        key    = "workload"
        value  = "trading"
        effect = "NO_SCHEDULE"
      }]
    }
    
    ml = {
      instance_types = ["g4dn.xlarge"]
      min_size       = 1
      max_size       = 4
      desired_size   = 2
      
      labels = {
        workload = "ml"
      }
      
      taints = [{
        key    = "nvidia.com/gpu"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
    }
  }
  
  tags = {
    Environment = "production"
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "postgresql" {
  identifier     = "terralabs-postgresql"
  engine         = "postgres"
  engine_version = "16.1"
  instance_class = "db.r6g.4xlarge"
  
  allocated_storage     = 1000
  max_allocated_storage = 5000
  storage_type          = "io2"
  iops                  = 10000
  storage_encrypted     = true
  
  db_name  = "terralabs"
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.postgresql.id]
  db_subnet_group_name   = aws_db_subnet_group.postgresql.name
  
  multi_az               = true
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "Mon:04:00-Mon:05:00"
  
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  
  performance_insights_enabled = true
  performance_insights_retention_period = 731  # 2 years
  
  deletion_protection = true
  skip_final_snapshot = false
  final_snapshot_identifier = "terralabs-postgresql-final-snapshot"
  
  tags = {
    Environment = "production"
  }
}

# ElastiCache Redis
resource "aws_elasticache_replication_group" "redis" {
  replication_group_id       = "terralabs-redis"
  replication_group_description = "Redis cluster for caching and pub/sub"
  
  engine               = "redis"
  engine_version       = "7.0"
  node_type            = "cache.r6g.xlarge"
  number_cache_clusters = 3
  
  port                 = 6379
  parameter_group_name = "default.redis7"
  
  subnet_group_name  = aws_elasticache_subnet_group.redis.name
  security_group_ids = [aws_security_group.redis.id]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token_enabled         = true
  
  automatic_failover_enabled = true
  multi_az_enabled          = true
  
  snapshot_retention_limit = 7
  snapshot_window         = "03:00-05:00"
  
  tags = {
    Environment = "production"
  }
}

# S3 Bucket for storage
resource "aws_s3_bucket" "storage" {
  bucket = "terralabs-storage-production"
  
  tags = {
    Environment = "production"
  }
}

resource "aws_s3_bucket_versioning" "storage" {
  bucket = aws_s3_bucket.storage.id
  
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_encryption" "storage" {
  bucket = aws_s3_bucket.storage.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# CloudFront CDN
resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All"
  
  origin {
    domain_name = aws_s3_bucket.storage.bucket_regional_domain_name
    origin_id   = "S3-terralabs-storage"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cdn.cloudfront_access_identity_path
    }
  }
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-terralabs-storage"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  
  tags = {
    Environment = "production"
  }
}

# Outputs
output "eks_cluster_endpoint" {
  value = module.eks.cluster_endpoint
}

output "rds_endpoint" {
  value = aws_db_instance.postgresql.endpoint
}

output "redis_endpoint" {
  value = aws_elasticache_replication_group.redis.configuration_endpoint_address
}

output "cdn_domain" {
  value = aws_cloudfront_distribution.cdn.domain_name
}
```

---

## Monitoring & Observability

### Prometheus + Grafana Stack

```yaml
# monitoring/prometheus.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
    
    scrape_configs:
      # Kubernetes API server
      - job_name: 'kubernetes-apiservers'
        kubernetes_sd_configs:
          - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
          - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
            action: keep
            regex: default;kubernetes;https
      
      # Kubernetes nodes
      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
          - role: node
        relabel_configs:
          - action: labelmap
            regex: __meta_kubernetes_node_label_(.+)
      
      # Kubernetes pods
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
        relabel_configs:
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
            action: keep
            regex: true
          - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
            action: replace
            target_label: __metrics_path__
            regex: (.+)
          - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
            action: replace
            regex: ([^:]+)(?::\d+)?;(\d+)
            replacement: $1:$2
            target_label: __address__
      
      # Trading service
      - job_name: 'trading-service'
        static_configs:
          - targets: ['trading-service:9090']
        metrics_path: /metrics
      
      # ML service
      - job_name: 'ml-service'
        static_configs:
          - targets: ['ml-service:9090']
        metrics_path: /metrics
      
      # PostgreSQL
      - job_name: 'postgresql'
        static_configs:
          - targets: ['postgresql-exporter:9187']
      
      # Redis
      - job_name: 'redis'
        static_configs:
          - targets: ['redis-exporter:9121']

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
        - name: prometheus
          image: prom/prometheus:v2.47.0
          args:
            - '--config.file=/etc/prometheus/prometheus.yml'
            - '--storage.tsdb.path=/prometheus'
            - '--storage.tsdb.retention.time=30d'
            - '--web.enable-lifecycle'
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: prometheus-config
              mountPath: /etc/prometheus
            - name: prometheus-storage
              mountPath: /prometheus
          resources:
            requests:
              cpu: "2000m"
              memory: "8Gi"
            limits:
              cpu: "4000m"
              memory: "16Gi"
      volumes:
        - name: prometheus-config
          configMap:
            name: prometheus-config
        - name: prometheus-storage
          persistentVolumeClaim:
            claimName: prometheus-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: prometheus
  namespace: monitoring
spec:
  selector:
    app: prometheus
  ports:
    - port: 9090
      targetPort: 9090
```

---

### Grafana Dashboards

```yaml
# monitoring/grafana.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboards
  namespace: monitoring
data:
  trading-performance.json: |
    {
      "dashboard": {
        "title": "Trading Performance",
        "panels": [
          {
            "title": "Order Execution Latency",
            "targets": [
              {
                "expr": "histogram_quantile(0.99, rate(trading_order_latency_seconds_bucket[5m]))",
                "legendFormat": "p99"
              },
              {
                "expr": "histogram_quantile(0.95, rate(trading_order_latency_seconds_bucket[5m]))",
                "legendFormat": "p95"
              },
              {
                "expr": "histogram_quantile(0.50, rate(trading_order_latency_seconds_bucket[5m]))",
                "legendFormat": "p50"
              }
            ]
          },
          {
            "title": "Orders Per Second",
            "targets": [
              {
                "expr": "rate(trading_orders_total[1m])",
                "legendFormat": "Orders/sec"
              }
            ]
          },
          {
            "title": "Trade Success Rate",
            "targets": [
              {
                "expr": "rate(trading_orders_success[5m]) / rate(trading_orders_total[5m]) * 100",
                "legendFormat": "Success Rate %"
              }
            ]
          },
          {
            "title": "Active Positions",
            "targets": [
              {
                "expr": "trading_positions_active",
                "legendFormat": "Active Positions"
              }
            ]
          }
        ]
      }
    }

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
        - name: grafana
          image: grafana/grafana:10.1.0
          ports:
            - containerPort: 3000
          env:
            - name: GF_SECURITY_ADMIN_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: grafana-credentials
                  key: admin-password
            - name: GF_INSTALL_PLUGINS
              value: "grafana-piechart-panel,grafana-worldmap-panel"
          volumeMounts:
            - name: grafana-storage
              mountPath: /var/lib/grafana
            - name: grafana-dashboards
              mountPath: /etc/grafana/provisioning/dashboards
          resources:
            requests:
              cpu: "500m"
              memory: "1Gi"
            limits:
              cpu: "1000m"
              memory: "2Gi"
      volumes:
        - name: grafana-storage
          persistentVolumeClaim:
            claimName: grafana-pvc
        - name: grafana-dashboards
          configMap:
            name: grafana-dashboards
```

---

# 9. **API SPECIFICATIONS (OpenAPI 3.0)**

```yaml
# openapi/trading-api.yaml
openapi: 3.0.3
info:
  title: TERRALABS Trading API
  description: |
    Comprehensive API for the TERRALABS trading platform.
    
    ## Authentication
    All endpoints require Bearer token authentication.
    ```
    Authorization: Bearer <your-jwt-token>
    ```
    
    ## Rate Limiting
    - 1000 requests per minute per user
    - 10,000 requests per minute per organization
    
    ## Errors
    All errors follow RFC 7807 (Problem Details for HTTP APIs)
  version: 1.0.0
  contact:
    name: TERRALABS API Support
    email: api@terralabs.com
    url: https://docs.terralabs.com
  license:
    name: Proprietary
    url: https://terralabs.com/terms

servers:
  - url: https://api.terralabs.com/v1
    description: Production
  - url: https://api-staging.terralabs.com/v1
    description: Staging

tags:
  - name: Authentication
    description: User authentication and authorization
  - name: Trading
    description: Order placement and management
  - name: Portfolio
    description: Portfolio management and analytics
  - name: Market Data
    description: Real-time and historical market data
  - name: User
    description: User profile and settings

paths:
  /auth/login:
    post:
      tags: [Authentication]
      summary: User login
      operationId: login
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                  example: "user@example.com"
                password:
                  type: string
                  format: password
                  example: "SecurePassword123!"
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  userId:
                    type: string
                    format: uuid
                  expiresIn:
                    type: integer
                    example: 3600
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/RateLimitExceeded'

  /orders:
    post:
      tags: [Trading]
      summary: Place a new order
      operationId: placeOrder
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderRequest'
      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/RateLimitExceeded'
    
    get:
      tags: [Trading]
      summary: Get all orders for user
      operationId: getOrders
      security:
        - BearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [pending, open, filled, cancelled, rejected]
        - name: symbol
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 50
        - name: offset
          in: query
          schema:
            type: integer
            minimum: 0
            default: 0
      responses:
        '200':
          description: Orders retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  orders:
                    type: array
                    items:
                      $ref: '#/components/schemas/Order'
                  total:
                    type: integer
                  limit:
                    type: integer
                  offset:
                    type: integer

  /orders/{orderId}:
    get:
      tags: [Trading]
      summary: Get order by ID
      operationId: getOrder
      security:
        - BearerAuth: []
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Order retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '404':
          $ref: '#/components/responses/NotFound'
    
    delete:
      tags: [Trading]
      summary: Cancel order
      operationId: cancelOrder
      security:
        - BearerAuth: []
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Order cancelled successfully
        '404':
          $ref: '#/components/responses/NotFound'
        '409':
          description: Order cannot be cancelled (already filled)

  /portfolio:
    get:
      tags: [Portfolio]
      summary: Get user portfolio
      operationId: getPortfolio
      security:
        - BearerAuth: []
      responses:
        '200':
          description: Portfolio retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Portfolio'

  /positions:
    get:
      tags: [Portfolio]
      summary: Get all open positions
      operationId: getPositions
      security:
        - BearerAuth: []
      responses:
        '200':
          description: Positions retrieved successfully
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Position'

  /market/quotes/{symbol}:
    get:
      tags: [Market Data]
      summary: Get real-time quote
      operationId: getQuote
      security:
        - BearerAuth: []
      parameters:
        - name: symbol
          in: path
          required: true
          schema:
            type: string
            example: "XAUUSD"
      responses:
        '200':
          description: Quote retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Quote'

  /market/history/{symbol}:
    get:
      tags: [Market Data]
      summary: Get historical price data
      operationId: getHistory
      security:
        - BearerAuth: []
      parameters:
        - name: symbol
          in: path
          required: true
          schema:
            type: string
        - name: interval
          in: query
          required: true
          schema:
            type: string
            enum: [1m, 5m, 15m, 30m, 1h, 4h, 1d, 1w]
        - name: from
          in: query
          required: true
          schema:
            type: string
            format: date-time
        - name: to
          in: query
          required: true
          schema:
            type: string
            format: date-time
      responses:
        '200':
          description: Historical data retrieved successfully
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OHLCV'

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    OrderRequest:
      type: object
      required: [symbol, side, orderType, quantity]
      properties:
        symbol:
          type: string
          example: "XAUUSD"
        side:
          type: string
          enum: [buy, sell]
        orderType:
          type: string
          enum: [market, limit, stop, stop_limit]
        quantity:
          type: number
          format: double
          minimum: 0
          example: 10.0
        price:
          type: number
          format: double
          minimum: 0
          example: 2050.50
        stopLoss:
          type: number
          format: double
          example: 2040.00
        takeProfit:
          type: number
          format: double
          example: 2070.00
        timeInForce:
          type: string
          enum: [GTC, IOC, FOK, DAY]
          default: GTC

    OrderResponse:
      type: object
      properties:
        orderId:
          type: string
          format: uuid
        status:
          type: string
          enum: [pending, open, filled, cancelled, rejected]
        message:
          type: string
        createdAt:
          type: string
          format: date-time

    Order:
      allOf:
        - $ref: '#/components/schemas/OrderRequest'
        - type: object
          properties:
            orderId:
              type: string
              format: uuid
            userId:
              type: string
              format: uuid
            status:
              type: string
              enum: [pending, open, filled, cancelled, rejected]
            filledQuantity:
              type: number
              format: double
            avgFillPrice:
              type: number
              format: double
            commission:
              type: number
              format: double
            createdAt:
              type: string
              format: date-time
            updatedAt:
              type: string
              format: date-time
            filledAt:
              type: string
              format: date-time

    Position:
      type: object
      properties:
        positionId:
          type: string
          format: uuid
        symbol:
          type: string
        side:
          type: string
          enum: [long, short]
        quantity:
          type: number
          format: double
        avgEntryPrice:
          type: number
          format: double
        currentPrice:
          type: number
          format: double
        unrealizedPnL:
          type: number
          format: double
        realizedPnL:
          type: number
          format: double
        stopLoss:
          type: number
          format: double
        takeProfit:
          type: number
          format: double
        openedAt:
          type: string
          format: date-time

    Portfolio:
      type: object
      properties:
        userId:
          type: string
          format: uuid
        totalValue:
          type: number
          format: double
        cashBalance:
          type: number
          format: double
        positionsValue:
          type: number
          format: double
        dailyPnL:
          type: number
          format: double
        totalPnL:
          type: number
          format: double
        positions:
          type: array
          items:
            $ref: '#/components/schemas/Position'

    Quote:
      type: object
      properties:
        symbol:
          type: string
        bid:
          type: number
          format: double
        ask:
          type: number
          format: double
        last:
          type: number
          format: double
        volume:
          type: number
          format: double
        timestamp:
          type: string
          format: date-time

    OHLCV:
      type: object
      properties:
        timestamp:
          type: string
          format: date-time
        open:
          type: number
          format: double
        high:
          type: number
          format: double
        low:
          type: number
          format: double
        close:
          type: number
          format: double
        volume:
          type: number
          format: double

    Error:
      type: object
      properties:
        type:
          type: string
          format: uri
        title:
          type: string
        status:
          type: integer
        detail:
          type: string
        instance:
          type: string
          format: uri

  responses:
    BadRequest:
      description: Bad request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            type: "https://api.terralabs.com/errors/bad-request"
            title: "Bad Request"
            status: 400
            detail: "Invalid order quantity"

    Unauthorized:
      description: Unauthorized
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    RateLimitExceeded:
      description: Rate limit exceeded
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
      headers:
        X-RateLimit-Limit:
          schema:
            type: integer
          description: Request limit per minute
        X-RateLimit-Remaining:
          schema:
            type: integer
          description: Remaining requests
        X-RateLimit-Reset:
          schema:
            type: integer
          description: Time when limit resets (Unix timestamp)
```

---

Due to character limits, I'll create a final part for Security and Performance...
