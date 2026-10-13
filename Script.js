
// ======================================
// REBOX MVP VERSION 2
// NEGOTIUM 2026
// ======================================

// 1. LOCAL DATABASE

const STORAGE_KEY = "rebox_mvp_v2";

function initialData() {
  return {
    nextId: 3,

    listings: [
      {
        id: 1,
        supplier: "Demo Sotol Cooperative",
        material: "Sotol fiber",
        quantity: 500,
        unit: "kg",
        location: "Chihuahua, Mexico",
        date: "2026-10-20",
        terms: "Free pickup",
        status: "Pending"
      },
      {
        id: 2,
        supplier: "Demo Agave Processor",
        material: "Agave bagasse",
        quantity: 250,
        unit: "kg",
        location: "Ciudad Juárez, Mexico",
        date: "2026-10-21",
        terms: "Negotiable",
        status: "Pending"
      }
    ],

    pickups: [],
    inventory: [],
    quotes: []
  };
}

let db;

try {
  db = JSON.parse(localStorage.getItem(STORAGE_KEY))
    || initialData();
} catch {
  db = initialData();
}

let currentPage = "supplier";
let language = "es";

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

// Prevent HTML injection in displayed data
function safe(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]
  );
}

// ======================================
// 2. NAVIGATION AND LANGUAGES
// ======================================

const translations = {
  es: {
    supplier: "Proveedor",
    admin: "Administración",
    pickups: "Recolecciones",
    inventory: "Inventario",
    products: "Productos y cotizaciones"
  },

  en: {
    supplier: "Supplier",
    admin: "ReBox Admin",
    pickups: "Pickups",
    inventory: "Inventory",
    products: "Products & Quotes"
  }
};

function changeLanguage() {
  language = document.getElementById("language").value;
  render();
}

function renderNavigation() {
  const pages = [
    "supplier",
    "admin",
    "pickups",
    "inventory",
    "products"
  ];

  document.getElementById("navigation").innerHTML =
    pages.map(page => `
      <button
        class="${currentPage === page ? "active" : ""}"
        onclick="openPage('${page}')">
        ${translations[language][page]}
      </button>
    `).join("");
}

function openPage(page) {
  currentPage = page;
  render();
}

function render() {
  renderNavigation();

  const screens = {
    supplier: renderSupplier,
    admin: renderAdmin,
    pickups: renderPickups,
    inventory: renderInventory,
    products: renderProducts
  };

  document.getElementById("content").innerHTML =
    screens[currentPage]();
}

// ======================================
// 3. SUPPLIER MODULE
// ======================================

function renderSupplier() {
  return `
    <div class="card">
      <h2>Post Available Waste / Publicar residuos</h2>

      <form onsubmit="addListing(event)">
        <div class="grid">

          <div>
            <label>Supplier / Proveedor</label>
            <input name="supplier" required
                   placeholder="Demo Company">
          </div>

          <div>
            <label>Material</label>
            <input name="material" required
                   placeholder="Agave bagasse">
          </div>

          <div>
            <label>Quantity / Cantidad</label>
            <input name="quantity" type="number"
                   min="0.01" step="0.01" required>
          </div>

          <div>
            <label>Unit / Unidad</label>
            <select name="unit">
              <option>kg</option>
              <option>lb</option>
              <option>tonne</option>
              <option>pallet</option>
            </select>
          </div>

          <div>
            <label>Location / Ubicación</label>
            <input name="location" required>
          </div>

          <div>
            <label>Available Date / Fecha</label>
            <input name="date" type="date" required>
          </div>

        </div>

        <label>Collection Terms / Condiciones</label>
        <select name="terms">
          <option>Free pickup</option>
          <option>Supplier requests payment</option>
          <option>Removal service fee</option>
          <option>Negotiable</option>
        </select>

        <button type="submit">
          Publish Listing / Publicar
        </button>
      </form>
    </div>

    <div class="card">
      <h2>Supplier Listings</h2>

      ${db.listings.map(item => `
        <div class="item">
          <strong>
            #${item.id} ${safe(item.material)}
          </strong>

          <span class="status">
            ${safe(item.status)}
          </span>

          <p>${safe(item.supplier)}</p>

          <p>
            ${safe(item.quantity)} ${safe(item.unit)}
            | ${safe(item.location)}
          </p>
        </div>
      `).join("")}
    </div>
  `;
}

function addListing(event) {
  event.preventDefault();

  const data = Object.fromEntries(
    new FormData(event.target)
  );

  const quantity = Number(data.quantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    alert("Invalid quantity");
    return;
  }

  db.listings.push({
    ...data,
    id: db.nextId++,
    quantity,
    status: "Pending"
  });

  save();
  render();
}

