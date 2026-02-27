import translateAPI from "google-translate-api-x";

async function test() {
  const isArabic = /[\u0600-\u06FF]/.test("مرحبا كوكب الارض");
  const targetLang = isArabic ? "en" : "ar";
  console.log({ targetLang });
  const res = await translateAPI("مرحبا كوكب الارض", { to: targetLang });
  console.log(res.text);

  const res2 = await translateAPI("Hello Planet Earth", { to: "ar" });
  console.log(res2.text);
}
test().catch(console.error);
