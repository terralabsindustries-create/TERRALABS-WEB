import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3 } from 'lucide-react';

interface TradingMeterProps {
  title: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down';
  color: 'gold' | 'blue' | 'green' | 'orange';
  animated?: boolean;
}

interface RatioMeterProps {
  title: string;
  value: number;
  unit: string;
  primaryLabel: string;
  secondaryLabel: string;
  color: 'gold' | 'blue' | 'green' | 'orange';
  animated?: boolean;
}

export const RatioMeter: React.FC<RatioMeterProps> = ({
  title,
  value,
  unit,
  primaryLabel,
  secondaryLabel,
  color,
  animated = true
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedWidth, setAnimatedWidth] = useState(0);

  const colorSchemes = {
    gold: {
      primary: '#C8A44B',
      secondary: '#B8941F',
      glow: 'rgba(200, 164, 75, 0.3)'
    },
    blue: {
      primary: '#0A84FF',
      secondary: '#007AFF',
      glow: 'rgba(10, 132, 255, 0.3)'
    },
    green: {
      primary: '#40D174',
      secondary: '#2DB865',
      glow: 'rgba(64, 217, 116, 0.3)'
    },
    orange: {
      primary: '#FF5C39',
      secondary: '#FF7C5A',
      glow: 'rgba(255, 92, 57, 0.3)'
    }
  };

  const scheme = colorSchemes[color];

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
        setAnimatedWidth(100);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
      setAnimatedWidth(100);
    }
  }, [value, animated]);

  // Calculate the ratio percentage for visual display
  const primaryPercentage = Math.min((value / (value + 1)) * 100, 70);
  const secondaryPercentage = 100 - primaryPercentage;

  return (
    <div className="ratio-meter">
      <div className="ratio-container">
        <h4 className="ratio-title">{title}</h4>
        
        <div className="ratio-value-display">
          <span className="ratio-value" style={{ color: scheme.primary }}>
            {animatedValue.toFixed(2)}{unit}
          </span>
        </div>

        <div className="stacked-bars">
          <div className="bar-row primary-bar">
            <div className="bar-label">{primaryLabel}</div>
            <div className="bar-track">
              <div 
                className="bar-fill"
                style={{
                  width: `${primaryPercentage}%`,
                  backgroundColor: scheme.primary,
                  boxShadow: `0 0 10px ${scheme.glow}`,
                  transition: 'width 1.5s ease-out'
                }}
              />
            </div>
          </div>
          
          <div className="bar-row secondary-bar">
            <div className="bar-label">{secondaryLabel}</div>
            <div className="bar-track">
              <div 
                className="bar-fill"
                style={{
                  width: `${secondaryPercentage}%`,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transition: 'width 1.5s ease-out'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TradingMeter: React.FC<TradingMeterProps> = ({
  title,
  value,
  target,
  unit,
  trend,
  color,
  animated = true
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate percentage based on 100 for proportional display
  const percentage = Math.min(value, 100);
  
  const colorSchemes = {
    gold: {
      primary: '#C8A44B',
      secondary: '#B8941F',
      gradient: 'from-yellow-400 to-yellow-600',
      glow: 'rgba(200, 164, 75, 0.3)'
    },
    blue: {
      primary: '#0A84FF',
      secondary: '#007AFF', 
      gradient: 'from-blue-400 to-blue-600',
      glow: 'rgba(10, 132, 255, 0.3)'
    },
    green: {
      primary: '#40D174',
      secondary: '#2DB865',
      gradient: 'from-green-400 to-green-600',
      glow: 'rgba(64, 217, 116, 0.3)'
    },
    orange: {
      primary: '#FF5C39',
      secondary: '#FF7C5A',
      gradient: 'from-orange-400 to-orange-600',
      glow: 'rgba(255, 92, 57, 0.3)'
    }
  };

  const scheme = colorSchemes[color];

  useEffect(() => {
    setIsVisible(true);
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(value);
    }
  }, [value, animated]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="trading-meter">
      <div className="meter-container">
        <div className="meter-circle">
          <svg width="120" height="120" className="meter-svg">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={scheme.primary}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="meter-progress"
              style={{
                filter: `drop-shadow(0 0 8px ${scheme.glow})`,
                transition: 'stroke-dashoffset 2s ease-in-out'
              }}
            />
          </svg>
          
          <div className="meter-content">
            <div className="meter-percentage">
              {Math.round(percentage)}%
            </div>
            <div className="meter-trend">
              {trend === 'up' ? (
                <TrendingUp size={16} style={{ color: scheme.primary }} />
              ) : (
                <TrendingDown size={16} style={{ color: '#FF4444' }} />
              )}
            </div>
          </div>
        </div>
        
        <div className="meter-details">
          <h4 className="meter-title">{title}</h4>
          <div className="meter-value">
            {animatedValue.toLocaleString()}{unit}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProfitCardProps {
  title: string;
  amount: number;
  percentage: number;
  period: string;
  trend: 'up' | 'down';
  isLive?: boolean;
}

export const ProfitCard: React.FC<ProfitCardProps> = ({
  title,
  amount,
  percentage,
  period,
  trend,
  isLive = false
}) => {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [livePulse, setLivePulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedAmount(amount);
    }, 500);

    if (isLive) {
      const pulseInterval = setInterval(() => {
        setLivePulse(prev => !prev);
      }, 2000);
      return () => {
        clearTimeout(timer);
        clearInterval(pulseInterval);
      };
    }

    return () => clearTimeout(timer);
  }, [amount, isLive]);

  return (
    <div className={`profit-card ${trend} ${isLive ? 'live' : ''}`}>
      {isLive && (
        <div className="live-indicator">
          <div className={`live-dot ${livePulse ? 'pulse' : ''}`}></div>
          <span>LIVE</span>
        </div>
      )}
      
      <div className="profit-header">
        <h4>{title}</h4>
        <div className="profit-trend">
          {trend === 'up' ? (
            <TrendingUp size={20} className="trend-up" />
          ) : (
            <TrendingDown size={20} className="trend-down" />
          )}
        </div>
      </div>
      
      <div className="profit-amount">
        <DollarSign size={24} />
        <span className="amount">{animatedAmount.toLocaleString()}</span>
      </div>
      
      <div className="profit-details">
        <div className="profit-percentage">
          <Target size={14} />
          <span>{percentage.toFixed(2)}% of Capital</span>
        </div>
        <div className="profit-period">{period}</div>
      </div>
      
      <div className="profit-glow"></div>
    </div>
  );
};

interface MarketStatusProps {
  pair: string;
  price: number;
  change: number;
  volume: string;
  status: 'active' | 'monitoring' | 'paused';
}

export const MarketStatus: React.FC<MarketStatusProps> = ({
  pair,
  price,
  change,
  volume,
  status
}) => {
  const [priceAnimation, setPriceAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceAnimation(true);
      setTimeout(() => setPriceAnimation(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = change >= 0;

  return (
    <div className={`market-status ${status}`}>
      <div className="market-header">
        <div className="market-pair">
          <span className="pair-name">{pair}</span>
          <div className={`status-indicator ${status}`}></div>
        </div>
        <BarChart3 size={16} className="market-icon" />
      </div>
      
      <div className={`market-price ${priceAnimation ? 'animate' : ''}`}>
        ${price.toFixed(2)}
      </div>
      
      <div className="market-details">
        <div className={`market-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
        <div className="market-volume">
          Vol: {volume}
        </div>
      </div>
      
      <div className="market-sparkline">
        <svg width="100%" height="30" viewBox="0 0 100 30">
          <path
            d={isPositive 
              ? "M5,25 Q25,20 45,15 T85,10" 
              : "M5,10 Q25,15 45,20 T85,25"
            }
            fill="none"
            stroke={isPositive ? '#40D174' : '#FF4444'}
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
};