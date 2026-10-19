/* TAILWIND CONFIGURATION */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          dark: '#0f172a'
        }
      },
      boxShadow: {
        glow: '0 0 20px rgba(16, 185, 129, 0.35)',
        'glow-lg': '0 0 30px rgba(16, 185, 129, 0.5)'
      }
    }
  }
};

/* BILINGUAL TRANSLATION DICTIONARY (100% COVERAGE) */
const i18n = {
  es: {
    subtitle: "Plataforma de Materiales y Economía Circular",
    lang_label: "Idioma:",
    user_role: "Planta Industrial",
    nav_title: "Navegación Módulos",
    nav_dashboard: "Panel Principal",
    nav_supplier: "Proveedor (Publicar)",
    nav_admin: "Revisión Admin",
    nav_logistics: "Logística y Recolección",
    nav_warehouse: "Almacén e Inventario QC",
    nav_catalog: "Catálogo B2B y Cotizaciones",
    sidebar_impact_title: "Impacto Circular Activo",
    sidebar_impact_desc: "Tasa de Desvío de Relleno Sanitario",
    dash_title: "Resumen Ejecutivo de Economía Circular",
    dash_subtitle: "Monitoreo en tiempo real de desperdicio industrial revalorizado y reducción de huella de carbono.",
    btn_new_waste: "Publicar Residuo",
    kpi_revalorized: "Material Revalorizado",
    kpi_co2: "CO2e Evitado Estimado",
    kpi_pickups: "Recolecciones Activas",
    kpi_quotes: "Cotizaciones B2B",
    kpi_vs_last: "vs mes anterior",
    kpi_cert_ver: "Certificado GHG Protocol",
    kpi_b2b_partners: "Demanda Industrial",
    chart_material_title: "Composición de Residuos Recalificados",
    chart_units_tons: "Toneladas Métrica (t)",
    chart_status_title: "Estado de la Cadena de Suministro",
    chart_status_desc: "Distribución por fase logística y control de calidad",
    chart_efficiency: "Eficiencia de Procesamiento:",
    recent_activity_title: "Últimas Transacciones Circulares",
    live_feed: "Sincronizado en Vivo",
    supp_title: "Módulo de Proveedor: Publicar Desperdicio Residual",
    supp_subtitle: "Registre residuos orgánicos e industriales para su recolección y reintegración a la cadena productiva.",
    lbl_material_type: "Tipo de Material Residual",
    lbl_quantity: "Cantidad Estimada",
    lbl_location: "Ubicación / Planta Origen",
    lbl_avail_date: "Fecha de Disponibilidad",
    lbl_notes: "Especificaciones Técnicas / Humedad",
    btn_publish_now: "Publicar Oferta de Residuo",
    co2_sim_title: "Calculadora Ambiental en Tiempo Real",
    co2_sim_heading: "Ahorro Estimado de Carbono",
    sim_factor: "Factor de Conversión:",
    sim_co2_total: "Emisiones Evitadas Totales:",
    sim_rule1: "Evita metano en vertedero abierto.",
    sim_rule2: "Genera créditos de sustentabilidad Scope 3.",
    my_listings_title: "Mis Publicaciones de Residuo Registradas",
    th_id: "ID Ref",
    th_material: "Material",
    th_quantity: "Cantidad",
    th_location: "Ubicación",
    th_co2_saved: "CO2 Evitado",
    th_status: "Estado",
    th_actions: "Acciones Admin",
    th_supplier: "Proveedor",
    th_date: "Fecha Disp.",
    admin_title: "Administración y Control de Calidad Inicial",
    admin_subtitle: "Revise las ofertas de residuo entrantes, apruebe especificaciones y asigne rutas de recolección.",
    logistics_title: "Logística y Recolecciones en Campo",
    logistics_subtitle: "Interfaz para operadores y transporte. Registre pesajes reales en báscula digital.",
    wh_title: "Almacén e Inventario de Materia Prima Circular",
    wh_subtitle: "Inspección de recibo, separación de mermas e imputación de lotes normalizados (RB-Batch).",
    wh_stock_total: "Stock Bruto en Planta",
    wh_qc_approved: "Conforme para Proceso",
    wh_mermas: "Mermas / Descarte Impurezas",
    wh_table_title: "Lotes de Material Clasificado (Lotes RB)",
    wh_system_id: "Sistema Trazable ISO-14021",
    th_batch_id: "ID Lote",
    th_qty_accepted: "Cant. Aceptada",
    th_qty_mermas: "Mermas (Rechazo)",
    th_quality_grade: "Grado Calidad",
    th_qc_action: "Acción QC",
    cat_title: "Catálogo de Productos Transformados y Cotizaciones B2B",
    cat_subtitle: "Productos industriales manufacturados a partir de biomasa y materiales revalorizados.",
    quote_queue_title: "Solicitudes de Cotización B2B",
    th_quote_id: "Folio",
    th_client: "Cliente B2B",
    th_product: "Producto",
    th_volume: "Volumen",
    th_est_total: "Monto Estimado",
    modal_sched_title: "Programar Recolección Logística",
    lbl_assign_driver: "Chofer Asignado",
    lbl_pickup_time: "Hora Programada",
    btn_cancel: "Cancelar",
    btn_confirm_sched: "Confirmar Recolección",
    modal_weigh_title: "Registro Digital de Báscula y Entrada",
    weigh_booked_qty: "Cantidad Estimada en Orden:",
    lbl_actual_weight: "Peso Neto Real (Tons)",
    lbl_mermas_est: "Mermas / Impurezas (Tons)",
    btn_save_entry: "Ingresar a Almacén",
    modal_quote_title: "Solicitar Cotización B2B",
    lbl_company: "Empresa / Razón Social",
    lbl_volume: "Volumen Requerido",
    lbl_target_date: "Fecha de Entrega Requerida",
    btn_send_quote: "Enviar Solicitud",
    reset_modal_title: "¿Reiniciar Datos Demo?",
    reset_modal_desc: "Esta acción restaurará todas las publicaciones, lotes de almacén y cotizaciones a su estado inicial.",
    btn_confirm_reset: "Sí, Reiniciar",
    btn_approve: "Aprobar y Programar",
    btn_reject: "Rechazar",
    btn_log_weight: "Registrar Pesaje",
    btn_quote_req: "Solicitar Cotización",
    badge_pending: "Pendiente",
    badge_scheduled: "Programado",
    badge_received: "En Almacén",
    badge_rejected: "Rechazado",
    badge_quoted: "En Cotización",
    badge_confirmed: "Confirmado"
  },
  en: {
    subtitle: "Circular Materials & Waste Platform",
    lang_label: "Language:",
    user_role: "Industrial Hub",
    nav_title: "Module Navigation",
    nav_dashboard: "Executive Dashboard",
    nav_supplier: "Supplier (Post Waste)",
    nav_admin: "Admin Review Queue",
    nav_logistics: "Logistics & Pickups",
    nav_warehouse: "Warehouse & QC Inventory",
    nav_catalog: "B2B Catalog & Quotes",
    sidebar_impact_title: "Active Circular Impact",
    sidebar_impact_desc: "Landfill Diversion Rate",
    dash_title: "Circular Economy Executive Overview",
    dash_subtitle: "Real-time tracking of revalorized industrial waste and carbon footprint reduction.",
    btn_new_waste: "Publish Waste",
    kpi_revalorized: "Revalorized Material",
    kpi_co2: "Est. Avoided CO2e",
    kpi_pickups: "Active Pickups",
    kpi_quotes: "B2B Quotes",
    kpi_vs_last: "vs last month",
    kpi_cert_ver: "GHG Protocol Certified",
    kpi_b2b_partners: "Industrial Demand",
    chart_material_title: "Reclaimed Materials Composition",
    chart_units_tons: "Metric Tons (t)",
    chart_status_title: "Supply Chain Phase Breakdown",
    chart_status_desc: "Distribution across logistics and quality control gates",
    chart_efficiency: "Processing Efficiency:",
    recent_activity_title: "Recent Circular Transactions",
    live_feed: "Live Sync",
    supp_title: "Supplier Module: Publish Waste Stream",
    supp_subtitle: "Register organic and industrial byproducts for collection and circular manufacturing.",
    lbl_material_type: "Residual Material Type",
    lbl_quantity: "Estimated Quantity",
    lbl_location: "Origin Plant / Location",
    lbl_avail_date: "Availability Date",
    lbl_notes: "Technical Specs / Moisture",
    btn_publish_now: "Publish Waste Stream",
    co2_sim_title: "Real-Time Environmental Estimator",
    co2_sim_heading: "Estimated Carbon Offset",
    sim_factor: "Conversion Factor:",
    sim_co2_total: "Total Avoided Emissions:",
    sim_rule1: "Prevents methane generation in landfills.",
    sim_rule2: "Generates Scope 3 sustainability credits.",
    my_listings_title: "My Waste Stream Listings",
    th_id: "Ref ID",
    th_material: "Material",
    th_quantity: "Quantity",
    th_location: "Location",
    th_co2_saved: "CO2 Avoided",
    th_status: "Status",
    th_actions: "Admin Actions",
    th_supplier: "Supplier",
    th_date: "Avail. Date",
    admin_title: "Admin Review & Initial Quality Gate",
    admin_subtitle: "Review incoming waste offers, validate specifications, and dispatch logistics routes.",
    logistics_title: "Field Logistics & Pickups",
    logistics_subtitle: "Interface for logistics drivers and operators. Log verified scale measurements.",
    wh_title: "Circular Raw Material Warehouse & QC",
    wh_subtitle: "Inbound inspection, impurity loss splitting, and RB-Batch ID generation.",
    wh_stock_total: "Gross Plant Stock",
    wh_qc_approved: "QC Passed / Ready",
    wh_mermas: "Losses / Impurities",
    wh_table_title: "Classified Material Batches (RB Batches)",
    wh_system_id: "ISO-14021 Traceable System",
    th_batch_id: "Batch ID",
    th_qty_accepted: "Accepted Qty",
    th_qty_mermas: "Losses (Rejected)",
    th_quality_grade: "Quality Grade",
    th_qc_action: "QC Action",
    cat_title: "Upcycled B2B Products & Quotes",
    cat_subtitle: "Engineered industrial packaging and materials converted from circular biomass.",
    quote_queue_title: "B2B Quote Request Queue",
    th_quote_id: "Quote ID",
    th_client: "B2B Client",
    th_product: "Product",
    th_volume: "Volume",
    th_est_total: "Est. Total Value",
    modal_sched_title: "Schedule Logistics Pickup",
    lbl_assign_driver: "Assigned Driver",
    lbl_pickup_time: "Scheduled Time",
    btn_cancel: "Cancel",
    btn_confirm_sched: "Confirm Pickup",
    modal_weigh_title: "Digital Weighing & Warehouse Gate Entry",
    weigh_booked_qty: "Estimated Order Quantity:",
    lbl_actual_weight: "Actual Net Weight (Tons)",
    lbl_mermas_est: "Losses / Impurities (Tons)",
    btn_save_entry: "Commit to Warehouse",
    modal_quote_title: "Request B2B Quote",
    lbl_company: "Company Name",
    lbl_volume: "Required Volume",
    lbl_target_date: "Target Delivery Date",
    btn_send_quote: "Submit Request",
    reset_modal_title: "Reset Demo Data?",
    reset_modal_desc: "This will restore all listings, warehouse batches, and quotes to default initial state.",
    btn_confirm_reset: "Yes, Reset",
    btn_approve: "Approve & Schedule",
    btn_reject: "Reject",
    btn_log_weight: "Log Scale Weight",
    btn_quote_req: "Request Quote",
    badge_pending: "Pending",
    badge_scheduled: "Scheduled",
    badge_received: "In Warehouse",
    badge_rejected: "Rejected",
    badge_quoted: "In Quote",
    badge_confirmed: "Confirmed"
  }
};

