import React from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all animate-bounce-short">
        <style>{`
          @keyframes bounceShort {
            0% { transform: scale(0.9); opacity: 0; }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-short {
            animation: bounceShort 0.3s ease-out forwards;
          }
        `}</style>

        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h3
          className="font-black text-gray-900 mb-2 uppercase"
          style={{ WebkitTextSizeAdjust: "100%", fontSize: "26px", lineHeight: "1.2" }}
        >
          Дякуємо!
        </h3>

        <p className="text-gray-600 mb-6 font-medium">
          Вашу заявку успішно прийнято. Наш менеджер зв'яжеться з вами найближчим часом для підтвердження.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg transition-colors"
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
}