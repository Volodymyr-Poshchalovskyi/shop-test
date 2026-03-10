// src/Pages/PrivacyPolicy.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl pb-10 font-sans text-gray-800">

      {/* Хедер */}
      <div className="bg-green-800 text-white px-5 py-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-green-200 hover:text-white transition text-sm mb-4"
        >
          ← Повернутись на головну
        </Link>
        <h1 className="text-2xl font-extrabold uppercase">Політика конфіденційності</h1>
        <p className="text-green-200 text-sm mt-1">Останнє оновлення: березень 2026 р.</p>
      </div>

      {/* Контент */}
      <div className="px-5 py-6 space-y-6 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">1. Загальні положення</h2>
          <p>
            Цей веб-сайт («Квіти Метелики») поважає вашу конфіденційність. Ця Політика пояснює, яку інформацію ми збираємо, як її використовуємо та захищаємо при оформленні замовлення через наш сайт.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">2. Які дані ми збираємо</h2>
          <p>При оформленні заявки ми збираємо:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Ім'я та прізвище</li>
            <li>Номер телефону</li>
            <li>IP-адресу (для захисту від спаму)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">3. Мета збору даних</h2>
          <p>Ваші персональні дані використовуються виключно для:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Зв'язку з вами для підтвердження та оформлення замовлення</li>
            <li>Організації доставки товару</li>
          </ul>
          <p className="mt-2">Ми не використовуємо ваші дані для розсилок, реклами або передачі третім особам.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">4. Передача даних третім особам</h2>
          <p>
            Ми не продаємо, не передаємо і не розкриваємо ваші персональні дані третім особам, за винятком випадків, коли це необхідно для виконання замовлення (наприклад, служба доставки).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">5. Зберігання даних</h2>
          <p>
            Дані зберігаються у захищеній формі та видаляються після виконання замовлення або на ваш запит.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">6. Ваші права</h2>
          <p>Ви маєте право:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Отримати інформацію про те, які ваші дані ми зберігаємо</li>
            <li>Вимагати видалення ваших персональних даних</li>
            <li>Відкликати згоду на обробку даних</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">7. Файли cookie</h2>
          <p>
            Сайт може використовувати технічні cookie для коректної роботи. Ми не використовуємо сторонні аналітичні або рекламні cookie без вашої згоди.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">8. Контакти</h2>
          <p>
            З питань щодо ваших персональних даних звертайтесь:{" "}
            {/* Заміни на свій реальний email */}
            <a
              href="mailto:magnifica.garden@gmail.com"
              className="text-green-700 underline font-medium"
            >
              magnifica.garden@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">9. Зміни до політики</h2>
          <p>
            Ми залишаємо за собою право оновлювати цю Політику. Актуальна версія завжди доступна на цій сторінці.
          </p>
        </section>

      </div>

      {/* Кнопка повернення */}
      <div className="px-5">
        <Link
          to="/"
          className="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition"
        >
          ← Повернутись на головну
        </Link>
      </div>

    </div>
  );
}