# 🏗️ TERRALABS TECHNICAL ARCHITECTURE - DEEP DIVE
## Complete Engineering Blueprint for World-Class Asset Management Platform

---

## 📋 **TABLE OF CONTENTS**

1. [Technology Stack Overview](#technology-stack-overview)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [Backend Services](#backend-services)
5. [Frontend Architecture](#frontend-architecture)
6. [AI/ML Pipeline](#ai-ml-pipeline)
7. [Real-Time Data Infrastructure](#real-time-data-infrastructure)
8. [Blockchain Integration](#blockchain-integration)
9. [Security Architecture](#security-architecture)
10. [API Design](#api-design)
11. [Mobile Applications](#mobile-applications)
12. [DevOps & Infrastructure](#devops-infrastructure)
13. [Monitoring & Observability](#monitoring-observability)
14. [Performance Optimization](#performance-optimization)
15. [Disaster Recovery](#disaster-recovery)

---

# 1. **TECHNOLOGY STACK OVERVIEW**

## Frontend Stack

### Web Application
```yaml
Core Framework: React 18.3+ (with concurrent features)
State Management: 
  - Zustand (lightweight, performant)
  - TanStack Query (server state, caching)
  - Jotai (atomic state management for complex forms)
  
Styling:
  - Tailwind CSS 4.0 (CSS variables-based)
  - CSS-in-JS: Vanilla Extract (zero-runtime, type-safe)
  - Animation: Motion (Framer Motion fork) + GSAP for complex sequences
  
Build Tools:
  - Vite 5+ (20x faster than Webpack)
  - Turbopack (future migration for even faster builds)
  - SWC (Rust-based compiler)
  
Type Safety:
  - TypeScript 5.3+ (strict mode)
  - Zod (runtime type validation)
  - tRPC (end-to-end type safety for APIs)

UI Components:
  - Radix UI (headless, accessible primitives)
  - Custom design system (built on Radix)
  - shadcn/ui patterns (already in use)
  
Data Visualization:
  - D3.js (custom visualizations)
  - Recharts (declarative charts)
  - TradingView Lightweight Charts (financial charts)
  - Victory (React Native compatible charts)
  
Real-Time:
  - WebSocket native API
  - Socket.io (fallback with reconnection)
  - Server-Sent Events (SSE) for one-way streams
```

### Mobile Applications
```yaml
iOS:
  Language: Swift 5.9+
  UI Framework: SwiftUI 5+
  Reactive: Combine framework
  Networking: Async/await with URLSession
  Local Storage: SwiftData (Core Data successor)
  Security: CryptoKit for encryption
  
Android:
  Language: Kotlin 1.9+
  UI Framework: Jetpack Compose
  Reactive: Kotlin Coroutines + Flow
  Networking: Ktor client
  Local Storage: Room (SQLite ORM)
  Security: AndroidX Security (EncryptedSharedPreferences)
  
Cross-Platform (Alternative):
  Framework: React Native 0.73+ or Flutter 3.16+
  State: Redux Toolkit (RN) or Riverpod (Flutter)
  Navigation: React Navigation or GoRouter
  Storage: WatermelonDB (RN) or Hive (Flutter)
```

---

## Backend Stack

### Core Services
```yaml
Primary Language: TypeScript (Node.js 20 LTS)
Runtime: Bun 1.0+ (3x faster than Node.js) or Node.js

API Framework:
  - Hono (ultra-fast, edge-compatible)
  - tRPC (type-safe RPCs)
  - GraphQL (Apollo Server 4+) for complex queries
  
Authentication:
  - Supabase Auth (already in use)
  - NextAuth.js v5 (for additional providers)
  - Passport.js (legacy support)
  
ORM/Database Access:
  - Prisma 5+ (type-safe ORM)
  - Drizzle ORM (lightweight alternative)
  - Raw SQL for performance-critical queries
  
Validation:
  - Zod (schema validation)
  - class-validator (decorator-based)
  
Background Jobs:
  - BullMQ (Redis-backed queue)
  - Inngest (durable execution, event-driven)
```

### High-Performance Services (Critical Path)
```yaml
Language: Rust or Go

Rust Services:
  - Trading Engine Core (sub-millisecond execution)
  - Risk Calculation Engine
  - Real-time Market Data Processor
  - Blockchain Node Integration
  
Go Services:
  - WebSocket Gateway (handles 100K+ connections)
  - API Gateway (reverse proxy, rate limiting)
  - Log Aggregation Service
  - Metrics Collector

Frameworks:
  - Rust: Tokio (async runtime), Actix-Web, Rocket
  - Go: Gin, Fiber, Chi
```

### AI/ML Services
```yaml
Primary Language: Python 3.11+

ML Frameworks:
  - PyTorch 2.1+ (deep learning, CUDA support)
  - TensorFlow 2.15+ (production models)
  - scikit-learn (classical ML)
  - XGBoost, LightGBM (gradient boosting)
  - Prophet (time-series forecasting)
  
ML Ops:
  - MLflow (experiment tracking, model registry)
  - Kubeflow (Kubernetes-native ML pipelines)
  - Ray (distributed training, hyperparameter tuning)
  - Weights & Biases (experiment tracking, visualization)
  
Inference Serving:
  - TorchServe (PyTorch models)
  - TensorFlow Serving
  - ONNX Runtime (cross-framework inference)
  - Triton Inference Server (NVIDIA, multi-framework)
  
NLP/LLM:
  - Hugging Face Transformers
  - LangChain (LLM orchestration)
  - OpenAI API (GPT-4, embeddings)
  - Anthropic Claude API
```

### Data Processing
```yaml
Stream Processing:
  - Apache Kafka (distributed event streaming)
  - Apache Flink (stateful stream processing)
  - Redpanda (Kafka-compatible, 10x faster)
  
Batch Processing:
  - Apache Spark (PySpark for Python)
  - Dask (Python-native distributed computing)
  - Pandas (single-machine analysis)
  - Polars (Rust-based, 10x faster than Pandas)
  
ETL/ELT:
  - Apache Airflow (workflow orchestration)
  - Dagster (modern data orchestrator)
  - dbt (data transformation)
```

---

## Database & Storage

### Primary Database
```yaml
PostgreSQL 16+:
  Extensions:
    - TimescaleDB (time-series data for market prices)
    - PostGIS (geospatial for user locations)
    - pg_cron (scheduled jobs)
    - pgvector (vector embeddings for AI)
  
  Partitioning:
    - Range partitioning by date (trade history)
    - Hash partitioning by user_id (user data)
  
  Replication:
    - Streaming replication (read replicas)
    - Logical replication (zero-downtime migrations)
  
  Connection Pooling:
    - PgBouncer (transaction pooling)
    - Supavisor (Supabase pooler)
```

### Caching Layer
```yaml
Redis 7+ (in-memory data store):
  Use Cases:
    - Session storage
    - Real-time price cache (TTL: 100ms)
    - Rate limiting
    - Pub/Sub for WebSocket events
    - Leaderboards (sorted sets)
  
  Modules:
    - RedisJSON (JSON document storage)
    - RedisTimeSeries (time-series data)
    - RedisBloom (probabilistic data structures)
  
  Clustering:
    - Redis Cluster (horizontal scaling)
    - Sentinel (high availability)
```

### Time-Series Database
```yaml
InfluxDB 3.0 or QuestDB:
  Storage:
    - Market tick data (millions of points/sec)
    - Portfolio performance metrics
    - System metrics
  
  Retention Policies:
    - Raw data: 7 days
    - 1-minute aggregates: 90 days
    - 1-hour aggregates: 2 years
    - Daily aggregates: 10 years
```

### Document Store
```yaml
MongoDB 7+ or Supabase Storage:
  Use Cases:
    - User-generated content (strategies, posts)
    - Audit logs (immutable documents)
    - Email templates
    - Report templates
  
  Features:
    - Sharding (horizontal partitioning)
    - Change streams (real-time updates)
    - Atlas Search (full-text search)
```

### Object Storage
```yaml
S3-Compatible:
  - Supabase Storage (already in use)
  - AWS S3 (if migrating)
  - MinIO (self-hosted alternative)
  
  Buckets:
    - agreements-pdfs (customer agreements)
    - kyc-documents (ID, proof of address)
    - trade-reports (CSV, PDF exports)
    - marketing-assets (images, videos)
  
  CDN:
    - Cloudflare R2 (zero egress fees)
    - Amazon CloudFront
```

### Graph Database (Future)
```yaml
Neo4j or Amazon Neptune:
  Use Cases:
    - Social graph (followers, copy trading)
    - Strategy relationships
    - Fraud detection networks
    - Asset correlation graphs
```

---

## Infrastructure & Cloud

### Cloud Provider
```yaml
Primary: AWS (for mature services) or Google Cloud (for ML)
Edge: Cloudflare Workers (serverless at edge)
Database: Supabase (PostgreSQL as a service)

Multi-Cloud Strategy:
  - AWS: Core infrastructure, S3, EC2
  - GCP: ML training (TPU access), BigQuery
  - Cloudflare: CDN, DDoS protection, edge functions
  - Supabase: Database, auth, storage
```

### Compute
```yaml
Containers:
  - Docker (containerization)
  - Kubernetes (orchestration via EKS or GKE)
  - Helm (package manager for K8s)
  
Serverless:
  - Supabase Edge Functions (Deno runtime)
  - AWS Lambda (for sporadic workloads)
  - Cloudflare Workers (edge computing)
  
Virtual Machines:
  - EC2 (dedicated instances for trading engines)
  - Spot Instances (for batch processing, 70% cost savings)
```

### Networking
```yaml
Load Balancers:
  - AWS ALB (Application Load Balancer)
  - NGINX (reverse proxy, rate limiting)
  - Cloudflare Load Balancing
  
Service Mesh:
  - Istio (traffic management, observability)
  - Linkerd (lightweight alternative)
  
API Gateway:
  - Kong (open-source API gateway)
  - AWS API Gateway
  - Custom Rust/Go gateway
```

---

## DevOps & CI/CD

### Version Control
```yaml
Git: GitHub Enterprise or GitLab
Branching Strategy: Trunk-based development
  - main (production)
  - staging (pre-production)
  - feature/* (feature branches)
  
Commit Conventions: Conventional Commits
  - feat: new feature
  - fix: bug fix
  - perf: performance improvement
  - refactor: code refactoring
```

### CI/CD Pipeline
```yaml
CI: GitHub Actions or GitLab CI
CD: ArgoCD (GitOps for Kubernetes)

Pipeline Stages:
  1. Lint & Format (ESLint, Prettier, Rustfmt)
  2. Type Check (TypeScript, mypy for Python)
  3. Unit Tests (Jest, Vitest, pytest)
  4. Integration Tests (Playwright, Cypress)
  5. Build (Docker images)
  6. Security Scan (Snyk, Trivy)
  7. Deploy to Staging
  8. E2E Tests (Playwright on staging)
  9. Deploy to Production (canary or blue-green)
  
Deployment Strategies:
  - Canary: 5% → 25% → 50% → 100%
  - Blue-Green: instant switchover with rollback capability
  - Rolling Update: gradual pod replacement in K8s
```

### Infrastructure as Code
```yaml
Terraform:
  - Cloud resources (VPC, subnets, security groups)
  - Database provisioning
  - S3 buckets, IAM roles
  
Pulumi (Alternative):
  - TypeScript/Python for infrastructure
  - Better type safety than Terraform
  
Ansible:
  - Server configuration
  - Application deployment (non-K8s)
```

---

# 2. **SYSTEM ARCHITECTURE**

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                  │
├─────────────┬──────────────┬──────────────┬─────────────┬──────────────┤
│  Web App    │  iOS App     │ Android App  │  API Clients│  3rd Party   │
│  (React)    │  (SwiftUI)   │  (Compose)   │  (REST/WS)  │  Integrations│
└─────────────┴──────────────┴──────────────┴─────────────┴──────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         CDN & EDGE LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│  Cloudflare CDN → DDoS Protection → WAF → Edge Caching                  │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER                               │
├─────────────────────────────────────────────────────────────────────────┤
│  Kong API Gateway (Rust/Go)                                             │
│  ├─ Rate Limiting (1000 req/min per user)                               │
│  ├─ Authentication (JWT validation)                                     │
│  ├─ Request Routing                                                     │
│  └─ Request Transformation                                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      APPLICATION SERVICES LAYER                         │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│              │              │              │              │            │
│  User        │  Trading     │  Portfolio   │  Risk Mgmt   │  Analytics │
│  Service     │  Service     │  Service     │  Service     │  Service   │
│  (Node.js)   │  (Rust)      │  (Node.js)   │  (Rust)      │  (Python)  │
│              │              │              │              │            │
├──────────────┼──────────────┼──────────────┼──────────────┼────────────┤
│              │              │              │              │            │
│  Auth        │  Market Data │  Reporting   │  Social      │  AI/ML     │
│  Service     │  Service     │  Service     │  Service     │  Service   │
│  (Node.js)   │  (Go)        │  (Node.js)   │  (Node.js)   │  (Python)  │
│              │              │              │              │            │
└──────────────┴──────────────┴──────────────┴──────────────┴────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                       MESSAGE QUEUE LAYER                               │
├─────────────────────────────────────────────────────────────────────────┤
│  Apache Kafka (Event Streaming)                                         │
│  ├─ trades.executed                                                     │
│  ├─ prices.updated                                                      │
│  ├─ users.registered                                                    │
│  └─ alerts.triggered                                                    │
│                                                                         │
│  Redis Pub/Sub (Real-time Events)                                      │
│  └─ WebSocket message distribution                                     │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                      │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│              │              │              │              │            │
│  PostgreSQL  │  Redis       │  InfluxDB    │  MongoDB     │  S3        │
│  (Primary)   │  (Cache)     │  (TimeSeries)│  (Documents) │  (Objects) │
│              │              │              │              │            │
│  - Users     │  - Sessions  │  - Prices    │  - Logs      │  - PDFs    │
│  - Trades    │  - Prices    │  - Metrics   │  - Strategies│  - Reports │
│  - Positions │  - Counters  │  - Events    │  - Posts     │  - Uploads │
│              │              │              │              │            │
└──────────────┴──────────────┴──────────────┴──────────────┴────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL INTEGRATIONS                                │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────┤
│  MT5 Brokers │  Exchanges   │  Blockchain  │  Payment     │  Email     │
│  (FIX/API)   │  (CME, ICE)  │  (Ethereum)  │  (Stripe)    │  (Resend)  │
└──────────────┴──────────────┴──────────────┴──────────────┴────────────┘
```

---

## Microservices Architecture

### Service Catalog

#### 1. **User Service** (Node.js + TypeScript)
```typescript
// Responsibilities
- User registration & onboarding
- Profile management
- KYC/AML verification
- Subscription management
- User preferences

// API Endpoints
POST   /users/register
GET    /users/:id
PUT    /users/:id
DELETE /users/:id
GET    /users/:id/subscriptions
POST   /users/:id/kyc/submit

// Database Tables
- users
- user_profiles
- kyc_submissions
- subscriptions
- user_preferences

// Events Published
- user.registered
- user.verified
- user.subscription.activated
```

#### 2. **Trading Service** (Rust - Critical Performance)
```rust
// Responsibilities
- Order placement, modification, cancellation
- Trade execution via MT5/brokers
- Position management
- Real-time P&L calculation
- Order matching (internal)

// API Endpoints
POST   /trades/orders
GET    /trades/orders/:id
PUT    /trades/orders/:id
DELETE /trades/orders/:id
GET    /trades/positions
POST   /trades/close-position

// Database Tables
- orders
- trades
- positions
- trade_history

// Events Published
- trade.executed
- order.placed
- order.cancelled
- position.opened
- position.closed

// Performance Requirements
- Order placement latency: <10ms
- P&L calculation: <50ms
- Throughput: 10,000 orders/sec
```

#### 3. **Portfolio Service** (Node.js + TypeScript)
```typescript
// Responsibilities
- Portfolio aggregation
- Performance calculation
- Asset allocation
- Rebalancing recommendations
- Historical performance

// API Endpoints
GET /portfolios/:userId
GET /portfolios/:userId/performance
GET /portfolios/:userId/allocation
POST /portfolios/:userId/rebalance
GET /portfolios/:userId/history

// Database Tables
- portfolios
- portfolio_snapshots (daily)
- performance_metrics

// Calculations
- Time-weighted return (TWR)
- Money-weighted return (MWR)
- Sharpe ratio, Sortino ratio
- Maximum drawdown
- Alpha, Beta
```

#### 4. **Risk Management Service** (Rust - Critical Performance)
```rust
// Responsibilities
- Real-time risk scoring
- VaR/CVaR calculations
- Position sizing
- Margin calculations
- Risk limit enforcement

// API Endpoints
GET  /risk/:userId/score
GET  /risk/:userId/var
POST /risk/:userId/limits
GET  /risk/:userId/exposure

// Calculations (Real-time)
- Value at Risk (VaR) - Monte Carlo, Historical, Parametric
- Conditional VaR (CVaR)
- Portfolio volatility
- Correlation matrix
- Stress testing

// Performance Requirements
- Risk score update: <100ms
- VaR calculation: <500ms
- Throughput: 1000 calculations/sec
```

#### 5. **Market Data Service** (Go - High Throughput)
```go
// Responsibilities
- Real-time price streaming
- Historical data retrieval
- Market depth (Level 2 data)
- News feed aggregation
- Economic calendar

// API Endpoints
WS  /market/stream/:symbols
GET /market/quotes/:symbol
GET /market/history/:symbol
GET /market/depth/:symbol
GET /market/news

// Data Sources
- CME, ICE, COMEX (direct connections)
- FIX protocol for broker feeds
- WebSocket APIs (Binance, Coinbase)
- REST APIs for historical data

// Performance Requirements
- Latency: <50ms from exchange to client
- Throughput: 1M price updates/sec
- Update frequency: Real-time (tick-by-tick)
```

#### 6. **AI/ML Service** (Python + FastAPI)
```python
# Responsibilities
- Trading signal generation (Aurelius, Titanus engines)
- Sentiment analysis (news, social media)
- Predictive modeling
- Portfolio optimization
- Personalized recommendations

# API Endpoints
POST /ai/signals/generate
POST /ai/sentiment/analyze
POST /ai/optimize/portfolio
GET  /ai/recommendations/:userId

# Models Deployed
- Aurelius-1 (LSTM for gold trading)
- Titanus-X (Transformer for options)
- Sentiment Analyzer (BERT/RoBERTa)
- Risk Predictor (XGBoost)
- Portfolio Optimizer (Genetic Algorithm)

# Infrastructure
- GPU instances (NVIDIA A100)
- Model registry (MLflow)
- Feature store (Feast)
- Inference server (TorchServe)
```

#### 7. **Analytics Service** (Python + Node.js)
```python
# Responsibilities
- Performance attribution
- Backtest execution
- Strategy validation
- Report generation
- Data visualization

# API Endpoints
GET  /analytics/performance/:userId
POST /analytics/backtest
GET  /analytics/reports/:reportId
GET  /analytics/charts/:userId

# Calculations
- Performance attribution (Brinson model)
- Factor analysis (Fama-French)
- Risk-adjusted returns
- Benchmark comparisons
```

#### 8. **Social Service** (Node.js + TypeScript)
```typescript
// Responsibilities
- Social feed (posts, comments)
- Copy trading
- Strategy marketplace
- Leaderboards
- Messaging

// API Endpoints
GET  /social/feed
POST /social/posts
GET  /social/leaderboard
POST /social/copy-trader/:traderId
GET  /social/strategies

// Database Tables
- posts
- comments
- likes
- follows
- copy_trades
- leaderboard_cache

// Real-time Features
- WebSocket for live feed updates
- Real-time leaderboard updates
- Instant notifications
```

#### 9. **Notification Service** (Node.js)
```typescript
// Responsibilities
- Email notifications (Resend API)
- SMS notifications (Twilio)
- Push notifications (FCM, APNS)
- In-app notifications
- WhatsApp notifications (Twilio)

// API Endpoints
POST /notifications/send
GET  /notifications/:userId
PUT  /notifications/:id/read

// Notification Types
- Trade confirmations
- Price alerts
- Margin calls
- Risk warnings
- System announcements

// Channels
- Email (Resend)
- SMS (Twilio)
- Push (Firebase Cloud Messaging, Apple Push)
- WebSocket (in-app)
```

#### 10. **Reporting Service** (Node.js + Python)
```typescript
// Responsibilities
- PDF report generation
- Excel export
- Tax documents (1099, capital gains)
- Compliance reports
- Performance statements

// API Endpoints
POST /reports/generate
GET  /reports/:reportId
GET  /reports/:userId/tax-documents

// Report Types
- Monthly performance statements
- Tax reports (capital gains/losses)
- Regulatory filings
- Client reports (white-labeled)

// Tech Stack
- PDF: Puppeteer (headless Chrome)
- Excel: ExcelJS
- Charts: D3.js, Recharts
```

---

# 3. **DATABASE DESIGN**

## PostgreSQL Schema Design

### Core Tables

```sql
-- Users & Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, suspended, closed
  subscription_tier VARCHAR(50), -- STARTER, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND
  
  -- Indexes
  CONSTRAINT users_email_unique UNIQUE(email)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- User Profiles
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  nationality VARCHAR(100),
  country_of_residence VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  phone_number VARCHAR(50),
  occupation VARCHAR(255),
  employer_name VARCHAR(255),
  annual_income VARCHAR(50),
  source_of_funds TEXT,
  tax_id VARCHAR(100),
  
  -- ID verification
  id_type VARCHAR(50), -- passport, emirates_id
  id_number VARCHAR(100),
  id_expiry_date DATE,
  
  -- PEP (Politically Exposed Person)
  is_pep BOOLEAN DEFAULT FALSE,
  pep_details TEXT,
  
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- KYC Submissions
CREATE TABLE kyc_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  rejection_reason TEXT,
  
  -- Document references (S3 URLs)
  id_document_url TEXT,
  proof_of_address_url TEXT,
  
  CONSTRAINT kyc_status_check CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE INDEX idx_kyc_user_id ON kyc_submissions(user_id);
CREATE INDEX idx_kyc_status ON kyc_submissions(status);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id VARCHAR(50) NOT NULL, -- starter, bronze, silver, gold, platinum, diamond
  status VARCHAR(50) NOT NULL DEFAULT 'trial', -- trial, active, cancelled, expired
  capital_amount DECIMAL(15, 2) NOT NULL,
  monthly_fee DECIMAL(10, 2) NOT NULL,
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT subscriptions_status_check CHECK (status IN ('trial', 'active', 'cancelled', 'expired'))
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Trading Accounts (MT5 integration)
CREATE TABLE trading_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  broker VARCHAR(100) NOT NULL,
  account_number VARCHAR(100) NOT NULL,
  account_type VARCHAR(50) NOT NULL, -- demo, live
  balance DECIMAL(15, 2) NOT NULL DEFAULT 0,
  equity DECIMAL(15, 2) NOT NULL DEFAULT 0,
  margin DECIMAL(15, 2) NOT NULL DEFAULT 0,
  free_margin DECIMAL(15, 2) NOT NULL DEFAULT 0,
  leverage INTEGER NOT NULL DEFAULT 100,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT trading_accounts_unique UNIQUE(broker, account_number)
);

CREATE INDEX idx_trading_accounts_user_id ON trading_accounts(user_id);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  account_id UUID NOT NULL REFERENCES trading_accounts(id),
  symbol VARCHAR(20) NOT NULL, -- XAUUSD, BTCUSD, etc.
  side VARCHAR(10) NOT NULL, -- buy, sell
  order_type VARCHAR(20) NOT NULL, -- market, limit, stop, stop_limit
  quantity DECIMAL(18, 8) NOT NULL,
  price DECIMAL(18, 8), -- null for market orders
  stop_loss DECIMAL(18, 8),
  take_profit DECIMAL(18, 8),
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, open, filled, cancelled, rejected
  filled_quantity DECIMAL(18, 8) DEFAULT 0,
  avg_fill_price DECIMAL(18, 8),
  commission DECIMAL(10, 2) DEFAULT 0,
  mt5_order_id BIGINT, -- External MT5 order ID
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  filled_at TIMESTAMPTZ,
  
  CONSTRAINT orders_side_check CHECK (side IN ('buy', 'sell')),
  CONSTRAINT orders_type_check CHECK (order_type IN ('market', 'limit', 'stop', 'stop_limit')),
  CONSTRAINT orders_status_check CHECK (status IN ('pending', 'open', 'filled', 'cancelled', 'rejected'))
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_account_id ON orders(account_id);
CREATE INDEX idx_orders_symbol ON orders(symbol);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Trades (Filled Orders)
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  user_id UUID NOT NULL REFERENCES users(id),
  account_id UUID NOT NULL REFERENCES trading_accounts(id),
  symbol VARCHAR(20) NOT NULL,
  side VARCHAR(10) NOT NULL,
  quantity DECIMAL(18, 8) NOT NULL,
  entry_price DECIMAL(18, 8) NOT NULL,
  exit_price DECIMAL(18, 8),
  commission DECIMAL(10, 2) DEFAULT 0,
  swap DECIMAL(10, 2) DEFAULT 0,
  profit_loss DECIMAL(15, 2),
  status VARCHAR(50) NOT NULL DEFAULT 'open', -- open, closed
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  
  -- Blockchain verification
  blockchain_tx_hash VARCHAR(66), -- Ethereum tx hash
  blockchain_verified BOOLEAN DEFAULT FALSE,
  
  CONSTRAINT trades_side_check CHECK (side IN ('buy', 'sell')),
  CONSTRAINT trades_status_check CHECK (status IN ('open', 'closed'))
);

CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_account_id ON trades(account_id);
CREATE INDEX idx_trades_symbol ON trades(symbol);
CREATE INDEX idx_trades_status ON trades(status);
CREATE INDEX idx_trades_opened_at ON trades(opened_at DESC);
CREATE INDEX idx_trades_blockchain_hash ON trades(blockchain_tx_hash);

-- Positions (Current Holdings)
CREATE TABLE positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  account_id UUID NOT NULL REFERENCES trading_accounts(id),
  symbol VARCHAR(20) NOT NULL,
  side VARCHAR(10) NOT NULL, -- long, short
  quantity DECIMAL(18, 8) NOT NULL,
  avg_entry_price DECIMAL(18, 8) NOT NULL,
  current_price DECIMAL(18, 8) NOT NULL,
  unrealized_pnl DECIMAL(15, 2) NOT NULL DEFAULT 0,
  realized_pnl DECIMAL(15, 2) NOT NULL DEFAULT 0,
  stop_loss DECIMAL(18, 8),
  take_profit DECIMAL(18, 8),
  opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT positions_unique UNIQUE(account_id, symbol, side)
);

CREATE INDEX idx_positions_user_id ON positions(user_id);
CREATE INDEX idx_positions_account_id ON positions(account_id);
CREATE INDEX idx_positions_symbol ON positions(symbol);

-- Portfolio Snapshots (Daily)
CREATE TABLE portfolio_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  snapshot_date DATE NOT NULL,
  total_value DECIMAL(15, 2) NOT NULL,
  cash_balance DECIMAL(15, 2) NOT NULL,
  positions_value DECIMAL(15, 2) NOT NULL,
  daily_pnl DECIMAL(15, 2) NOT NULL,
  total_pnl DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT portfolio_snapshots_unique UNIQUE(user_id, snapshot_date)
);

CREATE INDEX idx_portfolio_snapshots_user_id ON portfolio_snapshots(user_id);
CREATE INDEX idx_portfolio_snapshots_date ON portfolio_snapshots(snapshot_date DESC);

-- Performance Metrics (Pre-calculated)
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  period VARCHAR(20) NOT NULL, -- daily, weekly, monthly, yearly, all_time
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  
  -- Returns
  total_return DECIMAL(10, 4), -- Percentage
  annualized_return DECIMAL(10, 4),
  
  -- Risk metrics
  volatility DECIMAL(10, 4),
  sharpe_ratio DECIMAL(10, 4),
  sortino_ratio DECIMAL(10, 4),
  max_drawdown DECIMAL(10, 4),
  
  -- Trading metrics
  win_rate DECIMAL(10, 4),
  profit_factor DECIMAL(10, 4),
  total_trades INTEGER,
  winning_trades INTEGER,
  losing_trades INTEGER,
  
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT performance_metrics_unique UNIQUE(user_id, period, end_date)
);

CREATE INDEX idx_performance_metrics_user_id ON performance_metrics(user_id);
CREATE INDEX idx_performance_metrics_period ON performance_metrics(period);

-- Social Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  comments_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Copy Trading
CREATE TABLE copy_trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  trader_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  allocation_percentage DECIMAL(5, 2) NOT NULL, -- % of portfolio to allocate
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, paused, stopped
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stopped_at TIMESTAMPTZ,
  
  CONSTRAINT copy_trades_allocation_check CHECK (allocation_percentage > 0 AND allocation_percentage <= 100),
  CONSTRAINT copy_trades_unique UNIQUE(follower_id, trader_id)
);

CREATE INDEX idx_copy_trades_follower_id ON copy_trades(follower_id);
CREATE INDEX idx_copy_trades_trader_id ON copy_trades(trader_id);

-- Leaderboard (Materialized View for Performance)
CREATE MATERIALIZED VIEW leaderboard AS
SELECT 
  u.id AS user_id,
  u.full_name,
  pm.total_return,
  pm.sharpe_ratio,
  pm.total_trades,
  pm.win_rate,
  RANK() OVER (ORDER BY pm.total_return DESC) AS rank
FROM users u
JOIN performance_metrics pm ON u.id = pm.user_id
WHERE pm.period = 'all_time'
  AND u.status = 'active'
ORDER BY pm.total_return DESC
LIMIT 100;

CREATE INDEX idx_leaderboard_rank ON leaderboard(rank);

-- Refresh leaderboard every hour
CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule('refresh-leaderboard', '0 * * * *', 'REFRESH MATERIALIZED VIEW leaderboard');
```

### TimescaleDB Hypertables (Time-Series Data)

```sql
-- Price Data (Hypertable for efficient time-series queries)
CREATE TABLE price_ticks (
  time TIMESTAMPTZ NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  bid DECIMAL(18, 8) NOT NULL,
  ask DECIMAL(18, 8) NOT NULL,
  volume DECIMAL(18, 8)
);

-- Convert to hypertable
SELECT create_hypertable('price_ticks', 'time');

-- Create index on symbol
CREATE INDEX idx_price_ticks_symbol ON price_ticks (symbol, time DESC);

-- Continuous aggregate for 1-minute OHLCV
CREATE MATERIALIZED VIEW price_1min
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 minute', time) AS bucket,
  symbol,
  FIRST(bid, time) AS open,
  MAX(bid) AS high,
  MIN(bid) AS low,
  LAST(bid, time) AS close,
  SUM(volume) AS volume
FROM price_ticks
GROUP BY bucket, symbol;

-- Refresh policy (every minute)
SELECT add_continuous_aggregate_policy('price_1min',
  start_offset => INTERVAL '3 minutes',
  end_offset => INTERVAL '1 minute',
  schedule_interval => INTERVAL '1 minute');

-- Similar aggregates for 5min, 15min, 1hour, 1day
CREATE MATERIALIZED VIEW price_1hour
WITH (timescaledb.continuous) AS
SELECT
  time_bucket('1 hour', bucket) AS bucket,
  symbol,
  FIRST(open, bucket) AS open,
  MAX(high) AS high,
  MIN(low) AS low,
  LAST(close, bucket) AS close,
  SUM(volume) AS volume
FROM price_1min
GROUP BY time_bucket('1 hour', bucket), symbol;

-- Retention policy (keep raw ticks for 7 days, then drop)
SELECT add_retention_policy('price_ticks', INTERVAL '7 days');
```

---

# 4. **BACKEND SERVICES - DETAILED IMPLEMENTATION**

## Trading Service (Rust) - Performance Critical

### Architecture
```rust
// src/main.rs
use actix_web::{web, App, HttpServer, HttpResponse};
use tokio::sync::RwLock;
use std::sync::Arc;
use serde::{Deserialize, Serialize};
use rust_decimal::Decimal;
use sqlx::PgPool;

// Order structure
#[derive(Debug, Serialize, Deserialize, Clone)]
struct Order {
    id: uuid::Uuid,
    user_id: uuid::Uuid,
    symbol: String,
    side: OrderSide,
    order_type: OrderType,
    quantity: Decimal,
    price: Option<Decimal>,
    stop_loss: Option<Decimal>,
    take_profit: Option<Decimal>,
    status: OrderStatus,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
enum OrderSide {
    Buy,
    Sell,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
enum OrderType {
    Market,
    Limit,
    Stop,
    StopLimit,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
enum OrderStatus {
    Pending,
    Open,
    Filled,
    Cancelled,
    Rejected,
}

// Trading engine state
struct TradingEngine {
    db_pool: PgPool,
    redis_client: redis::Client,
    order_book: Arc<RwLock<OrderBook>>,
}

struct OrderBook {
    bids: BTreeMap<Decimal, Vec<Order>>, // Price -> Orders
    asks: BTreeMap<Decimal, Vec<Order>>,
}

impl TradingEngine {
    async fn place_order(&self, order: Order) -> Result<Order, TradingError> {
        // 1. Validate order
        self.validate_order(&order).await?;
        
        // 2. Check margin/balance
        self.check_margin(&order).await?;
        
        // 3. Insert into database
        let inserted_order = sqlx::query_as::<_, Order>(
            "INSERT INTO orders (user_id, symbol, side, order_type, quantity, price, status) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *"
        )
        .bind(&order.user_id)
        .bind(&order.symbol)
        .bind(&order.side)
        .bind(&order.order_type)
        .bind(&order.quantity)
        .bind(&order.price)
        .bind(OrderStatus::Pending)
        .fetch_one(&self.db_pool)
        .await?;
        
        // 4. Send to MT5/broker via FIX protocol or REST API
        self.send_to_broker(&inserted_order).await?;
        
        // 5. Publish event to Kafka
        self.publish_event("order.placed", &inserted_order).await?;
        
        // 6. Update order book (for internal matching)
        self.update_order_book(&inserted_order).await?;
        
        Ok(inserted_order)
    }
    
    async fn calculate_pnl(&self, position: &Position) -> Result<Decimal, TradingError> {
        // Get current price from Redis cache
        let current_price = self.get_current_price(&position.symbol).await?;
        
        // Calculate P&L
        let pnl = match position.side {
            PositionSide::Long => {
                (current_price - position.avg_entry_price) * position.quantity
            },
            PositionSide::Short => {
                (position.avg_entry_price - current_price) * position.quantity
            },
        };
        
        Ok(pnl)
    }
    
    async fn get_current_price(&self, symbol: &str) -> Result<Decimal, TradingError> {
        // Try Redis cache first (TTL: 100ms)
        let cache_key = format!("price:{}", symbol);
        let cached_price: Option<String> = self.redis_client
            .get_async_connection()
            .await?
            .get(&cache_key)
            .await?;
        
        if let Some(price_str) = cached_price {
            return Ok(price_str.parse()?);
        }
        
        // Fallback to database (latest tick)
        let price: Decimal = sqlx::query_scalar(
            "SELECT bid FROM price_ticks 
             WHERE symbol = $1 
             ORDER BY time DESC 
             LIMIT 1"
        )
        .bind(symbol)
        .fetch_one(&self.db_pool)
        .await?;
        
        // Cache for 100ms
        let _: () = self.redis_client
            .get_async_connection()
            .await?
            .set_ex(&cache_key, price.to_string(), 0) // 100ms TTL
            .await?;
        
        Ok(price)
    }
}

// Actix-web HTTP handlers
async fn place_order_handler(
    engine: web::Data<TradingEngine>,
    order: web::Json<Order>,
) -> HttpResponse {
    match engine.place_order(order.into_inner()).await {
        Ok(order) => HttpResponse::Ok().json(order),
        Err(e) => HttpResponse::BadRequest().json(json!({
            "error": e.to_string()
        })),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize database pool
    let db_pool = PgPool::connect(&std::env::var("DATABASE_URL").unwrap())
        .await
        .unwrap();
    
    // Initialize Redis client
    let redis_client = redis::Client::open(std::env::var("REDIS_URL").unwrap())
        .unwrap();
    
    // Initialize trading engine
    let engine = web::Data::new(TradingEngine {
        db_pool,
        redis_client,
        order_book: Arc::new(RwLock::new(OrderBook::new())),
    });
    
    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(engine.clone())
            .route("/orders", web::post().to(place_order_handler))
            .route("/orders/{id}", web::get().to(get_order_handler))
            .route("/positions", web::get().to(get_positions_handler))
    })
    .bind("0.0.0.0:8080")?
    .workers(num_cpus::get()) // One worker per CPU core
    .run()
    .await
}
```

### Performance Optimizations
1. **Connection Pooling**: Use `PgPool` with 20-50 connections
2. **Redis Caching**: Cache prices with 100ms TTL
3. **Async I/O**: Tokio runtime for non-blocking operations
4. **Worker Threads**: One per CPU core
5. **Binary Protocol**: FIX protocol for broker communication (faster than REST)
6. **Memory Management**: Use `Arc<RwLock>` for shared state (minimal locking)

---

## AI/ML Service (Python + FastAPI)

```python
# app/main.py
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np
import pandas as pd
from typing import List, Optional
import asyncio
import aiohttp

app = FastAPI()

# ========================
# AURELIUS-1 LSTM Model
# ========================
class AureliusLSTM(nn.Module):
    def __init__(self, input_size=50, hidden_size=256, num_layers=3, output_size=3):
        super(AureliusLSTM, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # LSTM layers
        self.lstm = nn.LSTM(
            input_size, 
            hidden_size, 
            num_layers, 
            batch_first=True,
            dropout=0.3
        )
        
        # Attention mechanism
        self.attention = nn.MultiheadAttention(
            embed_dim=hidden_size,
            num_heads=8,
            dropout=0.2
        )
        
        # Fully connected layers
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, output_size),  # Buy, Sell, Hold
            nn.Softmax(dim=1)
        )
    
    def forward(self, x):
        # LSTM forward pass
        lstm_out, (h_n, c_n) = self.lstm(x)
        
        # Apply attention
        attn_out, _ = self.attention(lstm_out, lstm_out, lstm_out)
        
        # Take last time step
        final_hidden = attn_out[:, -1, :]
        
        # Fully connected layers
        output = self.fc(final_hidden)
        
        return output

# Load pre-trained model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
aurelius_model = AureliusLSTM().to(device)
aurelius_model.load_state_dict(torch.load("models/aurelius_v1.pt"))
aurelius_model.eval()

# ========================
# Sentiment Analysis Model
# ========================
sentiment_tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
sentiment_model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert").to(device)
sentiment_model.eval()

# ========================
# Feature Engineering
# ========================
class FeatureEngineer:
    """Generate technical indicators for model input"""
    
    @staticmethod
    def calculate_indicators(df: pd.DataFrame) -> np.ndarray:
        """
        Input: DataFrame with OHLCV data
        Output: Numpy array of shape (lookback_window, num_features)
        """
        # Moving averages
        df['sma_20'] = df['close'].rolling(window=20).mean()
        df['sma_50'] = df['close'].rolling(window=50).mean()
        df['ema_12'] = df['close'].ewm(span=12).mean()
        df['ema_26'] = df['close'].ewm(span=26).mean()
        
        # MACD
        df['macd'] = df['ema_12'] - df['ema_26']
        df['macd_signal'] = df['macd'].ewm(span=9).mean()
        df['macd_hist'] = df['macd'] - df['macd_signal']
        
        # RSI
        delta = df['close'].diff()
        gain = delta.where(delta > 0, 0).rolling(window=14).mean()
        loss = -delta.where(delta < 0, 0).rolling(window=14).mean()
        rs = gain / loss
        df['rsi'] = 100 - (100 / (1 + rs))
        
        # Bollinger Bands
        df['bb_middle'] = df['close'].rolling(window=20).mean()
        bb_std = df['close'].rolling(window=20).std()
        df['bb_upper'] = df['bb_middle'] + (2 * bb_std)
        df['bb_lower'] = df['bb_middle'] - (2 * bb_std)
        df['bb_width'] = (df['bb_upper'] - df['bb_lower']) / df['bb_middle']
        
        # ATR (Average True Range)
        high_low = df['high'] - df['low']
        high_close = (df['high'] - df['close'].shift()).abs()
        low_close = (df['low'] - df['close'].shift()).abs()
        tr = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
        df['atr'] = tr.rolling(window=14).mean()
        
        # Stochastic Oscillator
        low_14 = df['low'].rolling(window=14).min()
        high_14 = df['high'].rolling(window=14).max()
        df['stoch_k'] = 100 * ((df['close'] - low_14) / (high_14 - low_14))
        df['stoch_d'] = df['stoch_k'].rolling(window=3).mean()
        
        # Volume indicators
        df['volume_sma'] = df['volume'].rolling(window=20).mean()
        df['volume_ratio'] = df['volume'] / df['volume_sma']
        
        # Select features
        features = [
            'close', 'volume', 
            'sma_20', 'sma_50', 'ema_12', 'ema_26',
            'macd', 'macd_signal', 'macd_hist',
            'rsi',
            'bb_middle', 'bb_upper', 'bb_lower', 'bb_width',
            'atr',
            'stoch_k', 'stoch_d',
            'volume_ratio'
        ]
        
        # Normalize features (min-max scaling)
        from sklearn.preprocessing import MinMaxScaler
        scaler = MinMaxScaler()
        normalized = scaler.fit_transform(df[features].fillna(0))
        
        return normalized

# ========================
# API Endpoints
# ========================
class TradingSignalRequest(BaseModel):
    symbol: str
    lookback_periods: int = 100

class TradingSignalResponse(BaseModel):
    signal: str  # BUY, SELL, HOLD
    confidence: float
    entry_price: Optional[float]
    stop_loss: Optional[float]
    take_profit: Optional[float]
    reasoning: str

@app.post("/ai/signals/generate", response_model=TradingSignalResponse)
async def generate_trading_signal(request: TradingSignalRequest):
    """
    Generate trading signal using Aurelius-1 LSTM model
    """
    try:
        # Fetch historical price data
        df = await fetch_price_data(request.symbol, request.lookback_periods)
        
        # Generate features
        features = FeatureEngineer.calculate_indicators(df)
        
        # Prepare input tensor (last 60 time steps)
        lookback = 60
        X = torch.FloatTensor(features[-lookback:]).unsqueeze(0).to(device)
        
        # Generate prediction
        with torch.no_grad():
            output = aurelius_model(X)
            probabilities = output.cpu().numpy()[0]
            signal_idx = np.argmax(probabilities)
            confidence = float(probabilities[signal_idx])
        
        # Map to signal
        signals = ['BUY', 'SELL', 'HOLD']
        signal = signals[signal_idx]
        
        # Calculate entry, SL, TP
        current_price = float(df['close'].iloc[-1])
        atr = float(df['atr'].iloc[-1])
        
        if signal == 'BUY':
            entry_price = current_price
            stop_loss = current_price - (2 * atr)
            take_profit = current_price + (3 * atr)
            reasoning = f"Bullish momentum detected. RSI: {df['rsi'].iloc[-1]:.2f}, MACD: {df['macd'].iloc[-1]:.4f}"
        elif signal == 'SELL':
            entry_price = current_price
            stop_loss = current_price + (2 * atr)
            take_profit = current_price - (3 * atr)
            reasoning = f"Bearish momentum detected. RSI: {df['rsi'].iloc[-1]:.2f}, MACD: {df['macd'].iloc[-1]:.4f}"
        else:
            entry_price = None
            stop_loss = None
            take_profit = None
            reasoning = "No clear trend. Market consolidation."
        
        return TradingSignalResponse(
            signal=signal,
            confidence=confidence,
            entry_price=entry_price,
            stop_loss=stop_loss,
            take_profit=take_profit,
            reasoning=reasoning
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str  # positive, negative, neutral
    score: float

@app.post("/ai/sentiment/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze sentiment of news/social media text using FinBERT
    """
    try:
        # Tokenize
        inputs = sentiment_tokenizer(
            request.text, 
            return_tensors="pt", 
            truncation=True, 
            max_length=512
        ).to(device)
        
        # Predict
        with torch.no_grad():
            outputs = sentiment_model(**inputs)
            probabilities = torch.nn.functional.softmax(outputs.logits, dim=1)
            prediction = torch.argmax(probabilities, dim=1).item()
            score = float(probabilities[0][prediction])
        
        # Map to sentiment
        sentiments = ['positive', 'negative', 'neutral']
        sentiment = sentiments[prediction]
        
        return SentimentResponse(
            sentiment=sentiment,
            score=score
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ========================
# Background Tasks
# ========================
async def retrain_model_task():
    """
    Continuously retrain model with new data (every 24 hours)
    """
    while True:
        try:
            # Fetch last 2 years of data
            df = await fetch_price_data("XAUUSD", periods=730 * 24)  # Daily bars
            
            # Prepare training data
            X, y = prepare_training_data(df)
            
            # Split train/val
            train_size = int(0.8 * len(X))
            X_train, X_val = X[:train_size], X[train_size:]
            y_train, y_val = y[:train_size], y[train_size:]
            
            # Train model
            train_model(aurelius_model, X_train, y_train, X_val, y_val, epochs=50)
            
            # Save model
            torch.save(aurelius_model.state_dict(), f"models/aurelius_v{int(time.time())}.pt")
            
            print(f"Model retrained successfully at {datetime.now()}")
        
        except Exception as e:
            print(f"Error retraining model: {e}")
        
        # Wait 24 hours
        await asyncio.sleep(86400)

@app.on_event("startup")
async def startup_event():
    # Start background retraining task
    asyncio.create_task(retrain_model_task())

# ========================
# Helper Functions
# ========================
async def fetch_price_data(symbol: str, periods: int) -> pd.DataFrame:
    """Fetch historical price data from database"""
    # This would query PostgreSQL/TimescaleDB
    # For now, placeholder
    async with aiohttp.ClientSession() as session:
        async with session.get(f"http://market-data-service/api/history/{symbol}?periods={periods}") as resp:
            data = await resp.json()
            return pd.DataFrame(data)

def prepare_training_data(df: pd.DataFrame):
    """Prepare X, y for training"""
    # Feature engineering
    features = FeatureEngineer.calculate_indicators(df)
    
    # Labels (1 = buy, 0 = sell, 2 = hold based on next day return)
    df['next_return'] = df['close'].pct_change().shift(-1)
    labels = []
    for ret in df['next_return']:
        if ret > 0.001:  # > 0.1% return
            labels.append(0)  # BUY
        elif ret < -0.001:
            labels.append(1)  # SELL
        else:
            labels.append(2)  # HOLD
    
    return features[:-1], np.array(labels[:-1])

def train_model(model, X_train, y_train, X_val, y_val, epochs=50):
    """Train LSTM model"""
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    criterion = nn.CrossEntropyLoss()
    
    for epoch in range(epochs):
        model.train()
        
        # Training loop
        optimizer.zero_grad()
        outputs = model(torch.FloatTensor(X_train).to(device))
        loss = criterion(outputs, torch.LongTensor(y_train).to(device))
        loss.backward()
        optimizer.step()
        
        # Validation
        model.eval()
        with torch.no_grad():
            val_outputs = model(torch.FloatTensor(X_val).to(device))
            val_loss = criterion(val_outputs, torch.LongTensor(y_val).to(device))
        
        print(f"Epoch {epoch+1}/{epochs} - Loss: {loss.item():.4f}, Val Loss: {val_loss.item():.4f}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, workers=4)
```

---

This is getting very long. Would you like me to continue with:
1. Real-time WebSocket architecture
2. Blockchain integration details
3. Mobile app architecture
4. DevOps and infrastructure details
5. API specifications (OpenAPI/Swagger)
6. Security implementation
7. Performance benchmarking

Let me know which specific areas you want me to expand on!
