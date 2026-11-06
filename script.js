"use strict";

const $ = id => document.getElementById(id);
const FACTOR = 2.4;
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
    navDashboard: "Resumen general", navSupplier: "Registrar material", navAdmin: "Aprobaciones",
    navLogistics: "Logística", navWarehouse: "Almacén", navCatalog: "Catálogo B2B",
    demoLabel: "DEMO LOCAL", notifications: "Actividad pendiente", distribution: "Distribución de materiales",
    allPeriods: "Todos los periodos", last30: "Últimos 30 días", last90: "Últimos 90 días",
    statusTitle: "Estado de los lotes", totalLots: "TOTAL LOTES", recentLots: "Lotes recientes",
    viewAll: "Ver todos", thBatch: "Lote", thMaterial: "Material", thOrigin: "Origen",
    thQuantity: "Cantidad", thStatus: "Estado", statBiomass: "Biomasa en almacén",
    statCO2: "CO₂e estimado*", statTransit: "En tránsito", statQuotes: "Cotizaciones (demo)",
    carbonDisclaimer: "*El factor de CO₂e es ilustrativo y no representa una certificación ambiental.",
    supplierTitle: "Registrar material", supplierSub: "Publica residuos de sotol para su revisión y recolección.",
    batchInfo: "Información del lote", materialType: "Tipo de material", fiber: "Fibra de sotol",
    bagasse: "Bagazo de sotol", quantityTons: "Cantidad (toneladas)", originLocation: "Ubicación / planta de origen",
    availableDate: "Fecha de disponibilidad", technicalNotes: "Notas técnicas / humedad",
    savedLocally: "Los datos se guardan en este navegador.", publishBatch: "Publicar lote",
    environmentalEstimate: "Impacto ambiental estimado", estimateWarning: "Cálculo ilustrativo, no certificado. No equivale a créditos de carbono.",
    myLots: "Mis lotes registrados", adminTitle: "Aprobaciones", adminSub: "Revisa material y autoriza las rutas de recolección.",
    pending: "Pendientes", records: "Registro de operaciones", filterAll: "Todos", transit: "En tránsito",
    warehouse: "En almacén", thSupplier: "Proveedor", thAction: "Acción", logisticsTitle: "Logística",
    logisticsSub: "Supervisa recolecciones y registra pesajes.", active: "Activas", warehouseTitle: "Almacén",
    warehouseSub: "Consulta el peso verificado y las condiciones de los lotes.", warehouseTons: "Toneladas almacenadas",
    warehouseLots: "Lotes recibidos", averageMoisture: "Humedad promedio", inventory: "Inventario por lote",
    verifiedWeight: "Peso verificado", moisture: "Humedad", driver: "Conductor", catalogTitle: "Catálogo B2B",
    catalogSub: "Aplicaciones potenciales para materiales de sotol recuperados.", productFiber: "Fibra refinada de sotol",
    productFiberSub: "Material potencial para empaques moldeados y compuestos, sujeto a pruebas técnicas.",
    requestQuote: "Solicitar cotización", productBagasse: "Bagazo pelletizado de sotol",
    productBagasseSub: "Biomasa de posible uso energético, pendiente de validación técnica.",
    quoteRequests: "Solicitudes de cotización (demo)", thQuote: "Folio", thCompany: "Empresa",
    thVolume: "Volumen", thDate: "Fecha", catalogDisclaimer: "Precios y productos ilustrativos. Las solicitudes solo se guardan localmente.",
    weighTitle: "Registrar pesaje", cancel: "Cancelar", confirmWeigh: "Confirmar y almacenar",
    searchPlaceholder: "Buscar lotes, materiales o reportes...", originPlaceholder: "Planta Industrial Juárez",
    notesPlaceholder: "Humedad, embalaje, condiciones del material...", driverPlaceholder: "Nombre y unidad",
    pendingStatus: "Pendiente", transitStatus: "En tránsito", warehouseStatus: "En almacén",
    approve: "Aprobar", weigh: "Pesaje", noRecords: "No hay registros.", noTransit: "No hay recolecciones activas.",
    saved: "Lote registrado correctamente.", approved: "Lote aprobado y enviado a logística.",
    weighed: "Pesaje registrado. El lote pasó al almacén.", invalid: "Revisa los datos ingresados.",
    quoteDemo: "Las cotizaciones requieren un servidor. Función de demostración.",
    resetConfirm: "¿Restablecer todos los registros?", resetDone: "Registros restablecidos."
  },
  en: {
    navDashboard: "Overview", navSupplier: "Register Material", navAdmin: "Approvals",
    navLogistics: "Logistics", navWarehouse: "Warehouse", navCatalog: "B2B Catalog",
    demoLabel: "LOCAL DEMO", notifications: "Pending activity", distribution: "Material distribution",
    allPeriods: "All periods", last30: "Last 30 days", last90: "Last 90 days",
    statusTitle: "Batch status", totalLots: "TOTAL BATCHES", recentLots: "Recent batches",
    viewAll: "View all", thBatch: "Batch", thMaterial: "Material", thOrigin: "Origin",
    thQuantity: "Quantity", thStatus: "Status", statBiomass: "Stored biomass",
    statCO2: "Estimated CO₂e*", statTransit: "In transit", statQuotes: "Quotes (demo)",
    carbonDisclaimer: "*CO₂e factor is illustrative and does not constitute environmental certification.",
    supplierTitle: "Register material", supplierSub: "Publish sotol residues for review and collection.",
    batchInfo: "Batch details", materialType: "Material type", fiber: "Sotol fiber",
    bagasse: "Sotol bagasse", quantityTons: "Quantity (tons)", originLocation: "Origin facility / location",
    availableDate: "Availability date", technicalNotes: "Technical notes / moisture",
    savedLocally: "Data is saved in this browser.", publishBatch: "Publish batch",
    environmentalEstimate: "Estimated environmental impact", estimateWarning: "Illustrative demo calculation, not certified. Does not equal carbon credits.",
    myLots: "My registered batches", adminTitle: "Approvals", adminSub: "Review material and authorize collection routes.",
    pending: "Pending", records: "Operations log", filterAll: "All", transit: "In transit",
    warehouse: "In warehouse", thSupplier: "Supplier", thAction: "Action", logisticsTitle: "Logistics",
    logisticsSub: "Monitor collections and record verified weights.", active: "Active", warehouseTitle: "Warehouse",
    warehouseSub: "Check verified weight and material conditions.", warehouseTons: "Stored tons",
    warehouseLots: "Received batches", averageMoisture: "Average moisture", inventory: "Inventory by batch",
    verifiedWeight: "Verified weight", moisture: "Moisture", driver: "Driver", catalogTitle: "B2B Catalog",
    catalogSub: "Potential applications for reclaimed sotol materials.", productFiber: "Refined Sotol Fiber",
    productFiberSub: "Potential feedstock for molded packaging and composites, subject to technical testing.",
    requestQuote: "Request quote", productBagasse: "Pelletized Sotol Bagasse",
    productBagasseSub: "Biomass for potential energy use, subject to technical validation.",
    quoteRequests: "Quote requests (demo)", thQuote: "ID", thCompany: "Company",
    thVolume: "Volume", thDate: "Date", catalogDisclaimer: "Illustrative prices and products. Requests are only stored locally.",
    weighTitle: "Record weight", cancel: "Cancel", confirmWeigh: "Confirm & Store",
    searchPlaceholder: "Search batches, materials or reports...", originPlaceholder: "Juarez Industrial Facility",
    notesPlaceholder: "Moisture, packaging, material status...", driverPlaceholder: "Driver name and truck ID",
    pendingStatus: "Pending", transitStatus: "In transit", warehouseStatus: "In warehouse",
    approve: "Approve", weigh: "Weight", noRecords: "No records found.", noTransit: "No active collections.",
    saved: "Batch registered successfully.", approved: "Batch approved and dispatched to logistics.",
    weighed: "Weight recorded. Transferred to warehouse.", invalid: "Please check input data.",
    quoteDemo: "Quotes require backend integration. Demo mode only.",
    resetConfirm: "Reset all demo records?", resetDone: "Records reset successfully."
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
  return `<span class="status-badge status-${value}">${labels[value] || escapeHTML(value)}</span>`;
}

