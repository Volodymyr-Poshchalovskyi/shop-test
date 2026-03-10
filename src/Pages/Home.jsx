"use client";
import React, { useEffect } from "react";
import { ArrowRight, Star, PenSquare, Phone, Truck, CreditCard } from "lucide-react";

// Імпортуємо наші нові модулі
import { useTimer } from "../Hooks/useTimer";
import OrderForm from "../Components/OrderForm";

// Імпорт зображень (шляхи залишаються твоїми)
import mainImage from "../assets/images/IMG_2863.PNG";
import universalBlockImage from "../assets/images/IMG_2871.PNG";
import image1 from "../assets/images/IMG_2859.PNG";
import image2 from "../assets/images/IMG_2865.PNG";
import image3 from "../assets/images/IMG_2867.PNG";
import image4 from "../assets/images/IMG_2869.PNG";

export default function Home() {
  const { timeLeft, formatTime } = useTimer({ days: 0, hours: 0, minutes: 26, seconds: 13 });

  useEffect(() => {
  }, []);

  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl pb-10 font-sans text-gray-800">
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
      `}</style>

      {/* Верхня панель */}
      <div className="bg-gray-50 flex justify-center items-center gap-6 py-2 text-sm font-bold text-gray-700 border-b border-gray-200">
        <div className="flex items-center gap-1 text-green-700">
          <span className="text-lg leading-none">✓</span> 100% проростання
        </div>
        <div className="flex items-center gap-1">
          <span className="text-lg leading-none">🇳🇱</span> Нідерланди
        </div>
      </div>

      {/* Таймер */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-green-700 shadow-md p-2 flex flex-col items-center justify-center">
        <div className="text-sm font-bold text-gray-700 mb-1">До кінця акції:</div>
        <div className="flex gap-2 text-3xl font-bold text-gray-900 animate-pulse">
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.days)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">днів</span>
          </div>
          <span className="pb-3 text-gray-900">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.hours)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">годин</span>
          </div>
          <span className="pb-3 text-gray-900">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.minutes)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">хвилин</span>
          </div>
          <span className="pb-3 text-gray-900">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.seconds)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">секунд</span>
          </div>
        </div>
      </div>

      {/* Заголовок */}
      <div className="p-4 text-center">
        <h1 className="text-3xl font-extrabold text-green-800 mb-2 uppercase">Квіти метелики</h1>
        <p className="text-gray-600 font-medium mb-4">Найкращі сорти, які швидко ростуть</p>
        <img src={mainImage} alt="Квіти метелики" className="w-full h-auto rounded-xl shadow-md object-cover" />
      </div>

      {/* Блок цін */}
      <div className="bg-green-800 text-white flex justify-between items-center w-full px-6 py-4 shadow-inner">
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

      {/* Кнопка CTA */}
      <div className="px-4 mt-4">
        <button
          onClick={scrollToForm}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-5 rounded-full shadow-[0_5px_15px_rgba(220,38,38,0.5)] transform transition active:scale-95 uppercase"
        >
          Замовити зі знижкою
        </button>
      </div>

      {/* Опис */}
      <div className="px-5 py-8 space-y-6 text-md leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            Неймовірні квіти з цвітом у формі метеликів
          </h2>
          <img src={image1} alt="Квіти" className="w-full rounded-lg mb-4" />
          <p>Краса саду не виникає сама по собі. Вона починається з маленького бажання — додати кольору, затишку, трохи живого навколо. Здається, достатньо кількох квітів — і все заграє.</p>
          <p className="mt-2">Але з часом стає зрозуміло: те, чим ви захоплюєтесь у гарних садах або на фото, — це завжди результат правильного вибору. Правильних рослин. Правильного старту.</p>
          <p className="mt-2 font-semibold text-green-700">Все починається з першого кроку — вибору квітів, які живуть, ростуть і радують без зайвих зусиль.</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">Чому обирають наші квіти метелики</h2>
          <p>Квіти-метелики — це не просто рослина. Це характер у вашому саду. Їхні пелюстки, що нагадують крила метелика, перетворюють будь-який куточок — балкон, клумбу чи підвіконня — на щось справді особливе. При цьому вони невибагливі, витривалі та ідеальні навіть для тих, хто починає з нуля.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">🌿 Універсальні для будь-якого простору</h2>
          <img src={universalBlockImage} alt="Універсальні квіти" className="w-full rounded-lg mb-4" />
          <p>Однаково добре почуваються на сонці та в напівтіні, у відкритому саду та на обмеженій площі балкону. Адаптуються — і розквітають.</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">🌸 Багаторічна краса рік за роком</h2>
          <p>Посадіть один раз — і вони повертатимуться щовесни. Свіже листя, ніжні квіти, без повторних витрат.</p>
          <img src={image2} alt="Багаторічні квіти метелики" className="w-full rounded-lg mt-4" />
        </div>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={scrollToForm}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 rounded-xl shadow-lg transform transition active:scale-95 uppercase"
        >
          Замовити зараз
        </button>
      </div>

      {/* Переваги */}
      <div className="px-5 py-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 uppercase">Що робить ці квіти ідеальними</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">🦋</span><p><b>Природний магніт для живої природи</b> — приваблює метеликів і бджіл прямо до вас у сад.</p></li>
          <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">🌱</span><p><b>Справжній багаторічник</b> — один раз посадили, роками насолоджуєтесь.</p></li>
          <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">📍</span><p><b>Підходить скрізь</b> — сад, балкон, горщик на підвіконні.</p></li>
          <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">❄️</span><p><b>Морозостійкий</b> — витримує до −20°C без укриття.</p></li>
          <li className="flex items-start gap-3"><span className="text-xl shrink-0 leading-none mt-1">🌤️</span><p><b>Любить розсіяне світло</b> — добре росте в добре провітрюваних місцях із м'яким освітленням.</p></li>
        </ul>
        <img src={image3} alt="Сад з квітами метеликами" className="w-full rounded-lg mt-6" />
      </div>

      {/* Відгуки */}
      <div className="bg-gray-50 py-8 px-5">
        <h2 className="text-2xl font-bold text-center mb-6">Відгуки клієнтів</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex text-yellow-400 mb-2">
              <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
            </div>
            <p className="text-gray-700 italic text-sm mb-3">"Я навіть не очікувала такого ефекту. Посадила біля входу — і тепер сусіди зупиняються та питають, що це за квіти. Двір виглядає так, ніби над ним працював дизайнер. А я просто посадила та полила."</p>
            <div className="font-bold text-sm text-gray-900">- Алла Ковальчук</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex text-yellow-400 mb-2">
              <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
            </div>
            <p className="text-gray-700 italic text-sm mb-3">"Чесно? Я скептично ставилась до покупки квітів онлайн. Але коли вони зацвіли — я просто стояла і дивилась. Це справді схоже на метеликів, що зависли над землею. Моя донька думала, що це декор із магазину."</p>
            <div className="font-bold text-sm text-gray-900">- Марина Нестеренко</div>
          </div>
        </div>
      </div>

      {/* Як замовити */}
      <div className="bg-[#366843] py-8 px-4 text-white">
        <h2 className="text-2xl font-extrabold text-center mb-6 drop-shadow-md">Як зробити<br />замовлення?</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <PenSquare size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Заявка</h3><p className="text-xs leading-tight">Залиште заявку на сайті</p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <Phone size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Дзвінок</h3><p className="text-xs leading-tight">Наш менеджер уточнює деталі</p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <Truck size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Відправка</h3><p className="text-xs leading-tight">Доставляємо ваш товар 1-3 днів</p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <CreditCard size={40} className="mb-2" /><h3 className="font-bold text-lg mb-1">Отримання</h3><p className="text-xs leading-tight">Сплачуєте при отриманні</p>
          </div>
        </div>
        <img src={image4} alt="Деталі квітів метеликів" className="w-full rounded-lg mt-8" />
      </div>

      {/* Підключаємо винесену Форму */}
      <OrderForm />

      <footer className="mt-8 py-6 bg-gray-900 text-gray-400 text-center text-sm">
        <div><a href="#" className="underline hover:text-white transition">Політика конфіденційності</a></div>
      </footer>
    </div>
  );
}