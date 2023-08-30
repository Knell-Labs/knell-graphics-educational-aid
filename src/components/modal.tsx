import React, { FC, ReactNode, useEffect } from 'react';

interface ModalProps {
  title?:     string;
  isOpen:     boolean;
  onClose:    () => void;
  children?:  ReactNode;
}

const Modal: FC<ModalProps> = ({ title, isOpen, onClose, children }) => {

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const visibilityClass = isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';

  return (
    <div className={`text-black fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${visibilityClass}`}>
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity duration-500"></div>
      <div className={`bg-white p-8 w-1/2 rounded-lg shadow-lg relative z-10 transition-transform transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-4 scale-95'}`}>
        <div className="flex justify-between items-center text-2xl font-bold">
          <div>{title}</div>
          <button
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div style={{whiteSpace: 'pre-line'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
