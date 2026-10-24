let count = 0;
let total = 0;

const $ = (id) => document.getElementById(id);
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const onClick = (selector, handler) =>
  document.querySelectorAll(selector).forEach((el) => (el.onclick = handler));

function showAlert(title, text, isError = false) {
  $("alT").textContent = title;
  $("alP").textContent = text;
  $("alI").textContent = isError ? "!" : "✓";
  $("al").className = isError ? "al err" : "al";
  $("ab").classList.add("show");
  $("alOk").focus();
}

$("alOk").onclick = () => $("ab").classList.remove("show");

onClick(".card .add", function () {
  count++;
  total += Number(this.dataset.price);
  $("cnt").textContent = count;
  showAlert("Savatga qo’shildi", `${this.dataset.name} savatingizda. Jami: ${fmt(total)} so’m.`);
});

onClick(".fav", function () {
  this.classList.toggle("on");
});
onClick(".fq button", function () {
  this.parentNode.classList.toggle("open");
});

onClick(".cat", function () {
  showAlert(this.textContent, "Bu bo’lim mahsulotlari katalogda ko’rsatilgan.");
});

$("cartBtn").onclick = () => {
  if (!count) return showAlert("Savat bo’sh", "Avval kerakli qoshiqni tanlang.", true);
  const ship = total >= 300000 ? "Yetkazish bepul." : "Yetkazish: 15 000 so’mdan.";
  showAlert("Savatingiz", `${count} ta mahsulot, jami ${fmt(total)} so’m. ${ship}`);
};

$("favBtn").onclick = () => {
  const n = document.querySelectorAll(".fav.on").length;
  if (!n) return showAlert("Sevimlilar bo’sh", "Mahsulot rasmidagi yurakchani bosing.", true);
  showAlert("Sevimlilar", `Sevimli mahsulotlaringiz soni: ${n}.`);
};

$("searchBtn").onclick = () => {
  const v = $("q").value.trim();
  if (!v) return showAlert("Qidiruv bo’sh", "Qidirmoqchi bo’lgan qoshiq nomini yozing.", true);
  showAlert("Qidiruv", `“${v}” bo’yicha natijalar katalogda, quyidan qarang.`);
};

$("giftBtn").onclick = () =>
  showAlert("Sovg’a to’plami", "Buyurtma uchun +998 97 254 74 74 raqamiga qo’ng’iroq qiling.");

$("callBtn").onclick = () =>
  showAlert("Biz bilan bog’laning", "Telefon: +998 97 254 74 74. Telegram: @qoshiq_uz.");