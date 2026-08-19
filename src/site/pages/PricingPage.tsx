import { useState } from 'react';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const pricingTiers = [
    {
      name: 'TIER 1',
      capital: '$5,000 - $9,999',
      monthlyPrice: 149,
      annualPrice: 1609,
      annualSavings: 179,
      color: '#8B7355',
      features: [
        'Pythagoras Stardust™ Gold Trading Engine',
        'Real-time algorithmic signals',
        'Basic performance analytics',
        'Email support (48hr response)',
        'Standard execution speed',
        'Mobile dashboard access'
      ],
      recommended: false
    },
    {
      name: 'TIER 2',
      capital: '$10,000 - $24,999',
      monthlyPrice: 199,
      annualPrice: 2149,
      annualSavings: 239,
      color: '#CD7F32',
      features: [
        'Pythagoras Stardust™ Gold Trading Engine',
        'Real-time algorithmic signals',
        'Advanced performance analytics',
        'Priority email support (24hr)',
        'Enhanced execution speed',
        'Trade history & reporting',
        'Risk management dashboard'
      ],
      recommended: false
    },
    {
      name: 'TIER 3',
      capital: '$25,000 - $49,999',
      monthlyPrice: 449,
      annualPrice: 4849,
      annualSavings: 539,
      color: '#C0C0C0',
      features: [
        'Pythagoras Stardust™ Gold Trading Engine',
        'Real-time algorithmic signals',
        'Premium performance analytics',
        'Priority support (12hr response)',
        'High-speed execution',
        'Advanced risk controls',
        'Customizable alerts',
        'API access (basic)'
      ],
      recommended: true
    },
    {
      name: 'TIER 4',
      capital: '$50,000 - $99,999',
      monthlyPrice: 849,
      annualPrice: 9169,
      annualSavings: 1019,
      color: '#FFD700',
      features: [
        'Pythagoras Stardust™ Gold Trading Engine',
        'Real-time multi-asset signals',
        'Enterprise analytics suite',
        '24/7 priority support',
        'Ultra-low latency execution',
        'Advanced risk parameters',
        'Full API access',
        'Dedicated account manager',
        'Beta feature access'
      ],
      recommended: false
    },
    {
      name: 'TIER 5',
      capital: '$100,000 - $249,999',
      monthlyPrice: 1699,
      annualPrice: 18349,
      annualSavings: 2039,
      color: '#E5E4E2',
      features: [
        'All Gold tier features',
        'Dedicated server infrastructure',
        'Custom algorithm parameters',
        'White-glove onboarding',
        'Quarterly strategy reviews',
        'Direct engineering support',
        'Custom reporting',
        'Priority feature requests'
      ],
      recommended: false
    },
    {
      name: 'TIER 6',
      capital: '$250,000+',
      monthlyPrice: 3999,
      annualPrice: 43189,
      annualSavings: 4799,
      color: '#B9F2FF',
      features: [
        'All Platinum tier features',
        'Isolated enterprise infrastructure',
        'Custom algorithm development',
        'Dedicated engineering team',
        'On-demand strategy consulting',
        'White-label options available',
        'SLA with 99.9% uptime guarantee',
        'Unlimited API access',
        'Executive quarterly reviews'
      ],
      recommended: false
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="hero-badge">
            <span className="badge-text">SOFTWARE LICENSING</span>
          </div>
          
          <h1 className="page-title">
            <span className="title-line">Value-Based Pricing</span>
          </h1>
          
          <p className="page-subtitle">
            Premium algorithmic trading software with capital-tiered licensing. 
            Simple monthly subscriptions with flexible cancellation.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="content-section" style={{ paddingTop: 0 }}>
        <div className="section-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <span style={{ color: billingPeriod === 'monthly' ? '#FF5C39' : 'rgba(255, 255, 255, 0.5)' }}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              style={{
                width: '64px',
                height: '32px',
                background: billingPeriod === 'annual' ? '#FF5C39' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '4px',
                left: billingPeriod === 'annual' ? '36px' : '4px',
                transition: 'all 0.3s ease'
              }} />
            </button>
            <span style={{ color: billingPeriod === 'annual' ? '#FF5C39' : 'rgba(255, 255, 255, 0.5)' }}>
              Annual <span style={{ color: '#10B981', fontSize: '14px' }}>(Save up to 15%)</span>
            </span>
          </div>

          {/* Pricing Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.recommended 
                    ? 'linear-gradient(135deg, rgba(255, 92, 57, 0.1) 0%, rgba(255, 61, 26, 0.05) 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: tier.recommended ? '2px solid #FF5C39' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '32px',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#FF5C39';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (!tier.recommended) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {tier.recommended && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%)',
                    color: '#fff',
                    padding: '4px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    MOST POPULAR
                  </div>
                )}



                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h3 style={{ 
                    fontSize: '24px', 
                    marginBottom: '8px',
                    color: tier.color
                  }}>
                    {tier.name}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', marginBottom: '16px' }}>
                    {tier.capital}
                  </p>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ 
                      fontSize: '48px', 
                      fontWeight: 'bold',
                      color: '#fff'
                    }}>
                      ${billingPeriod === 'monthly' ? tier.monthlyPrice : tier.annualPrice}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '16px' }}>
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  {billingPeriod === 'annual' && (
                    <p style={{ color: '#10B981', fontSize: '14px' }}>
                      Save ${tier.annualSavings}/year
                    </p>
                  )}

                  <p style={{ 
                    fontSize: '12px', 
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '8px',
                    fontStyle: 'italic'
                  }}>
                    Per month
                  </p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  {tier.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      <span style={{ color: '#FF5C39', flexShrink: 0 }}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/onboarding"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '16px',
                    background: tier.recommended 
                      ? 'linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%)'
                      : 'rgba(255, 92, 57, 0.1)',
                    border: tier.recommended ? 'none' : '1px solid #FF5C39',
                    borderRadius: '8px',
                    color: '#fff',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (tier.recommended) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 92, 57, 0.3)';
                    } else {
                      e.currentTarget.style.background = 'rgba(255, 92, 57, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (tier.recommended) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    } else {
                      e.currentTarget.style.background = 'rgba(255, 92, 57, 0.1)';
                    }
                  }}
                >
                  Begin Onboarding
                </a>
              </div>
            ))}
          </div>

          {/* Legal Disclaimers */}
          <div style={{
            background: 'rgba(255, 92, 57, 0.05)',
            border: '1px solid rgba(255, 92, 57, 0.2)',
            borderRadius: '12px',
            padding: '24px',
            marginTop: '48px'
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#FF5C39' }}>
              Important Information
            </h3>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Software Licensing:</strong> All pricing reflects annual software licensing fees for access to TERRALABS proprietary algorithmic trading technology. Fees are based on the computational resources, infrastructure scaling, and support levels required for different capital tiers.
              </p>

              <p style={{ marginBottom: '12px' }}>
                <strong>Not Investment Advice:</strong> TERRALABS is an IT consultancy providing algorithmic trading software tools. We do NOT provide investment advice, asset management, or financial services. All trading decisions and executions are made by the software based on your configured parameters.
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>Your Funds, Your Control:</strong> Your capital remains in your own MetaTrader 5 brokerage account at all times. TERRALABS never holds, custodies, or has access to your funds. You can withdraw from your broker anytime.
              </p>
              <p>
                <strong>Risk Warning:</strong> Trading involves substantial risk of loss. Past performance does not guarantee future results. Only trade with capital you can afford to lose. See our full Risk Disclosure for details.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ marginTop: '48px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '32px' }}>
              Frequently Asked Questions
            </h2>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {[
                {
                  q: 'Why is pricing based on capital amount?',
                  a: 'Larger capital accounts require more sophisticated infrastructure including dedicated server resources, higher-tier data feeds, enhanced execution speed, and priority support. Our pricing reflects genuine differences in computational requirements and service levels—not percentage of client capital.'
                },
                {
                  q: 'Can I cancel my subscription?',
                  a: 'Yes, you can cancel your subscription at any time with 30 days written notice. Your subscription will remain active until the end of the current billing period.'
                },
                {
                  q: 'Can I change tiers after signing up?',
                  a: 'Yes! You can upgrade or downgrade your tier at any time based on your capital allocation. Changes take effect at the start of your next billing cycle.'
                },
                {
                  q: 'Is this a performance fee model?',
                  a: 'No. This is a fixed software licensing fee model. You pay the same amount regardless of trading performance. You keep 100% of all trading profits generated by the algorithm.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, wire transfers, and cryptocurrency payments for annual subscriptions. Monthly subscriptions require credit card or direct debit.'
                },
                {
                  q: 'Is there a money-back guarantee?',
                  a: 'We do not offer refunds on subscriptions once service begins. However, you can cancel anytime with 30 days notice and your subscription will not renew.'
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '16px'
                  }}
                >
                  <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#FF5C39' }}>
                    {faq.q}
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            textAlign: 'center',
            marginTop: '64px',
            padding: '48px',
            background: 'linear-gradient(135deg, rgba(255, 92, 57, 0.1) 0%, rgba(255, 61, 26, 0.05) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 92, 57, 0.2)'
          }}>
            <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>
              Ready to Experience Algorithmic Trading?
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Begin your journey with TERRALABS. Fixed monthly pricing with flexible cancellation.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/onboarding"
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #FF5C39 0%, #FF3D1A 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 92, 57, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Begin Onboarding
              </a>
              <a
                href="/contact"
                style={{
                  padding: '16px 32px',
                  background: 'transparent',
                  border: '2px solid #FF5C39',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 92, 57, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}