/* CO2 FACTORS PER TON */
const CO2_FACTORS = {
  'Sotol Fiber / Fibra de Sotol': 2.4,
  'Agave Bagasse / Bagazo de Agave': 2.1,
  'Cardboard Scrap / Cartón Industrial': 1.8,
  'Wood Pallets / Tarimas de Madera': 1.2,
  'Polypropylene Shred / Plástico PP': 3.1
};

/* INITIAL DEMO STATE */
const DEFAULT_STATE = {
  lang: 'es',
  activeTab: 'dashboard',
  listings: [
    { id: 'RB-1001', material: 'Sotol Fiber / Fibra de Sotol', qty: 14.5, unit: 'Tons', location: 'Planta Juárez Norte', date: '2026-10-22', status: 'Pending', co2: 34.8, supplier: 'Destilería Sotol Real' },
    { id: 'RB-1002', material: 'Agave Bagasse / Bagazo de Agave', qty: 28.0, unit: 'Tons', location: 'Planta Chihuahua Sur', date: '2026-10-20', status: 'Scheduled', co2: 58.8, driver: 'Carlos Mendoza (Unidad T-04)', time: '09:00', supplier: 'Agave Bio-Industrias' },
    { id: 'RB-1003', material: 'Cardboard Scrap / Cartón Industrial', qty: 8.2, unit: 'Tons', location: 'Parque Industrial Bermúdez', date: '2026-10-18', status: 'Received', co2: 14.76, supplier: 'Empaques del Norte' },
    { id: 'RB-1004', material: 'Polypropylene Shred / Plástico PP', qty: 5.0, unit: 'Tons', location: 'Planta Juárez Oeste', date: '2026-10-25', status: 'Pending', co2: 15.5, supplier: 'Polímeros Reciclados MX' }
  ],
  warehouseBatches: [
    { batchId: 'RB-B201', material: 'Sotol Fiber / Fibra de Sotol', qtyAccepted: 42.0, qtyLoss: 1.8, grade: 'Grado A (Alta Pureza)', bay: 'Silo Bio-01' },
    { batchId: 'RB-B202', material: 'Agave Bagasse / Bagazo de Agave', qtyAccepted: 85.5, qtyLoss: 4.2, grade: 'Grado B (Estándar)', bay: 'Nave B - Bahía 4' },
    { batchId: 'RB-B203', material: 'Cardboard Scrap / Cartón Industrial', qtyAccepted: 49.3, qtyLoss: 1.4, grade: 'Grado A (Alta Pureza)', bay: 'Nave C - Prensas' }
  ],
  catalogProducts: [
    { id: 'PROD-01', name_es: 'Insertos Protectores Bio-Sotol', name_en: 'Bio-Sotol Molded Packaging Inserts', eco_es: 'Sustituye unicel/EPS. 100% Biodegradable.', eco_en: 'Replaces EPS foam. 100% Biodegradable.', price: '$1.85 USD / unit', icon: 'fa-cube' },
    { id: 'PROD-02', name_es: 'Tarimas Industriales Bio-Compuestas', name_en: 'Bio-Composite Industrial Pallets', eco_es: 'Fabricadas con 70% fibra de agave y PP reciclado.', eco_en: 'Made with 70% agave fiber & recycled PP.', price: '$18.50 USD / unit', icon: 'fa-pallet' },
    { id: 'PROD-03', name_es: 'Pellets Termoplásticos de Biomasa', name_en: 'Biomass Thermoplastic Pellets', eco_es: 'Resina para moldeo por inyección de grado técnico.', eco_en: 'Injection molding technical grade resin.', price: '$1,120 USD / Ton', icon: 'fa-boxes-stacked' },
    { id: 'PROD-04', name_es: 'Contenedores Reciclados Heavy-Duty', name_en: 'Heavy-Duty Reusable Containers', eco_es: 'Para logística interna en plantas automotrices.', eco_en: 'For internal automotive plant logistics.', price: '$45.00 USD / unit', icon: 'fa-box-tissue' }
  ],
  quotes: [
    { id: 'QT-801', company: 'AutoParts Assembly MX', product: 'Insertos Protectores Bio-Sotol', volume: '10,000 unidades', estimated: '$18,500 USD', status: 'In Quote' },
    { id: 'QT-802', company: 'Logística Global Chihuahua', product: 'Tarimas Industriales Bio-Compuestas', volume: '500 tarimas', estimated: '$9,250 USD', status: 'Confirmed' }
  ],
  activities: [
    { icon: 'fa-check-circle', color: 'text-emerald-500', title_es: 'Lote RB-B203 ingresado a Almacén', title_en: 'Batch RB-B203 committed to Warehouse', time: 'Hace 10 min' },
    { icon: 'fa-truck-moving', color: 'text-blue-500', title_es: 'Recolección RB-1002 en ruta', title_en: 'Pickup RB-1002 in transit', time: 'Hace 45 min' },
    { icon: 'fa-leaf', color: 'text-teal-500', title_es: 'Nueva oferta: 14.5t Fibra de Sotol', title_en: 'New offer: 14.5t Sotol Fiber', time: 'Hace 2 horas' }
  ]
};

