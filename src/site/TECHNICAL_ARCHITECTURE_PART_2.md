# 🏗️ TERRALABS TECHNICAL ARCHITECTURE - PART 2
## Advanced Systems: Real-Time, Blockchain, Mobile, DevOps, APIs, Security & Performance

---

# 5. **REAL-TIME DATA INFRASTRUCTURE**

## WebSocket Architecture - Handling 100K+ Concurrent Connections

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT CONNECTIONS                          │
│  100,000+ concurrent WebSocket connections                      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                  CLOUDFLARE (Edge Layer)                        │
│  - DDoS Protection                                              │
│  - WebSocket proxy                                              │
│  - Geographic distribution                                      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│              WEBSOCKET GATEWAY (Go - Horizontal Scaling)        │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  WS-1    │  │  WS-2    │  │  WS-3    │  │  WS-N    │      │
│  │ 25K conn │  │ 25K conn │  │ 25K conn │  │ 25K conn │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                 │
│  Features:                                                      │
│  - Connection management (subscribe/unsubscribe)                │
│  - Message routing                                              │
│  - Heartbeat (ping/pong)                                        │
│  - Automatic reconnection                                       │
│  - Backpressure handling                                        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   REDIS PUB/SUB (Message Bus)                   │
│                                                                 │
│  Channels:                                                      │
│  - prices:{symbol}        → Price updates                       │
│  - trades:{userId}        → User trade confirmations            │
│  - portfolio:{userId}     → Portfolio updates                   │
│  - alerts:{userId}        → Price alerts                        │
│  - social:feed            → Social feed updates                 │
│  - system:announcements   → System-wide messages                │
└─────────────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────────────┐
│                     DATA PRODUCERS                              │
│                                                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │ Market Data    │  │ Trading Engine │  │ AI/ML Service  │  │
│  │ Service        │  │                │  │                │  │
│  │ (publishes     │  │ (publishes     │  │ (publishes     │  │
│  │  prices)       │  │  trades)       │  │  signals)      │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

### WebSocket Gateway Implementation (Go)

