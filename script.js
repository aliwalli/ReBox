
"use strict";

const $ = id => document.getElementById(id);
const FACTOR = 2.4; // Factor ilustrativo, no verificado.
const STORAGE = "rebox_tech_records";
const LANGUAGE_STORAGE = "rebox_tech_language";

const seed = [
  {id:"RB-ST01",materialType:"sotol_fiber",supplier:"Destilería Juárez",quantity:14.5,location:"Planta Industrial Juárez",date:"2026-11-02",status:"pending",weightScale:null,moisture:12,driver:"Carlos V. (Camión 04)"},
  {id:"RB-ST02",materialType:"sotol_bagasse",supplier:"Procesadora Chihuahuense",quantity:28,location:"Silo 2 - Delicias",date:"2026-11-01",status:"in_transit",weightScale:27.5,moisture:14,driver:"Roberto M. (Unidad TR-20)"},
  {id:"RB-ST03",materialType:"sotol_fiber",supplier:"Agro-Sotol Norte",quantity:106,location:"Almacén Central - Juárez",date:"2026-10-28",status:"warehouse",weightScale:106,moisture:10,driver:"Entregado"}
];

function loadRecords() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE));
    return Array.isArray(stored) ? stored : structuredClone(seed);
  } catch {
    return structuredClone(seed);
  }
}

let items = loadRecords();
let lang = localStorage.getItem(LANGUAGE_STORAGE) || "es";
let page = "dashboard";
let filter = "all";
let selectedLot = null;
let materialChart = null;
let statusChart = null;
let toastTimer = null;

