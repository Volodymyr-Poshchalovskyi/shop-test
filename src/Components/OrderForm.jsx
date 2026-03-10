"use client";
import React, { useState } from "react";
import { submitOrderData } from "../Services/api";
import SuccessModal from "./SuccessModal";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneCode: "+(380)",
    phoneLocal: "",
    website: "", // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(null);
  const COOLDOWN_MS = 60000;

  const handleNameChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\p{L}\s]/gu, "");
    val = val.replace(/\s{2,}/g, " ");
    const words = val.trimStart().split(" ");
    if (words.length > 3) {
      val = words.slice(0, 3).join(" ") + " ";
    }
    setFormData((prev) => ({ ...prev, name: val }));
  };

  const handlePhoneLocalChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (formData.phoneCode === "+(380)") {
      if (digits.startsWith("0")) digits = digits.substring(1);
      digits = digits.slice(0, 9);
      let formatted = digits;
      if (digits.length > 3) formatted = digits.slice(0, 3) + " " + digits.slice(3);
      if (digits.length > 5) formatted = formatted.slice(0, 6) + " " + formatted.slice(6);
      if (digits.length > 7) formatted = formatted.slice(0, 9) + " " + formatted.slice(9);
      setFormData((prev) => ({ ...prev, phoneLocal: formatted }));
    } else {
      digits = digits.slice(0, 15);
      setFormData((prev) => ({ ...prev, phoneLocal: digits }));
    }
  };

  const handleCountryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      phoneCode: e.target.value,
      phoneLocal: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: якщо бот заповнив приховане поле — тихо ігноруємо
    if (formData.website !== "") {
      return;
    }

    // Cooldown: захист від повторних кліків
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastSubmitTime)) / 1000);
      alert(`Зачекайте ${secondsLeft} секунд перед повторною відправкою.`);
      return;
    }

    const pureDigits = formData.phoneLocal.replace(/\D/g, "");
    if (formData.phoneCode === "+(380)" && pureDigits.length < 9) {
      alert("Будь ласка, введіть повний номер телефону.");
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    const finalDataToSubmit = {
      name: formData.name.trim(),
      phone: `'${formData.phoneCode} ${formData.phoneLocal}`.trim(),
    };

    try {
      await submitOrderData(finalDataToSubmit);
      setIsSuccess(true);
      setFormData({ name: "", phoneCode: "+(380)", phoneLocal: "", website: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div id="order-form" className="p-5 mt-6 border-t-4 border-gray-100">
        <h2 className="text-2xl font-black text-center text-red-600 mb-2 uppercase">
          Замовляйте зараз - Отримуйте знижку 50%
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Наш менеджер зв'яжеться з вами для консультації та допоможе оформити замовлення.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Honeypot — приховане поле, люди не бачать, боти заповнюють */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

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
              <input
                type="tel"
                name="phoneLocal"
                value={formData.phoneLocal}
                onChange={handlePhoneLocalChange}
                placeholder={formData.phoneCode === "+(380)" ? "000 00 00 00" : "000000000"}
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
                ? "bg-red-700 opacity-90 cursor-wait"
                : "bg-red-600 hover:bg-red-700 active:scale-95 shadow-[0_5px_15px_rgba(220,38,38,0.5)]"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Обробка...
              </>
            ) : (
              "Замовити (275 грн)"
            )}
          </button>
        </form>
      </div>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
      />
    </>
  );
}