// ======================================
// 4. ADMIN APPROVAL MODULE
// ======================================

function renderAdmin() {
  return `
    <div class="card">
      <h2>ReBox Review / Revisión</h2>

      ${db.listings.map(item => `
        <div class="item">
          <h3>#${item.id} ${safe(item.material)}</h3>

          <span class="status">
            ${safe(item.status)}
          </span>

          <p>Supplier: ${safe(item.supplier)}</p>
          <p>
            Quantity: ${safe(item.quantity)}
            ${safe(item.unit)}
          </p>
          <p>Location: ${safe(item.location)}</p>
          <p>Terms: ${safe(item.terms)}</p>

          ${item.status === "Pending" ? `
            <button onclick="review(${item.id}, 'Approved')">
              Approve
            </button>

            <button class="secondary"
              onclick="review(${item.id}, 'Rejected')">
              Reject
            </button>
          ` : ""}

          ${item.status === "Approved" ? `
            <label>Pickup Date</label>
            <input type="date"
                   id="pickupDate-${item.id}">

            <label>Assigned Worker</label>
            <input id="worker-${item.id}"
                   placeholder="Demo Driver">

            <button onclick="schedulePickup(${item.id})">
              Schedule Pickup
            </button>
          ` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

function review(id, decision) {
  const item = db.listings.find(x => x.id === id);

  if (!item || item.status !== "Pending") return;

  item.status = decision;

  save();
  render();
}

function schedulePickup(id) {
  const item = db.listings.find(x => x.id === id);

  if (!item || item.status !== "Approved") return;

  const date = document.getElementById(
    `pickupDate-${id}`
  ).value;

  const worker = document.getElementById(
    `worker-${id}`
  ).value.trim();

  if (!date || !worker) {
    alert("Please enter date and worker.");
    return;
  }

  db.pickups.push({
    id: db.nextId++,
    listingId: id,
    date,
    worker,
    status: "Scheduled",
    collected: 0
  });

  item.status = "Scheduled";

  save();
  render();
}

// ======================================
// 5. PICKUP MODULE
// ======================================

function renderPickups() {
  return `
    <div class="card">
      <h2>Scheduled Pickups / Recolecciones</h2>

      ${db.pickups.length === 0
        ? "<p>No pickups scheduled.</p>"
        : ""}

      ${db.pickups.map(pickup => {
        const item = db.listings.find(
          x => x.id === pickup.listingId
        );

        if (!item) return "";

        return `
          <div class="item">
            <h3>Pickup #${pickup.id}</h3>

            <span class="status">
              ${safe(pickup.status)}
            </span>

            <p>Material: ${safe(item.material)}</p>
            <p>Location: ${safe(item.location)}</p>
            <p>Date: ${safe(pickup.date)}</p>
            <p>Worker: ${safe(pickup.worker)}</p>

            ${pickup.status === "Scheduled" ? `
              <label>
                Collected Quantity (${safe(item.unit)})
              </label>

              <input type="number"
                id="collected-${pickup.id}"
                min="0.01"
                max="${item.quantity}"
                step="0.01"
                value="${item.quantity}">

              <button
                onclick="confirmPickup(${pickup.id})">
                Confirm Collection
              </button>
            ` : `
              <p>
                Collected: ${safe(pickup.collected)}
                ${safe(item.unit)}
              </p>
            `}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function confirmPickup(id) {
  const pickup = db.pickups.find(x => x.id === id);

  if (!pickup || pickup.status !== "Scheduled") return;

  const item = db.listings.find(
    x => x.id === pickup.listingId
  );

  if (!item) return;

  const quantity = Number(
    document.getElementById(`collected-${id}`).value
  );

  if (
    !Number.isFinite(quantity) ||
    quantity <= 0 ||
    quantity > item.quantity
  ) {
    alert("Invalid collected quantity.");
    return;
  }

  pickup.collected = quantity;
  pickup.status = "Collected";
  item.status = "Collected";

  save();
  render();
}

// ======================================
// 6. INVENTORY MODULE
// ======================================

function renderInventory() {
  const pending = db.pickups.filter(
    p => p.status === "Collected"
  );

  return `
    <div class="card">
      <h2>Warehouse / Almacén</h2>

      <p class="muted">
        Receive collected materials
      </p>

      ${pending.length === 0
        ? "<p>No shipments awaiting receipt.</p>"
        : ""}

      ${pending.map(pickup => {
        const item = db.listings.find(
          x => x.id === pickup.listingId
        );

        if (!item) return "";

        return `
          <div class="item">
            <h3>${safe(item.material)}</h3>

            <p>
              Collected: ${safe(pickup.collected)}
              ${safe(item.unit)}
            </p>

            <label>Accepted Quantity</label>

            <input type="number"
              id="accepted-${pickup.id}"
              min="0"
              max="${pickup.collected}"
              step="0.01"
              value="${pickup.collected}">

            <label>Facility / Almacén</label>

            <input id="facility-${pickup.id}"
              placeholder="Demo El Paso Warehouse">

            <button
              onclick="receiveMaterial(${pickup.id})">
              Receive Material
            </button>
          </div>
        `;
      }).join("")}
    </div>

    <div class="card">
      <h2>Inventory Batches / Lotes</h2>

      ${db.inventory.length === 0
        ? "<p>No inventory registered.</p>"
        : ""}

      ${db.inventory.map(batch => `
        <div class="item">
          <h3>Batch RB-${batch.id}</h3>
          <p>Material: ${safe(batch.material)}</p>
          <p>
            Accepted: ${safe(batch.quantity)}
            ${safe(batch.unit)}
          </p>
          <p>
            Rejected: ${safe(batch.rejected)}
            ${safe(batch.unit)}
          </p>
          <p>Facility: ${safe(batch.facility)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function receiveMaterial(id) {
  const pickup = db.pickups.find(x => x.id === id);

  if (!pickup || pickup.status !== "Collected") return;

  const item = db.listings.find(
    x => x.id === pickup.listingId
  );

  if (!item) return;

  const quantity = Number(
    document.getElementById(`accepted-${id}`).value
  );

  const facility = document.getElementById(
    `facility-${id}`
  ).value.trim();

  if (
    !Number.isFinite(quantity) ||
    quantity < 0 ||
    quantity > pickup.collected ||
    !facility
  ) {
    alert("Invalid quantity or facility.");
    return;
  }

  db.inventory.push({
    id: db.nextId++,
    pickupId: id,
    material: item.material,
    quantity,
    rejected: pickup.collected - quantity,
    unit: item.unit,
    facility
  });

  pickup.status = "Received";
  item.status = "Received";

  save();
  render();
}

// ======================================
// 7. PRODUCTS AND QUOTES MODULE
// ======================================

const products = [
  {
    id: 1,
    name: "Protective Fiber Insert",
    description: "Sample packaging concept"
  },
  {
    id: 2,
    name: "Reusable Transport Container",
    description: "Sample reusable container concept"
  }
];

function renderProducts() {
  return `
    <div class="card">
      <h2>Product Catalog / Catálogo</h2>

      <p class="muted">
        Demonstration concepts only.
        Prices and performance are not verified.
      </p>

      ${products.map(product => `
        <div class="item">
          <h3>${product.name}</h3>
          <p>${product.description}</p>

          <label>Organization / Organización</label>
          <input id="org-${product.id}">

          <label>Contact Email / Correo</label>
          <input type="email"
                 id="email-${product.id}">

          <label>Requested Quantity</label>
          <input type="number"
                 id="qty-${product.id}"
                 min="1" step="1">

          <button
            onclick="requestQuote(${product.id})">
            Request Quote
          </button>
        </div>
      `).join("")}
    </div>

    <div class="card">
      <h2>Quote Requests</h2>

      ${db.quotes.length === 0
        ? "<p>No requests submitted.</p>"
        : ""}

      ${db.quotes.map(quote => `
        <div class="item">
          <strong>Quote #${quote.id}</strong>
          <p>${safe(quote.product)}</p>
          <p>${safe(quote.organization)}</p>
          <p>Quantity: ${safe(quote.quantity)}</p>
          <span class="status">Requested</span>
        </div>
      `).join("")}
    </div>
  `;
}

function requestQuote(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  const organization = document.getElementById(
    `org-${id}`
  ).value.trim();

  const email = document.getElementById(
    `email-${id}`
  ).value.trim();

  const quantity = Number(
    document.getElementById(`qty-${id}`).value
  );

  if (
    !organization ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    alert("Please enter valid customer information.");
    return;
  }

  db.quotes.push({
    id: db.nextId++,
    product: product.name,
    organization,
    email,
    quantity,
    status: "Requested"
  });

  save();
  render();
}

// ======================================
// 8. RESET APPLICATION DATA
// ======================================

function resetData() {
  if (confirm("Reset all demonstration records?")) {
    db = initialData();
    save();
    render();
  }
}

// ======================================
// 9. INITIALIZE APPLICATION
// ======================================

render();
