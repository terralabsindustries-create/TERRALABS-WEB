# 🏗️ TERRALABS TECHNICAL ARCHITECTURE - PART 3
## Mobile, DevOps, APIs, Security & Performance

---

# 7. **MOBILE APP ARCHITECTURE**

## iOS Application (SwiftUI + Combine)

### Project Structure
```
TerralabsTrading/
├── App/
│   ├── TerralabsTradingApp.swift
│   └── AppDelegate.swift
├── Core/
│   ├── Network/
│   │   ├── APIClient.swift
│   │   ├── WebSocketManager.swift
│   │   └── Endpoints.swift
│   ├── Storage/
│   │   ├── KeychainManager.swift
│   │   ├── UserDefaultsManager.swift
│   │   └── CoreDataManager.swift
│   ├── Auth/
│   │   ├── AuthManager.swift
│   │   └── BiometricAuth.swift
│   └── Services/
│       ├── TradingService.swift
│       ├── PortfolioService.swift
│       └── MarketDataService.swift
├── Features/
│   ├── Authentication/
│   │   ├── Views/
│   │   │   ├── LoginView.swift
│   │   │   ├── SignUpView.swift
│   │   │   └── BiometricSetupView.swift
│   │   └── ViewModels/
│   │       └── AuthViewModel.swift
│   ├── Dashboard/
│   │   ├── Views/
│   │   │   ├── DashboardView.swift
│   │   │   ├── PortfolioCard.swift
│   │   │   └── QuickActionsView.swift
│   │   └── ViewModels/
│   │       └── DashboardViewModel.swift
│   ├── Trading/
│   │   ├── Views/
│   │   │   ├── TradingView.swift
│   │   │   ├── OrderTicket.swift
│   │   │   ├── ChartView.swift
│   │   │   └── OrderBookView.swift
│   │   └── ViewModels/
│   │       └── TradingViewModel.swift
│   ├── Portfolio/
│   │   ├── Views/
│   │   │   ├── PortfolioView.swift
│   │   │   ├── PositionsList.swift
│   │   │   └── PerformanceChart.swift
│   │   └── ViewModels/
│   │       └── PortfolioViewModel.swift
│   └── Settings/
│       ├── Views/
│       │   ├── SettingsView.swift
│       │   ├── SecuritySettings.swift
│       │   └── NotificationSettings.swift
│       └── ViewModels/
│           └── SettingsViewModel.swift
├── Models/
│   ├── User.swift
│   ├── Trade.swift
│   ├── Position.swift
│   ├── Order.swift
│   └── Portfolio.swift
├── UI/
│   ├── Components/
│   │   ├── Buttons/
│   │   ├── Cards/
│   │   ├── Charts/
│   │   └── Forms/
│   ├── Styles/
│   │   ├── Colors.swift
│   │   ├── Typography.swift
│   │   └── Spacing.swift
│   └── Extensions/
│       ├── View+Extensions.swift
│       └── Color+Extensions.swift
└── Resources/
    ├── Assets.xcassets
    ├── Localizable.strings
    └── Info.plist
```

---

### Core Network Layer

