export default function RiskPage() {
  return (
    <div className="page-container legal-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">LEGAL</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Risk Disclosure</span>
          </h1>
          
          <p className="page-subtitle">Important information about trading risks - please read carefully</p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="content-section">
        <div className="section-content legal-content">
          <div className="risk-warning-box">
            <h2>⚠️ Important Risk Warning</h2>
            <p>
              <strong>Trading derivatives and leveraged products involves substantial risk of loss and may not be suitable for all investors.</strong> 
              You should carefully consider whether trading is appropriate for you in light of your experience, objectives, 
              financial resources, and other relevant circumstances.
            </p>
          </div>

          <div className="legal-section">
            <h2>1. General Trading Risks</h2>
            
            <h3>Market Risk</h3>
            <p>
              Financial markets are inherently volatile and unpredictable. Price movements can be rapid and substantial, 
              potentially resulting in significant losses. Market conditions can change quickly due to:
            </p>
            <ul>
              <li>Economic events and announcements</li>
              <li>Political developments and instability</li>
              <li>Central bank policy changes</li>
              <li>Natural disasters and force majeure events</li>
              <li>Market sentiment and speculation</li>
            </ul>

            <h3>Leverage Risk</h3>
            <p>
              Trading with leverage amplifies both potential profits and potential losses. A small adverse price movement 
              can result in losses that exceed your initial investment. You could lose more than your account balance.
            </p>

            <h3>Liquidity Risk</h3>
            <p>
              Markets may become illiquid, making it difficult or impossible to execute trades at desired prices. 
              This can occur during:
            </p>
            <ul>
              <li>Market openings and closings</li>
              <li>Major news events</li>
              <li>Low trading volume periods</li>
              <li>Technical disruptions</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>2. XAU/USD Specific Risks</h2>
            
            <h3>Gold Market Characteristics</h3>
            <p>
              Gold (XAU/USD) trading presents specific risks:
            </p>
            <ul>
              <li><strong>Volatility:</strong> Gold prices can be extremely volatile, especially during economic uncertainty</li>
              <li><strong>Dollar Correlation:</strong> Strong inverse correlation with USD can amplify price movements</li>
              <li><strong>Session Gaps:</strong> Price gaps between trading sessions can result in significant losses</li>
              <li><strong>Central Bank Actions:</strong> Gold reserves and policy changes can cause dramatic price shifts</li>
            </ul>

            <h3>Spread and Slippage</h3>
            <p>
              The difference between bid and ask prices (spread) and execution price differences (slippage) 
              can significantly impact trading performance, especially during volatile periods.
            </p>
          </div>

          <div className="legal-section">
            <h2>3. Algorithmic Trading Risks</h2>
            
            <h3>System Failures</h3>
            <p>
              Automated trading systems can fail due to:
            </p>
            <ul>
              <li>Technical malfunctions or software bugs</li>
              <li>Internet connectivity issues</li>
              <li>Power outages or hardware failures</li>
              <li>Broker system downtime</li>
              <li>Market data feed interruptions</li>
            </ul>

            <h3>Model Risk</h3>
            <p>
              Our Adaptive Intelligence Framework, like all trading models, has inherent limitations:
            </p>
            <ul>
              <li>Models are based on historical data and may not predict future performance</li>
              <li>Market regime changes can render models less effective</li>
              <li>Overfitting to historical data may not capture future market dynamics</li>
              <li>Black swan events may not be accounted for in model design</li>
            </ul>

            <h3>Execution Risk</h3>
            <p>
              Automated execution may result in:
            </p>
            <ul>
              <li>Orders executed at unfavorable prices</li>
              <li>Partial fills or order rejections</li>
              <li>Delays in order processing</li>
              <li>Incorrect position sizing</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. Performance Disclaimers</h2>
            
            <div className="disclaimer-box">
              <h3>Past Performance Warning</h3>
              <p>
                <strong>Past performance is not indicative of future results.</strong> Historical performance figures 
                are provided for illustrative purposes only and should not be relied upon as an indication of 
                future performance.
              </p>
            </div>

            <h3>Hypothetical Performance</h3>
            <p>
              Hypothetical performance results have limitations:
            </p>
            <ul>
              <li>Do not represent actual trading and may not reflect market liquidity constraints</li>
              <li>Are generally prepared with the benefit of hindsight</li>
              <li>Do not account for all trading costs and fees</li>
              <li>May not reflect actual slippage and execution conditions</li>
            </ul>

            <h3>Individual Results May Vary</h3>
            <p>
              Your actual trading results may differ significantly from displayed performance due to:
            </p>
            <ul>
              <li>Different broker spreads and commissions</li>
              <li>Varying account sizes and risk parameters</li>
              <li>Different execution timing and market conditions</li>
              <li>Individual risk management decisions</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Regulatory and Compliance Risks</h2>
            
            <h3>Regulatory Changes</h3>
            <p>
              Changes in regulations could affect:
            </p>
            <ul>
              <li>Availability of trading services</li>
              <li>Leverage limits and margin requirements</li>
              <li>Tax treatment of trading activities</li>
              <li>Reporting and compliance obligations</li>
            </ul>

            <h3>Broker Risk</h3>
            <p>
              Your funds are held with third-party brokers, which presents risks including:
            </p>
            <ul>
              <li>Broker insolvency or bankruptcy</li>
              <li>Regulatory actions against the broker</li>
              <li>Changes in broker terms and conditions</li>
              <li>Technical issues with broker platforms</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>6. Tax Implications</h2>
            <p>
              Trading activities may have tax implications that vary by jurisdiction. You are responsible for:
            </p>
            <ul>
              <li>Understanding your local tax obligations</li>
              <li>Maintaining accurate trading records</li>
              <li>Reporting trading income and losses</li>
              <li>Seeking professional tax advice as needed</li>
            </ul>
            <p>
              <strong>Important:</strong> We do not provide tax advice. Consult with a qualified tax professional 
              regarding the tax implications of your trading activities.
            </p>
          </div>

          <div className="legal-section">
            <h2>7. Suitability Assessment</h2>
            <p>
              Before using our service, you should consider:
            </p>
            <ul>
              <li>Your investment objectives and risk tolerance</li>
              <li>Your financial situation and ability to bear losses</li>
              <li>Your knowledge and experience with financial markets</li>
              <li>Whether you can afford to lose your entire investment</li>
            </ul>
            
            <div className="suitability-warning">
              <p>
                <strong>Trading is not suitable for everyone.</strong> If you cannot afford to lose your entire investment, 
                you should not trade. If you are unsure about the risks involved, seek independent financial advice.
              </p>
            </div>
          </div>

          <div className="legal-section">
            <h2>8. No Investment Advice</h2>
            <p>
              Our services do not constitute investment advice or recommendations. We provide:
            </p>
            <ul>
              <li>Algorithmic trading signals based on technical analysis</li>
              <li>Risk management tools and controls</li>
              <li>Performance analytics and reporting</li>
            </ul>
            <p>
              <strong>All trading decisions remain your responsibility.</strong> You should not rely solely on our 
              signals and should conduct your own analysis before making trading decisions.
            </p>
          </div>

          <div className="legal-section">
            <h2>9. Acknowledgment</h2>
            <p>
              By using our service, you acknowledge that you have read, understood, and accept all the risks 
              described in this disclosure. You confirm that:
            </p>
            <ul>
              <li>You understand the risks involved in trading</li>
              <li>You are trading with risk capital only</li>
              <li>You will not hold us liable for any trading losses</li>
              <li>You will comply with all applicable laws and regulations</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>10. Contact Information</h2>
            <p>
              If you have questions about these risk disclosures, please contact us:
            </p>
            <div className="contact-info">
              <p>Email: risk@aurelius.com</p>
              <p>Compliance Officer: compliance@aurelius.com</p>
              <p>Address: Terralabs Industries, Dubai, UAE</p>
            </div>
          </div>

          <div className="legal-footer">
            <p><strong>Effective Date:</strong> December 1, 2024</p>
            <p><strong>Version:</strong> 1.0</p>
            <p className="final-warning">
              <strong>Remember: Trading involves substantial risk of loss. Only trade with money you can afford to lose.</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}