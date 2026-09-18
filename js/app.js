// Lógica de armado del sitio a partir de SUCESION_DATA (ver js/data.js).

const PX_POR_ANIO = 150;
const MS_POR_ANIO = 365.25 * 24 * 60 * 60 * 1000;
const PALETA_PROPIEDADES = ["#8a6a3b", "#3c5a6e", "#5f7a52", "#7a4b5c", "#4b5d7a"];

function parseFecha(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function fmtFecha(str) {
  const f = parseFecha(str);
  if (!f) return "Actualidad";
  return f.toLocaleDateString("es-UY", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function fmtMonto(monto, moneda) {
  const n = Number(monto || 0);
  return `${moneda || "UYU"} ${n.toLocaleString("es-UY", { maximumFractionDigits: 0 })}`;
}

function mesesEntre(inicio, fin) {
  const i = parseFecha(inicio);
  const f = fin ? parseFecha(fin) : new Date();
  if (!i || !f) return 0;
  const meses = (f.getFullYear() - i.getFullYear()) * 12 + (f.getMonth() - i.getMonth());
  return Math.max(1, meses);
}

function totalAlquiler(a) {
  return mesesEntre(a.inicio, a.fin) * Number(a.montoMensual || 0);
}

function totalesPropiedad(p) {
  const totalIngresos = (p.alquileres || []).reduce((acc, a) => acc + totalAlquiler(a), 0);
  const totalGastos = (p.gastos || []).reduce((acc, g) => acc + Number(g.monto || 0), 0);
  return { totalIngresos, totalGastos, neto: totalIngresos - totalGastos };
}

function calcularRango(data) {
  let anioMin = new Date().getFullYear();
  const anioMax = new Date().getFullYear();
  const fechas = [];
  data.globalTimeline.forEach((e) => fechas.push(e.fecha));
  data.properties.forEach((p) => {
    (p.alquileres || []).forEach((a) => {
      fechas.push(a.inicio);
      if (a.fin) fechas.push(a.fin);
    });
    (p.gastos || []).forEach((g) => fechas.push(g.fecha));
  });
  fechas.forEach((f) => {
    const d = parseFecha(f);
    if (d) anioMin = Math.min(anioMin, d.getFullYear());
  });
  anioMin = Math.min(anioMin, 2019);
  return { anioMin, anioMax, inicio: new Date(anioMin, 0, 1), fin: new Date(anioMax, 11, 31) };
}

function xPara(fecha, rango) {
  const d = fecha instanceof Date ? fecha : parseFecha(fecha) || new Date();
  const anios = (d - rango.inicio) / MS_POR_ANIO;
  return anios * PX_POR_ANIO;
}

function crearEjeAnios(rango) {
  const eje = document.createElement("div");
  eje.className = "timeline-axis";
  for (let a = rango.anioMin; a <= rango.anioMax; a++) {
    const tick = document.createElement("div");
    tick.className = "timeline-tick";
    tick.style.left = `${xPara(new Date(a, 0, 1), rango)}px`;
    const label = document.createElement("span");
    label.textContent = a;
    tick.appendChild(label);
    eje.appendChild(tick);
  }
  return eje;
}

function renderGlobalTimeline(container, eventos, rango) {
  container.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "timeline-wrap";
  const timeline = document.createElement("div");
  timeline.className = "timeline timeline-global";
  const anchoTotal = (rango.anioMax - rango.anioMin + 1) * PX_POR_ANIO;
  timeline.style.width = `${anchoTotal}px`;

  timeline.appendChild(crearEjeAnios(rango));

  const linea = document.createElement("div");
  linea.className = "timeline-line";
  timeline.appendChild(linea);

  const ordenados = [...eventos].sort((a, b) => parseFecha(a.fecha) - parseFecha(b.fecha));
  ordenados.forEach((ev, i) => {
    const x = xPara(ev.fecha, rango);
    const marcador = document.createElement("div");
    marcador.className = `timeline-event ${i % 2 === 0 ? "arriba" : "abajo"}`;
    marcador.style.left = `${x}px`;
    marcador.innerHTML = `
      <div class="timeline-event-dot"></div>
      <div class="timeline-event-card">
        <span class="timeline-event-fecha">${fmtFecha(ev.fecha)}</span>
        <strong>${ev.titulo}</strong>
        ${ev.detalle ? `<span class="timeline-event-detalle">${ev.detalle}</span>` : ""}
      </div>`;
    timeline.appendChild(marcador);
  });

  wrap.appendChild(timeline);
  container.appendChild(wrap);
}

function renderPropertyTimeline(container, alquileres, rango, color) {
  container.innerHTML = "";
  if (!alquileres || alquileres.length === 0) {
    container.innerHTML = '<p class="timeline-vacio">Todavía no hay períodos de alquiler cargados para esta propiedad.</p>';
    return;
  }
  const wrap = document.createElement("div");
  wrap.className = "timeline-wrap";
  const timeline = document.createElement("div");
  timeline.className = "timeline timeline-propiedad";
  const anchoTotal = (rango.anioMax - rango.anioMin + 1) * PX_POR_ANIO;
  timeline.style.width = `${anchoTotal}px`;
  timeline.appendChild(crearEjeAnios(rango));

  const ordenados = [...alquileres].sort((a, b) => parseFecha(a.inicio) - parseFecha(b.inicio));
  const filas = []; // cada fila guarda la fecha fin del último bloque colocado
  const asignaciones = ordenados.map((a) => {
    const inicio = parseFecha(a.inicio);
    const fin = a.fin ? parseFecha(a.fin) : new Date();
    let fila = filas.findIndex((finFila) => finFila <= inicio);
    if (fila === -1) {
      fila = filas.length;
      filas.push(fin);
    } else {
      filas[fila] = fin;
    }
    return { alquiler: a, fila, inicio, fin };
  });

  timeline.style.height = `${100 + filas.length * 56}px`;

  asignaciones.forEach(({ alquiler, fila, inicio, fin }) => {
    const x1 = xPara(inicio, rango);
    const x2 = xPara(fin, rango);
    const barra = document.createElement("div");
    barra.className = "timeline-bar";
    barra.style.left = `${x1}px`;
    barra.style.width = `${Math.max(x2 - x1, 6)}px`;
    barra.style.top = `${52 + fila * 56}px`;
    barra.style.background = color;
    barra.innerHTML = `
      <span class="timeline-bar-monto">${fmtMonto(alquiler.montoMensual, alquiler.moneda)}/mes</span>
      <span class="timeline-bar-periodo">${fmtFecha(alquiler.inicio)} – ${fmtFecha(alquiler.fin)}</span>
    `;
    barra.title = `${alquiler.contratoRef || "Contrato"} · ${alquiler.inquilino || ""}`;
    timeline.appendChild(barra);
  });

  wrap.appendChild(timeline);
  container.appendChild(wrap);
}

function renderTablaAlquileres(container, alquileres) {
  if (!alquileres || alquileres.length === 0) {
    container.innerHTML = '<p class="tabla-vacia">Sin contratos de alquiler cargados.</p>';
    return;
  }
  const filas = [...alquileres]
    .sort((a, b) => parseFecha(a.inicio) - parseFecha(b.inicio))
    .map(
      (a) => `
      <tr>
        <td>${fmtFecha(a.inicio)}</td>
        <td>${fmtFecha(a.fin)}</td>
        <td>${a.inquilino || "—"}</td>
        <td>${fmtMonto(a.montoMensual, a.moneda)}/mes</td>
        <td>${fmtMonto(totalAlquiler(a), a.moneda)}</td>
        <td>${a.contratoRef || "—"}</td>
      </tr>`
    )
    .join("");
  container.innerHTML = `
    <table class="tabla-datos">
      <thead>
        <tr><th>Inicio</th><th>Fin</th><th>Inquilino</th><th>Monto mensual</th><th>Total del período</th><th>Contrato</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>`;
}

function renderTablaGastos(container, gastos) {
  if (!gastos || gastos.length === 0) {
    container.innerHTML = '<p class="tabla-vacia">Sin gastos cargados.</p>';
    return;
  }
  const filas = [...gastos]
    .sort((a, b) => parseFecha(a.fecha) - parseFecha(b.fecha))
    .map(
      (g) => `
      <tr>
        <td>${fmtFecha(g.fecha)}</td>
        <td>${g.concepto || "—"}</td>
        <td>${fmtMonto(g.monto, g.moneda)}</td>
        <td>${g.comprobante || "—"}</td>
      </tr>`
    )
    .join("");
  container.innerHTML = `
    <table class="tabla-datos">
      <thead><tr><th>Fecha</th><th>Concepto</th><th>Monto</th><th>Comprobante</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>`;
}

function aplicarBannerBorrador(data) {
  const banner = document.getElementById("banner-borrador");
  if (!banner) return;
  banner.hidden = !data.meta.isDraft;
}

function aplicarTextosMeta(data) {
  document.querySelectorAll("[data-meta]").forEach((el) => {
    const clave = el.getAttribute("data-meta");
    if (data.meta[clave] !== undefined) el.textContent = data.meta[clave];
  });
}