```swift
// APIClient.swift
import Foundation
import Combine

enum HTTPMethod: String {
    case get = "GET"
    case post = "POST"
    case put = "PUT"
    case delete = "DELETE"
}

enum APIError: Error {
    case invalidURL
    case networkError(Error)
    case decodingError(Error)
    case serverError(Int, String)
    case unauthorized
}

protocol APIRequest {
    associatedtype Response: Decodable
    var path: String { get }
    var method: HTTPMethod { get }
    var body: Data? { get }
    var headers: [String: String] { get }
}

class APIClient {
    static let shared = APIClient()
    
    private let baseURL = "https://api.terralabs.com/v1"
    private let session: URLSession
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        config.timeoutIntervalForResource = 300
        config.waitsForConnectivity = true
        self.session = URLSession(configuration: config)
    }
    
    func request<T: APIRequest>(_ request: T) -> AnyPublisher<T.Response, APIError> {
        guard let url = URL(string: baseURL + request.path) else {
            return Fail(error: APIError.invalidURL).eraseToAnyPublisher()
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = request.method.rawValue
        urlRequest.httpBody = request.body
        
        // Add headers
        request.headers.forEach { key, value in
            urlRequest.setValue(value, forHTTPHeaderField: key)
        }
        
        // Add auth token
        if let token = KeychainManager.shared.getToken() {
            urlRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        return session.dataTaskPublisher(for: urlRequest)
            .tryMap { data, response -> Data in
                guard let httpResponse = response as? HTTPURLResponse else {
                    throw APIError.networkError(URLError(.badServerResponse))
                }
                
                switch httpResponse.statusCode {
                case 200...299:
                    return data
                case 401:
                    throw APIError.unauthorized
                case 400...599:
                    let errorMessage = String(data: data, encoding: .utf8) ?? "Unknown error"
                    throw APIError.serverError(httpResponse.statusCode, errorMessage)
                default:
                    throw APIError.networkError(URLError(.unknown))
                }
            }
            .decode(type: T.Response.self, decoder: JSONDecoder())
            .mapError { error in
                if let apiError = error as? APIError {
                    return apiError
                } else if let decodingError = error as? DecodingError {
                    return APIError.decodingError(decodingError)
                } else {
                    return APIError.networkError(error)
                }
            }
            .receive(on: DispatchQueue.main)
            .eraseToAnyPublisher()
    }
}

// Example API Request
struct PlaceOrderRequest: APIRequest {
    typealias Response = OrderResponse
    
    let path = "/orders"
    let method = HTTPMethod.post
    let body: Data?
    let headers = ["Content-Type": "application/json"]
    
    init(order: Order) {
        self.body = try? JSONEncoder().encode(order)
    }
}

struct OrderResponse: Decodable {
    let orderId: String
    let status: String
    let message: String
}
```

---

### WebSocket Manager

```swift
// WebSocketManager.swift
import Foundation
import Combine

class WebSocketManager: ObservableObject {
    @Published var isConnected = false
    @Published var latestPrice: [String: Double] = [:]
    
    private var webSocket: URLSessionWebSocketTask?
    private var cancellables = Set<AnyCancellable>()
    private let url: URL
    private var subscriptions: Set<String> = []
    
    init(url: URL) {
        self.url = url
    }
    
    func connect() {
        guard let token = KeychainManager.shared.getToken() else {
            print("No auth token found")
            return
        }
        
        var urlComponents = URLComponents(url: url, resolvingAgainstBaseURL: true)!
        urlComponents.queryItems = [
            URLQueryItem(name: "token", value: token),
            URLQueryItem(name: "userId", value: UserDefaults.standard.string(forKey: "userId"))
        ]
        
        let session = URLSession(configuration: .default)
        webSocket = session.webSocketTask(with: urlComponents.url!)
        webSocket?.resume()
        
        isConnected = true
        
        // Start receiving messages
        receiveMessage()
        
        // Start heartbeat
        startHeartbeat()
    }
    
    func disconnect() {
        webSocket?.cancel(with: .goingAway, reason: nil)
        isConnected = false
    }
    
    func subscribe(to channel: String) {
        guard isConnected else { return }
        
        subscriptions.insert(channel)
        
        let message = [
            "type": "subscribe",
            "channel": channel
        ]
        
        sendMessage(message)
    }
    
    func unsubscribe(from channel: String) {
        subscriptions.remove(channel)
        
        let message = [
            "type": "unsubscribe",
            "channel": channel
        ]
        
        sendMessage(message)
    }
    
    private func sendMessage(_ message: [String: String]) {
        guard let data = try? JSONSerialization.data(withJSONObject: message),
              let string = String(data: data, encoding: .utf8) else {
            return
        }
        
        let message = URLSessionWebSocketTask.Message.string(string)
        webSocket?.send(message) { error in
            if let error = error {
                print("WebSocket send error: \(error)")
            }
        }
    }
    
    private func receiveMessage() {
        webSocket?.receive { [weak self] result in
            switch result {
            case .success(let message):
                switch message {
                case .string(let text):
                    self?.handleMessage(text)
                case .data(let data):
                    if let text = String(data: data, encoding: .utf8) {
                        self?.handleMessage(text)
                    }
                @unknown default:
                    break
                }
                
                // Continue receiving
                self?.receiveMessage()
                
            case .failure(let error):
                print("WebSocket receive error: \(error)")
                self?.isConnected = false
                
                // Attempt reconnection after 2 seconds
                DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                    self?.connect()
                }
            }
        }
    }
    
    private func handleMessage(_ text: String) {
        guard let data = text.data(using: .utf8),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return
        }
        
        if let type = json["type"] as? String, type == "pong" {
            return
        }
        
        if let channel = json["channel"] as? String,
           let messageData = json["data"] as? [String: Any] {
            
            // Handle price updates
            if channel.starts(with: "prices:") {
                if let symbol = channel.split(separator: ":").last.map(String.init),
                   let price = messageData["price"] as? Double {
                    DispatchQueue.main.async {
                        self.latestPrice[symbol] = price
                    }
                }
            }
            
            // Handle other message types...
        }
    }
    
    private func startHeartbeat() {
        Timer.publish(every: 30, on: .main, in: .common)
            .autoconnect()
            .sink { [weak self] _ in
                self?.sendMessage(["type": "ping"])
            }
            .store(in: &cancellables)
    }
}
```