```go
// main.go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
    "time"
    
    "github.com/gorilla/websocket"
    "github.com/redis/go-redis/v9"
)

// WebSocket connection wrapper
type Client struct {
    ID           string
    UserID       string
    Conn         *websocket.Conn
    Send         chan []byte
    Subscriptions map[string]bool // channel -> subscribed
    mu           sync.RWMutex
}

// WebSocket hub managing all connections
type Hub struct {
    // Registered clients
    Clients map[string]*Client
    
    // Inbound messages from clients
    Broadcast chan []byte
    
    // Register requests from clients
    Register chan *Client
    
    // Unregister requests from clients
    Unregister chan *Client
    
    // Redis client for pub/sub
    RedisClient *redis.Client
    
    mu sync.RWMutex
}

func NewHub(redisURL string) *Hub {
    return &Hub{
        Clients:     make(map[string]*Client),
        Broadcast:   make(chan []byte, 256),
        Register:    make(chan *Client),
        Unregister:  make(chan *Client),
        RedisClient: redis.NewClient(&redis.Options{
            Addr: redisURL,
        }),
    }
}

// Main hub loop
func (h *Hub) Run() {
    ctx := context.Background()
    
    // Start Redis subscription handler
    go h.handleRedisSubscriptions(ctx)
    
    for {
        select {
        case client := <-h.Register:
            h.mu.Lock()
            h.Clients[client.ID] = client
            h.mu.Unlock()
            log.Printf("Client registered: %s (total: %d)", client.ID, len(h.Clients))
            
        case client := <-h.Unregister:
            if _, ok := h.Clients[client.ID]; ok {
                h.mu.Lock()
                delete(h.Clients, client.ID)
                h.mu.Unlock()
                close(client.Send)
                log.Printf("Client unregistered: %s (total: %d)", client.ID, len(h.Clients))
            }
            
        case message := <-h.Broadcast:
            h.mu.RLock()
            for _, client := range h.Clients {
                select {
                case client.Send <- message:
                default:
                    // Client send buffer full, disconnect
                    close(client.Send)
                    delete(h.Clients, client.ID)
                }
            }
            h.mu.RUnlock()
        }
    }
}

// Handle Redis pub/sub messages
func (h *Hub) handleRedisSubscriptions(ctx context.Context) {
    pubsub := h.RedisClient.Subscribe(ctx, 
        "prices:*", 
        "trades:*", 
        "portfolio:*",
        "alerts:*",
        "social:feed",
        "system:announcements",
    )
    
    defer pubsub.Close()
    
    ch := pubsub.Channel()
    
    for msg := range ch {
        // Route message to subscribed clients
        h.routeMessage(msg.Channel, []byte(msg.Payload))
    }
}

// Route message to appropriate clients
func (h *Hub) routeMessage(channel string, payload []byte) {
    h.mu.RLock()
    defer h.mu.RUnlock()
    
    for _, client := range h.Clients {
        client.mu.RLock()
        subscribed := client.Subscriptions[channel]
        client.mu.RUnlock()
        
        if subscribed {
            select {
            case client.Send <- payload:
            default:
                // Buffer full, skip
            }
        }
    }
}

// Client read pump (read messages from client)
func (c *Client) readPump(hub *Hub) {
    defer func() {
        hub.Unregister <- c
        c.Conn.Close()
    }()
    
    c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
    c.Conn.SetPongHandler(func(string) error {
        c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
        return nil
    })
    
    for {
        _, message, err := c.Conn.ReadMessage()
        if err != nil {
            if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
                log.Printf("WebSocket error: %v", err)
            }
            break
        }
        
        // Handle client message (subscribe/unsubscribe)
        c.handleMessage(hub, message)
    }
}

// Client write pump (write messages to client)
func (c *Client) writePump() {
    ticker := time.NewTicker(54 * time.Second)
    defer func() {
        ticker.Stop()
        c.Conn.Close()
    }()
    
    for {
        select {
        case message, ok := <-c.Send:
            c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
            if !ok {
                // Hub closed the channel
                c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }
            
            // Write message
            err := c.Conn.WriteMessage(websocket.TextMessage, message)
            if err != nil {
                return
            }
            
        case <-ticker.C:
            c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
            if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
                return
            }
        }
    }
}

// Message types
type WSMessage struct {
    Type    string          `json:"type"` // subscribe, unsubscribe
    Channel string          `json:"channel"`
    Data    json.RawMessage `json:"data,omitempty"`
}

// Handle incoming client message
func (c *Client) handleMessage(hub *Hub, message []byte) {
    var msg WSMessage
    if err := json.Unmarshal(message, &msg); err != nil {
        log.Printf("Error parsing message: %v", err)
        return
    }
    
    switch msg.Type {
    case "subscribe":
        c.subscribe(hub, msg.Channel)
    case "unsubscribe":
        c.unsubscribe(msg.Channel)
    case "ping":
        c.Send <- []byte(`{"type":"pong"}`)
    }
}

// Subscribe to a channel
func (c *Client) subscribe(hub *Hub, channel string) {
    c.mu.Lock()
    c.Subscriptions[channel] = true
    c.mu.Unlock()
    
    // Subscribe to Redis channel if not already
    ctx := context.Background()
    hub.RedisClient.Subscribe(ctx, channel)
    
    log.Printf("Client %s subscribed to %s", c.ID, channel)
    
    // Send confirmation
    response, _ := json.Marshal(map[string]string{
        "type":    "subscribed",
        "channel": channel,
    })
    c.Send <- response
}

// Unsubscribe from a channel
func (c *Client) unsubscribe(channel string) {
    c.mu.Lock()
    delete(c.Subscriptions, channel)
    c.mu.Unlock()
    
    log.Printf("Client %s unsubscribed from %s", c.ID, channel)
}

// WebSocket upgrader
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        // TODO: Implement proper origin checking
        return true
    },
}

// HTTP handler for WebSocket connections
func serveWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
    // Authenticate user (JWT from query param or header)
    userID := r.URL.Query().Get("userId")
    token := r.URL.Query().Get("token")
    
    // TODO: Validate JWT token
    if !validateToken(token, userID) {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }
    
    // Upgrade HTTP connection to WebSocket
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    
    // Create client
    client := &Client{
        ID:            generateClientID(),
        UserID:        userID,
        Conn:          conn,
        Send:          make(chan []byte, 256),
        Subscriptions: make(map[string]bool),
    }
    
    // Register client
    hub.Register <- client
    
    // Start read/write pumps
    go client.writePump()
    go client.readPump(hub)
}

func validateToken(token, userID string) bool {
    // TODO: Implement JWT validation
    return true
}

func generateClientID() string {
    return fmt.Sprintf("client_%d", time.Now().UnixNano())
}

func main() {
    // Initialize hub
    hub := NewHub("localhost:6379")
    go hub.Run()
    
    // HTTP routes
    http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
        serveWs(hub, w, r)
    })
    
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("OK"))
    })
    
    // Metrics endpoint
    http.HandleFunc("/metrics", func(w http.ResponseWriter, r *http.Request) {
        hub.mu.RLock()
        clientCount := len(hub.Clients)
        hub.mu.RUnlock()
        
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]int{
            "connected_clients": clientCount,
        })
    })
    
    // Start server
    addr := ":8080"
    log.Printf("WebSocket server starting on %s", addr)
    if err := http.ListenAndServe(addr, nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
```