function emptyRow(columns) {
  return `<tr><td class="empty-cell" colspan="${columns}">${t("noRecords")}</td></tr>`;
}

function save() {
  localStorage.setItem(STORAGE, JSON.stringify(items));
  renderAll();
}

function notify(message) {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 3300);
}

function setLanguage(value) {
  lang = value;
  localStorage.setItem(LANGUAGE_STORAGE, lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  renderAll();
  updateCarbonPreview();
}

function navigate(name) {
  const targetPage = $("page-" + name) || $(name);
  if (!targetPage) return;
  page = name;
  document.querySelectorAll(".page").forEach(section => section.classList.remove("active"));
  targetPage.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle("active", button.dataset.page === name);
  });
  
  if ($("sidebar")) $("sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"instant"});
  if (name === "dashboard") requestAnimationFrame(renderCharts);
}

function renderAll() {
  const warehouse = items.filter(i => i.status === "warehouse");
  const transit = items.filter(i => i.status === "in_transit");
  const pending = items.filter(i => i.status === "pending");

  const totalWeight = warehouse.reduce((sum,i) => sum + Number(i.weightScale ?? i.quantity),0);

  if ($("totalTons")) $("totalTons").textContent = `${fmt(totalWeight)} t`;
  if ($("totalCO2")) $("totalCO2").textContent = `${fmt(totalWeight * FACTOR)} t`;
  if ($("totalTransit")) $("totalTransit").textContent = transit.length;
  if ($("donutTotal")) $("donutTotal").textContent = items.length;

  if ($("pendingCount")) $("pendingCount").textContent = pending.length;
  if ($("adminPending")) $("adminPending").textContent = pending.length;
  if ($("logisticsCount")) $("logisticsCount").textContent = transit.length;
  if ($("warehouseTons")) $("warehouseTons").textContent = `${fmt(totalWeight)} t`;
  if ($("warehouseLots")) $("warehouseLots").textContent = warehouse.length;

  const moistureValues = warehouse.map(i => Number(i.moisture)).filter(Number.isFinite);
  if ($("averageMoisture")) {
    $("averageMoisture").textContent = moistureValues.length
      ? fmt(moistureValues.reduce((a,b) => a+b,0)/moistureValues.length) + "%"
      : "—";
  }

  const basicRow = item => `
    <tr>
      <td>${escapeHTML(item.id)}</td>
      <td>${escapeHTML(materialName(item.materialType))}</td>
      <td>${escapeHTML(item.location)}</td>
      <td><strong>${fmt(item.quantity)} t</strong></td>
      <td>${statusBadge(item.status)}</td>
    </tr>`;

  if ($("recentRows")) $("recentRows").innerHTML = items.slice(0,5).map(basicRow).join("") || emptyRow(5);
  if ($("supplierRows")) $("supplierRows").innerHTML = items.map(basicRow).join("") || emptyRow(5);

  const filteredItems = items.filter(item => filter === "all" || item.status === filter);
  if ($("adminRows")) {
    $("adminRows").innerHTML = filteredItems.map(item => `
      <tr>
        <td>${escapeHTML(item.id)}</td>
        <td>${escapeHTML(item.supplier)}</td>
        <td>${escapeHTML(materialName(item.materialType))}</td>
        <td>${fmt(item.quantity)} t</td>
        <td>${statusBadge(item.status)}</td>
        <td>${item.status === "pending"
          ? `<button class="table-action" data-approve="${escapeHTML(item.id)}">${t("approve")} ↗</button>`
          : "—"}</td>
      </tr>
    `).join("") || emptyRow(6);
  }

  if ($("logisticsCards")) {
    $("logisticsCards").innerHTML = transit.map(item => `
      <article class="logistics-item">
        <div>
          <small>DISPATCH / ${escapeHTML(item.id)}</small>
          <h2>${escapeHTML(materialName(item.materialType))}</h2>
          <p>${escapeHTML(item.location)} · ${escapeHTML(item.driver || "—")}</p>
        </div>
        <div>
          <strong>${fmt(item.quantity)} t</strong>
          <button class="primary-button" data-weigh="${escapeHTML(item.id)}">${t("weigh")} ↗</button>
        </div>
      </article>
    `).join("") || `<div class="empty-panel">${t("noTransit")}</div>`;
  }

  if ($("warehouseRows")) {
    $("warehouseRows").innerHTML = warehouse.map(item => `
      <tr>
        <td>${escapeHTML(item.id)}-WH</td>
        <td>${escapeHTML(materialName(item.materialType))}</td>
        <td><strong>${fmt(item.weightScale ?? item.quantity)} t</strong></td>
        <td>${item.moisture == null ? "—" : fmt(item.moisture) + "%"}</td>
        <td>${escapeHTML(item.driver || "—")}</td>
      </tr>
    `).join("") || emptyRow(5);
  }

  if ($("chartLegend")) {
    const colors = {warehouse:"#acffc8",in_transit:"#7399ef",pending:"#f1c27c"};
    const labels = {warehouse:t("warehouseStatus"),in_transit:t("transitStatus"),pending:t("pendingStatus")};

    $("chartLegend").innerHTML = Object.keys(colors).map(key => `
      <div class="legend-line">
        <span class="legend-dot" style="background:${colors[key]}"></span>
        <span>${labels[key]}</span>
        <strong>${items.filter(i => i.status === key).length}</strong>
      </div>
    `).join("");
  }

  if (page === "dashboard") renderCharts();
}