let appState = {};
let chartMixInstance = null;
let chartStatusInstance = null;

/* INITIALIZATION */
window.onload = function() {
  loadState();
  calculateCo2Estimate();
  updateUI();

  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('input-date');
  if (dateInput) dateInput.value = today;
};

function loadState() {
  const saved = localStorage.getItem('REBOX_APP_STATE');
  if (saved) {
    try {
      appState = JSON.parse(saved);
    } catch (e) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  } else {
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState() {
  localStorage.setItem('REBOX_APP_STATE', JSON.stringify(appState));
}

/* LANGUAGE SWITCHING ENGINE */
function setLanguage(lang) {
  appState.lang = lang;
  saveState();

  const btnEs = document.getElementById('btn-lang-es');
  const btnEn = document.getElementById('btn-lang-en');

  if (lang === 'es') {
    btnEs.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md scale-105";
    btnEn.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 text-slate-400 hover:text-white";
  } else {
    btnEn.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md scale-105";
    btnEs.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 text-slate-400 hover:text-white";
  }

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.innerText = i18n[lang][key];
    }
  });

  renderAllModules();
  showToast(lang === 'es' ? 'Idioma cambiado a Español 🇲🇽' : 'Language switched to English 🇺🇸');
}

/* NAVIGATION SWITCHER */
function switchTab(tabId) {
  appState.activeTab = tabId;
  saveState();

  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  const targetModule = document.getElementById(`module-${tabId}`);
  if (targetModule) targetModule.classList.remove('hidden');

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-r-4', 'border-emerald-600');
    btn.classList.add('text-slate-600', 'hover:bg-slate-100');
  });

  const activeNav = document.getElementById(`nav-${tabId}`);
  if (activeNav) {
    activeNav.classList.remove('text-slate-600', 'hover:bg-slate-100');
    activeNav.classList.add('bg-emerald-50', 'text-emerald-700', 'border-r-4', 'border-emerald-600');
  }

  if (tabId === 'dashboard') {
    renderCharts();
  }
}

