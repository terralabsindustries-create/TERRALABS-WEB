import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, AlertTriangle, TrendingDown, DollarSign, ChevronUp } from 'lucide-react';
import '../../../styles/globals.css';
import '../../../styles/legal.css';

interface RiskDisclosureProps {
  onBack: () => void;
}

export function RiskDisclosure({ onBack }: RiskDisclosureProps) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add swipe-back gesture for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = () => {
      // Detect swipe from left edge (within first 50px)
      if (touchStartX.current < 50) {
        const swipeDistance = touchEndX.current - touchStartX.current;
        // If swiped right more than 100px, go back
        if (swipeDistance > 100) {
          onBack();
        }
      }
    };
    
    // Show/hide back to top button based on scroll position
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onBack]);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="legal-document-page">
      <div className="legal-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="legal-header-content">
          <AlertTriangle size={48} style={{ color: '#FF5C39', display: 'block', margin: '0 auto' }} />
          <h1>Risk Disclosure Agreement</h1>
          <p className="legal-subtitle">TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
          <p className="legal-date">Last Updated: December 28, 2025</p>
          <p className="legal-jurisdiction">UAE Financial Services Regulatory Disclosure</p>
        </div>
      </div>

      <div className="legal-content">
        <div className="legal-notice critical">
          <AlertTriangle size={24} />
          <div>
            <strong>⚠️ CRITICAL RISK WARNING ⚠️</strong>
            <p><strong>TRADING IN FOREIGN EXCHANGE (FOREX), GOLD (XAU/USD), AND DERIVATIVES INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR ALL INVESTORS. YOU MAY LOSE YOUR ENTIRE INVESTMENT.</strong></p>
            <p>By using our Software, you acknowledge that you have read, understood, and accepted all risks described in this document.</p>
          </div>
        </div>

        <section className="legal-section">
          <h2>1. ACKNOWLEDGMENT OF RISKS</h2>
          <p>By subscribing to and using the Pythagoras Stardust™ (XAU/USD gold trading engine) software (collectively, the "Software"), you explicitly acknowledge and accept the following risks:</p>
        </section>

        <section className="legal-section">
          <h2>2. GENERAL TRADING RISKS</h2>
          
          <h3>2.1 Risk of Loss</h3>
          <p><strong>YOU CAN LOSE MORE THAN YOUR INITIAL INVESTMENT.</strong></p>
          <ul>
            <li>Forex and derivatives trading involves high leverage, which magnifies both profits AND losses;</li>
            <li>Market volatility can result in rapid and substantial losses;</li>
            <li>You may lose your entire trading capital;</li>
            <li>In leveraged accounts, losses may exceed your initial deposit;</li>
            <li>You may be required to deposit additional funds to maintain positions (margin calls).</li>
          </ul>

          <h3>2.2 Leverage Risk</h3>
          <p>Leverage (borrowing capital from your broker) can amplify losses exponentially:</p>
          <ul>
            <li>A small adverse price movement can result in total loss of invested capital;</li>
            <li>Higher leverage ratios (e.g., 1:100, 1:500) increase risk proportionally;</li>
            <li>Leverage is a double-edged sword: it magnifies gains but also magnifies losses;</li>
            <li><strong>We do not control leverage settings—these are set by your broker.</strong></li>
          </ul>

          <h3>2.3 Market Risk</h3>
          <ul>
            <li>Financial markets are inherently unpredictable;</li>
            <li>Past performance does NOT guarantee future results;</li>
            <li>Market conditions can change rapidly and without warning;</li>
            <li>Economic events, geopolitical tensions, and central bank policies can cause extreme volatility;</li>
            <li>Markets can experience "gap" movements where prices jump significantly between trading sessions.</li>
          </ul>

          <h3>2.4 Liquidity Risk</h3>
          <ul>
            <li>During volatile periods, liquidity may dry up, making it impossible to exit positions;</li>
            <li>You may be unable to close losing trades at desired prices;</li>
            <li>Stop-loss orders may not execute at specified prices (slippage);</li>
            <li>Brokers may widen spreads during high volatility, increasing trading costs.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. AUTOMATED TRADING RISKS</h2>
          
          <h3>3.1 Algorithmic Trading Risks</h3>
          <p>Our Software uses automated trading algorithms, which carry specific risks:</p>
          <ul>
            <li><strong>Software Errors:</strong> Bugs, glitches, or coding errors may cause unintended trades or losses;</li>
            <li><strong>Overfitting:</strong> Algorithms optimized on historical data may fail in live markets;</li>
            <li><strong>Market Regime Changes:</strong> Strategies that worked in the past may fail when market conditions change;</li>
            <li><strong>Black Swan Events:</strong> Algorithms cannot predict or adapt to unprecedented market events;</li>
            <li><strong>Execution Delays:</strong> Technical issues may delay trade execution, resulting in losses;</li>
            <li><strong>Runaway Algorithms:</strong> In rare cases, algorithms may execute unintended trades due to technical failures.</li>
          </ul>

          <h3>3.2 Backtesting vs. Live Trading</h3>
          <p><strong>BACKTEST RESULTS ARE SIMULATED AND DO NOT REPRESENT ACTUAL TRADING.</strong></p>
          <ul>
            <li>Backtests assume perfect execution with no slippage or spread widening;</li>
            <li>Real-world trading involves delays, slippage, and transaction costs not fully reflected in backtests;</li>
            <li>Backtests are based on historical data, which may not repeat;</li>
            <li>Overfitting to historical data can create misleading performance metrics;</li>
            <li><strong>Live trading results may differ significantly from backtested performance.</strong></li>
          </ul>

          <h3>3.3 No Human Oversight</h3>
          <p>Automated trading operates without human intervention:</p>
          <ul>
            <li>The software executes trades based on algorithms, not human judgment;</li>
            <li>You may not be aware of trades being executed in real-time;</li>
            <li>Algorithms cannot exercise discretion or adapt to news events like a human trader;</li>
            <li>You are responsible for monitoring your account and algorithm performance.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. TECHNOLOGY AND OPERATIONAL RISKS</h2>
          
          <h3>4.1 Technical Failures</h3>
          <ul>
            <li><strong>Internet Connectivity:</strong> Loss of internet connection may prevent trade execution or monitoring;</li>
            <li><strong>Server Outages:</strong> Our servers or broker servers may experience downtime;</li>
            <li><strong>MT5 Platform Issues:</strong> MetaTrader 5 is a third-party platform that may malfunction;</li>
            <li><strong>API Failures:</strong> Broker API connections may fail, disrupting trading;</li>
            <li><strong>Power Outages:</strong> Loss of electricity may prevent software operation.</li>
          </ul>

          <h3>4.2 Cybersecurity Risks</h3>
          <ul>
            <li>Hacking, phishing, or unauthorized access to your account;</li>
            <li>Malware or viruses on your device;</li>
            <li>Data breaches (although we employ industry-leading security measures);</li>
            <li>Unauthorized use of your login credentials.</li>
          </ul>

          <h3>4.3 Software Updates</h3>
          <ul>
            <li>Software updates may introduce bugs or temporarily disrupt service;</li>
            <li>Algorithm changes may alter trading performance;</li>
            <li>You are responsible for keeping the software updated.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. BROKER-RELATED RISKS</h2>
          
          <h3>5.1 Third-Party Brokers</h3>
          <p><strong>TERRALABS DOES NOT HOLD YOUR FUNDS. ALL CAPITAL IS HELD WITH YOUR CHOSEN BROKER.</strong></p>
          <ul>
            <li>We are not responsible for broker actions, policies, or failures;</li>
            <li>Brokers may change margin requirements, spreads, or commissions without notice;</li>
            <li>Brokers may restrict trading during volatile periods;</li>
            <li>Broker insolvency could result in loss of funds (check broker regulatory status);</li>
            <li>Withdrawal delays or disputes are between you and your broker.</li>
          </ul>

          <h3>5.2 Execution Risk</h3>
          <ul>
            <li><strong>Slippage:</strong> Orders may execute at prices different from those requested;</li>
            <li><strong>Requotes:</strong> Brokers may reject or requote orders during fast markets;</li>
            <li><strong>Stop-Loss Gaps:</strong> Stop-loss orders may not execute at specified levels;</li>
            <li><strong>Spread Widening:</strong> Bid-ask spreads may widen significantly during volatility.</li>
          </ul>

          <h3>5.3 Regulatory Risk</h3>
          <ul>
            <li>Brokers are regulated by different authorities (Cyprus, Australia, Seychelles, etc.);</li>
            <li>Regulatory protection varies by jurisdiction;</li>
            <li>Brokers may be prohibited from serving clients in certain countries;</li>
            <li>Regulatory changes may affect your ability to trade.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. SPECIFIC RISKS BY TRADING ENGINE</h2>
          
          <h3>6.1 Aurelius-1™ (Gold/XAU/USD Trading)</h3>
          <ul>
            <li><strong>Commodity Volatility:</strong> Gold prices can be extremely volatile, especially during economic uncertainty;</li>
            <li><strong>Geopolitical Events:</strong> Wars, elections, and central bank policies significantly impact gold prices;</li>
            <li><strong>Overnight Gaps:</strong> Gold markets can gap significantly over weekends or during major news events;</li>
            <li><strong>Correlation Breakdown:</strong> Historical correlations (e.g., gold vs. USD) may break down;</li>
            <li><strong>Supply/Demand Shocks:</strong> Mining disruptions or central bank buying/selling can cause sudden price movements.</li>
          </ul>

          <h3>6.2 Pythagoras Stardust™ — Additional XAU/USD ML Risks</h3>
          <ul>
            <li><strong>Model Drift:</strong> ML models may degrade over time as market regimes shift beyond training distribution;</li>
            <li><strong>OOD Events:</strong> Extreme or unprecedented market events may trigger out-of-distribution conditions;</li>
            <li><strong>ONNX Execution Risk:</strong> Latency or compatibility issues during MT5 ONNX inference may affect execution;</li>
            <li><strong>Confidence Score Thresholds:</strong> Trade gating via confidence scoring does not guarantee profitable outcomes;</li>
            <li><strong>ATR Sensitivity:</strong> ATR-based dynamic exits may be impacted by volatility spikes or flash events;</li>
            <li><strong>Regime Filter Lag:</strong> Volatility-aware regime filters may not detect regime changes in real time.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. PERFORMANCE DISCLAIMERS</h2>
          
          <h3>7.1 No Guarantee of Profits</h3>
          <p><strong>WE DO NOT GUARANTEE PROFITS OR SPECIFIC PERFORMANCE OUTCOMES.</strong></p>
          <ul>
            <li>All performance metrics shown (backtests, live results) are for informational purposes only;</li>
            <li>Past performance is NOT indicative of future results;</li>
            <li>Your individual results may vary significantly from advertised performance;</li>
            <li>Market conditions, broker execution, and account size affect performance.</li>
          </ul>

          <h3>7.2 Backtest Limitations</h3>
          <ul>
            <li>Backtests are simulated using historical data;</li>
            <li>They assume perfect execution with no slippage, spread widening, or technical failures;</li>
            <li>They may be subject to "look-ahead bias" or overfitting;</li>
            <li>Historical data may not reflect future market conditions;</li>
            <li>Backtests do not account for psychological factors in live trading.</li>
          </ul>

          <h3>7.3 Live Performance</h3>
          <ul>
            <li>Live performance data represents actual trades executed by the software;</li>
            <li>Performance varies by account size, broker, leverage, and market conditions;</li>
            <li>Your results may differ due to timing of entry, broker differences, or account settings;</li>
            <li>We cannot control external factors affecting your trading performance.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>8. REGULATORY AND LEGAL RISKS</h2>
          
          <h3>8.1 Regulatory Changes</h3>
          <ul>
            <li>Laws and regulations governing forex and derivatives trading may change;</li>
            <li>Your country may impose restrictions on trading or leverage;</li>
            <li>Tax laws may change, affecting profitability;</li>
            <li>Brokers may restrict services in certain jurisdictions.</li>
          </ul>

          <h3>8.2 Tax Implications</h3>
          <ul>
            <li>Trading profits may be subject to income tax, capital gains tax, or other levies;</li>
            <li>You are responsible for all tax reporting and compliance;</li>
            <li>Tax treatment varies by jurisdiction;</li>
            <li><strong>We do not provide tax advice—consult a tax professional.</strong></li>
          </ul>

          <h3>8.3 Legal Restrictions</h3>
          <ul>
            <li>Some countries prohibit or restrict forex/derivatives trading;</li>
            <li>You are responsible for ensuring trading is legal in your jurisdiction;</li>
            <li>Using our software in prohibited jurisdictions may violate local laws.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. SUITABILITY AND INVESTOR QUALIFICATIONS</h2>
          
          <h3>9.1 Suitability Assessment</h3>
          <p>Trading is NOT suitable for everyone. You should only trade if:</p>
          <ul>
            <li>You fully understand the risks involved;</li>
            <li>You have sufficient financial resources to absorb losses;</li>
            <li>You can afford to lose your entire investment without impacting your financial stability;</li>
            <li>You have adequate knowledge and experience in trading;</li>
            <li>You have a high risk tolerance;</li>
            <li>Trading is appropriate for your financial goals and circumstances.</li>
          </ul>

          <h3>9.2 Who Should NOT Trade</h3>
          <p>Do NOT use our Software if:</p>
          <ul>
            <li>You cannot afford to lose the capital you intend to invest;</li>
            <li>You have limited or no trading experience;</li>
            <li>You have a low risk tolerance;</li>
            <li>You are using borrowed money, savings, or retirement funds;</li>
            <li>You have financial obligations (mortgage, loans, family support) that could be jeopardized by losses;</li>
            <li>You suffer from addiction or compulsive behavior related to trading or gambling.</li>
          </ul>

          <h3>9.3 Professional Advice</h3>
          <p><strong>WE STRONGLY RECOMMEND CONSULTING WITH INDEPENDENT FINANCIAL, LEGAL, AND TAX ADVISORS BEFORE TRADING.</strong></p>
        </section>

        <section className="legal-section">
          <h2>10. TERRALABS' ROLE AND LIMITATIONS</h2>
          
          <h3>10.1 Software Provider Only</h3>
          <p>TERRALABS is a software technology company. We:</p>
          <ul>
            <li>Provide trading software tools (Pythagoras Stardust™);</li>
            <li>Do NOT provide investment advice, financial planning, or recommendations;</li>
            <li>Do NOT manage your funds or execute trades on your behalf (software executes automatically);</li>
            <li>Are NOT a broker, dealer, investment advisor, or financial institution;</li>
            <li>Are NOT registered with any financial regulatory authority as a financial services provider.</li>
          </ul>

          <h3>10.2 No Fiduciary Duty</h3>
          <p>We do not owe you a fiduciary duty. You are solely responsible for all trading decisions, even if executed by automated software.</p>

          <h3>10.3 No Fund Custody</h3>
          <p>We do NOT hold, custody, or control your trading capital. All funds are held with your chosen third-party broker. We have no access to your funds or withdrawal capabilities.</p>

          <h3>10.4 No Control Over Execution</h3>
          <p>We do not control:</p>
          <ul>
            <li>Broker execution quality, speed, or pricing;</li>
            <li>Market liquidity or volatility;</li>
            <li>Regulatory changes or broker policy changes;</li>
            <li>Internet connectivity or technical failures beyond our systems.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>11. DISCLAIMERS</h2>
          
          <h3>11.1 No Warranty</h3>
          <p>THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:</p>
          <ul>
            <li>Merchantability;</li>
            <li>Fitness for a particular purpose;</li>
            <li>Accuracy or reliability of trading signals;</li>
            <li>Uninterrupted or error-free operation;</li>
            <li>Profitability or specific performance outcomes.</li>
          </ul>

          <h3>11.2 Limitation of Liability</h3>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY UAE LAW:</p>
          <ul>
            <li>We are NOT liable for any trading losses, regardless of cause;</li>
            <li>We are NOT liable for indirect, incidental, consequential, or punitive damages;</li>
            <li>Our total liability is limited to the subscription fees you paid in the 3 months preceding any claim;</li>
            <li>We are NOT responsible for broker actions, market events, or technical failures beyond our control.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>12. YOUR RESPONSIBILITIES</h2>
          <p>By using the Software, you agree to:</p>
          <ul>
            <li>Conduct your own due diligence and risk assessment;</li>
            <li>Monitor your account and trading activity regularly;</li>
            <li>Understand the software settings and risk parameters;</li>
            <li>Maintain adequate risk management (position sizing, stop-losses, etc.);</li>
            <li>Ensure compliance with all applicable laws and regulations;</li>
            <li>Keep your login credentials secure;</li>
            <li>Report any technical issues or unusual activity immediately;</li>
            <li>Accept full responsibility for all trading outcomes, profits, and losses.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>13. ACKNOWLEDGMENT AND ACCEPTANCE</h2>
          <p>By subscribing to and using the Software, you hereby acknowledge and confirm that:</p>
          <ol>
            <li>You have read and fully understand this Risk Disclosure Agreement;</li>
            <li>You accept all risks described herein;</li>
            <li>You understand that trading involves substantial risk of loss;</li>
            <li>You can afford to lose your entire investment;</li>
            <li>You will not hold TERRALABS liable for any trading losses;</li>
            <li>You have consulted (or waived the right to consult) independent financial advisors;</li>
            <li>You are using the Software voluntarily and at your own risk;</li>
            <li>You understand that past performance does not guarantee future results;</li>
            <li>You will comply with all applicable laws and regulations;</li>
            <li>You have the legal capacity and authority to enter into this agreement.</li>
          </ol>
        </section>

        <section className="legal-section">
          <h2>14. STATUTORY WARNINGS (UAE REGULATORY COMPLIANCE)</h2>
          <div className="legal-notice critical">
            <AlertTriangle size={24} />
            <div>
              <p><strong>STATUTORY WARNING:</strong></p>
              <p>Trading in foreign exchange, commodities, and derivatives on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment. Therefore, you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with trading and seek advice from an independent financial advisor if you have any doubts.</p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>15. CONTACT FOR RISK QUESTIONS</h2>
          <div className="contact-box">
            <p>If you have questions about the risks involved in using our Software, contact:</p>
            <p><strong>Risk Compliance Department</strong></p>
            <p>Email: risk@terralabs.ae</p>
            <p>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</p>
            <p>Dubai International Free Zone Authority (DIEZA), Dubai, UAE</p>
          </div>
        </section>

        <div className="legal-footer-signature">
          <p><strong>TERRALABS INDUSTRIES INFORMATION TECHNOLOGY CONSULTANCIES – FZCO</strong></p>
          <p>Effective Date: December 28, 2025</p>
          <p>Document Version: 1.0</p>
          <p><strong>By proceeding with subscription, you confirm acceptance of all risks disclosed herein.</strong></p>
        </div>
      </div>
      {showBackToTop && (
        <button className={`back-to-top-button ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}