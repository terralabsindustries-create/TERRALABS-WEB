import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TradingMeter, RatioMeter, ProfitCard, MarketStatus } from './TradingMeter';
import { Activity, Zap, Target, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export const TradingDashboard: React.FC = React.memo(() => {
  const [liveProfits, setLiveProfits] = useState([
    { id: 1, amount: 175, base: 175 },      // Daily average
    { id: 2, amount: 1227, base: 1227 },    // Weekly average
    { id: 3, amount: 5318, base: 5318 },    // Monthly average
    { id: 4, amount: 63816, base: 63816 }   // Total profit
  ]);

  // Real backtest metrics from Feb 2024 - Feb 2025 (100K Capital)
  const staticMetrics = useMemo(() => ({
    winRate: 64.44,        // 29 wins out of 45 trades
    maxDrawdown: 22.35,    // Equity drawdown maximal (22,348.11)
    sharpeRatio: 1.85,     // Estimated from returns and volatility
    riskReward: 0.78,      // Avg profit $6,700.05 / Avg loss $8,558.75
    profitFactor: 1.42,    // Gross profit / Gross loss (194,321.47 / 136,940.07)
    recoveryFactor: 2.57,  // Net Profit / Max Drawdown (57,381.40 / 22,348.11)
    annualReturn: 57.38,   // $57,381.40 / $100,000 initial
    avgTrade: 1275.14      // Expected payoff
  }), []);

  // Optimize profit updates with useCallback
  const updateProfits = useCallback(() => {
    setLiveProfits(prev => prev.map(profit => ({
      ...profit,
      amount: profit.base + Math.floor(Math.random() * 1000) - 500
    })));
  }, []);

  // Reduce update frequency for better performance
  useEffect(() => {
    const interval = setInterval(updateProfits, 5000); // Increased from 3s to 5s
    return () => clearInterval(interval);
  }, [updateProfits]);

  return (
    <div className="trading-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <Activity className="title-icon" size={28} />
          <h3>2-Year Backtest Results</h3>
        </div>
        
        {/* Backtest Period Badge */}
        <div className="sample-simulation-badge">
          <span>Dec 2023 - Dec 2025</span>
          <div className="badge-glow"></div>
        </div>
        
        <div className="dashboard-status">
          <div className="status-dot active"></div>
          <span>XAUUSD • H1 • Every Tick</span>
        </div>
      </div>

      {/* Technical Trading Meters - Real Backtest Data */}
      <div className="meters-row">
        <TradingMeter
          title="Equity Safe"
          value={100}
          target={100}
          unit="%"
          trend="up"
          color="green"
        />
        <TradingMeter
          title="Absolute Drawdown"
          value={14.02}
          target={30}
          unit="%"
          trend="down"
          color="blue"
        />
        <TradingMeter
          title="Annual Return"
          value={72.1}
          target={100}
          unit="%"
          trend="up"
          color="green"
        />
        <RatioMeter
          title="Profit Factor"
          value={1.41}
          unit="x"
          primaryLabel="Gross Profit"
          secondaryLabel="Gross Loss"
          color="gold"
        />
        <RatioMeter
          title="Risk/Reward"
          value={1.63}
          unit=":1"
          primaryLabel="Avg Win"
          secondaryLabel="Avg Loss"
          color="orange"
        />
        <RatioMeter
          title="Recovery Factor"
          value={1.72}
          unit=""
          primaryLabel="Net Profit"
          secondaryLabel="Max Drawdown"
          color="gold"
        />
      </div>

      {/* Investment & Profit Summary Cards */}
      <div className="profit-cards-row">
        <ProfitCard
          title="Initial Investment"
          amount={100000}
          percentage={100}
          period="Dec 2023"
          trend="up"
          isLive={false}
        />
        <ProfitCard
          title="Net Profit"
          amount={144354}
          percentage={144.35}
          period="Dec 2025"
          trend="up"
          isLive={false}
        />
        <ProfitCard
          title="Final Balance"
          amount={244354}
          percentage={244.35}
          period="Dec 2025"
          trend="up"
          isLive={false}
        />
      </div>

      {/* Backtest Performance Analysis */}
      <div className="gold-market-analysis">
        <div className="market-header">
          <h4>
            <BarChart3 size={20} />
            Backtest Performance Details
          </h4>
          <div className="market-time">
            December 2023 - December 2025 • XAUUSD H1 • Every Tick Quality
          </div>
        </div>
        
        <div className="analysis-grid">
          <div className="analysis-card">
            <div className="analysis-header">
              <span className="analysis-title">Total Trades</span>
              <div className="status-indicator active"></div>
            </div>
            <div className="analysis-value gold">83</div>
            <div className="analysis-change positive">42 Wins / 41 Losses</div>
          </div>
          
          <div className="analysis-card">
            <div className="analysis-header">
              <span className="analysis-title">Gross Profit</span>
            </div>
            <div className="analysis-value">$496,814</div>
            <div className="analysis-change positive">From winning trades</div>
          </div>
          
          <div className="analysis-card">
            <div className="analysis-header">
              <span className="analysis-title">Gross Loss</span>
            </div>
            <div className="analysis-value">$353,501</div>
            <div className="analysis-change negative">From losing trades</div>
          </div>
          
          <div className="analysis-card">
            <div className="analysis-header">
              <span className="analysis-title">Expected Payoff</span>
            </div>
            <div className="analysis-value">$1,746</div>
            <div className="analysis-change positive">Per Trade Average</div>
          </div>
        </div>
        

      </div>

      {/* Backtest Summary */}
      <div className="performance-indicator">
        <div className="indicator-content">
          <div className="indicator-left">
            <div className="indicator-icon">
              <Target size={32} />
            </div>
            <div className="indicator-text">
              <h4>AURELIUS-1™ Backtest Summary (Dec 2023 - Dec 2025)</h4>
              <p>2-Year Historical Performance • 83 Trades • 100% Equity Safe</p>
            </div>
          </div>
          
          <div className="indicator-right">
            <div className="performance-stats">
              <div className="stat">
                <span className="stat-value">$144,354</span>
                <span className="stat-label">Net Profit</span>
              </div>
              <div className="stat">
                <span className="stat-value">1.41x</span>
                <span className="stat-label">Profit Factor</span>
              </div>
              <div className="stat">
                <span className="stat-value">144.35%</span>
                <span className="stat-label">Return</span>
              </div>
              <div className="stat">
                <span className="stat-value">1.72</span>
                <span className="stat-label">Recovery</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="performance-glow"></div>
      </div>
    </div>
  );
});