/* MAIN UI RENDER DISPATCHER */
function updateUI() {
  setLanguage(appState.lang || 'es');
  switchTab(appState.activeTab || 'dashboard');
}

function renderAllModules() {
  renderDashboard();
  renderSupplier();
  renderAdmin();
  renderLogistics();
  renderWarehouse();
  renderCatalog();
}

/* 1. DASHBOARD MODULE RENDER */
function renderDashboard() {
  const totalTons = appState.listings.reduce((acc, item) => acc + (item.status !== 'Rejected' ? parseFloat(item.qty) : 0), 0) +
                    appState.warehouseBatches.reduce((acc, item) => acc + parseFloat(item.qtyAccepted), 0);

  const totalCo2 = appState.listings.reduce((acc, item) => acc + (item.status !== 'Rejected' ? parseFloat(item.co2) : 0), 0);

  const activePickups = appState.listings.filter(i => i.status === 'Scheduled').length;
  const openQuotes = appState.quotes.length;

  document.getElementById('kpi-total-tons').innerText = totalTons.toFixed(1) + ' t';
  document.getElementById('kpi-total-co2').innerText = totalCo2.toFixed(1) + ' t';
  document.getElementById('kpi-active-pickups').innerText = activePickups;
  document.getElementById('kpi-quotes-count').innerText = openQuotes;

  const feedContainer = document.getElementById('activity-feed-container');
  const lang = appState.lang;
  feedContainer.innerHTML = appState.activities.map(act => `
    <div class="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition">
      <div class="flex items-center gap-3">
        <i class="fa-solid ${act.icon} ${act.color} text-lg"></i>
        <span class="text-xs sm:text-sm font-semibold text-slate-800">${lang === 'es' ? act.title_es : act.title_en}</span>
      </div>
      <span class="text-[11px] text-slate-400 font-medium">${act.time}</span>
    </div>
  `).join('');

  renderCharts();
}

