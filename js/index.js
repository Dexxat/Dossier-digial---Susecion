document.addEventListener("DOMContentLoaded", () => {
  const data = SUCESION_DATA;
  aplicarBannerBorrador(data);
  aplicarTextosMeta(data);

  const rango = calcularRango(data);
  renderGlobalTimeline(document.getElementById("global-timeline"), data.globalTimeline, rango);

  renderResumen(data);
  renderMenuPropiedades(data);
});

function renderResumen(data) {
  const cont = document.getElementById("resumen-tabla");
  let totalIngresos = 0;
  let totalGastos = 0;
  const filas = data.properties
    .map((p) => {
      const t = totalesPropiedad(p);
      totalIngresos += t.totalIngresos;
      totalGastos += t.totalGastos;
      return `
        <tr>
          <td>${p.nombre}</td>
          <td>${fmtMonto(t.totalIngresos, "UYU")}</td>
          <td>${fmtMonto(t.totalGastos, "UYU")}</td>
          <td class="col-neto">${fmtMonto(t.neto, "UYU")}</td>
        </tr>`;
    })
    .join("");

  cont.innerHTML = `
    <table class="tabla-datos tabla-resumen">
      <thead>
        <tr><th>Propiedad</th><th>Ingresos por alquiler</th><th>Gastos de mantenimiento</th><th>Neto</th></tr>
      </thead>
      <tbody>${filas}</tbody>
      <tfoot>
        <tr>
          <td>Total sucesión</td>
          <td>${fmtMonto(totalIngresos, "UYU")}</td>
          <td>${fmtMonto(totalGastos, "UYU")}</td>
          <td class="col-neto">${fmtMonto(totalIngresos - totalGastos, "UYU")}</td>
        </tr>
      </tfoot>
    </table>`;
}

function renderMenuPropiedades(data) {
  const cont = document.getElementById("menu-propiedades");
  cont.innerHTML = data.properties
    .map((p, i) => {
      const t = totalesPropiedad(p);
      const color = PALETA_PROPIEDADES[i % PALETA_PROPIEDADES.length];
      return `
        <a class="tarjeta-propiedad" href="propiedad.html?p=${p.id}" style="--color-propiedad:${color}">
          <div class="tarjeta-foto" style="${p.foto ? `background-image:url('${p.foto}')` : ""}"></div>
          <div class="tarjeta-contenido">
            <h3>${p.nombre}</h3>
            <p class="tarjeta-direccion">${p.direccion}</p>
            <p class="tarjeta-desc">${p.descripcionCorta}</p>
            <span class="tarjeta-cta">Ver detalle y cronología →</span>
          </div>
        </a>`;
    })
    .join("");
}