---

### Trading View with SwiftUI

```swift
// TradingView.swift
import SwiftUI
import Charts

struct TradingView: View {
    @StateObject private var viewModel = TradingViewModel()
    @State private var selectedSymbol = "XAUUSD"
    @State private var showOrderTicket = false
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header with symbol picker
                symbolPicker
                
                // Price display
                priceCard
                
                // Chart
                chartView
                
                // Quick actions
                quickActions
                
                // Order book
                orderBookView
                
                // Recent trades
                recentTradesView
            }
            .padding()
        }
        .background(Color.background)
        .navigationTitle("Trading")
        .sheet(isPresented: $showOrderTicket) {
            OrderTicketView(symbol: selectedSymbol)
        }
        .onAppear {
            viewModel.subscribeToPrice(symbol: selectedSymbol)
        }
    }
    
    private var symbolPicker: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 12) {
                ForEach(viewModel.symbols, id: \.self) { symbol in
                    SymbolChip(
                        symbol: symbol,
                        isSelected: symbol == selectedSymbol,
                        onTap: {
                            selectedSymbol = symbol
                            viewModel.subscribeToPrice(symbol: symbol)
                        }
                    )
                }
            }
        }
    }
    
    private var priceCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(selectedSymbol)
                    .font(.title2)
                    .fontWeight(.bold)
                
                Spacer()
                
                // Live indicator
                HStack(spacing: 4) {
                    Circle()
                        .fill(Color.green)
                        .frame(width: 8, height: 8)
                    Text("LIVE")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            
            if let price = viewModel.currentPrice {
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text("$\(price, specifier: "%.2f")")
                        .font(.system(size: 42, weight: .bold, design: .rounded))
                    
                    if let change = viewModel.priceChange {
                        HStack(spacing: 4) {
                            Image(systemName: change >= 0 ? "arrow.up.right" : "arrow.down.right")
                            Text("\(abs(change), specifier: "%.2f")%")
                        }
                        .font(.headline)
                        .foregroundColor(change >= 0 ? .green : .red)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(
                            RoundedRectangle(cornerRadius: 8)
                                .fill((change >= 0 ? Color.green : Color.red).opacity(0.1))
                        )
                    }
                }
            } else {
                ProgressView()
            }
            
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("BID")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text("$\(viewModel.bid ?? 0, specifier: "%.2f")")
                        .font(.headline)
                }
                
                Spacer()
                
                VStack(alignment: .trailing, spacing: 4) {
                    Text("ASK")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Text("$\(viewModel.ask ?? 0, specifier: "%.2f")")
                        .font(.headline)
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color.cardBackground)
                .shadow(color: .black.opacity(0.1), radius: 10)
        )
    }
    
    private var chartView: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Chart")
                .font(.headline)
            
            // Chart using Swift Charts
            Chart(viewModel.priceHistory) { dataPoint in
                LineMark(
                    x: .value("Time", dataPoint.timestamp),
                    y: .value("Price", dataPoint.price)
                )
                .foregroundStyle(Color.accentColor)
                .interpolationMethod(.catmullRom)
                
                AreaMark(
                    x: .value("Time", dataPoint.timestamp),
                    y: .value("Price", dataPoint.price)
                )
                .foregroundStyle(
                    LinearGradient(
                        colors: [Color.accentColor.opacity(0.3), Color.clear],
                        startPoint: .top,
                        endPoint: .bottom
                    )
                )
                .interpolationMethod(.catmullRom)
            }
            .frame(height: 250)
            .chartXAxis(.hidden)
            .chartYAxis {
                AxisMarks(position: .trailing)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color.cardBackground)
        )
    }
    
    private var quickActions: some View {
        HStack(spacing: 12) {
            Button(action: {
                showOrderTicket = true
                viewModel.prepareOrder(side: .buy)
            }) {
                HStack {
                    Image(systemName: "arrow.up.circle.fill")
                    Text("BUY")
                        .fontWeight(.semibold)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.green)
                .foregroundColor(.white)
                .cornerRadius(12)
            }
            
            Button(action: {
                showOrderTicket = true
                viewModel.prepareOrder(side: .sell)
            }) {
                HStack {
                    Image(systemName: "arrow.down.circle.fill")
                    Text("SELL")
                        .fontWeight(.semibold)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.red)
                .foregroundColor(.white)
                .cornerRadius(12)
            }
        }
    }
    
    private var orderBookView: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Order Book")
                .font(.headline)
            
            HStack(spacing: 0) {
                // Bids
                VStack(alignment: .leading, spacing: 4) {
                    ForEach(viewModel.bids.prefix(5), id: \.price) { bid in
                        HStack {
                            Text("$\(bid.price, specifier: "%.2f")")
                                .font(.caption)
                                .foregroundColor(.green)
                            Spacer()
                            Text("\(bid.quantity, specifier: "%.2f")")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .frame(maxWidth: .infinity)
                
                Divider()
                
                // Asks
                VStack(alignment: .leading, spacing: 4) {
                    ForEach(viewModel.asks.prefix(5), id: \.price) { ask in
                        HStack {
                            Text("$\(ask.price, specifier: "%.2f")")
                                .font(.caption)
                                .foregroundColor(.red)
                            Spacer()
                            Text("\(ask.quantity, specifier: "%.2f")")
                                .font(.caption)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                .frame(maxWidth: .infinity)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color.cardBackground)
        )
    }
    
    private var recentTradesView: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Recent Trades")
                .font(.headline)
            
            ForEach(viewModel.recentTrades.prefix(10)) { trade in
                HStack {
                    Text(trade.timestamp, style: .time)
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Text("$\(trade.price, specifier: "%.2f")")
                        .font(.caption)
                        .foregroundColor(trade.side == .buy ? .green : .red)
                    
                    Spacer()
                    
                    Text("\(trade.quantity, specifier: "%.2f")")
                        .font(.caption)
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color.cardBackground)
        )
    }
}
```

