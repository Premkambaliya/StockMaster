const BASE = 'http://localhost:5000/api/warehouses';

export async function listWarehouses() {
  const res = await fetch(BASE, { credentials: 'same-origin' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to fetch warehouses');
  }

  const json = await res.json();
  const items = json.warehouses || [];

  return items.map((w) => ({
    id: w.warehouseId,           // 🚀 use warehouseId everywhere
    warehouseId: w.warehouseId,
    name: w.name,
    code: w.warehouseId,
    location: w.address || '',
    type: w.type || 'main_warehouse',
    is_active: typeof w.is_active === 'boolean' ? w.is_active : true,
  }));
}



export async function createWarehouse(data) {
  // Map frontend shape -> backend expected body
  const body = {
    name: data.name,
    address: data.location || data.address || '',
    type: data.type,
  };
  const res = await fetch(`${BASE}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to create warehouse');
  const w = json.warehouse || json;
  return {
    id: w._id || w.warehouseId || w.id,
    name: w.name,
    code: w.warehouseId || w.code || '',
    location: w.address || w.location || '',
    type: w.type || 'main_warehouse',
    is_active: typeof w.is_active === 'boolean' ? w.is_active : true,
    ...w,
  };
}

export async function updateWarehouse(id, data) {
  // Assume backend has PUT /api/warehouses/:id (adjust if different)
  const body = {
    name: data.name,
    address: data.location || data.address || '',
    type: data.type,
    is_active: data.is_active,
  };
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || 'Failed to update warehouse');
  const w = json.warehouse || json;
  return {
    id: w._id || w.warehouseId || w.id,
    name: w.name,
    code: w.warehouseId || w.code || '',
    location: w.address || w.location || '',
    type: w.type || 'main_warehouse',
    is_active: typeof w.is_active === 'boolean' ? w.is_active : true,
    ...w,
  };
}

export async function getWarehouseById(id) {
  const res = await fetch(`http://localhost:5000/api/warehouses/${id}`, {
    headers: { Accept: "application/json" },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Failed to fetch warehouse");

  const w = json.warehouse || json;

  return {
    warehouseId: w.warehouseId,
    name: w.name,
    code: w.warehouseId,
    location: w.address || "",
    type: w.type || "main_warehouse",
    is_active: typeof w.is_active === "boolean" ? w.is_active : true,
    raw: w, // full backend object for debugging
  };
}
