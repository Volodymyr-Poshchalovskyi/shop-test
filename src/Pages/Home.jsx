import React, { useEffect, useState } from "react";
import { ArrowRight, PenSquare, Phone, Truck, CreditCard } from "lucide-react";
import CountdownTimer from "../Components/CountdownTimer";
import OrderForm from "../Components/OrderForm";
import { Link } from "react-router-dom";

// Зображення image1 та universalBlockImage видалені, оскільки вони більше не використовуються
import image3 from "../assets/images/IMG_2867.webp";
// Крок 1: Імпортуємо зображення Watermarks.webp
import watermarksImage from "../assets/images/Watermarks.webp";
// Імпортуємо відео
import promoVideo from "../assets/images/Video.mp4";

export default function Home() {
  // Стейт для лічильника продажів з перевіркою localStorage
  const [soldCount, setSoldCount] = useState(() => {
    const saved = localStorage.getItem("soldToday");
    return saved !== null ? parseInt(saved, 10) : 426;
  });

  // Стейт для тригеру анімації
  const [animateSold, setAnimateSold] = useState(false);

  useEffect(() => {
    const incrementCount = () => {
      setSoldCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("soldToday", newCount.toString());
        return newCount;
      });

      // Запускаємо анімацію на 600 мс (час виконання CSS keyframes)
      setAnimateSold(true);
      setTimeout(() => setAnimateSold(false), 600);
    };

    let intervalId;

    // Перше додавання через 10 секунд
    const timeoutId = setTimeout(() => {
      incrementCount();
      
      // Після першого разу запускаємо інтервал кожні 60 секунд
      intervalId = setInterval(incrementCount, 60000);
    }, 10000);

    // Очищення таймаутів та інтервалів при розмонтуванні компонента
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []); // Порожній масив залежностей: ефект виконується лише раз при монтуванні

  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl font-sans text-gray-800">
      <style>{`
        @keyframes gentleJump {
          0%, 100% { transform: translateY(0); }
          10% { transform: translateY(-8px); }
          20% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
          40% { transform: translateY(0); }
        }
        .price-jump {
          animation: gentleJump 5s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 75%, 100% { box-shadow: 0 5px 15px rgba(220,38,38,0.5); transform: scale(1); }
          85% { box-shadow: 0 0 25px rgba(220,38,38,0.9); transform: scale(1.03); }
          92% { box-shadow: 0 0 15px rgba(220,38,38,0.7); transform: scale(1.01); }
        }
        .btn-glow {
          animation: pulseGlow 4s infinite;
        }
        
        /* Анімація для лічильника продажів */
        @keyframes popIn {
          0% { transform: scale(1); color: #dc2626; }
          50% { transform: scale(1.3); color: #ef4444; }
          100% { transform: scale(1); color: #dc2626; }
        }
        .animate-pop {
          animation: popIn 0.6s ease-out;
          display: inline-block;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>

      <main>
        {/* Верхня панель */}
        <div className="bg-gray-50 flex justify-center items-center gap-4 sm:gap-6 py-2 text-[13px] sm:text-sm font-bold text-gray-700 border-b border-gray-200">
          <div className="flex items-center gap-1 text-green-700">
            <span className="text-lg leading-none">✓</span> 100% проростання
          </div>
          <div className="flex items-center gap-1 text-blue-800">
            <span className="text-lg leading-none">🇺🇦</span> По всій Україні
          </div>
        </div>

        {/* Таймер та Блок продажів */}
        <div className="sticky top-0 z-50 bg-white border-b-2 border-green-700 shadow-md py-1.5 px-2 flex flex-col items-center justify-center">
          <CountdownTimer />
          
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-xs font-medium text-gray-600">Продано сьогодні:</span>
            <span className={`text-red-600 font-bold text-sm ${animateSold ? "animate-pop" : ""}`}>
              {soldCount}
            </span>
            <span className="text-sm leading-none" aria-hidden="true">🔥</span>
          </div>
        </div>

        {/* Заголовок (З оптимізацією H1 для SEO) */}
        <div className="p-5 text-center mt-2 rounded-xl shadow-md">
          <h1 className="sr-only">Купити квіти метелики в Україні</h1>
          
          <div 
            className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-green-500 mb-3 uppercase tracking-wider drop-shadow-md" 
            aria-hidden="true"
          >
            Квіти метелики
          </div>
          
          <div className="inline-flex items-center gap-1 bg-green-50 border border-green-100 px-3 py-1 rounded-full text-sm font-bold text-green-800 mb-3">
            <span className="text-base leading-none">🇳🇱</span> Оригінальне насіння з Нідерландів
          </div>
          <p className="text-gray-600 font-medium mb-4">Найкращі сорта, які швидко ростуть</p>
          
          <img src="/IMG_2863.webp" alt="Квіти метелики" loading="eager" fetchpriority="high" className="w-full h-auto object-cover" />
          
          <img 
            src={watermarksImage} 
            alt="Відгуки та гарантія якості" 
            className="w-full h-auto object-contain -mb-5" 
          />
        </div>

        {/* Блок цін */}
        <div className="bg-green-800 text-white flex justify-between items-center w-full px-6 py-4 shadow-inner mt-2">
          <div className="flex flex-col items-center price-jump" style={{ animationDelay: "0s" }}>
            <span className="text-sm text-green-200">Звичайна ціна</span>
            <span className="text-2xl line-through font-semibold text-gray-300">550 грн</span>
          </div>
          <ArrowRight size={32} className="text-green-400" />
          <div className="flex flex-col items-center price-jump" style={{ animationDelay: "0.15s" }}>
            <span className="text-sm text-green-100 font-bold">Акційна ціна</span>
            <span className="text-3xl font-extrabold text-yellow-400 drop-shadow-md">275 грн</span>
          </div>
        </div>

        {/* Кнопка CTA з пульсацією btn-glow */}
        <div className="px-4 mt-6 mb-4">
          <button
            onClick={scrollToForm}
            className="btn-glow w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-5 rounded-full transform transition active:scale-95 uppercase"
          >
            Замовити зі знижкою
          </button>
        </div>

        {/* Переваги */}
        <div className="px-5 py-6 mt-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 uppercase">Що робить ці квіти ідеальними</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">🦋</span><p><b>Природний магніт</b> — приваблює метеликів і бджіл прямо до вас у сад.</p></li>
            <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">🌱</span><p><b>Справжній багаторічник</b> — один раз посадили, роками насолоджуєтесь.</p></li>
            <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">❄️</span><p><b>Морозостійкий</b> — витримує до −20°C без укриття.</p></li>
          </ul>

          {/* ТУТ ВСТАВЛЕНО ВІДЕО */}
          {/* Класи 'rounded-lg mt-6 shadow-md' додані для стилізації під фото, що йде нижче */}
          <video 
            src={promoVideo}
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            className="w-full h-auto object-cover rounded-lg mt-6 shadow-md"
          />

          {/* Фото, що йде ПІСЛЯ тексту та відео */}
          <img src={image3} alt="Сад з квітами метеликами" loading="lazy" decoding="async" className="w-full rounded-lg mt-6 shadow-md" />
        </div>

        {/* Як замовити */}
        <div className="bg-[#366843] py-8 px-4 text-white mt-4">
          <h2 className="text-2xl font-extrabold text-center mb-6 drop-shadow-md">Як зробити<br />замовлення?</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
              <PenSquare size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Заявка</h3><p className="text-xs leading-tight">Залиште заявку на сайті</p>
            </div>
            <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
              <Phone size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Дзвінок</h3><p className="text-xs leading-tight">Наш менеджер уточнює деталі</p>
            </div>
            <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
              <Truck size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Відправка</h3>
              <p className="text-xs leading-tight">Доставка 1-3 дні<br />(Нова / Укрпошта)</p>
            </div>
            <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
              <CreditCard size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Оплата</h3><p className="text-xs leading-tight">Без передоплат! Сплачуєте при отриманні</p>
            </div>
          </div>
        </div>

        {/* Форма */}
        <OrderForm />
      </main>

      <footer className="py-8 bg-gray-900 text-gray-400 text-center text-sm px-4">
        <div className="mb-4 text-left text-xs text-gray-500 leading-relaxed border-b border-gray-700 pb-4">
          <p>Оригінальне насіння квітів-метеликів. Ми здійснюємо швидку доставку по всій Україні, включаючи Київ, Львів, Одесу, Дніпро, Харків та інші міста та села. Замовляйте якісні багаторічні рослини для вашого саду та балкону недорого. Оплата після огляду на пошті (накладений платіж).</p>
        </div>
        <div>
          <Link to="/privacy-policy" className="underline hover:text-white transition">
            Політика конфіденційності
          </Link>
        </div>
      </footer>
    </div>
  );
}