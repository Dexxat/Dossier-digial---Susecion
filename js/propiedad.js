document.addEventListener("DOMContentLoaded", () => {
  const data = SUCESION_DATA;
  aplicarBannerBorrador(data);
  aplicarTextosMeta(data);

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("p"));
  const index = data.properties.findIndex((p) => p.id === id);
  const propiedad = data.properties[index];

  if (!propiedad) {
    document.getElementById("contenido-propiedad").innerHTML =
      '<p class="tabla-vacia">Propiedad no encontrada. <a href="index.html">Volver al inicio</a>.</p>';
    return;
  }

  const color = PALETA_PROPIEDADES[index % PALETA_PROPIEDADES.length];
  document.documentElement.style.setProperty("--color-propiedad", color);

  document.title = `${propiedad.nombre} — Dossier de la sucesión`;
  document.getElementById("nombre-propiedad").textContent = propiedad.nombre;
  document.getElementById("direccion-propiedad").textContent = propiedad.direccion;
  document.getElementById("descripcion-propiedad").textContent = propiedad.descripcion;

  document.getElementById("caracteristicas-propiedad").innerHTML = (propiedad.caracteristicas || [])
    .map((c) => `<li>${c}</li>`)
    .join("");

  const rango = calcularRango(data);
  renderPropertyTimeline(document.getElementById("timeline-propiedad"), propiedad.alquileres, rango, color);
  renderTablaAlquileres(document.getElementById("tabla-alquileres"), propiedad.alquileres);
  renderTablaGastos(document.getElementById("tabla-gastos"), propiedad.gastos);

  const t = totalesPropiedad(propiedad);
  document.getElementById("total-ingresos").textContent = fmtMonto(t.totalIngresos, "UYU");
  document.getElementById("total-gastos").textContent = fmtMonto(t.totalGastos, "UYU");
  document.getElementById("total-neto").textContent = fmtMonto(t.neto, "UYU");
});