---

### Trading ViewModel

```swift
// TradingViewModel.swift
import Foundation
import Combine

class TradingViewModel: ObservableObject {
    @Published var currentPrice: Double?
    @Published var priceChange: Double?
    @Published var bid: Double?
    @Published var ask: Double?
    @Published var priceHistory: [PriceDataPoint] = []
    @Published var bids: [OrderBookEntry] = []
    @Published var asks: [OrderBookEntry] = []
    @Published var recentTrades: [Trade] = []
    
    let symbols = ["XAUUSD", "BTCUSD", "ETHUSD", "EURUSD"]
    
    private var webSocketManager: WebSocketManager?
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        setupWebSocket()
    }
    
    private func setupWebSocket() {
        let url = URL(string: "wss://ws.terralabs.com")!
        webSocketManager = WebSocketManager(url: url)
        webSocketManager?.connect()
        
        // Observe price updates
        webSocketManager?.$latestPrice
            .sink { [weak self] prices in
                self?.handlePriceUpdate(prices)
            }
            .store(in: &cancellables)
    }
    
    func subscribeToPrice(symbol: String) {
        webSocketManager?.subscribe(to: "prices:\(symbol)")
        fetchPriceHistory(symbol: symbol)
        fetchOrderBook(symbol: symbol)
    }
    
    private func handlePriceUpdate(_ prices: [String: Double]) {
        if let price = prices.values.first {
            currentPrice = price
            
            // Calculate price change
            if let lastPrice = priceHistory.last?.price {
                priceChange = ((price - lastPrice) / lastPrice) * 100
            }
            
            // Add to history
            priceHistory.append(PriceDataPoint(timestamp: Date(), price: price))
            
            // Keep only last 100 points
            if priceHistory.count > 100 {
                priceHistory.removeFirst()
            }
        }
    }
    
    private func fetchPriceHistory(symbol: String) {
        // API call to fetch historical prices
        // ...
    }
    
    private func fetchOrderBook(symbol: String) {
        // API call to fetch order book
        // ...
    }
    
    func prepareOrder(side: OrderSide) {
        // Prepare order with current price
    }
}

struct PriceDataPoint: Identifiable {
    let id = UUID()
    let timestamp: Date
    let price: Double
}

struct OrderBookEntry {
    let price: Double
    let quantity: Double
}
```

