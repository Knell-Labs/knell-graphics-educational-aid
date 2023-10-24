import React, { useState, useRef, useEffect, ButtonHTMLAttributes } from 'react';

interface DropdownItem {
  label: string;
  callback: () => void;
}

interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  items: DropdownItem[];
  variant?: 'primary' | 'secondary' | 'outline' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  items,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  let baseClasses =
    'font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition';

  let colorClasses: string;
  let sizeClasses: string;

  switch (variant) {
    case 'primary':
      colorClasses = 'bg-indigo-600 hover:bg-indigo-700 text-white';
      break;
    case 'secondary':
      colorClasses = 'bg-gray-300 hover:bg-gray-400 text-gray-800';
      break;
    case 'outline':
      colorClasses = 'border border-indigo-500 hover:border-indigo-600 text-indigo-500 hover:text-indigo-600';
      break;
    case 'disabled':
      colorClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';
      break;
    default:
      colorClasses = 'bg-indigo-600 hover:bg-indigo-700 text-white';
      break;
  }

  switch (size) {
    case 'small':
      sizeClasses = 'py-1 px-3 text-sm';
      break;
    case 'medium':
      sizeClasses = 'py-2 px-4 text-md';
      break;
    case 'large':
      sizeClasses = 'py-3 px-6 text-lg';
      break;
    default:
      sizeClasses = 'py-2 px-4 text-md';
      break;
  }

  const fullWidthClasses = fullWidth ? 'w-full' : '';

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${baseClasses} ${colorClasses} ${sizeClasses} ${fullWidthClasses}`}
        {...props}
      >
        {children}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white">
          <div className="rounded-md shadow-xs">
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.callback();
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
