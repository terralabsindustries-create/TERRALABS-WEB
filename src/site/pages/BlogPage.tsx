export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Gold Session Map: Asia, London, NY—Why It Matters",
      excerpt: "Understanding global trading sessions is crucial for XAU/USD timing. We break down volatility patterns, liquidity flows, and optimal entry points across major financial centers.",
      category: "Market Notes",
      readTime: "8 min read",
      date: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Drawdown Discipline: Living Under a Daily Risk Budget",
      excerpt: "How we implement and enforce daily drawdown limits to protect capital. Real examples of risk management in action during volatile market conditions.",
      category: "Playbooks",
      readTime: "6 min read",
      date: "Dec 10, 2024"
    },
    {
      id: 3,
      title: "What Is a Regime Switch (And Why We Care)",
      excerpt: "Regime switching models detect fundamental changes in market behavior. Learn how our framework identifies and adapts to these critical transitions.",
      category: "Education",
      readTime: "10 min read",
      date: "Dec 5, 2024"
    },
    {
      id: 4,
      title: "How We Route Orders (FIX vs REST)",
      excerpt: "Deep dive into our execution infrastructure: when we use FIX Protocol vs REST APIs, latency optimization, and smart order routing decisions.",
      category: "Releases",
      readTime: "12 min read",
      date: "Nov 28, 2024"
    },
    {
      id: 5,
      title: "Gold Volatility Clustering: Statistical Patterns That Matter",
      excerpt: "Volatility isn't random—it clusters. We explore how our algorithms detect and capitalize on volatility patterns in XAU/USD markets.",
      category: "Market Notes",
      readTime: "9 min read",
      date: "Nov 20, 2024"
    },
    {
      id: 6,
      title: "Risk-Reward Ratios: Why Win Rate Isn't Everything",
      excerpt: "A 45% win rate can be more profitable than 70%. Understanding the mathematics of risk-reward optimization in systematic trading.",
      category: "Education",
      readTime: "7 min read",
      date: "Nov 15, 2024"
    }
  ];

  const categories = ["All", "Market Notes", "Playbooks", "Education", "Releases"];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">INSIGHTS & EDUCATION</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Market Insights</span>
            <span className="title-line">& Education</span>
          </h1>
          
          <p className="page-subtitle">Deep dives into gold trading, quantitative analysis, and systematic trading strategies from our team.</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="content-section">
        <div className="section-content">
          {/* Category Filter */}
          <div className="blog-filters">
            {categories.map((category) => (
              <button key={category} className="filter-btn active">
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="featured-post">
            <div className="post-content">
              <div className="post-meta">
                <span className="post-category featured">Featured</span>
                <span className="post-date">Dec 15, 2024</span>
              </div>
              <h2 className="post-title">The Gold Session Map: Asia, London, NY—Why It Matters</h2>
              <p className="post-excerpt">
                Understanding global trading sessions is crucial for XAU/USD timing. Different sessions bring unique characteristics: Asia's range-bound behavior, London's breakout tendencies, and New York's momentum continuation. We analyze two years of data to show you exactly when gold moves—and when it doesn't.
              </p>
              <div className="post-footer">
                <div className="post-author">
                  <div className="author-avatar">J</div>
                  <span className="author-name">Joe</span>
                </div>
                <span className="read-time">8 min read</span>
              </div>
            </div>
            <div className="post-visual">
              <div className="chart-placeholder">
                <div className="chart-title">XAU/USD Volatility by Session</div>
                <svg viewBox="0 0 300 150" className="mini-chart">
                  <defs>
                    <linearGradient id="volatilityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#ffd700" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M 20 120 L 60 100 L 100 60 L 140 80 L 180 40 L 220 70 L 260 90 L 280 110" 
                        stroke="#ffd700" strokeWidth="2" fill="none"/>
                  <path d="M 20 120 L 60 100 L 100 60 L 140 80 L 180 40 L 220 70 L 260 90 L 280 110 L 280 150 L 20 150 Z" 
                        fill="url(#volatilityGradient)"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="card-header">
                  <div className="post-meta">
                    <span className={`post-category ${post.category.toLowerCase().replace(' ', '-')}`}>
                      {post.category}
                    </span>
                    <span className="post-date">{post.date}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                </div>
                <div className="card-footer">
                  <span className="read-time">{post.readTime}</span>
                  <a href="#" className="read-more">Read More →</a>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>Get our latest market insights and trading education delivered to your inbox.</p>
              <div className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  Subscribe
                  <svg className="button-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="newsletter-note">Weekly insights. No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Topics We Cover */}
          <div className="blog-topics">
            <h2 className="section-title">Topics We Cover</h2>
            <div className="topics-grid">
              <div className="topic-card">
                <div className="topic-icon">📊</div>
                <h3>Market Analysis</h3>
                <p>Gold market structure, session patterns, and volatility analysis</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🧮</div>
                <h3>Quantitative Methods</h3>
                <p>Statistical models, regime detection, and algorithmic strategies</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">🛡️</div>
                <h3>Risk Management</h3>
                <p>Position sizing, drawdown control, and portfolio optimization</p>
              </div>
              <div className="topic-card">
                <div className="topic-icon">⚡</div>
                <h3>Execution</h3>
                <p>Order routing, latency optimization, and infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}