/* CHART.JS RENDERER */
function renderCharts() {
  const isEs = appState.lang === 'es';

  const ctxMixElem = document.getElementById('chartMaterialMix');
  if (!ctxMixElem) return;
  const ctxMix = ctxMixElem.getContext('2d');
  if (chartMixInstance) chartMixInstance.destroy();

  chartMixInstance = new Chart(ctxMix, {
    type: 'bar',
    data: {
      labels: isEs 
        ? ['Fibra Sotol', 'Bagazo Agave', 'Cartón Ind.', 'Plástico PP', 'Madera'] 
        : ['Sotol Fiber', 'Agave Bagasse', 'Cardboard', 'PP Plastic', 'Wood Pallets'],
      datasets: [{
        label: isEs ? 'Toneladas Recalificadas' : 'Reclaimed Tons',
        data: [56.5, 113.5, 57.5, 5.0, 12.0],
        backgroundColor: ['#059669', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false }, ticks: { font: { size: 10 } } }
      }
    }
  });

  const ctxStatusElem = document.getElementById('chartStatusPie');
  if (!ctxStatusElem) return;
  const ctxStatus = ctxStatusElem.getContext('2d');
  if (chartStatusInstance) chartStatusInstance.destroy();

  const pendingCount = appState.listings.filter(i => i.status === 'Pending').length;
  const schedCount = appState.listings.filter(i => i.status === 'Scheduled').length;
  const recvCount = appState.listings.filter(i => i.status === 'Received').length + appState.warehouseBatches.length;

  chartStatusInstance = new Chart(ctxStatus, {
    type: 'doughnut',
    data: {
      labels: [
        i18n[appState.lang].badge_pending,
        i18n[appState.lang].badge_scheduled,
        i18n[appState.lang].badge_received
      ],
      datasets: [{
        data: [pendingCount, schedCount, recvCount],
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12 } }
      },
      cutout: '70%'
    }
  });
}

