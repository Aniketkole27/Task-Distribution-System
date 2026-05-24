import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  name,
  icon: LeftIcon,
  className = "",
  disabled = false,
  openDirection = "bottom",
  autoScrollOnOpen = false,
  searchable = false,
  emptyMessage = "No options available",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (autoScrollOnOpen && isOpen) {
      const scrollToBottom = () => {
        const scrollableParent = containerRef.current?.closest('.overflow-y-auto');
        if (scrollableParent) {
          scrollableParent.scrollTo({
            top: scrollableParent.scrollHeight,
            behavior: 'smooth',
          });
        }
      };
      scrollToBottom();
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoScrollOnOpen]);

  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
    if (!isOpen) setSearchQuery('');
  }, [isOpen, searchable]);

  const handleSelect = (option) => {
    if (disabled) return;
    onChange({
      target: {
        name,
        value: option.value,
      },
    });
    setIsOpen(false);
    setSearchQuery('');
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-2.5 text-sm
          bg-background border border-border rounded-xl outline-none
          focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500
          transition-all duration-200 text-foreground font-medium cursor-pointer
          hover:border-blue-500/40 hover:shadow-sm
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isOpen ? 'ring-2 ring-blue-500/15 border-blue-500 shadow-sm' : ''}
        `}
      >
        <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
          {LeftIcon && <span className="text-muted-foreground shrink-0">{LeftIcon}</span>}
          {selectedOption ? (
            <div className="flex items-center gap-2 overflow-hidden">
              {selectedOption.dotColor && (
                <span className={`w-2 h-2 rounded-full shrink-0 ${selectedOption.dotColor}`} />
              )}
              {selectedOption.icon && (
                <span className="shrink-0">{selectedOption.icon}</span>
              )}
              <span className="truncate text-foreground font-medium">{selectedOption.label}</span>
            </div>
          ) : (
            <span className="text-muted-foreground/50 truncate font-normal">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground/60 transition-transform duration-300 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-blue-500' : ''
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`
            absolute z-[200] w-full
            bg-card/95 backdrop-blur-xl
            border border-border/80
            rounded-xl shadow-2xl
            overflow-hidden
            animate-in fade-in duration-150
            ${openDirection === 'top'
              ? 'bottom-full mb-1.5 slide-in-from-bottom-2'
              : 'top-full mt-1.5 slide-in-from-top-2'
            }
          `}
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)' }}
        >
          {/* Search Bar */}
          {searchable && (
            <div className="p-2 border-b border-border/60">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-border/60 rounded-lg outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500/60 transition-all placeholder:text-muted-foreground/40"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-52 overflow-y-auto py-1 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-xs text-muted-foreground text-center flex flex-col items-center gap-1">
                <span className="text-muted-foreground/40 text-lg">∅</span>
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full flex items-center justify-between
                      px-3.5 py-2.5 text-sm text-left
                      transition-all duration-150 font-medium cursor-pointer
                      group relative
                      ${isSelected
                        ? 'bg-blue-500/8 dark:bg-blue-500/12 text-blue-600 dark:text-blue-400'
                        : 'text-foreground/80 hover:bg-muted/60 hover:text-foreground'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {option.dotColor && (
                        <span className={`w-2 h-2 rounded-full shrink-0 ring-1 ring-white/20 ${option.dotColor}`} />
                      )}
                      {option.icon && (
                        <span className={`shrink-0 transition-colors ${isSelected ? 'text-blue-500' : 'text-muted-foreground group-hover:text-foreground'}`}>
                          {option.icon}
                        </span>
                      )}
                      <span className="truncate">{option.label}</span>
                    </div>
                    {isSelected && (
                      <Check size={13} className="text-blue-500 shrink-0 ml-2 animate-in zoom-in-50 duration-150" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
