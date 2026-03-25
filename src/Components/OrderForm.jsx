"use client";
import React, { useState } from "react";
import { submitOrderData } from "../Services/api";
import SuccessModal from "./SuccessModal";

// Оновили +380 на +38, додали формат з 10 цифр (напр. 099 123 45 67)
const COUNTRY_CONFIG = {
  "+(38)":  { code: "UA", minDigits: 10, placeholder: "099 000 00 00" },
  "+(48)":  { code: "PL", minDigits: 9, placeholder: "000 000 000" },
  "+(49)":  { code: "DE", minDigits: 10, placeholder: "0000 0000000" },
  "+(420)": { code: "CZ", minDigits: 9, placeholder: "000 000 000" },
  "+(373)": { code: "MD", minDigits: 8, placeholder: "00 000 000" },
};

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneCode: "+(38)", // Змінено на +38
    phoneLocal: "",
    website: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(null);
  const COOLDOWN_MS = 60000;

  const validateName = (val) => {
    if (!val || val.trim().length === 0) return "Введіть ім'я";
    if (val.trim().length < 2) return "Ім'я занадто коротке";
    return "";
  };

  const validatePhone = (phoneCode, phoneLocal) => {
    const digits = phoneLocal.replace(/\D/g, "");
    const config = COUNTRY_CONFIG[phoneCode];
    
    if (!digits) return "Введіть номер телефону";
    if (digits.length < config.minDigits) return `Номер має містити мінімум ${config.minDigits} цифр`;

    return "";
  };

  const handleNameChange = (e) => {
    let val = e.target.value;
    val = val.replace(/[^\p{L}\s]/gu, "");
    val = val.replace(/\s{2,}/g, " ");
    const words = val.trimStart().split(" ");
    if (words.length > 3) val = words.slice(0, 3).join(" ") + " ";

    setFormData((prev) => ({ ...prev, name: val }));

    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(val) }));
    }
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
    setErrors((prev) => ({ ...prev, name: validateName(formData.name) }));
  };

  const handlePhoneLocalChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");
    const config = COUNTRY_CONFIG[formData.phoneCode];
    let formatted = digits;

    // Нова логіка для України (+38) — дозволяємо вводити 0 на початку
    if (formData.phoneCode === "+(38)") {
      digits = digits.slice(0, 10); // 10 цифр: 0991234567
      formatted = digits;
      if (digits.length > 3) formatted = digits.slice(0, 3) + " " + digits.slice(3); // 099 123...
      if (digits.length > 6) formatted = formatted.slice(0, 7) + " " + formatted.slice(7); // 099 123 45...
      if (digits.length > 8) formatted = formatted.slice(0, 10) + " " + formatted.slice(10); // 099 123 45 67
    } else if (formData.phoneCode === "+(48)" || formData.phoneCode === "+(420)") {
      digits = digits.slice(0, 9);
      formatted = digits;
      if (digits.length > 3) formatted = digits.slice(0, 3) + " " + digits.slice(3);
      if (digits.length > 6) formatted = formatted.slice(0, 7) + " " + formatted.slice(7);
    } else {
      digits = digits.slice(0, 15);
      formatted = digits;
    }

    setFormData((prev) => ({ ...prev, phoneLocal: formatted }));

    if (touched.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhone(formData.phoneCode, formatted),
      }));
    }
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(formData.phoneCode, formData.phoneLocal),
    }));
  };

  const handleCountryChange = (e) => {
    const newCode = e.target.value;
    setFormData((prev) => ({ ...prev, phoneCode: newCode, phoneLocal: "" }));
    setErrors((prev) => ({ ...prev, phone: "" }));
    setTouched((prev) => ({ ...prev, phone: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website !== "") return; // Honeypot

    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastSubmitTime)) / 1000);
      setErrors((prev) => ({ ...prev, phone: `Зачекайте ${secondsLeft} сек` }));
      return;
    }

    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phoneCode, formData.phoneLocal);

    setTouched({ name: true, phone: true });
    setErrors({ name: nameError, phone: phoneError });

    if (nameError || phoneError) return;

    setIsSubmitting(true);
    setLastSubmitTime(now);

    const finalDataToSubmit = {
      name: formData.name.trim(),
      phone: `'${formData.phoneCode} ${formData.phoneLocal}`.trim(),
    };

    try {
      await submitOrderData(finalDataToSubmit);
      setIsSuccess(true);
      setFormData({ name: "", phoneCode: "+(38)", phoneLocal: "", website: "" });
      setTouched({ name: false, phone: false });
      setErrors({ name: "", phone: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setErrors((prev) => ({ ...prev, phone: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const config = COUNTRY_CONFIG[formData.phoneCode];

  return (
    <>
      <div id="order-form" className="p-5 mt-6 border-t-4 border-gray-100">
        <h2 className="text-2xl font-black text-center text-red-600 mb-2 uppercase">
          Замовляйте зараз - Отримуйте знижку 50%
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Наш менеджер зв'яжеться з вами для консультації та допоможе оформити замовлення.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
            <input type="text" name="website" value={formData.website} onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))} tabIndex="-1" autoComplete="off" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я та прізвище</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              placeholder="Введіть ваше ім'я"
              className={`w-full border-2 rounded-lg p-3 focus:outline-none transition-colors ${
                touched.name && errors.name ? "border-red-500 bg-red-50 focus:border-red-500" : touched.name && !errors.name ? "border-green-500 bg-green-50 focus:border-green-500" : "border-gray-300 focus:border-green-600"
              }`}
            />
            {touched.name && (
              <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${errors.name ? "text-red-500" : "text-green-600"}`}>
                <span>{errors.name ? "✕" : "✓"}</span><span>{errors.name || "Все добре"}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефону</label>
            <div className={`flex w-full border-2 rounded-lg transition-colors overflow-hidden bg-white ${
              touched.phone && errors.phone ? "border-red-500" : touched.phone && !errors.phone ? "border-green-500" : "border-gray-300 focus-within:border-green-600"
            }`}>
              <div className="flex items-center border-r-2 border-gray-300 bg-gray-50">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleCountryChange}
                  className="bg-transparent py-3 pl-3 pr-1 outline-none text-gray-700 font-medium cursor-pointer"
                >
                  <option value="+(38)">🇺🇦 +(38)</option>
                  <option value="+(48)">🇵🇱 +(48)</option>
                  <option value="+(49)">🇩🇪 +(49)</option>
                  <option value="+(420)">🇨🇿 +(420)</option>
                  <option value="+(373)">🇲🇩 +(373)</option>
                </select>
              </div>
              <input
                type="tel"
                inputMode="tel"
                name="phoneLocal"
                value={formData.phoneLocal}
                onChange={handlePhoneLocalChange}
                onBlur={handlePhoneBlur}
                placeholder={config.placeholder}
                className="w-full p-3 focus:outline-none tracking-wide bg-transparent"
              />
            </div>
            {touched.phone && (
              <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${errors.phone ? "text-red-500" : "text-green-600"}`}>
                <span>{errors.phone ? "✕" : "✓"}</span><span>{errors.phone || "Номер валідний"}</span>
              </div>
            )}
          </div>

          {/* Кнопка з пульсацією (btn-glow з Home.jsx) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn-glow w-full text-white font-black text-xl py-4 mt-2 rounded-xl transform transition uppercase flex justify-center items-center ${
              isSubmitting ? "bg-red-700 opacity-90 cursor-wait" : "bg-red-600 hover:bg-red-700 active:scale-95"
            }`}
          >
            {isSubmitting ? "Обробка..." : "Замовити (275 грн)"}
          </button>
        </form>
      </div>
      <SuccessModal isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
    </>
  );
}