const translations = {
  es: {
    navDashboard:"Resumen general",navSupplier:"Registrar material",navAdmin:"Aprobaciones",navLogistics:"Logística",navWarehouse:"Almacén",navCatalog:"Catálogo B2B",
    demoStatus:"DEMO LOCAL · ACTIVO",online:"SISTEMA ACTIVO",
    dashboardKicker:"INTELIGENCIA CIRCULAR / RESUMEN",heroTitle:"Materiales circulares.<br><em>Control total.</em>",
    heroDescription:"Una plataforma para gestionar la recuperación, trazabilidad y transformación de residuos de sotol.",
    newBatch:"+ NUEVO LOTE",recovered:"BIOMASA RECUPERADA",recoveredSub:"Peso registrado en almacén",
    carbon:"CO₂e EVITADO ESTIMADO",carbonSub:"Cálculo ilustrativo, factor 2.4",
    transit:"EN TRÁNSITO",transitSub:"Recolecciones activas",lots:"LOTES EN ALMACÉN",lotsSub:"Inventario registrado",
    distribution:"Distribución de materiales",pipeline:"Estado de los lotes",recent:"Lotes recientes",viewAll:"VER TODOS",
    batch:"LOTE",material:"MATERIAL",origin:"ORIGEN",quantity:"CANTIDAD",status:"ESTADO",
    supplierTitle:"Registrar material",supplierDescription:"Publica residuos de sotol para su revisión y recolección.",
    batchDetails:"Información del lote",materialType:"TIPO DE MATERIAL",fiber:"Fibra de sotol",bagasse:"Bagazo de sotol",
    amount:"CANTIDAD / TONELADAS",facility:"ORIGEN / PLANTA",date:"FECHA DISPONIBLE",
    notes:"NOTAS TÉCNICAS / HUMEDAD",localNotice:"Los datos se guardan en este navegador.",
    publish:"PUBLICAR LOTE",avoided:"EMISIONES EVITADAS ESTIMADAS",
    carbonWarning:"Estimación de demostración, no certificada ni validada.",
    registered:"Lotes registrados",adminTitle:"Aprobaciones",
    adminDescription:"Revisa los registros y autoriza las recolecciones.",
    pendingLabel:"PENDIENTES",registry:"Registro de lotes",all:"TODOS",pending:"PENDIENTES",
    inTransit:"EN TRÁNSITO",inWarehouse:"ALMACÉN",supplier:"PROVEEDOR",action:"ACCIÓN",
    logisticsTitle:"En movimiento",
    logisticsDescription:"Coordina el transporte y registra el pesaje de los materiales.",
    collections:"RECOLECCIONES ACTIVAS",transportWeight:"CARGA ESTIMADA EN TRÁNSITO",
    warehouseTitle:"Control de almacén",
    warehouseDescription:"Inventario, peso verificado y condiciones de los materiales.",
    stock:"INVENTARIO TOTAL",recordedLots:"LOTES REGISTRADOS",moisture:"HUMEDAD PROMEDIO",
    ledger:"Inventario por lote",weight:"PESO VERIFICADO",driver:"CONDUCTOR",
    catalogTitle:"Segunda vida",
    catalogDescription:"Explora posibles aplicaciones industriales de los materiales recuperados.",
    fiberProduct:"Fibra refinada de sotol",
    fiberDescription:"Materia prima potencial para empaques moldeados y materiales compuestos, sujeta a pruebas técnicas.",
    bagasseProduct:"Bagazo pelletizado de sotol",
    bagasseDescription:"Biomasa con aplicaciones energéticas potenciales, pendientes de validación técnica.",
    quote:"SOLICITAR COTIZACIÓN",
    catalogWarning:"Los productos y precios son ilustrativos. Las cotizaciones no están conectadas a un servidor.",
    footer:"DEMO MODE — LOCAL DATA ONLY",scaleTitle:"Registrar peso verificado",
    cancel:"CANCELAR",confirmWeight:"CONFIRMAR PESAJE",
    pendingStatus:"Pendiente",transitStatus:"En tránsito",warehouseStatus:"En almacén",
    approve:"APROBAR Y DESPACHAR",weigh:"REGISTRAR PESAJE",
    noRecords:"No hay registros.",noTransit:"No hay recolecciones activas.",
    saved:"Lote registrado correctamente.",approved:"Lote aprobado y enviado a logística.",
    weighed:"Pesaje registrado. El lote pasó al almacén.",
    quoteDemo:"Las cotizaciones requieren un servidor. Función de demostración.",
    invalid:"Revisa los datos ingresados.",
    resetConfirm:"¿Restablecer los registros de demostración?",
    resetDone:"Registros restablecidos."
  },
  en: {
    navDashboard:"Overview",navSupplier:"Material intake",navAdmin:"Approvals",navLogistics:"Logistics",navWarehouse:"Warehouse",navCatalog:"B2B Catalog",
    demoStatus:"LOCAL DEMO · CONNECTED",online:"SYSTEM ONLINE",
    dashboardKicker:"CIRCULAR INTELLIGENCE / OVERVIEW",heroTitle:"Material flows.<br><em>Made visible.</em>",
    heroDescription:"A platform for sotol recovery, batch traceability and circular material operations.",
    newBatch:"+ NEW BATCH",recovered:"RECOVERED BIOMASS",recoveredSub:"Recorded warehouse weight",
    carbon:"ESTIMATED AVOIDED CO₂e",carbonSub:"Illustrative factor 2.4",
    transit:"IN TRANSIT",transitSub:"Active collections",lots:"WAREHOUSE LOTS",lotsSub:"Recorded inventory",
    distribution:"Material distribution",pipeline:"Batch status",recent:"Recent batches",viewAll:"VIEW ALL",
    batch:"BATCH",material:"MATERIAL",origin:"ORIGIN",quantity:"QUANTITY",status:"STATUS",
    supplierTitle:"Register material",supplierDescription:"Publish sotol residue for collection and review.",
    batchDetails:"Batch details",materialType:"MATERIAL TYPE",fiber:"Sotol fiber",bagasse:"Sotol bagasse",
    amount:"QUANTITY / TONS",facility:"ORIGIN / FACILITY",date:"AVAILABLE DATE",
    notes:"TECHNICAL NOTES / MOISTURE",localNotice:"Records are saved in this browser.",
    publish:"PUBLISH BATCH",avoided:"ESTIMATED AVOIDED EMISSIONS",
    carbonWarning:"Illustrative demo estimate, not verified or certified.",
    registered:"Registered batches",adminTitle:"Approvals",
    adminDescription:"Review material records and authorize collection.",
    pendingLabel:"PENDING",registry:"Batch registry",all:"ALL",pending:"PENDING",
    inTransit:"IN TRANSIT",inWarehouse:"WAREHOUSE",supplier:"SUPPLIER",action:"ACTION",
    logisticsTitle:"In motion",
    logisticsDescription:"Coordinate transport and record verified weights.",
    collections:"ACTIVE COLLECTIONS",transportWeight:"ESTIMATED TRANSIT LOAD",
    warehouseTitle:"Warehouse control",
    warehouseDescription:"Inventory, verified weight and material conditions.",
    stock:"TOTAL STOCK",recordedLots:"RECORDED LOTS",moisture:"AVERAGE MOISTURE",
    ledger:"Batch inventory",weight:"VERIFIED WEIGHT",driver:"DRIVER",
    catalogTitle:"Second life",
    catalogDescription:"Explore possible industrial applications for reclaimed materials.",
    fiberProduct:"Refined Sotol Fiber",
    fiberDescription:"Potential feedstock for molded packaging and composites, subject to testing.",
    bagasseProduct:"Pelletized Sotol Bagasse",
    bagasseDescription:"Potential energy feedstock, subject to technical validation.",
    quote:"REQUEST QUOTE",
    catalogWarning:"Products and prices are illustrative. No live quotation service is connected.",
    footer:"DEMO MODE — LOCAL DATA ONLY",scaleTitle:"Record verified weight",
    cancel:"CANCEL",confirmWeight:"CONFIRM WEIGHT",
    pendingStatus:"Pending",transitStatus:"In transit",warehouseStatus:"In warehouse",
    approve:"APPROVE & DISPATCH",weigh:"RECORD WEIGHT",
    noRecords:"No records available.",noTransit:"No active collections.",
    saved:"Batch successfully registered.",approved:"Batch approved and dispatched.",
    weighed:"Weight recorded. Batch transferred to warehouse.",
    quoteDemo:"Quotations require a backend. Demo function only.",
    invalid:"Check the entered information.",
    resetConfirm:"Reset all demonstration records?",
    resetDone:"Records restored."
  }
};

