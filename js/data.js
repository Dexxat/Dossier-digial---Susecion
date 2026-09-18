/*
  DATOS DEL DOSSIER — editá solo este archivo para cargar la información real.
  No hace falta tocar los .html ni los .css: todo se arma solo a partir de esto.

  - meta.isDraft: poné "false" cuando ya cargaste los datos reales, para que
    desaparezca el aviso de "datos de ejemplo" en el sitio.
  - globalTimeline: hitos generales de la sucesión (fechas puntuales, no rangos).
  - properties: una entrada por cada una de las 5 propiedades.
      - alquileres: un objeto por cada contrato/período de alquiler.
        "inicio" y "fin" en formato "YYYY-MM-DD". Si el alquiler sigue vigente,
        dejá "fin": null.
      - gastos: un objeto por cada gasto de mantenimiento/administración.

  Los montos van en pesos uruguayos (UYU) por defecto — cambiá "moneda" si
  corresponde (por ejemplo "USD").
*/

const SUCESION_DATA = {
  meta: {
    isDraft: true,
    tituloSucesion: "Sucesión [Apellido de la familia]",
    subtitulo: "Rendición de cuentas — alquileres y gastos de mantenimiento",
    periodoTexto: "2019 — actualidad",
    introduccion:
      "Este dossier reúne, propiedad por propiedad, los contratos de alquiler y los gastos de mantenimiento desde 2019 hasta la fecha, como respaldo de la rendición de cuentas de la sucesión. Cada período de alquiler y cada gasto está justificado por su contrato o comprobante correspondiente.",
    notaPie:
      "Documento de uso interno para la rendición de cuentas de la sucesión. Los montos y fechas surgen de los contratos y comprobantes originales.",
  },

  // Hitos generales de la sucesión (no de una propiedad en particular).
  globalTimeline: [
    {
      fecha: "2019-03-15",
      titulo: "Fallecimiento del causante",
      detalle: "Ejemplo — reemplazar por la fecha real.",
    },
    {
      fecha: "2019-06-01",
      titulo: "Apertura de la sucesión",
      detalle: "Ejemplo — reemplazar por la fecha real.",
    },
    {
      fecha: "2020-02-10",
      titulo: "Declaratoria de herederos",
      detalle: "Ejemplo — reemplazar por la fecha real.",
    },
  ],

  properties: [
    {
      id: 1,
      nombre: "Propiedad 1 — [Dirección]",
      direccion: "[Calle, número, barrio, ciudad]",
      descripcionCorta: "Ejemplo de descripción breve para el menú de propiedades.",
      descripcion:
        "Descripción completa de la propiedad: tipo (casa/apartamento), dormitorios, estado, uso, y cualquier dato relevante para justificar su alquiler o mantenimiento.",
      caracteristicas: ["Ej: 3 dormitorios", "Ej: 120 m²", "Ej: Barrio Ejemplo"],
      foto: "",
      alquileres: [
        {
          inicio: "2019-04-01",
          fin: "2021-03-31",
          inquilino: "Inquilino A (ejemplo)",
          montoMensual: 15000,
          moneda: "UYU",
          contratoRef: "Contrato Nº 1",
          notas: "",
        },
        {
          inicio: "2021-05-01",
          fin: null,
          inquilino: "Inquilino B (ejemplo)",
          montoMensual: 18000,
          moneda: "UYU",
          contratoRef: "Contrato Nº 2",
          notas: "Vigente a la fecha",
        },
      ],
      gastos: [
        {
          fecha: "2020-08-12",
          concepto: "Reparación de techo (ejemplo)",
          monto: 22000,
          moneda: "UYU",
          comprobante: "Factura Nº 001",
        },
      ],
    },
    {
      id: 2,
      nombre: "Propiedad 2 — [Dirección]",
      direccion: "[Calle, número, barrio, ciudad]",
      descripcionCorta: "Ejemplo de descripción breve para el menú de propiedades.",
      descripcion: "Descripción completa de la propiedad.",
      caracteristicas: ["Ej: 2 dormitorios", "Ej: 80 m²", "Ej: Barrio Ejemplo"],
      foto: "",
      alquileres: [
        {
          inicio: "2019-09-01",
          fin: "2023-08-31",
          inquilino: "Inquilino C (ejemplo)",
          montoMensual: 12000,
          moneda: "UYU",
          contratoRef: "Contrato Nº 1",
          notas: "",
        },
      ],
      gastos: [],
    },
    {
      id: 3,
      nombre: "Propiedad 3 — [Dirección]",
      direccion: "[Calle, número, barrio, ciudad]",
      descripcionCorta: "Ejemplo de descripción breve para el menú de propiedades.",
      descripcion: "Descripción completa de la propiedad.",
      caracteristicas: ["Ej: 4 dormitorios", "Ej: 150 m²", "Ej: Barrio Ejemplo"],
      foto: "",
      alquileres: [],
      gastos: [],
    },
    {
      id: 4,
      nombre: "Propiedad 4 — [Dirección]",
      direccion: "[Calle, número, barrio, ciudad]",
      descripcionCorta: "Ejemplo de descripción breve para el menú de propiedades.",
      descripcion: "Descripción completa de la propiedad.",
      caracteristicas: ["Ej: 1 dormitorio", "Ej: 45 m²", "Ej: Barrio Ejemplo"],
      foto: "",
      alquileres: [],
      gastos: [],
    },
    {
      id: 5,
      nombre: "Propiedad 5 — [Dirección]",
      direccion: "[Calle, número, barrio, ciudad]",
      descripcionCorta: "Ejemplo de descripción breve para el menú de propiedades.",
      descripcion: "Descripción completa de la propiedad.",
      caracteristicas: ["Ej: 3 dormitorios", "Ej: 100 m²", "Ej: Barrio Ejemplo"],
      foto: "",
      alquileres: [],
      gastos: [],
    },
  ],
};
