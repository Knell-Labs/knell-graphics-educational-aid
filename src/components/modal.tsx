import React, { FC, ReactNode, useEffect } from 'react';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
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

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300">{title}</div>
      <div className="text-black bg-white p-8 w-1/2 rounded-lg shadow-lg relative z-10 transition-transform transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-4 scale-95'}">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg font-bold"
        >
          &times;
        </button>
        <div style={{whiteSpace: 'pre-line'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