---

## Android Application (Kotlin + Jetpack Compose)

### Project Structure
```
com.terralabs.trading/
├── TerralabsApp.kt
├── MainActivity.kt
├── core/
│   ├── network/
│   │   ├── ApiClient.kt
│   │   ├── WebSocketManager.kt
│   │   └── ApiService.kt
│   ├── storage/
│   │   ├── PreferencesManager.kt
│   │   ├── DatabaseManager.kt
│   │   └── SecureStorage.kt
│   ├── auth/
│   │   ├── AuthManager.kt
│   │   └── BiometricAuthManager.kt
│   └── di/
│       ├── NetworkModule.kt
│       ├── RepositoryModule.kt
│       └── ViewModelModule.kt
├── data/
│   ├── models/
│   │   ├── User.kt
│   │   ├── Trade.kt
│   │   ├── Position.kt
│   │   └── Order.kt
│   ├── repositories/
│   │   ├── TradingRepository.kt
│   │   ├── PortfolioRepository.kt
│   │   └── UserRepository.kt
│   └── local/
│       ├── dao/
│       └── entities/
├── domain/
│   ├── usecases/
│   │   ├── PlaceOrderUseCase.kt
│   │   ├── GetPortfolioUseCase.kt
│   │   └── SubscribeToPriceUseCase.kt
│   └── models/
├── ui/
│   ├── theme/
│   │   ├── Color.kt
│   │   ├── Theme.kt
│   │   └── Type.kt
│   ├── components/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── charts/
│   │   └── forms/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.kt
│   │   │   └── SignUpScreen.kt
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.kt
│   │   ├── trading/
│   │   │   ├── TradingScreen.kt
│   │   │   ├── OrderTicketSheet.kt
│   │   │   └── ChartView.kt
│   │   ├── portfolio/
│   │   │   ├── PortfolioScreen.kt
│   │   │   └── PositionsListScreen.kt
│   │   └── settings/
│   │       └── SettingsScreen.kt
│   └── navigation/
│       └── NavGraph.kt
└── util/
    ├── Extensions.kt
    ├── Constants.kt
    └── Utils.kt
```

---

### Network Layer (Kotlin)