---

### Frontend WebSocket Client (TypeScript)

```typescript
// websocket-client.ts
type MessageHandler = (data: any) => void;

interface WSMessage {
  type: string;
  channel?: string;
  data?: any;
}

export class TerralabsWebSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private token: string;
  private userId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000; // Start with 1 second
  private subscriptions: Map<string, Set<MessageHandler>> = new Map();
  private isConnected = false;
  private heartbeatInterval: number | null = null;

  constructor(url: string, token: string, userId: string) {
    this.url = url;
    this.token = token;
    this.userId = userId;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = `${this.url}?token=${this.token}&userId=${this.userId}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        this.startHeartbeat();
        resolve();
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket closed');
        this.isConnected = false;
        this.stopHeartbeat();
        this.attemptReconnect();
      };
    });
  }

  private handleMessage(rawData: string) {
    try {
      const message: WSMessage = JSON.parse(rawData);

      // Handle system messages
      if (message.type === 'pong') {
        return;
      }

      // Route to subscribers
      if (message.channel) {
        const handlers = this.subscriptions.get(message.channel);
        if (handlers) {
          handlers.forEach(handler => handler(message.data));
        }
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  subscribe(channel: string, handler: MessageHandler) {
    // Add handler to subscriptions
    if (!this.subscriptions.has(channel)) {
      this.subscriptions.set(channel, new Set());
    }
    this.subscriptions.get(channel)!.add(handler);

    // Send subscribe message to server
    this.send({
      type: 'subscribe',
      channel: channel,
    });
  }

  unsubscribe(channel: string, handler: MessageHandler) {
    const handlers = this.subscriptions.get(channel);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.subscriptions.delete(channel);
        
        // Send unsubscribe message to server
        this.send({
          type: 'unsubscribe',
          channel: channel,
        });
      }
    }
  }

  private send(message: WSMessage) {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = window.setInterval(() => {
      this.send({ type: 'ping' });
    }, 30000); // Every 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Reconnecting... (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch(() => {
        // Exponential backoff
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
      });
    }, this.reconnectDelay);
  }

  disconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.isConnected = false;
  }
}

// Usage in React
import { useEffect, useState } from 'react';

export function useWebSocket(url: string, token: string, userId: string) {
  const [ws, setWs] = useState<TerralabsWebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new TerralabsWebSocket(url, token, userId);
    
    socket.connect()
      .then(() => {
        setIsConnected(true);
        setWs(socket);
      })
      .catch(error => {
        console.error('Failed to connect:', error);
      });

    return () => {
      socket.disconnect();
    };
  }, [url, token, userId]);

  return { ws, isConnected };
}

// Example: Subscribe to real-time prices
export function usePriceStream(symbol: string) {
  const { ws } = useWebSocket(WS_URL, TOKEN, USER_ID);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!ws) return;

    const channel = `prices:${symbol}`;
    const handler = (data: { price: number }) => {
      setPrice(data.price);
    };

    ws.subscribe(channel, handler);

    return () => {
      ws.unsubscribe(channel, handler);
    };
  }, [ws, symbol]);

  return price;
}
```

---

### Redis Pub/Sub Publisher (Node.js)

```typescript
// market-data-publisher.ts
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

interface PriceUpdate {
  symbol: string;
  price: number;
  timestamp: number;
  bid: number;
  ask: number;
}

// Publish price updates
export async function publishPriceUpdate(update: PriceUpdate) {
  const channel = `prices:${update.symbol}`;
  const payload = JSON.stringify(update);
  
  await redis.publish(channel, payload);
  
  // Also cache latest price (TTL: 100ms)
  await redis.setex(
    `price:${update.symbol}`,
    0.1, // 100ms
    update.price.toString()
  );
}