/* 2. SUPPLIER MODULE RENDER & LOGIC */
function calculateCo2Estimate() {
  const mat = document.getElementById('input-material').value;
  const qty = parseFloat(document.getElementById('input-quantity').value) || 0;
  const factor = CO2_FACTORS[mat] || 2.0;

  document.getElementById('sim-factor-display').innerText = `${factor.toFixed(1)} tCO2e / Ton`;
  document.getElementById('sim-co2-result').innerText = `${(qty * factor).toFixed(1)} tCO2e`;
}

function handlePublishWaste(e) {
  e.preventDefault();
  const mat = document.getElementById('input-material').value;
  const qty = parseFloat(document.getElementById('input-quantity').value);
  const unit = document.getElementById('input-unit').value;
  const location = document.getElementById('input-location').value;
  const date = document.getElementById('input-date').value;
  const factor = CO2_FACTORS[mat] || 2.0;

  const newListing = {
    id: `RB-${Math.floor(1000 + Math.random() * 9000)}`,
    material: mat,
    qty: qty,
    unit: unit,
    location: location,
    date: date,
    status: 'Pending',
    co2: parseFloat((qty * factor).toFixed(2)),
    supplier: 'Planta Industrial Juárez'
  };

  appState.listings.unshift(newListing);
  
  appState.activities.unshift({
    icon: 'fa-plus-circle',
    color: 'text-emerald-500',
    title_es: `Nueva publicación: ${qty}t de ${mat.split('/')[0]}`,
    title_en: `New listing: ${qty}t of ${mat.split('/')[1] || mat}`,
    time: 'Justo ahora'
  });

  saveState();
  renderAllModules();
  showToast(appState.lang === 'es' ? 'Oferta de residuo publicada con éxito' : 'Waste offer successfully published');
}