function renderCharts() {
  if (typeof Chart === "undefined" || !$("materialChart") || !$("statusChart")) return;

  const warehouse = items.filter(item => item.status === "warehouse");
  const fiber = warehouse.filter(item => item.materialType === "sotol_fiber").reduce((s,i) => s + Number(i.weightScale ?? i.quantity),0);
  const bagasse = warehouse.filter(item => item.materialType === "sotol_bagasse").reduce((s,i) => s + Number(i.weightScale ?? i.quantity),0);

  if (materialChart) materialChart.destroy();
  if (statusChart) statusChart.destroy();

  Chart.defaults.color = "#4c6753";
  Chart.defaults.font.family = "DM Sans";

  materialChart = new Chart($("materialChart"), {
    type:"bar",
    data:{
      labels:[t("fiber"),t("bagasse")],
      datasets:[{
        data:[fiber,bagasse],
        backgroundColor:["#087247","#b5ce89"],
        borderRadius:6,
        barThickness:28
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:"y",
      plugins:{legend:{display:false}},
      scales:{ x:{beginAtZero:true}, y:{grid:{display:false}} }
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
        backgroundColor:["#35a568","#7399ef","#f1c27c"],
        borderWidth:2
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      cutout:"75%",
      plugins:{legend:{display:false}}
    }
  });
}

function updateCarbonPreview() {
  if (!$("carbonPreview") || !$("quantityInput")) return;
  const quantity = Math.max(0,Number($("quantityInput").value) || 0);
  $("carbonPreview").innerHTML = `${fmt(quantity * FACTOR)} <span>tCO₂e</span>`;
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
    driver:null
  });

  save();
  $("batchForm").reset();
  $("quantityInput").value = 12.5;
  updateCarbonPreview();
  navigate("admin");
  notify(t("saved"));
}