function t(key) {
  return translations[lang][key] || key;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

function fmt(value) {
  return Number(value || 0).toLocaleString(
    lang === "es" ? "es-MX" : "en-US",
    {maximumFractionDigits:1,minimumFractionDigits:1}
  );
}

function materialName(type) {
  return type === "sotol_fiber" ? t("fiber") : t("bagasse");
}

function statusBadge(value) {
  const labels = {
    pending: t("pendingStatus"),
    in_transit: t("transitStatus"),
    warehouse: t("warehouseStatus")
  };
  return `<span class="status-pill status-${value}">${labels[value] || escapeHTML(value)}</span>`;
}

function emptyRow(columns) {
  return `<tr><td class="empty" colspan="${columns}">${t("noRecords")}</td></tr>`;
}

function save() {
  localStorage.setItem(STORAGE, JSON.stringify(items));
  renderAll();
}

function notify(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3300);
}

function setLanguage(value) {
  lang = value;
  localStorage.setItem(LANGUAGE_STORAGE, lang);
  document.documentElement.lang = lang;
document.querySelectorAll("[data-t]").forEach(el => {
  el.textContent = t(el.dataset.t);
});

document.querySelectorAll("[data-t-html]").forEach(el => {
  el.innerHTML = t(el.dataset.tHtml);
});
  document.querySelectorAll("[data-t-html]").forEach(el => {
    el.innerHTML = t(el.dataset.tHtml);
  });
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("selected", button.dataset.lang === lang);
  });
  renderAll();
  updateCarbonPreview();
}

function navigate(name) {
  if (!$(name)) return;
  page = name;
  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle("active", section.id === name);
  });
  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.page === name);
  });
  $("breadcrumb").textContent = name.toUpperCase();
  $("sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"instant"});
  if (name === "dashboard") requestAnimationFrame(renderCharts);
}