// Example: Stream prices from exchange
async function streamPricesFromExchange() {
  // Simulated exchange WebSocket
  const exchangeWs = connectToExchange();
  
  exchangeWs.on('price', async (data: any) => {
    await publishPriceUpdate({
      symbol: data.symbol,
      price: data.price,
      timestamp: Date.now(),
      bid: data.bid,
      ask: data.ask,
    });
  });
}

// Publish trade execution
export async function publishTradeExecution(trade: any) {
  const channel = `trades:${trade.userId}`;
  await redis.publish(channel, JSON.stringify(trade));
}

// Publish portfolio update
export async function publishPortfolioUpdate(userId: string, portfolio: any) {
  const channel = `portfolio:${userId}`;
  await redis.publish(channel, JSON.stringify(portfolio));
}
```

---

### Scaling Strategy

#### Horizontal Scaling (Multiple WebSocket Gateway Instances)

```yaml
# kubernetes/websocket-gateway.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: websocket-gateway
spec:
  replicas: 4  # Start with 4 instances, auto-scale up to 20
  selector:
    matchLabels:
      app: websocket-gateway
  template:
    metadata:
      labels:
        app: websocket-gateway
    spec:
      containers:
      - name: websocket-gateway
        image: terralabs/websocket-gateway:latest
        ports:
        - containerPort: 8080
        env:
        - name: REDIS_URL
          value: "redis-cluster:6379"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10

---
apiVersion: v1
kind: Service
metadata:
  name: websocket-gateway
spec:
  type: LoadBalancer
  selector:
    app: websocket-gateway
  ports:
  - port: 80
    targetPort: 8080
  sessionAffinity: ClientIP  # Sticky sessions for WebSocket

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: websocket-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: websocket-gateway
  minReplicas: 4
  maxReplicas: 20
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
```

---

# 6. **BLOCKCHAIN INTEGRATION**

## Smart Contract for Trade Verification (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TradeRegistry
 * @dev Immutable registry of all trades executed on TERRALABS platform
 */
contract TradeRegistry is Ownable, ReentrancyGuard {
    
    // Trade structure
    struct Trade {
        bytes32 tradeId;           // Unique trade identifier
        address trader;            // Trader's wallet address
        string symbol;             // Trading symbol (XAUUSD, BTCUSD, etc.)
        uint256 entryPrice;        // Entry price (scaled by 1e8)
        uint256 exitPrice;         // Exit price (scaled by 1e8)
        uint256 quantity;          // Quantity traded (scaled by 1e8)
        int256 profitLoss;         // Profit/Loss in USD (scaled by 1e8)
        uint256 openedAt;          // Timestamp when trade opened
        uint256 closedAt;          // Timestamp when trade closed
        bool isLong;               // True if long, false if short
        bool isVerified;           // Verified by oracle
    }
    
    // Performance metrics for each trader
    struct TraderPerformance {
        uint256 totalTrades;
        uint256 winningTrades;
        uint256 losingTrades;
        int256 totalProfitLoss;    // Cumulative P&L
        uint256 totalVolume;       // Total volume traded
        uint256 lastTradeTimestamp;
    }
    
    // Storage
    mapping(bytes32 => Trade) public trades;
    mapping(address => TraderPerformance) public performance;
    mapping(address => bytes32[]) public traderTrades;
    
    // Events
    event TradeRecorded(
        bytes32 indexed tradeId,
        address indexed trader,
        string symbol,
        int256 profitLoss,
        uint256 timestamp
    );
    
    event TradeVerified(
        bytes32 indexed tradeId,
        address indexed verifier,
        uint256 timestamp
    );
    
    // Authorized verifiers (oracle addresses)
    mapping(address => bool) public verifiers;
    
    // Modifiers
    modifier onlyVerifier() {
        require(verifiers[msg.sender], "Not authorized verifier");
        _;
    }
    
    constructor() {
        // Owner is initial verifier
        verifiers[msg.sender] = true;
    }
    
    /**
     * @dev Record a new trade on blockchain
     */
    function recordTrade(
        bytes32 tradeId,
        address trader,
        string memory symbol,
        uint256 entryPrice,
        uint256 exitPrice,
        uint256 quantity,
        int256 profitLoss,
        uint256 openedAt,
        uint256 closedAt,
        bool isLong
    ) external onlyVerifier nonReentrant {
        require(trades[tradeId].tradeId == bytes32(0), "Trade already exists");
        require(trader != address(0), "Invalid trader address");
        require(entryPrice > 0, "Invalid entry price");
        require(quantity > 0, "Invalid quantity");
        
        // Store trade
        trades[tradeId] = Trade({
            tradeId: tradeId,
            trader: trader,
            symbol: symbol,
            entryPrice: entryPrice,
            exitPrice: exitPrice,
            quantity: quantity,
            profitLoss: profitLoss,
            openedAt: openedAt,
            closedAt: closedAt,
            isLong: isLong,
            isVerified: true
        });
        
        // Update trader's trade list
        traderTrades[trader].push(tradeId);
        
        // Update performance metrics
        TraderPerformance storage perf = performance[trader];
        perf.totalTrades++;
        perf.totalProfitLoss += profitLoss;
        perf.totalVolume += quantity;
        perf.lastTradeTimestamp = block.timestamp;
        
        if (profitLoss > 0) {
            perf.winningTrades++;
        } else if (profitLoss < 0) {
            perf.losingTrades++;
        }
        
        emit TradeRecorded(tradeId, trader, symbol, profitLoss, block.timestamp);
    }
    
    /**
     * @dev Get all trades for a trader
     */
    function getTraderTrades(address trader) external view returns (bytes32[] memory) {
        return traderTrades[trader];
    }
    
    /**
     * @dev Get trade details
     */
    function getTrade(bytes32 tradeId) external view returns (Trade memory) {
        return trades[tradeId];
    }
    
    /**
     * @dev Get trader performance metrics
     */
    function getPerformance(address trader) external view returns (TraderPerformance memory) {
        return performance[trader];
    }
    
    /**
     * @dev Calculate win rate for a trader
     */
    function getWinRate(address trader) external view returns (uint256) {
        TraderPerformance memory perf = performance[trader];
        if (perf.totalTrades == 0) return 0;
        return (perf.winningTrades * 100) / perf.totalTrades;
    }
    
    /**
     * @dev Add a new verifier (only owner)
     */
    function addVerifier(address verifier) external onlyOwner {
        verifiers[verifier] = true;
    }
    
    /**
     * @dev Remove a verifier (only owner)
     */
    function removeVerifier(address verifier) external onlyOwner {
        verifiers[verifier] = false;
    }
}
```