function renderSupplier() {
  const body = document.getElementById('supplier-table-body');
  document.getElementById('my-listings-count').innerText = `${appState.listings.length} ${appState.lang === 'es' ? 'Publicaciones' : 'Listings'}`;

  body.innerHTML = appState.listings.map(item => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-mono font-bold text-slate-700">${item.id}</td>
      <td class="py-3 px-4 font-semibold text-slate-800">${item.material}</td>
      <td class="py-3 px-4 font-bold">${item.qty} ${item.unit}</td>
      <td class="py-3 px-4 text-slate-500">${item.location}</td>
      <td class="py-3 px-4 text-emerald-600 font-bold">+${item.co2} tCO2e</td>
      <td class="py-3 px-4">${renderStatusBadge(item.status)}</td>
    </tr>
  `).join('');
}

/* 3. ADMIN MODULE RENDER & ACTIONS */
function renderAdmin() {
  const pendingList = appState.listings.filter(i => i.status === 'Pending');
  document.getElementById('badge-pending-count').innerText = pendingList.length;
  document.getElementById('admin-pending-badge').innerText = `${pendingList.length} ${appState.lang === 'es' ? 'Pendientes' : 'Pending'}`;

  const body = document.getElementById('admin-table-body');
  body.innerHTML = appState.listings.map(item => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-mono font-bold text-slate-700">${item.id}</td>
      <td class="py-3 px-4 font-semibold text-slate-800">${item.material}</td>
      <td class="py-3 px-4 text-slate-600">${item.supplier}</td>
      <td class="py-3 px-4 font-bold">${item.qty} ${item.unit}</td>
      <td class="py-3 px-4 text-slate-500">${item.date}</td>
      <td class="py-3 px-4">${renderStatusBadge(item.status)}</td>
      <td class="py-3 px-4 text-right space-x-1">
        ${item.status === 'Pending' ? `
          <button onclick="openScheduleModal('${item.id}')" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm">
            <i class="fa-solid fa-calendar-check mr-1"></i> ${i18n[appState.lang].btn_approve}
          </button>
          <button onclick="rejectListing('${item.id}')" class="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-rose-200">
            ${i18n[appState.lang].btn_reject}
          </button>
        ` : `<span class="text-xs text-slate-400 italic">${appState.lang === 'es' ? 'Procesado' : 'Processed'}</span>`}
      </td>
    </tr>
  `).join('');
}

function openScheduleModal(id) {
  const item = appState.listings.find(i => i.id === id);
  if (!item) return;

  document.getElementById('sched-item-id').value = id;
  document.getElementById('sched-material-name').value = `${item.id} - ${item.material} (${item.qty} ${item.unit})`;
  openModal('modal-schedule');
}

function confirmSchedulePickup(e) {
  e.preventDefault();
  const id = document.getElementById('sched-item-id').value;
  const driver = document.getElementById('sched-driver').value;
  const time = document.getElementById('sched-time').value;

  const item = appState.listings.find(i => i.id === id);
  if (item) {
    item.status = 'Scheduled';
    item.driver = driver;
    item.time = time;
  }

  saveState();
  closeModal('modal-schedule');
  renderAllModules();
  showToast(appState.lang === 'es' ? 'Recolección programada correctamente' : 'Pickup scheduled successfully');
}