function renderAll() {
  const warehouse = items.filter(i => i.status === "warehouse");
  const transit = items.filter(i => i.status === "in_transit");
  const pending = items.filter(i => i.status === "pending");

  const totalWeight = warehouse.reduce((sum,i) => sum + Number(i.weightScale ?? i.quantity),0);
  const transitWeight = transit.reduce((sum,i) => sum + Number(i.quantity),0);

  $("kpiTons").innerHTML = `${fmt(totalWeight)} <small>t</small>`;
  $("kpiCarbon").innerHTML = `${fmt(totalWeight * FACTOR)} <small>t</small>`;
  $("kpiTransit").textContent = transit.length;
  $("kpiLots").textContent = warehouse.length;
  $("donutTotal").textContent = items.length;

  $("pendingBadge").textContent = pending.length;
  $("transitBadge").textContent = transit.length;
  $("queueCount").textContent = pending.length;

  $("activeCollections").textContent = transit.length;
  $("transitWeight").innerHTML = `${fmt(transitWeight)} <small>t</small>`;
  $("stockTotal").innerHTML = `${fmt(totalWeight)} <small>t</small>`;
  $("stockLots").textContent = warehouse.length;

  const moistureValues = warehouse.map(i => Number(i.moisture)).filter(Number.isFinite);
  $("avgMoisture").textContent = moistureValues.length
    ? fmt(moistureValues.reduce((a,b) => a+b,0)/moistureValues.length) + "%"
    : "—";

  const basicRow = item => `
    <tr>
      <td>${escapeHTML(item.id)}</td>
      <td>${escapeHTML(materialName(item.materialType))}</td>
      <td>${escapeHTML(item.location)}</td>
      <td><strong>${fmt(item.quantity)} t</strong></td>
      <td>${statusBadge(item.status)}</td>
    </tr>`;

  $("recentRows").innerHTML = items.slice(0,5).map(basicRow).join("") || emptyRow(5);
  $("supplierRows").innerHTML = items.map(basicRow).join("") || emptyRow(5);

  const filteredItems = items.filter(item => filter === "all" || item.status === filter);

  $("adminRows").innerHTML = filteredItems.map(item => `
    <tr>
      <td>${escapeHTML(item.id)}</td>
      <td>${escapeHTML(item.supplier)}</td>
      <td>${escapeHTML(materialName(item.materialType))}</td>
      <td>${fmt(item.quantity)} t</td>
      <td>${escapeHTML(item.date)}</td>
      <td>${statusBadge(item.status)}</td>
      <td>${item.status === "pending"
        ? `<button class="table-action" data-approve="${escapeHTML(item.id)}">${t("approve")} ↗</button>`
        : "—"}</td>
    </tr>
  `).join("") || emptyRow(7);

  $("logisticsCards").innerHTML = transit.map(item => `
    <article class="panel logistics-card">
      <div>
        <div class="eyebrow">DISPATCH / ${escapeHTML(item.id)}</div>
        <h2>${escapeHTML(materialName(item.materialType))}</h2>
        <p>${escapeHTML(item.location)} · ${escapeHTML(item.driver || "—")}</p>
        <div class="timeline">
          <span class="done">✓ APPROVED</span><b></b>
          <span class="current">● IN TRANSIT</span><b></b>
          <span>WAREHOUSE</span>
        </div>
      </div>
      <div class="logistics-right">
        <strong>${fmt(item.quantity)} <small>t</small></strong>
        <button class="primary-button" data-weigh="${escapeHTML(item.id)}">${t("weigh")} ↗</button>
      </div>
    </article>
  `).join("") || `<div class="panel">${t("noTransit")}</div>`;

  $("warehouseRows").innerHTML = warehouse.map(item => `
    <tr>
      <td>${escapeHTML(item.id)}-WH</td>
      <td>${escapeHTML(materialName(item.materialType))}</td>
      <td><strong>${fmt(item.weightScale ?? item.quantity)} t</strong></td>
      <td>${item.moisture == null ? "—" : fmt(item.moisture) + "%"}</td>
      <td>${escapeHTML(item.driver || "—")}</td>
      <td>${statusBadge(item.status)}</td>
    </tr>
  `).join("") || emptyRow(6);

  const colors = {warehouse:"#acffc8",in_transit:"#7399ef",pending:"#f1c27c"};
  const labels = {warehouse:t("warehouseStatus"),in_transit:t("transitStatus"),pending:t("pendingStatus")};

  $("statusLegend").innerHTML = Object.keys(colors).map(key => `
    <span><i style="background:${colors[key]}"></i>${labels[key]}: ${items.filter(i => i.status === key).length}</span>
  `).join("");

  if (page === "dashboard") renderCharts();
}