---

## NFT Performance Certificates

```solidity
// PerformanceNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PerformanceNFT
 * @dev NFT certificates for trading achievements
 */
contract PerformanceNFT is ERC721, ERC721URIStorage, Ownable {
    
    uint256 private _tokenIdCounter;
    
    // Achievement types
    enum AchievementType {
        FIRST_TRADE,
        HUNDRED_TRADES,
        THOUSAND_TRADES,
        PROFITABLE_MONTH,
        PROFITABLE_QUARTER,
        PROFITABLE_YEAR,
        MILLION_VOLUME,
        TEN_MILLION_VOLUME,
        FIFTY_PERCENT_RETURN,
        HUNDRED_PERCENT_RETURN,
        SHARPE_ABOVE_2,
        SHARPE_ABOVE_3,
        ZERO_DRAWDOWN_MONTH
    }
    
    struct Achievement {
        AchievementType achievementType;
        uint256 timestamp;
        string description;
        uint256 metricValue;  // e.g., 1000 for 1000 trades
    }
    
    // Token ID -> Achievement
    mapping(uint256 => Achievement) public achievements;
    
    // Trader -> Achievement Type -> Has Achieved
    mapping(address => mapping(AchievementType => bool)) public hasAchievement;
    
    event AchievementMinted(
        address indexed trader,
        uint256 indexed tokenId,
        AchievementType achievementType,
        uint256 timestamp
    );
    
    constructor() ERC721("TERRALABS Achievement", "TLABS") {}
    
    /**
     * @dev Mint achievement NFT
     */
    function mintAchievement(
        address trader,
        AchievementType achievementType,
        string memory description,
        string memory tokenURI,
        uint256 metricValue
    ) external onlyOwner returns (uint256) {
        require(!hasAchievement[trader][achievementType], "Achievement already earned");
        
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(trader, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        achievements[tokenId] = Achievement({
            achievementType: achievementType,
            timestamp: block.timestamp,
            description: description,
            metricValue: metricValue
        });
        
        hasAchievement[trader][achievementType] = true;
        
        emit AchievementMinted(trader, tokenId, achievementType, block.timestamp);
        
        return tokenId;
    }
    
    /**
     * @dev Get achievement details
     */
    function getAchievement(uint256 tokenId) external view returns (Achievement memory) {
        require(_exists(tokenId), "Token does not exist");
        return achievements[tokenId];
    }
    
    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
```

