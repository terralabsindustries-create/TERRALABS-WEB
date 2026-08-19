import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface SearchableCountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const countries: Country[] = [
  { code: '+93', name: 'Afghanistan', flag: '' },
  { code: '+355', name: 'Albania', flag: '' },
  { code: '+213', name: 'Algeria', flag: '' },
  { code: '+54', name: 'Argentina', flag: '' },
  { code: '+61', name: 'Australia', flag: '' },
  { code: '+43', name: 'Austria', flag: '' },
  { code: '+973', name: 'Bahrain', flag: '' },
  { code: '+880', name: 'Bangladesh', flag: '' },
  { code: '+32', name: 'Belgium', flag: '' },
  { code: '+55', name: 'Brazil', flag: '' },
  { code: '+1', name: 'Canada', flag: '' },
  { code: '+86', name: 'China', flag: '' },
  { code: '+57', name: 'Colombia', flag: '' },
  { code: '+45', name: 'Denmark', flag: '' },
  { code: '+20', name: 'Egypt', flag: '' },
  { code: '+358', name: 'Finland', flag: '' },
  { code: '+33', name: 'France', flag: '' },
  { code: '+49', name: 'Germany', flag: '' },
  { code: '+30', name: 'Greece', flag: '' },
  { code: '+852', name: 'Hong Kong', flag: '' },
  { code: '+91', name: 'India', flag: '' },
  { code: '+62', name: 'Indonesia', flag: '' },
  { code: '+98', name: 'Iran', flag: '' },
  { code: '+964', name: 'Iraq', flag: '' },
  { code: '+353', name: 'Ireland', flag: '' },
  { code: '+972', name: 'Israel', flag: '' },
  { code: '+39', name: 'Italy', flag: '' },
  { code: '+81', name: 'Japan', flag: '' },
  { code: '+962', name: 'Jordan', flag: '' },
  { code: '+254', name: 'Kenya', flag: '' },
  { code: '+82', name: 'Korea', flag: '' },
  { code: '+965', name: 'Kuwait', flag: '' },
  { code: '+961', name: 'Lebanon', flag: '' },
  { code: '+60', name: 'Malaysia', flag: '' },
  { code: '+52', name: 'Mexico', flag: '' },
  { code: '+212', name: 'Morocco', flag: '' },
  { code: '+31', name: 'Netherlands', flag: '' },
  { code: '+64', name: 'New Zealand', flag: '' },
  { code: '+234', name: 'Nigeria', flag: '' },
  { code: '+47', name: 'Norway', flag: '' },
  { code: '+968', name: 'Oman', flag: '' },
  { code: '+92', name: 'Pakistan', flag: '' },
  { code: '+970', name: 'Palestine', flag: '' },
  { code: '+63', name: 'Philippines', flag: '' },
  { code: '+48', name: 'Poland', flag: '' },
  { code: '+351', name: 'Portugal', flag: '' },
  { code: '+974', name: 'Qatar', flag: '' },
  { code: '+7', name: 'Russia', flag: '' },
  { code: '+966', name: 'Saudi Arabia', flag: '' },
  { code: '+65', name: 'Singapore', flag: '' },
  { code: '+27', name: 'South Africa', flag: '' },
  { code: '+34', name: 'Spain', flag: '' },
  { code: '+94', name: 'Sri Lanka', flag: '' },
  { code: '+46', name: 'Sweden', flag: '' },
  { code: '+41', name: 'Switzerland', flag: '' },
  { code: '+963', name: 'Syria', flag: '' },
  { code: '+886', name: 'Taiwan', flag: '' },
  { code: '+66', name: 'Thailand', flag: '' },
  { code: '+216', name: 'Tunisia', flag: '' },
  { code: '+90', name: 'Turkey', flag: '' },
  { code: '+971', name: 'United Arab Emirates', flag: '' },
  { code: '+44', name: 'United Kingdom', flag: '' },
  { code: '+1', name: 'United States', flag: '' },
  { code: '+84', name: 'Vietnam', flag: '' },
  { code: '+967', name: 'Yemen', flag: '' },
];

export const SearchableCountrySelect: React.FC<SearchableCountrySelectProps> = ({
  value,
  onChange,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countries.find(c => c.code === value);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  const handleSelect = (country: Country) => {
    onChange(country.code);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleSelect(filteredCountries[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        break;
    }
  };

  return (
    <div 
      className="searchable-country-select" 
      ref={dropdownRef}
      style={{
        position: 'relative',
        minWidth: '200px'
      }}
    >
      <div
        className="country-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{
          padding: '0.875rem 1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.35rem',
          outline: 'none',
          minWidth: '140px',
          maxWidth: '140px',
          lineHeight: '1.5',
          boxSizing: 'border-box',
          height: 'auto'
        }}
      >
        <span>
          {selectedCountry ? (
            <span>
              {selectedCountry.name} ({selectedCountry.code})
            </span>
          ) : (
            'Select country'
          )}
        </span>
        <ChevronDown 
          size={16} 
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0
          }}
        />
      </div>

      {isOpen && (
        <div
          className="country-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            background: 'rgba(17, 17, 17, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 92, 57, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            maxHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              padding: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'sticky',
              top: 0,
              background: 'rgba(17, 17, 17, 0.98)',
              zIndex: 1
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Search size={16} style={{ color: 'rgba(255, 92, 57, 0.8)' }} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search country..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <div
            style={{
              overflowY: 'auto',
              flex: 1
            }}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <div
                  key={country.code + country.name}
                  onClick={() => handleSelect(country)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  style={{
                    padding: '0.75rem 1rem 0.75rem 1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: index === highlightedIndex 
                      ? 'rgba(255, 92, 57, 0.2)' 
                      : 'transparent',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderLeft: index === highlightedIndex 
                      ? '3px solid #FF5C39' 
                      : '3px solid transparent'
                  }}
                >
                  <span style={{ flex: 1 }}>{country.name}</span>
                  <span style={{ 
                    color: 'rgba(255, 92, 57, 0.8)',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {country.code}
                  </span>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '14px'
                }}
              >
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};