```kotlin
// ApiClient.kt
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object ApiClient {
    private const val BASE_URL = "https://api.terralabs.com/v1/"
    
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }
    
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .addInterceptor { chain ->
            val original = chain.request()
            val requestBuilder = original.newBuilder()
            
            // Add auth token
            SecureStorage.getToken()?.let { token ->
                requestBuilder.header("Authorization", "Bearer $token")
            }
            
            requestBuilder.header("Content-Type", "application/json")
            
            val request = requestBuilder.build()
            chain.proceed(request)
        }
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()
    
    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    
    val apiService: ApiService = retrofit.create(ApiService::class.java)
}

// ApiService.kt
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
    
    @POST("orders")
    suspend fun placeOrder(@Body order: Order): Response<OrderResponse>
    
    @GET("portfolio/{userId}")
    suspend fun getPortfolio(@Path("userId") userId: String): Response<Portfolio>
    
    @GET("positions/{userId}")
    suspend fun getPositions(@Path("userId") userId: String): Response<List<Position>>
    
    @GET("trades/{userId}")
    suspend fun getTrades(
        @Path("userId") userId: String,
        @Query("limit") limit: Int = 100
    ): Response<List<Trade>>
    
    @GET("market/quotes/{symbol}")
    suspend fun getQuote(@Path("symbol") symbol: String): Response<Quote>
    
    @GET("market/history/{symbol}")
    suspend fun getPriceHistory(
        @Path("symbol") symbol: String,
        @Query("period") period: String
    ): Response<List<PriceDataPoint>>
}

// Data classes
data class LoginRequest(
    val email: String,
    val password: String
)

data class LoginResponse(
    val token: String,
    val userId: String,
    val user: User
)

data class Order(
    val symbol: String,
    val side: String, // "buy" or "sell"
    val orderType: String, // "market", "limit", etc.
    val quantity: Double,
    val price: Double? = null,
    val stopLoss: Double? = null,
    val takeProfit: Double? = null
)

data class OrderResponse(
    val orderId: String,
    val status: String,
    val message: String
)
```

---

### WebSocket Manager (Kotlin)

```kotlin
// WebSocketManager.kt
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import okhttp3.*
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class WebSocketManager {
    private val client = OkHttpClient.Builder()
        .pingInterval(30, TimeUnit.SECONDS)
        .build()
    
    private var webSocket: WebSocket? = null
    
    private val _isConnected = MutableStateFlow(false)
    val isConnected: StateFlow<Boolean> = _isConnected
    
    private val _latestPrices = MutableStateFlow<Map<String, Double>>(emptyMap())
    val latestPrices: StateFlow<Map<String, Double>> = _latestPrices
    
    private val subscriptions = mutableSetOf<String>()
    
    fun connect(token: String, userId: String) {
        val url = "wss://ws.terralabs.com?token=$token&userId=$userId"
        
        val request = Request.Builder()
            .url(url)
            .build()
        
        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                _isConnected.value = true
                println("WebSocket connected")
            }
            
            override fun onMessage(webSocket: WebSocket, text: String) {
                handleMessage(text)
            }
            
            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                _isConnected.value = false
                println("WebSocket error: ${t.message}")
                
                // Attempt reconnection after 2 seconds
                Thread.sleep(2000)
                connect(token, userId)
            }
            
            override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                _isConnected.value = false
                println("WebSocket closed: $reason")
            }
        })
    }
    
    fun subscribe(channel: String) {
        subscriptions.add(channel)
        
        val message = JSONObject().apply {
            put("type", "subscribe")
            put("channel", channel)
        }
        
        webSocket?.send(message.toString())
    }
    
    fun unsubscribe(channel: String) {
        subscriptions.remove(channel)
        
        val message = JSONObject().apply {
            put("type", "unsubscribe")
            put("channel", channel)
        }
        
        webSocket?.send(message.toString())
    }
    
    fun disconnect() {
        webSocket?.close(1000, "Client disconnect")
        _isConnected.value = false
    }
    
    private fun handleMessage(text: String) {
        try {
            val json = JSONObject(text)
            val type = json.optString("type")
            
            if (type == "pong") return
            
            val channel = json.optString("channel")
            val data = json.optJSONObject("data")
            
            // Handle price updates
            if (channel.startsWith("prices:") && data != null) {
                val symbol = channel.substringAfter("prices:")
                val price = data.optDouble("price")
                
                if (price > 0) {
                    val currentPrices = _latestPrices.value.toMutableMap()
                    currentPrices[symbol] = price
                    _latestPrices.value = currentPrices
                }
            }
            
            // Handle other message types...
            
        } catch (e: Exception) {
            println("Error parsing WebSocket message: ${e.message}")
        }
    }
}
```

---

### Trading Screen (Jetpack Compose)