---

## Blockchain Integration Service (Node.js)

```typescript
// blockchain-service.ts
import { ethers } from 'ethers';
import { TradeRegistry__factory, PerformanceNFT__factory } from './typechain';

class BlockchainService {
  private provider: ethers.Provider;
  private signer: ethers.Wallet;
  private tradeRegistry: ethers.Contract;
  private performanceNFT: ethers.Contract;

  constructor(
    rpcUrl: string,
    privateKey: string,
    tradeRegistryAddress: string,
    performanceNFTAddress: string
  ) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
    
    this.tradeRegistry = TradeRegistry__factory.connect(
      tradeRegistryAddress,
      this.signer
    );
    
    this.performanceNFT = PerformanceNFT__factory.connect(
      performanceNFTAddress,
      this.signer
    );
  }

  /**
   * Record a trade on blockchain
   */
  async recordTrade(trade: {
    tradeId: string;
    trader: string;
    symbol: string;
    entryPrice: number;
    exitPrice: number;
    quantity: number;
    profitLoss: number;
    openedAt: number;
    closedAt: number;
    isLong: boolean;
  }): Promise<string> {
    try {
      // Convert to blockchain format (scaled by 1e8)
      const tradeIdBytes = ethers.id(trade.tradeId);
      const entryPriceScaled = ethers.parseUnits(trade.entryPrice.toString(), 8);
      const exitPriceScaled = ethers.parseUnits(trade.exitPrice.toString(), 8);
      const quantityScaled = ethers.parseUnits(trade.quantity.toString(), 8);
      const profitLossScaled = ethers.parseUnits(trade.profitLoss.toString(), 8);

      // Send transaction
      const tx = await this.tradeRegistry.recordTrade(
        tradeIdBytes,
        trade.trader,
        trade.symbol,
        entryPriceScaled,
        exitPriceScaled,
        quantityScaled,
        profitLossScaled,
        trade.openedAt,
        trade.closedAt,
        trade.isLong
      );

      // Wait for confirmation
      const receipt = await tx.wait();
      
      console.log(`Trade recorded on blockchain: ${receipt.hash}`);
      return receipt.hash;
    } catch (error) {
      console.error('Error recording trade on blockchain:', error);
      throw error;
    }
  }

  /**
   * Get trader performance from blockchain
   */
  async getTraderPerformance(traderAddress: string) {
    const performance = await this.tradeRegistry.getPerformance(traderAddress);
    const winRate = await this.tradeRegistry.getWinRate(traderAddress);

    return {
      totalTrades: Number(performance.totalTrades),
      winningTrades: Number(performance.winningTrades),
      losingTrades: Number(performance.losingTrades),
      totalProfitLoss: Number(ethers.formatUnits(performance.totalProfitLoss, 8)),
      totalVolume: Number(ethers.formatUnits(performance.totalVolume, 8)),
      winRate: Number(winRate),
      lastTradeTimestamp: Number(performance.lastTradeTimestamp),
    };
  }

  /**
   * Get all trades for a trader
   */
  async getTraderTrades(traderAddress: string) {
    const tradeIds = await this.tradeRegistry.getTraderTrades(traderAddress);
    
    const trades = await Promise.all(
      tradeIds.map(async (tradeId: string) => {
        const trade = await this.tradeRegistry.getTrade(tradeId);
        return {
          tradeId: trade.tradeId,
          trader: trade.trader,
          symbol: trade.symbol,
          entryPrice: Number(ethers.formatUnits(trade.entryPrice, 8)),
          exitPrice: Number(ethers.formatUnits(trade.exitPrice, 8)),
          quantity: Number(ethers.formatUnits(trade.quantity, 8)),
          profitLoss: Number(ethers.formatUnits(trade.profitLoss, 8)),
          openedAt: Number(trade.openedAt),
          closedAt: Number(trade.closedAt),
          isLong: trade.isLong,
          isVerified: trade.isVerified,
        };
      })
    );

    return trades;
  }

  /**
   * Mint achievement NFT
   */
  async mintAchievement(
    traderAddress: string,
    achievementType: number,
    description: string,
    metadataURI: string,
    metricValue: number
  ): Promise<string> {
    try {
      const tx = await this.performanceNFT.mintAchievement(
        traderAddress,
        achievementType,
        description,
        metadataURI,
        metricValue
      );

      const receipt = await tx.wait();
      console.log(`Achievement NFT minted: ${receipt.hash}`);
      
      return receipt.hash;
    } catch (error) {
      console.error('Error minting achievement NFT:', error);
      throw error;
    }
  }

  /**
   * Check if trader has specific achievement
   */
  async hasAchievement(
    traderAddress: string,
    achievementType: number
  ): Promise<boolean> {
    return await this.performanceNFT.hasAchievement(
      traderAddress,
      achievementType
    );
  }
}

export default BlockchainService;

// Usage example
async function main() {
  const blockchainService = new BlockchainService(
    process.env.ETH_RPC_URL!,
    process.env.VERIFIER_PRIVATE_KEY!,
    process.env.TRADE_REGISTRY_ADDRESS!,
    process.env.PERFORMANCE_NFT_ADDRESS!
  );

  // Record a trade
  await blockchainService.recordTrade({
    tradeId: 'trade_1234567890',
    trader: '0x1234567890123456789012345678901234567890',
    symbol: 'XAUUSD',
    entryPrice: 2050.50,
    exitPrice: 2070.25,
    quantity: 10,
    profitLoss: 197.50,
    openedAt: Math.floor(Date.now() / 1000) - 3600,
    closedAt: Math.floor(Date.now() / 1000),
    isLong: true,
  });

  // Get trader performance
  const performance = await blockchainService.getTraderPerformance(
    '0x1234567890123456789012345678901234567890'
  );
  console.log('Trader Performance:', performance);
}
```

