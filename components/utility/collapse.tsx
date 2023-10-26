import React, { useState, useRef, useEffect } from 'react';

interface CollapseProps {
  title:    string;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [isOpen]);

  return (
    <div className="w-full">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 mt-2"
      >
        <div className="p-5 border border-gray-300 rounded">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
