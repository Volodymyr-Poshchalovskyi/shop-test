"use client";
import React, { useState } from "react";
import { submitOrderData } from "../Services/api";
import SuccessModal from "./SuccessModal";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "Введіть номер телефону";
    if (digits.length < 10) return "Номер має містити мінімум 10 цифр";
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

  // Автоматично додаємо +380 при фокусі на інпут, якщо він порожній
  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+380" }));
    }
  };

  const handlePhoneChange = (e) => {
    // Залишаємо тільки цифри та знак +
    let val = e.target.value.replace(/[^\d+]/g, "");

    // Якщо користувач почав вводити цифри без плюса, допомагаємо йому
    if (val.length > 0 && !val.startsWith("+")) {
      if (val.startsWith("380")) {
        val = "+" + val;
      } else if (val.startsWith("0")) {
        val = "+38" + val;
      } else {
        val = "+380" + val;
      }
    }

    setFormData((prev) => ({ ...prev, phone: val }));

    if (touched.phone) {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhone(val),
      }));
    }
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(formData.phone),
    }));
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
    const phoneError = validatePhone(formData.phone);

    setTouched({ name: true, phone: true });
    setErrors({ name: nameError, phone: phoneError });

    if (nameError || phoneError) return;

    setIsSubmitting(true);
    setLastSubmitTime(now);

    const finalDataToSubmit = {
      name: formData.name.trim(),
      // Зберігаємо апостроф на початку, щоб Google Sheets розпізнавав як текст
      phone: `'${formData.phone}`.trim(), 
    };

    try {
      await submitOrderData(finalDataToSubmit);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", website: "" });
      setTouched({ name: false, phone: false });
      setErrors({ name: "", phone: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setErrors((prev) => ({ ...prev, phone: error.message }));
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
              <input
                type="tel"
                inputMode="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onBlur={handlePhoneBlur}
                placeholder="+380 99 000 00 00"
                className="w-full p-3 focus:outline-none tracking-wide bg-transparent"
              />
            </div>
            {touched.phone && (
              <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${errors.phone ? "text-red-500" : "text-green-600"}`}>
                <span>{errors.phone ? "✕" : "✓"}</span><span>{errors.phone || "Номер валідний"}</span>
              </div>
            )}
          </div>

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