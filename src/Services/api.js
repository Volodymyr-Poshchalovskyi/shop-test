const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
const SECRET_API_KEY = import.meta.env.VITE_SECRET_API_KEY;

export const submitOrderData = async (orderData) => {
  try {
    // 1. Отримуємо IP клієнта
    let userIp = "Невідомо";
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      userIp = ipData.ip;
    } catch (ipError) {
      console.warn("Не вдалося отримати IP:", ipError);
    }

    // 2. Формуємо payload — додаємо origin для перевірки на бекенді
    const finalPayload = {
      ...orderData,
      ip: userIp,
      apiKey: SECRET_API_KEY,
      origin: window.location.origin,
    };

    // 3. Відправляємо на Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(finalPayload),
    });

    const result = await response.json();

    if (result.status === "error") {
      throw new Error(result.message);
    }

    return result;

  } catch (error) {
    console.error("Помилка відправки:", error);
    throw new Error(error.message || "Сталася помилка при відправці. Перевірте з'єднання.");
  }
};