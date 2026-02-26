"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  CheckCircle2,
  PenSquare,
  Phone,
  Truck,
  CreditCard,
} from "lucide-react";

export default function Home() {
  // Логіка таймера
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 4,
    minutes: 59,
    seconds: 6,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => value.toString().padStart(2, "0");

  const scrollToForm = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Головний контейнер з обмеженою шириною для мобільного вигляду
    <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl pb-10 font-sans text-gray-800">
      
      {/* Закріплений пульсуючий таймер */}
      <div className="sticky top-0 z-50 bg-white border-b-2 border-green-700 shadow-md p-2 flex flex-col items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
        <div className="text-sm font-bold text-gray-700 mb-1">
          До кінця акції залишилось:
        </div>
        <div className="flex gap-2 text-3xl font-bold text-gray-900">
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.days)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">днів</span>
          </div>
          <span className="pb-3">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.hours)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">годин</span>
          </div>
          <span className="pb-3">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.minutes)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">хвилин</span>
          </div>
          <span className="pb-3">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.seconds)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">секунд</span>
          </div>
        </div>
      </div>

      {/* Заголовок і перше фото */}
      <div className="p-4 text-center">
        <h1 className="text-3xl font-extrabold text-green-800 mb-2 uppercase">
          Квіти метелики
        </h1>
        <p className="text-gray-600 font-medium mb-4">
          Найкращі сорти, які швидко ростуть
        </p>
        <img
          src="../Gemini_Generated_Image_v42zsyv42zsyv42z.png"
          alt="Квіти метелики"
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>

      {/* Червоний блок з ціною */}
      <div className="bg-red-600 text-white flex justify-between items-center w-full px-6 py-3 shadow-inner">
        <div className="flex flex-col items-center">
          <span className="text-sm text-red-200">Звичайна ціна</span>
          <span className="text-2xl line-through font-semibold text-gray-200">
            799 грн
          </span>
        </div>
        <ArrowRight size={32} className="text-white" />
        <div className="flex flex-col items-center">
          <span className="text-sm text-red-100 font-bold">Акційна ціна</span>
          <span className="text-3xl font-extrabold text-yellow-300">
            349 грн
          </span>
        </div>
      </div>

      {/* Головна кнопка замовлення */}
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
            Неймовірні квіти в формі метеликів
          </h2>
          <img src="../Gemini_Generated_Image_p65t00p65t00p65t.png" alt="Квіти" className="w-full rounded-lg mb-4" />
          <p>
            <b>Краса вашого саду ніколи не з’являється раптово.</b> Спочатку це
            лише маленьке бажання додати кольору, трохи життя або затишку біля
            дому. Здається, що вистачить кількох квітів і простір оживе сам по
            собі.
          </p>
          <p className="mt-2">
            Та з часом приходить розуміння: те, чим ви милуєтесь у красивих
            садах чи на фото, — це результат правильного вибору рослин, турботи
            та якісного догляду. Без цього квіти ростуть слабкими.
          </p>
          <p className="mt-2 font-semibold text-green-700">
            Саме тому все починається з першого кроку — вибору здорових,
            сильних квітів, які легко приживаються та швидко адаптуються.
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            Чому обирають наші квіти метелики
          </h2>
          <p>
            Наші квіти обирають за простоту, надійність і легкість у догляді.
            Вони ідеально підходять навіть тим, хто ніколи не займався
            садівництвом. Квіти у формі метеликів додають вашому саду або
            балкону незвичної краси, нагадуючи витончені крила.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            Універсальні для будь-якого простору
          </h2>
          <img src="../Gemini_Generated_Image_nzuopdnzuopdnzuo.png" alt="Універсальні квіти" className="w-full rounded-lg mb-4" />
          <p>
            Ці квіти настільки універсальні, що легко адаптуються навіть у
            місцях із мінливими умовами освітлення чи обмеженим простором.
            Вони чудово розвиваються як на сонячних, так і на напівтіньових
            ділянках.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            Багаторічна краса рік за роком
          </h2>
          <p>
            Ці квіти справжній міцний багаторічник: посадіть їх один раз, і вони
            радуватимуть вас багато років поспіль. Кожної весни свіже листя та
            ніжні квіти з’являються знову.
          </p>
        </div>
      </div>

      {/* Кнопка посередині сторінки */}
      <div className="px-4 py-4">
        <button 
          onClick={scrollToForm}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 rounded-xl shadow-lg transform transition active:scale-95 uppercase"
        >
          Замовити зараз
        </button>
      </div>

      {/* Переваги (список) */}
      <div className="px-5 py-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 uppercase">
          Що робить ці квіти ідеальними
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 shrink-0 mt-1" />
            <p><b>Природний магніт для запилювачів</b> – Приваблює колібрі, метеликів та бджіл.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 shrink-0 mt-1" />
            <p><b>Багаторічна рослина</b> – Посадіть один раз, насолоджуйтеся свіжими квітами цілий рік.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 shrink-0 mt-1" />
            <p><b>Ідеально підходить скрізь</b> – Для садів, балконів та віконних ящиків.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 shrink-0 mt-1" />
            <p><b>Морозостійкий</b> – Витримує температури до -20°C.</p>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 shrink-0 mt-1" />
            <p><b>Добре росте в півтіні</b> – Найкраще росте в добре провітрюваних місцях з непрямим світлом.</p>
          </li>
        </ul>
      </div>

      {/* Відгуки */}
      <div className="bg-gray-50 py-8 px-5">
        <h2 className="text-2xl font-bold text-center mb-6">Відгуки клієнтів</h2>
        <div className="space-y-4">
          {/* Відгук 1 */}
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex text-yellow-400 mb-2">
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
            </div>
            <p className="text-gray-700 italic text-sm mb-3">
              "Ці квіти стали справжньою прикрасою мого двору! Я завжди хотіла
              додати більше зеленої краси на вхід, і ці рослини ідеально
              підходять. Вони неймовірно стильні."
            </p>
            <div className="font-bold text-sm text-gray-900">- Оксана Петренко, 42 роки</div>
          </div>
          {/* Відгук 2 */}
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex text-yellow-400 mb-2">
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
            </div>
            <p className="text-gray-700 italic text-sm mb-3">
              "Квіти просто неймовірні! Я ніколи не бачила такого поєднання
              кольорів і форми. Виглядають як живі метелики, які додають
              відчуття легкості."
            </p>
            <div className="font-bold text-sm text-gray-900">- Лідія Ковальчук, 39 років</div>
          </div>
        </div>
      </div>

      {/* Як замовити (Стиль зі скріншоту 2) */}
      <div className="bg-[#366843] py-8 px-4 text-white">
        <h2 className="text-2xl font-extrabold text-center mb-6 drop-shadow-md">
          Як зробити<br />замовлення?
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <PenSquare size={40} className="mb-2" />
            <h3 className="font-bold text-lg mb-1">Заявка</h3>
            <p className="text-xs leading-tight">Залиште заявку на сайті</p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <Phone size={40} className="mb-2" />
            <h3 className="font-bold text-lg mb-1">Дзвінок</h3>
            <p className="text-xs leading-tight">Наш менеджер уточнює деталі</p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <Truck size={40} className="mb-2" />
            <h3 className="font-bold text-lg mb-1">Відправка</h3>
            <p className="text-xs leading-tight">Доставляємо ваш товар 1-3 днів</p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <CreditCard size={40} className="mb-2" />
            <h3 className="font-bold text-lg mb-1">Отримання</h3>
            <p className="text-xs leading-tight">Сплачуєте при отриманні</p>
          </div>
        </div>
      </div>

      {/* Форма замовлення */}
      <div id="order-form" className="p-5 mt-6 border-t-4 border-gray-100">
        <h2 className="text-2xl font-black text-center text-red-600 mb-2 uppercase">
          Замовляйте зараз - Отримуйте знижку 50%
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Наш менеджер зв’яжеться з вами для консультації та допоможе оформити замовлення.
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ім'я та прізвище
            </label>
            <input
              type="text"
              placeholder="Введіть ваше ім'я"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер телефону
            </label>
            <input
              type="tel"
              placeholder="+38 (000) 000-00-00"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xl py-4 mt-2 rounded-xl shadow-lg transform transition active:scale-95 uppercase"
          >
            Замовити (349 грн)
          </button>
        </form>
      </div>

      {/* Футер */}
      <footer className="mt-8 py-6 bg-gray-900 text-gray-400 text-center text-sm space-y-3">
        <div className="font-bold text-white text-lg">SHOP</div>
        <div>
          <a href="#" className="underline hover:text-white transition">
            Політика конфіденційності
          </a>
        </div>
        <div>
          <a href="#" className="underline hover:text-white transition">
            Правила повернення та обміну товару
          </a>
        </div>
        <div className="px-4 text-xs mt-4 opacity-70">
          Україна, вул. Шевченка, м. Львів, Львівська обл.
        </div>
      </footer>
    </div>
  );
}