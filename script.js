/* ===== أدوات عامة ===== */
const kwFmt = (n) => (isFinite(n) ? n.toLocaleString("ar-KW",{maximumFractionDigits:2}) : "0");
(() => { const yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear(); })();

/* ===== حاسبة كفاءة المباني (أ/ب/ج + شريط ألوان) =====
   المدخلات: area (م²), annualConsumption (kWh)
   المخرجات: كثافة (kWh/m²·year) + تصنيف عربي (أ/ب/ج) + مؤشر
   الحدود الإرشادية:
     أ : ≤ 50
     ب : ≤ 100
     ج : > 100
*/
function calculateBuilding(){
  const area = parseFloat(document.getElementById("area")?.value);
  const consumption = parseFloat(document.getElementById("annualConsumption")?.value);
  if(!isFinite(area)||area<=0||!isFinite(consumption)||consumption<=0){ alert("الرجاء إدخال قيم صحيحة."); return; }

  const density = consumption / area;
  let rating = "ج", idx = 2;
  if (density <= 50) { rating = "أ"; idx = 0; }
  else if (density <= 100) { rating = "ب"; idx = 1; }

  document.getElementById("kpi-area").textContent = `${kwFmt(area)} م²`;
  document.getElementById("kpi-density").textContent = `${density.toFixed(2)} kWh/m²·year`;
  document.getElementById("kpi-rating").textContent = rating;

  const box = document.getElementById("result");
  box.style.display = "block";

  const scale = document.querySelector(".label-scale-3");
  const needle = document.getElementById("needle");
  if(scale && needle){
    const colW = scale.clientWidth / 3;
    needle.style.left = `${colW*idx + colW/2}px`;
  }
}
function clearBuilding(){ const r = document.getElementById("result"); if(r) r.style.display="none"; }

/* ===== حاسبة استبدال الأجهزة ===== */
function calcDevices(){
  const oldW = +document.getElementById("oldW").value || 0;
  const newW = +document.getElementById("newW").value || 0;
  const hrs  = +document.getElementById("hrsDay").value || 0;
  const days = +document.getElementById("daysYear").value || 0;
  const price= +document.getElementById("priceKwh").value || 0;

  if (oldW<=0 || newW<0 || hrs<0 || days<=0 || price<0){ alert("الرجاء إدخال قيم صحيحة."); return; }

  const oldK = (oldW/1000)*hrs*days;
  const newK = (newW/1000)*hrs*days;
  const saveK = Math.max(0, oldK - newK);
  const saveD = saveK * price;

  document.getElementById("oldKwh").textContent = `${kwFmt(oldK)} kWh/سنة`;
  document.getElementById("newKwh").textContent = `${kwFmt(newK)} kWh/سنة`;
  document.getElementById("saveKwh").textContent= `${kwFmt(saveK)} kWh`;
  document.getElementById("saveKd").textContent = `${kwFmt(saveD)} د.ك`;
  document.getElementById("save5").textContent  = `${kwFmt(saveD*5)} د.ك`;
  document.getElementById("save10").textContent = `${kwFmt(saveD*10)} د.ك`;

  document.getElementById("rep-summary").classList.remove("hide");
}
function clearDevices(){ const s=document.getElementById("rep-summary"); if(s) s.classList.add("hide"); }

console.log("script.js loaded ✔");