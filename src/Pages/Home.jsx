"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Star,
  PenSquare,
  Phone,
  Truck,
  CreditCard,
} from "lucide-react";
import mainImage from "../assets/images/IMG_2863.PNG";
import universalBlockImage from "../assets/images/IMG_2871.PNG";
import image1 from "../assets/images/IMG_2859.PNG";
import image2 from "../assets/images/IMG_2865.PNG";
import image3 from "../assets/images/IMG_2867.PNG";
import image4 from "../assets/images/IMG_2869.PNG";

export default function Home() {
  // Логіка таймера
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 26,
    seconds: 13,
  });

  // Стани для форми (окремо код країни та сам номер)
  const [formData, setFormData] = useState({
    name: "",
    phoneCode: "+(380)",
    phoneLocal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Отримання IP-адреси
    const fetchUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log("IP користувача:", data.ip);
      } catch (error) {
        console.error("Помилка при отриманні IP:", error);
      }
    };

    fetchUserIP();

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

  // Валідація імені (лише букви, пробіли, макс 3 слова)
  const handleNameChange = (e) => {
    let val = e.target.value;

    // Залишаємо тільки літери (будь-якої мови) та пробіли
    val = val.replace(/[^\p{L}\s]/gu, "");

    // Забороняємо кілька пробілів підряд
    val = val.replace(/\s{2,}/g, " ");

    // Розбиваємо на слова і залишаємо максимум 3
    const words = val.trimStart().split(" ");
    if (words.length > 3) {
      val = words.slice(0, 3).join(" ") + " ";
    }

    setFormData((prev) => ({ ...prev, name: val }));
  };

  // Валідація та форматування локальної частини телефону
  const handlePhoneLocalChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");

    // Логіка для України
    if (formData.phoneCode === "+(380)") {
      // Якщо юзер за звичкою ввів "0" на початку (напр. 095), прибираємо його
      if (digits.startsWith("0")) {
        digits = digits.substring(1);
      }

      digits = digits.slice(0, 9); // В Україні 9 цифр після +380

      // Форматування: 955 15 66 52
      let formatted = digits;
      if (digits.length > 3)
        formatted = digits.slice(0, 3) + " " + digits.slice(3);
      if (digits.length > 5)
        formatted = formatted.slice(0, 6) + " " + formatted.slice(6);
      if (digits.length > 7)
        formatted = formatted.slice(0, 9) + " " + formatted.slice(9);

      setFormData((prev) => ({ ...prev, phoneLocal: formatted }));
    } else {
      // Логіка для інших країн (до 15 цифр, без жорстких пробілів)
      digits = digits.slice(0, 15);
      setFormData((prev) => ({ ...prev, phoneLocal: digits }));
    }
  };

  // Зміна коду країни
  const handleCountryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      phoneCode: e.target.value,
      phoneLocal: "", // Очищаємо ввід при зміні країни
    }));
  };

  // Відправка форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевірка на заповненість для України
    const pureDigits = formData.phoneLocal.replace(/\D/g, "");
    if (formData.phoneCode === "+(380)" && pureDigits.length < 9) {
      alert("Будь ласка, введіть повний номер телефону.");
      return;
    }

    setIsSubmitting(true);

    // Склеюємо код країни та номер. 
    // ДОДАЄМО ' (апостроф) на початок, щоб Google Таблиці сприймали це як текст, а не формулу!
    const finalDataToSubmit = {
      name: formData.name.trim(),
      phone: `'${formData.phoneCode} ${formData.phoneLocal}`.trim(),
    };

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwAJo9JJp6dUBkqTeerXy-APkPDajJD90qwreHVYJjxEBTXxILDPdavzbsm67Zz6joi/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalDataToSubmit),
      });

      setIsSuccess(true);
      setFormData({ name: "", phoneCode: "+(380)", phoneLocal: "" });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Помилка відправки:", error);
      alert("Сталася помилка при відправці. Перевірте з'єднання.");
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="text-sm font-bold text-gray-700 mb-1">
          До кінця акції:
        </div>
        <div className="flex gap-2 text-3xl font-bold text-gray-900 animate-pulse">
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.days)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">
              днів
            </span>
          </div>
          <span className="pb-3 text-gray-900">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.hours)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">
              годин
            </span>
          </div>
          <span className="pb-3 text-gray-900">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.minutes)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">
              хвилин
            </span>
          </div>
          <span className="pb-3 text-gray-900">:</span>
          <div className="flex flex-col items-center">
            <span>{formatTime(timeLeft.seconds)}</span>
            <span className="text-[10px] font-normal text-gray-500 uppercase">
              секунд
            </span>
          </div>
        </div>
      </div>

      {/* Заголовок */}
      <div className="p-4 text-center">
        <h1 className="text-3xl font-extrabold text-green-800 mb-2 uppercase">
          Квіти метелики
        </h1>
        <p className="text-gray-600 font-medium mb-4">
          Найкращі сорти, які швидко ростуть
        </p>
        <img
          src={mainImage}
          alt="Квіти метелики"
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>

      {/* Блок цін */}
      <div className="bg-green-800 text-white flex justify-between items-center w-full px-6 py-4 shadow-inner">
        <div
          className="flex flex-col items-center price-jump"
          style={{ animationDelay: "0s" }}
        >
          <span className="text-sm text-green-200">Звичайна ціна</span>
          <span className="text-2xl line-through font-semibold text-gray-300">
            550 грн
          </span>
        </div>

        <ArrowRight size={32} className="text-green-400" />

        <div
          className="flex flex-col items-center price-jump"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-sm text-green-100 font-bold">
            Акційна ціна
          </span>
          <span className="text-3xl font-extrabold text-yellow-400 drop-shadow-md">
            275 грн
          </span>
        </div>
      </div>

      {/* Кнопка */}
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
          <img
            src={image1}
            alt="Квіти"
            className="w-full rounded-lg mb-4"
          />
          <p>
            Краса саду не виникає сама по собі. Вона починається з маленького
            бажання — додати кольору, затишку, трохи живого навколо. Здається,
            достатньо кількох квітів — і все заграє.
          </p>
          <p className="mt-2">
            Але з часом стає зрозуміло: те, чим ви захоплюєтесь у гарних садах
            або на фото, — це завжди результат правильного вибору. Правильних
            рослин. Правильного старту.
          </p>
          <p className="mt-2 font-semibold text-green-700">
            Все починається з першого кроку — вибору квітів, які живуть,
            ростуть і радують без зайвих зусиль.
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            Чому обирають наші квіти метелики
          </h2>
          <p>
            Квіти-метелики — це не просто рослина. Це характер у вашому саду.
            Їхні пелюстки, що нагадують крила метелика, перетворюють будь-який
            куточок — балкон, клумбу чи підвіконня — на щось справді особливе.
            При цьому вони невибагливі, витривалі та ідеальні навіть для тих,
            хто починає з нуля.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            🌿 Універсальні для будь-якого простору
          </h2>
          <img
            src={universalBlockImage}
            alt="Універсальні квіти"
            className="w-full rounded-lg mb-4"
          />
          <p>
            Однаково добре почуваються на сонці та в напівтіні, у відкритому саду
            та на обмеженій площі балкону. Адаптуються — і розквітають.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-center text-green-800 mb-3 uppercase">
            🌸 Багаторічна краса рік за роком
          </h2>
          <p>
            Посадіть один раз — і вони повертатимуться щовесни. Свіже листя, ніжні
            квіти, без повторних витрат.
          </p>
          <img
            src={image2}
            alt="Багаторічні квіти метелики"
            className="w-full rounded-lg mt-4"
          />
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
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 uppercase">
          Що робить ці квіти ідеальними
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0 leading-none mt-1">🦋</span>
            <p>
              <b>Природний магніт для живої природи</b> — приваблює метеликів і
              бджіл прямо до вас у сад.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0 leading-none mt-1">🌱</span>
            <p>
              <b>Справжній багаторічник</b> — один раз посадили, роками
              насолоджуєтесь.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0 leading-none mt-1">📍</span>
            <p>
              <b>Підходить скрізь</b> — сад, балкон, горщик на підвіконні.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0 leading-none mt-1">❄️</span>
            <p>
              <b>Морозостійкий</b> — витримує до −20°C без укриття.
            </p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl shrink-0 leading-none mt-1">🌤️</span>
            <p>
              <b>Любить розсіяне світло</b> — добре росте в добре провітрюваних
              місцях із м'яким освітленням.
            </p>
          </li>
        </ul>
        <img
          src={image3}
          alt="Сад з квітами метеликами"
          className="w-full rounded-lg mt-6"
        />
      </div>

      {/* Відгуки */}
      <div className="bg-gray-50 py-8 px-5">
        <h2 className="text-2xl font-bold text-center mb-6">
          Відгуки клієнтів
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex text-yellow-400 mb-2">
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
            </div>
            <p className="text-gray-700 italic text-sm mb-3">
              "Я навіть не очікувала такого ефекту. Посадила біля входу — і тепер
              сусіди зупиняються та питають, що це за квіти. Двір виглядає так,
              ніби над ним працював дизайнер. А я просто посадила та полила."
            </p>
            <div className="font-bold text-sm text-gray-900">
              - Алла Ковальчук
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex text-yellow-400 mb-2">
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
              <Star fill="currentColor" size={18} />
            </div>
            <p className="text-gray-700 italic text-sm mb-3">
              "Чесно? Я скептично ставилась до покупки квітів онлайн. Але коли вони
              зацвіли — я просто стояла і дивилась. Це справді схоже на метеликів,
              що зависли над землею. Моя донька думала, що це декор із магазину."
            </p>
            <div className="font-bold text-sm text-gray-900">
              - Марина Нестеренко
            </div>
          </div>
        </div>
      </div>

      {/* Як замовити */}
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
            <p className="text-xs leading-tight">
              Доставляємо ваш товар 1-3 днів
            </p>
          </div>
          <div className="bg-[#8ca891] border-2 border-white rounded-xl p-4 flex flex-col items-center text-center text-gray-900">
            <CreditCard size={40} className="mb-2" />
            <h3 className="font-bold text-lg mb-1">Отримання</h3>
            <p className="text-xs leading-tight">Сплачуєте при отриманні</p>
          </div>
        </div>
        <img
          src={image4}
          alt="Деталі квітів метеликів"
          className="w-full rounded-lg mt-8"
        />
      </div>

      {/* Форма замовлення */}
      <div id="order-form" className="p-5 mt-6 border-t-4 border-gray-100">
        <h2 className="text-2xl font-black text-center text-red-600 mb-2 uppercase">
          Замовляйте зараз - Отримуйте знижку 50%
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Наш менеджер зв’яжеться з вами для консультації та допоможе оформити
          замовлення.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center font-medium animate-pulse">
              Дякуємо! Вашу заявку успішно прийнято.
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ім'я та прізвище
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Введіть ваше ім'я"
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-green-600 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер телефону
            </label>
            <div className="flex w-full border-2 border-gray-300 rounded-lg focus-within:border-green-600 transition-colors overflow-hidden bg-white">
              {/* Селект для коду країни */}
              <div className="flex items-center border-r-2 border-gray-300 bg-gray-50">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleCountryChange}
                  className="bg-transparent py-3 pl-3 pr-1 outline-none text-gray-700 font-medium cursor-pointer"
                >
                  <option value="+(380)">🇺🇦 +(380)</option>
                  <option value="+(48)">🇵🇱 +(48)</option>
                  <option value="+(49)">🇩🇪 +(49)</option>
                  <option value="+(420)">🇨🇿 +(420)</option>
                  <option value="+(373)">🇲🇩 +(373)</option>
                </select>
              </div>

              {/* Інпут для самого номера */}
              <input
                type="tel"
                name="phoneLocal"
                value={formData.phoneLocal}
                onChange={handlePhoneLocalChange}
                placeholder={
                  formData.phoneCode === "+(380)" ? "000 00 00 00" : "000000000"
                }
                className="w-full p-3 focus:outline-none tracking-wide"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-black text-xl py-4 mt-2 rounded-xl shadow-lg transform transition uppercase flex justify-center items-center ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 active:scale-95 shadow-[0_5px_15px_rgba(220,38,38,0.5)]"
            }`}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Відправка...</span>
            ) : (
              "Замовити (275 грн)"
            )}
          </button>
        </form>
      </div>

      {/* Футер */}
      <footer className="mt-8 py-6 bg-gray-900 text-gray-400 text-center text-sm">
        <div>
          <a href="#" className="underline hover:text-white transition">
            Політика конфіденційності
          </a>
        </div>
      </footer>
    </div>
  );
}