function approveBatch(id) {
  const item = items.find(i => i.id === id);
  if (!item || item.status !== "pending") return;

  item.status = "in_transit";
  item.driver = "Por asignar";
  save();
  notify(t("approved"));
}

function openScale(id) {
  const item = items.find(i => i.id === id);
  if (!item || item.status !== "in_transit") return;

  selectedLot = id;
  if ($("weighBatch")) $("weighBatch").textContent = id + " / " + materialName(item.materialType);
  if ($("weighDriver")) $("weighDriver").value = item.driver === "Por asignar" ? "" : (item.driver || "");
  if ($("weighWeight")) $("weighWeight").value = item.weightScale ?? item.quantity;
  if ($("weighMoisture")) $("weighMoisture").value = item.moisture ?? 12;
  if ($("weighModal")) $("weighModal").classList.remove("hidden");
}

function closeScale() {
  if ($("weighModal")) $("weighModal").classList.add("hidden");
  selectedLot = null;
}

function confirmScale(event) {
  event.preventDefault();
  const item = items.find(i => i.id === selectedLot);
  if (!item) return;

  const weight = Number($("weighWeight").value);
  const moisture = Number($("weighMoisture").value);
  const driver = $("weighDriver").value.trim();

  if (!Number.isFinite(weight) || weight <= 0 || !driver) {
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
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0,10);
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
      button.classList.toggle("selected", button === filterButton);
    });
    renderAll();
  }

  if (event.target.closest(".quote-button")) notify(t("quoteDemo"));

  const closeModalBtn = event.target.closest("[data-close-modal]");
  if (closeModalBtn) closeScale();
});

if ($("batchForm")) $("batchForm").addEventListener("submit", publishBatch);
if ($("weighForm")) $("weighForm").addEventListener("submit", confirmScale);
if ($("quantityInput")) $("quantityInput").addEventListener("input", updateCarbonPreview);

if ($("mobileMenu")) {
  $("mobileMenu").addEventListener("click", () => {
    if ($("sidebar")) $("sidebar").classList.toggle("open");
  });
}

if ($("closeSidebar")) {
  $("closeSidebar").addEventListener("click", () => {
    if ($("sidebar")) $("sidebar").classList.remove("open");
  });
}

if ($("resetButton")) {
  $("resetButton").addEventListener("click", () => {
    if (confirm(t("resetConfirm"))) {
      items = structuredClone(seed);
      save();
      notify(t("resetDone"));
    }
  });
}

if ($("dateInput")) $("dateInput").value = localDate();

setLanguage(lang);
navigate("dashboard");