---

## Chainlink Oracle Integration (For External Price Verification)

```solidity
// PriceOracle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title PriceOracle
 * @dev Verify trade prices using Chainlink price feeds
 */
contract PriceOracle {
    
    // Chainlink price feed addresses
    mapping(string => address) public priceFeeds;
    
    constructor() {
        // Initialize Chainlink price feeds
        priceFeeds["XAUUSD"] = 0x214eD9Da11D2fbe465a6fc601a91E62EbEc1a0D6; // Mainnet Gold/USD
        priceFeeds["BTCUSD"] = 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c; // Mainnet BTC/USD
        priceFeeds["ETHUSD"] = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419; // Mainnet ETH/USD
    }
    
    /**
     * @dev Get latest price from Chainlink
     */
    function getLatestPrice(string memory symbol) public view returns (int256, uint256) {
        require(priceFeeds[symbol] != address(0), "Price feed not available");
        
        AggregatorV3Interface priceFeed = AggregatorV3Interface(priceFeeds[symbol]);
        
        (
            /* uint80 roundID */,
            int256 price,
            /* uint256 startedAt */,
            uint256 timestamp,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();
        
        return (price, timestamp);
    }
    
    /**
     * @dev Verify trade price against Chainlink oracle
     */
    function verifyTradePrice(
        string memory symbol,
        uint256 tradePrice,
        uint256 tradeTimestamp,
        uint256 tolerance  // Allowed deviation in basis points (100 = 1%)
    ) public view returns (bool) {
        (int256 oraclePrice, uint256 oracleTimestamp) = getLatestPrice(symbol);
        
        // Check timestamp difference (should be within 5 minutes)
        require(
            tradeTimestamp >= oracleTimestamp - 300 && 
            tradeTimestamp <= oracleTimestamp + 300,
            "Timestamp mismatch"
        );
        
        // Check price deviation
        uint256 oraclePriceUint = uint256(oraclePrice);
        uint256 deviation = tradePrice > oraclePriceUint
            ? ((tradePrice - oraclePriceUint) * 10000) / oraclePriceUint
            : ((oraclePriceUint - tradePrice) * 10000) / oraclePriceUint;
        
        return deviation <= tolerance;
    }
}
```

---

This document is extremely comprehensive but I need to continue with the remaining sections. Should I continue with:

1. ✅ Mobile App Architecture (iOS/Android deep dive)
2. ✅ DevOps & Infrastructure (Kubernetes, CI/CD, monitoring)
3. ✅ API Specifications (Complete OpenAPI/Swagger)
4. ✅ Security Implementation (Encryption, MFA, threat detection)
5. ✅ Performance Benchmarking (Load testing, optimization)

Let me continue in the next file...
