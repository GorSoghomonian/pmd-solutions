"use client";
import { useState } from 'react';

export default function PageNotAvailableModal({ isOpen, onClose, serviceName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Страница в разработке
          </h3>
          <p className="text-gray-600 mb-6">
            Страница "{serviceName}" пока недоступна. Мы активно работаем над её созданием и скоро она будет готова!
          </p>
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Понятно
            </button>
            <button
              onClick={() => {
                onClose();
                window.location.href = `${window.location.pathname.split('/').slice(0, 2).join('/')}/services`;
              }}
              className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Перейти к услугам
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function usePageNotAvailableModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');

  const showModal = (name) => {
    setServiceName(name);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setServiceName('');
  };

  return {
    Modal: () => <PageNotAvailableModal isOpen={isOpen} onClose={hideModal} serviceName={serviceName} />,
    showModal,
    hideModal
  };
}