```kotlin
// TradingScreen.kt
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun TradingScreen(
    viewModel: TradingViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    var showOrderTicket by remember { mutableStateOf(false) }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Trading") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Symbol picker
            item {
                SymbolPicker(
                    symbols = uiState.symbols,
                    selectedSymbol = uiState.selectedSymbol,
                    onSymbolSelected = { viewModel.selectSymbol(it) }
                )
            }
            
            // Price card
            item {
                PriceCard(
                    symbol = uiState.selectedSymbol,
                    currentPrice = uiState.currentPrice,
                    priceChange = uiState.priceChange,
                    bid = uiState.bid,
                    ask = uiState.ask
                )
            }
            
            // Chart
            item {
                ChartCard(
                    priceHistory = uiState.priceHistory
                )
            }
            
            // Quick actions
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Button(
                        onClick = {
                            viewModel.prepareOrder(OrderSide.BUY)
                            showOrderTicket = true
                        },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFF10B981)
                        )
                    ) {
                        Text("BUY", modifier = Modifier.padding(8.dp))
                    }
                    
                    Button(
                        onClick = {
                            viewModel.prepareOrder(OrderSide.SELL)
                            showOrderTicket = true
                        },
                        modifier = Modifier.weight(1f),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFEF4444)
                        )
                    ) {
                        Text("SELL", modifier = Modifier.padding(8.dp))
                    }
                }
            }
            
            // Order book
            item {
                OrderBookCard(
                    bids = uiState.bids,
                    asks = uiState.asks
                )
            }
            
            // Recent trades
            item {
                RecentTradesCard(
                    trades = uiState.recentTrades
                )
            }
        }
    }
    
    // Order ticket bottom sheet
    if (showOrderTicket) {
        OrderTicketSheet(
            onDismiss = { showOrderTicket = false },
            onConfirm = { order ->
                viewModel.placeOrder(order)
                showOrderTicket = false
            }
        )
    }
}

@Composable
fun SymbolPicker(
    symbols: List<String>,
    selectedSymbol: String,
    onSymbolSelected: (String) -> Unit
) {
    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(symbols) { symbol ->
            FilterChip(
                selected = symbol == selectedSymbol,
                onClick = { onSymbolSelected(symbol) },
                label = { Text(symbol) }
            )
        }
    }
}

@Composable
fun PriceCard(
    symbol: String,
    currentPrice: Double?,
    priceChange: Double?,
    bid: Double?,
    ask: Double?
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = symbol,
                    style = MaterialTheme.typography.headlineSmall
                )
                
                // Live indicator
                Row(
                    horizontalArrangement = Arrangement.spacedBy(4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .background(Color(0xFF10B981), shape = MaterialTheme.shapes.extraLarge)
                    )
                    Text(
                        text = "LIVE",
                        style = MaterialTheme.typography.labelSmall
                    )
                }
            }
            
            currentPrice?.let { price ->
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.Bottom
                ) {
                    Text(
                        text = "$${"%.2f".format(price)}",
                        style = MaterialTheme.typography.displayMedium
                    )
                    
                    priceChange?.let { change ->
                        Surface(
                            color = if (change >= 0) Color(0xFF10B981) else Color(0xFFEF4444),
                            shape = MaterialTheme.shapes.small
                        ) {
                            Text(
                                text = "${if (change >= 0) "+" else ""}${"%.2f".format(change)}%",
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
                                color = Color.White
                            )
                        }
                    }
                }
            }
            
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Column {
                    Text(
                        text = "BID",
                        style = MaterialTheme.typography.labelSmall
                    )
                    Text(
                        text = "$${"%.2f".format(bid ?: 0.0)}",
                        style = MaterialTheme.typography.titleMedium
                    )
                }
                
                Column(horizontalAlignment = Alignment.End) {
                    Text(
                        text = "ASK",
                        style = MaterialTheme.typography.labelSmall
                    )
                    Text(
                        text = "$${"%.2f".format(ask ?: 0.0)}",
                        style = MaterialTheme.typography.titleMedium
                    )
                }
            }
        }
    }
}
```

---

I need to continue with the remaining sections. Let me create Part 4...