function renderCharts() {
  if (typeof Chart === "undefined") return;

  const warehouse = items.filter(item => item.status === "warehouse");
  const fiber = warehouse
    .filter(item => item.materialType === "sotol_fiber")
    .reduce((s,i) => s + Number(i.weightScale ?? i.quantity),0);
  const bagasse = warehouse
    .filter(item => item.materialType === "sotol_bagasse")
    .reduce((s,i) => s + Number(i.weightScale ?? i.quantity),0);

  if (materialChart) materialChart.destroy();
  if (statusChart) statusChart.destroy();

  Chart.defaults.color = "#8fa3ae";
  Chart.defaults.font.family = "DM Mono";

  materialChart = new Chart($("materialChart"), {
    type:"bar",
    data:{
      labels:[t("fiber"),t("bagasse")],
      datasets:[{
        data:[fiber,bagasse],
        backgroundColor:["#81f3e3","#527b75"],
        borderRadius:2,
        barThickness:30
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:"y",
      plugins:{legend:{display:false}},
      scales:{
        x:{beginAtZero:true,grid:{color:"#293746"}},
        y:{grid:{display:false}}
      }
    }
  });

  statusChart = new Chart($("statusChart"), {
    type:"doughnut",
    data:{
      labels:[t("warehouseStatus"),t("transitStatus"),t("pendingStatus")],
      datasets:[{
        data:[
          items.filter(i => i.status === "warehouse").length,
          items.filter(i => i.status === "in_transit").length,
          items.filter(i => i.status === "pending").length
        ],
        backgroundColor:["#acffc8","#7399ef","#f1c27c"],
        borderColor:"#101721",
        borderWidth:5
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      cutout:"78%",
      plugins:{legend:{display:false}}
    }
  });
}

function updateCarbonPreview() {
  const quantity = Math.max(0,Number($("quantityInput").value) || 0);
  $("co2Preview").innerHTML = `${fmt(quantity * FACTOR)} <small>tCO₂e</small>`;
}

function publishBatch(event) {
  event.preventDefault();

  const quantity = Number($("quantityInput").value);
  const location = $("originInput").value.trim();
  const date = $("dateInput").value;

  if (!Number.isFinite(quantity) || quantity <= 0 || !location || !date) {
    notify(t("invalid"));
    return;
  }

  const maxId = Math.max(99,...items.map(item => Number(item.id.match(/\d+$/)?.[0]) || 0));
  const id = "RB-ST" + String(maxId + 1);

  items.unshift({
    id,
    materialType:$("materialInput").value,
    supplier:"Juárez Agro-Hub",
    quantity,
    location,
    date,
    status:"pending",
    weightScale:null,
    moisture:null,
    driver:null,
    notes:$("notesInput").value.trim()
  });

  save();
  $("batchForm").reset();
  $("quantityInput").value = 12.5;
  $("dateInput").value = localDate();
  updateCarbonPreview();
  navigate("admin");
  notify(t("saved"));
}

function approveBatch(id) {
  const item = items.find(i => i.id === id);
  if (!item || item.status !== "pending") return;

  item.status = "in_transit";
  item.driver = item.driver || "Por asignar";
  save();
  notify(t("approved"));
}

function openScale(id) {
  const item = items.find(i => i.id === id);
  if (!item || item.status !== "in_transit") return;

  selectedLot = id;
  $("modalBatch").textContent = id + " / " + materialName(item.materialType);
  $("scaleDriver").value = item.driver === "Por asignar" ? "" : (item.driver || "");
  $("scaleWeight").value = item.weightScale ?? item.quantity;
  $("scaleMoisture").value = item.moisture ?? 12;
  $("scaleModal").classList.remove("hidden");
}

function closeScale() {
  $("scaleModal").classList.add("hidden");
  selectedLot = null;
}

function confirmScale(event) {
  event.preventDefault();

  const item = items.find(i => i.id === selectedLot);
  if (!item) return;

  const weight = Number($("scaleWeight").value);
  const moisture = Number($("scaleMoisture").value);
  const driver = $("scaleDriver").value.trim();

  if (!Number.isFinite(weight) || weight <= 0 ||
      !Number.isFinite(moisture) || moisture < 0 || moisture > 100 || !driver) {
    notify(t("invalid"));
    return;
  }

  item.weightScale = weight;
  item.moisture = moisture;
  item.driver = driver;
  item.status = "warehouse";

  save();
  closeScale();
  notify(t("weighed"));
}

function localDate() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString().slice(0,10);
}

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-page]");
  if (nav) navigate(nav.dataset.page);

  const language = event.target.closest("[data-lang]");
  if (language) setLanguage(language.dataset.lang);

  const approval = event.target.closest("[data-approve]");
  if (approval) approveBatch(approval.dataset.approve);

  const weigh = event.target.closest("[data-weigh]");
  if (weigh) openScale(weigh.dataset.weigh);

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    filter = filterButton.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.classList.toggle("active", button === filterButton);
    });
    renderAll();
  }

  if (event.target.closest(".quote-button")) notify(t("quoteDemo"));
});

$("batchForm").addEventListener("submit",publishBatch);
$("scaleForm").addEventListener("submit",confirmScale);
$("quantityInput").addEventListener("input",updateCarbonPreview);

$("closeModal").addEventListener("click",closeScale);
$("cancelModal").addEventListener("click",closeScale);
$("scaleModal").addEventListener("click",event => {
  if (event.target === $("scaleModal")) closeScale();
});

document.addEventListener("keydown",event => {
  if (event.key === "Escape") closeScale();
});

$("menuButton").addEventListener("click",() => {
  $("sidebar").classList.toggle("open");
});

$("resetButton").addEventListener("click",() => {
  if (confirm(t("resetConfirm"))) {
    items = structuredClone(seed);
    save();
    notify(t("resetDone"));
  }
});

$("dateInput").value = localDate();
setLanguage(lang);
navigate("dashboard");