function rejectListing(id) {
  const item = appState.listings.find(i => i.id === id);
  if (item) {
    item.status = 'Rejected';
  }
  saveState();
  renderAllModules();
  showToast(appState.lang === 'es' ? 'Oferta de residuo rechazada' : 'Listing rejected', 'error');
}

/* 4. LOGISTICS MODULE RENDER */
function renderLogistics() {
  const container = document.getElementById('logistics-cards-container');
  const scheduled = appState.listings.filter(i => i.status === 'Scheduled');

  if (scheduled.length === 0) {
    container.innerHTML = `
      <div class="bg-white p-8 rounded-2xl border text-center text-slate-400">
        <i class="fa-solid fa-truck text-4xl mb-2 text-slate-300"></i>
        <p>${appState.lang === 'es' ? 'No hay recolecciones programadas en este momento.' : 'No scheduled pickups at this moment.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = scheduled.map(item => `
    <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">${item.id}</span>
          <h3 class="font-bold text-slate-900 text-sm sm:text-base">${item.material}</h3>
        </div>
        <p class="text-xs text-slate-500"><i class="fa-solid fa-location-dot text-rose-500 mr-1"></i> ${item.location} &bull; <i class="fa-solid fa-user-gear text-slate-400 ml-2 mr-1"></i> ${item.driver || 'Chofer Asignado'}</p>
        <p class="text-xs font-semibold text-emerald-600"><i class="fa-solid fa-clock mr-1"></i> ${appState.lang === 'es' ? 'Hora programada:' : 'Scheduled time:'} ${item.time || '09:00 AM'}</p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
        <div class="text-right hidden sm:block">
          <p class="text-xs text-slate-400 uppercase font-bold" data-i18n="lbl_quantity">Cantidad</p>
          <p class="font-extrabold text-slate-800 text-base">${item.qty} ${item.unit}</p>
        </div>
        <button onclick="openWeighingModal('${item.id}')" class="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2">
          <i class="fa-solid fa-scale-balanced"></i>
          <span>${i18n[appState.lang].btn_log_weight}</span>
        </button>
      </div>
    </div>
  `).join('');
}

function openWeighingModal(id) {
  const item = appState.listings.find(i => i.id === id);
  if (!item) return;

  document.getElementById('weigh-item-id').value = id;
  document.getElementById('weigh-item-title').innerText = `${item.id} - ${item.material}`;
  document.getElementById('weigh-booked-qty').innerText = `${item.qty} ${item.unit}`;
  document.getElementById('weigh-actual').value = item.qty;
  openModal('modal-weighing');
}

function confirmDriverWeighing(e) {
  e.preventDefault();
  const id = document.getElementById('weigh-item-id').value;
  const actualQty = parseFloat(document.getElementById('weigh-actual').value);
  const mermas = parseFloat(document.getElementById('weigh-mermas').value);
  const grade = document.getElementById('weigh-grade').value;

  const item = appState.listings.find(i => i.id === id);
  if (item) {
    item.status = 'Received';
    item.actualQty = actualQty;

    const newBatch = {
      batchId: `RB-B${Math.floor(200 + Math.random() * 800)}`,
      material: item.material,
      qtyAccepted: parseFloat((actualQty - mermas).toFixed(1)),
      qtyLoss: mermas,
      grade: grade,
      bay: 'Nave A - Recepción'
    };
    appState.warehouseBatches.unshift(newBatch);
  }

  saveState();
  closeModal('modal-weighing');
  renderAllModules();
  showToast(appState.lang === 'es' ? 'Entrada de material registrada en almacén' : 'Material entry logged into warehouse inventory');
}

/* 5. WAREHOUSE MODULE RENDER */
function renderWarehouse() {
  const totalStock = appState.warehouseBatches.reduce((acc, b) => acc + b.qtyAccepted + b.qtyLoss, 0);
  const totalConforme = appState.warehouseBatches.reduce((acc, b) => acc + b.qtyAccepted, 0);
  const totalMermas = appState.warehouseBatches.reduce((acc, b) =>