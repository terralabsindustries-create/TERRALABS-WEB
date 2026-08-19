import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export const MarketTicker: React.FC = React.memo(() => {
  const [goldData, setGoldData] = useState<TickerItem>({
    symbol: 'XAU/USD',
    price: 2015.45,
    change: 12.34,
    changePercent: 0.62
  });

  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Optimize price update function
  const updatePrice = useCallback(() => {
    setGoldData(prev => {
      const randomChange = (Math.random() - 0.5) * 2.5;
      const newPrice = Math.max(1800, prev.price + randomChange);
      const change = newPrice - prev.price;
      const changePercent = (change / prev.price) * 100;
      
      return {
        ...prev,
        price: Number(newPrice.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2))
      };
    });
    setLastUpdate(new Date());
  }, []);

  // Reduce update frequency for better performance
  useEffect(() => {
    const interval = setInterval(updatePrice, 6000); // Increased from 3s to 6s
    return () => clearInterval(interval);
  }, [updatePrice]);

  return (
    <div className="market-ticker compact">
      <div className="ticker-label">
        <div className="live-dot"></div>
        <span>GOLD LIVE</span>
      </div>
      
      <div className="gold-ticker-content">
        <div className="gold-item">
          <span className="ticker-symbol">{goldData.symbol}</span>
          <span className="ticker-price">${goldData.price}</span>
          <span className={`ticker-change ${goldData.change >= 0 ? 'positive' : 'negative'}`}>
            {goldData.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {goldData.changePercent > 0 ? '+' : ''}{goldData.changePercent}%
          </span>
          <span className="ticker-time">
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="trading-status">
          <div className="status-pulse"></div>
          <span className="status-text">PYTHAGORAS STARDUST Active</span>
        </div>
      </div>
    </div>
  );
});

interface ProfitCounterProps {
  targetProfit: number;
  duration: number;
}

export const LiveProfitCounter: React.FC<ProfitCounterProps> = React.memo(({ 
  targetProfit, 
  duration = 5000 
}) => {
  const [currentProfit, setCurrentProfit] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Optimize animation with useCallback
  const animateProfit = useCallback(() => {
    setIsAnimating(true);
    const startTime = Date.now();
    const startProfit = currentProfit;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Simplified easing for better performance
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const newProfit = startProfit + (targetProfit - startProfit) * easeOut;
      
      setCurrentProfit(newProfit);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [targetProfit, duration, currentProfit]);

  useEffect(() => {
    animateProfit();
  }, [animateProfit]);

  return null;
});