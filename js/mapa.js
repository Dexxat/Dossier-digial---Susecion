

const { useState, useCallback } = React;

const DOC_T = {
  pericia:    { color:'#4d9de0', bg:'rgba(77,157,224,0.10)',  label:'PERICIA',        icon:'⚖' },
  legal:      { color:'#e05252', bg:'rgba(224,82,82,0.10)',   label:'MARCO LEGAL',    icon:'§' },
  boletin:    { color:'#C9971C', bg:'rgba(201,151,28,0.10)',  label:'BOLETÍN OFICIAL',icon:'📋' },
  mail:       { color:'#3dbf92', bg:'rgba(61,191,146,0.10)',  label:'CORREO',         icon:'✉' },
  foto:       { color:'#f0a048', bg:'rgba(240,160,72,0.10)',  label:'FOTOGRAFÍA',     icon:'📷' },
  societario: { color:'#b48ef5', bg:'rgba(180,142,245,0.10)',label:'SOCIETARIO',     icon:'🏢' },
  contable:   { color:'#6bcb5f', bg:'rgba(107,203,95,0.10)', label:'CONTABLE',       icon:'📊' },
  testimonio: { color:'#ff9898', bg:'rgba(255,152,152,0.10)',label:'TESTIMONIO',     icon:'💬' },
};

const CAT = {
  muni:     { stroke:'#C9971C', fill:'rgba(201,151,28,0.12)',  glow:'rgba(201,151,28,0.3)',  text:'#ffd166', badge:'ENTE PÚBLICO'       },
  central:  { stroke:'#e05252', fill:'rgba(224,82,82,0.12)',   glow:'rgba(224,82,82,0.35)',  text:'#ff9898', badge:'DROGUERÍA CENTRAL'  },
  core:     { stroke:'#4d9de0', fill:'rgba(77,157,224,0.11)',  glow:'rgba(77,157,224,0.3)',  text:'#85c1f5', badge:'SUCESORIO'          },
  drogueria:{ stroke:'#3dbf92', fill:'rgba(61,191,146,0.10)', glow:'rgba(61,191,146,0.25)', text:'#6de4bb', badge:'DROGUERÍA SATÉLITE' },
  logistica:{ stroke:'#6bcb5f', fill:'rgba(107,203,95,0.10)', glow:'rgba(107,203,95,0.25)', text:'#8edd83', badge:'LOGÍSTICA'          },
  offshore: { stroke:'#b48ef5', fill:'rgba(180,142,245,0.11)',glow:'rgba(180,142,245,0.3)', text:'#cbb4f9', badge:'OFFSHORE'           },
  inmob:    { stroke:'#f0a048', fill:'rgba(240,160,72,0.10)', glow:'rgba(240,160,72,0.25)', text:'#f5c07a', badge:'INMOBILIARIA'       },
};

const ETYPE = {
  licitacion: { color:'#C9971C', dash:'none',  label:'Licitaciones públicas' },
  offshore:   { color:'#b48ef5', dash:'8 4',   label:'Triangulación offshore' },
  facturacion:{ color:'#e05252', dash:'6 3',   label:'Facturación cruzada' },
  sucesorio:  { color:'#4d9de0', dash:'none',  label:'Participación sucesoria + facturación' },
  logistica:  { color:'#6bcb5f', dash:'none',  label:'Logística cautiva' },
  control:    { color:'#4d9de0', dash:'none',  label:'Control / participación sucesoria' },
  vinculacion:{ color:'#7f8c8d', dash:'4 3',   label:'Vinculación societaria' },
};

const W = 900, H = 720;

const NODES = [
  { id:'muni', lines:['MUNICIPALIDAD','SAN MIGUEL &','MALVINAS ARG.'], cx:450, cy:78, bw:210, bh:80, cat:'muni',
    info:{ title:'Municipalidad de San Miguel y Malvinas Argentinas', role:'Ente público licitante',
      body:'Las droguerías del grupo (Daydes, Print Med, Holter, Trust Médica, Autonomía Medicinal) concurrían en forma COORDINADA a las licitaciones del Ministerio de Salud de San Miguel y Malvinas Argentinas, aparentando ser empresas competidoras independientes.\n\nEn realidad, todo se controla y "digita" desde Daydes, configurando una cartelización en licitaciones públicas en violación de la Ley de Defensa de la Competencia.',
      tags:['Ente público','Licitaciones MSM','Víctima del cartel'] },
    docs:[
  { id:'msm-01', title:'Decreto Municipal — Prórroga a Daydes, Holter, Trust Médica y Print Med (Nov 2015)', type:'boletin',
    desc:'El Intendente de Malvinas Argentinas prorroga el servicio a las 5 droguerías del grupo simultáneamente — prueba directa de adjudicación coordinada.',
    image:'assets/docs/msm-01.jpeg',
    content:'MUNICIPALIDAD DE MALVINAS ARGENTINAS\nINTENDENTE: Jesús C. Cariglino\n\nDECRETO:\nARTÍCULO 1°: PRORROGASE el servicio de provisión de medicamentos y descartables para los distintos Hospitales dependientes de la Secretaria de Salud, a las Firmas:\n"DAYDES SA, HOLTER SA, TRUST MEDICA SA, SEDESA SA y PRINT MED SA"\n\nARTÍCULO 2°: FÍJASE el precio total de la contratación:\n▸ Holter SA:     $  8.175.985,35\n▸ Daydes SA:     $  8.668.785,44\n▸ Print Med SA:  $    469.334,09\n▸ Trust Medica:  $  1.900.608,30\n▸ Sedesa SA:     $    101.370,00\n▸ TOTAL:         $ 19.316.083,18\n\nFecha: 12 de Noviembre de 2015\n\nSIGNIFICANCIA: Todas las droguerías del grupo adjudicadas en el mismo decreto, por el mismo intendente, el mismo día. El municipio contrataba directamente con el cartel sin llamar a licitación competitiva real.' },

  { id:'msm-02', title:'Boletín Oficial — Municipalidad de Malvinas Argentinas (Nov 2015, N° 249)', type:'boletin',
    desc:'Boletín oficial donde se publicó el decreto de prórroga a todas las droguerías del grupo.',
    image:'assets/docs/msm-02.jpeg',
    content:'BOLETÍN OFICIAL — Municipalidad de Malvinas Argentinas\nEdición: Noviembre 2015 — N° 249\nAv. Juan D. Perón 4276 / 4660-9000 / www.malvinasargentinas.gov.ar\n\nINTENDENTE: Jesús C. Cariglino\nSecretaria de Salud: Dr. Héctor H. Schwab\n\nPublicación que da sustento legal al decreto de prórroga del servicio a las droguerías del grupo Daydes-Holter-Trust Médica-Print Med.' },

  { id:'msm-03', title:'Mail "Emerson" — Va solo DAYDES — Licitación 37/2019 San Miguel', type:'mail',
    desc:'Ernesto Damo bajo seudónimo instruye a representantes de Autonomía Medicinal sobre qué empresa va a la licitación — prueba de coordinación centralizada.',
    image:'assets/docs/msm-03.jpeg',
    content:'De: Emerson (seudónimo de Ernesto Damo)\nPara: josemanuell opez29@yahoo.com.ar\nCC: Julio Cleary (Vendedor Autonomía); Jorge González\nFecha: 22 de mayo de 2019, 14:09\nAsunto: Re: licitacion\n\nMENSAJE: "Va solo DAYDES"\n\nLICITACIÓN REFERENCIADA:\n▸ Licitación Pública 37/2019\n▸ Municipio de San Miguel — Adquisición de Descartables — Hospital Santa María\n▸ Monto: $9.434.713,40\n\nSIGNIFICANCIA: Ernesto Damo — apoderado de Daydes — usa seudónimo para coordinar qué empresa del grupo se presenta. CC incluye al vendedor de Autonomía Medicinal, confirmando que todas las droguerías comparten el mismo control de decisión.' },
  { id:'msm-04', title:'Municipalidad de San Miguel — Documento oficial', type:'boletin',
    desc:'Documentación oficial de la Municipalidad de San Miguel referida a las licitaciones y adjudicaciones al grupo DAMO.',
    image:'assets/docs/msm-04.png' }] },

  { id:'daydes', lines:['DAYDES S.A.'], cx:310, cy:248, bw:165, bh:62, cat:'central',
    info:{ title:'Daydes S.A.', role:'Droguería matriz — 40% del sucesorio',
      body:'Centro de operaciones de todo el esquema. El sucesorio posee el 40% de las acciones. Aunque la presidencia formal la ejerce Mariano Costa (hijastro de Pacho Huidobro), Sebastián Damo mantiene el control accionario real.\n\nPatrimonio neto (balance): $756.211.634,73\nActivo: $939.574.806,45 — Pasivo: $183.363.171,72\n\nFacturación cruzada detectada por la perito oficial Dall\'Occhio con todas las droguerías del grupo. Participa en licitaciones públicas junto a sus satélites aparentando independencia.',
      tags:['40% del sucesorio','Droguería matriz','Control accionario: Sebastián Damo','Facturación cruzada detectada'] },
    docs:[
      { id:'d-day-01', title:'Preguntas periciales — Relación entre droguerías', type:'pericia',
        desc:'Preguntas propuestas a Damo, Perugini, Prudente y Ríos sobre la conexión entre sociedades del grupo.',
        content:'PREGUNTA — a DAMO, ANGELA PERUGINI, ANA MARIA PRUDENTE, RIOS, DELLA GIOVANNA\n\n¿Qué relación hay entre las sociedades? (Especialmente entre las droguerías)\n\nPRUEBAS DISPONIBLES:\n▸ Empleados compartidos — especialmente las D.T. (Mirta Fuchs, Angela Perugini, tía Nely, José María Lago)\n▸ Boletines oficiales (ej. Mirta Fuchs)\n▸ Mails cruzados\n▸ Logo de Daydes en la página web de Autonomía Medicinal SRL' },
      { id:'d-day-02', title:'Marco legal — Delitos configurados', type:'legal',
        desc:'Artículos del Código Penal y leyes especiales aplicables al esquema societario.',
        content:'ÁMBITO SUCESORIO\n▸ Omisión de bienes en la sucesión → defraudación (arts. 173 inc. 6 y 172 CP)\n▸ Simulación de contratos/sociedades (Mix Trading, Metabolik) → administración fraudulenta (art. 173 inc. 7 CP)\n\nÁMBITO PENAL / COMERCIAL\n▸ Administración fraudulenta en perjuicio de la sucesión (art. 173 inc. 7 CP)\n▸ Defraudación contra la administración pública — licitaciones amañadas (art. 174 inc. 5 CP)\n▸ Cohecho y tráfico de influencias — aportes a campañas a cambio de licitaciones (arts. 256 y 256 bis CP)\n▸ Evasión tributaria — facturación simulada, sociedades en Paraguay (Ley 24.769)\n▸ Contrabando — transporte no declarado a Paraguay (Ley 22.415, arts. 863 y ss.)\n▸ Lavado de activos — sociedades pantalla y movimientos internacionales (art. 303 CP, Ley 25.246)\n\nARTÍCULOS CLAVE\nArt. 172 CP – Estafa y defraudación\nArt. 173 inc. 6 y 7 CP – Ocultamiento de bienes hereditarios y administración fraudulenta\nArt. 174 inc. 5 CP – Defraudación contra la administración pública\nArt. 256 y 256 bis CP – Cohecho y tráfico de influencias\nArt. 303 CP – Lavado de activos\nLey 24.769 – Evasión tributaria\nLey 22.415 – Contrabando' },
      { id:'d-day-03', title:'Perfil público Daydes SA — Portal Kompass', type:'societario',
        desc:'Captura del perfil oficial de Daydes en Kompass: dirección, actividad, y Angela Perugini como responsable de Comercio Exterior.',
        image:'assets/docs/d-day-03.jpeg',
        content:'Fuente: Portal Kompass (información pública)\n\nDIRECCIÓN: San Lorenzo 1640, 1663 San Miguel, Argentina\nWEB: http://www.daydes.com.ar\nKompass ID: AR003383\n\nCONTACTO VISIBLE:\n▸ Sr. Angela Perugini — Responsable de Comercio Exterior\n  (la misma persona vinculada a Mix Trading SRL y a las licitaciones)\n\nACTIVIDAD DECLARADA:\nDesde 1995 en el rubro Salud. A partir de 2007 comenzó proceso de internacionalización (importación de insumos). Desde 2012 también opera en Alimentos y Bebidas.\n\nSIGNIFICANCIA: El perfil público confirma la actividad de comercio exterior de Daydes, la centralidad de Angela Perugini en esa área, y la dirección coincidente con otros registros societarios.' },
      { id:'d-day-04', title:'Boletín Oficial — Sebastián Damo presidente de Daydes (14/11/2008)', type:'boletin',
        desc:'Publicación oficial donde se designa a Sebastián Damo como Presidente y a Fernando Aldo Huidobro como Vicepresidente de Daydes SA.',
        image:'assets/docs/d-day-04.jpeg',
        content:'DAYDES S.A. — Publicación Boletín Oficial\nFecha: 14/11/2008 — Mn. 160.966\n\nACTOS REGISTRADOS:\n▸ Renuncia: Nélida Beatriz González como Directora Suplente\n▸ Designaciones:\n   → Presidente: Sebastián Damo\n   → Vicepresidente: Fernando Aldo Huidobro ("Pacho")\n   → Directora Suplente: Ana María Prudente\n   → Directora Suplente: María Marta Ríos\n   Escribano: Jorge Andrés Martelli\n\nSIGNIFICANCIA: Acredita que desde 2008 Sebastián Damo era presidente de Daydes con Fernando Huidobro como vicepresidente — vinculando a las dos familias (Damo y Huidobro) en la conducción formal de la empresa central del grupo.' },
      { id:'d-day-05', title:'Mail "Emerson" — Va solo DAYDES — Licitación 37/2019', type:'mail',
        desc:'Email de Ernesto Damo bajo seudónimo "Emerson" indicando que la licitación pública 37/2019 la presenta solo Daydes. Prueba de coordinación de licitaciones.',
        image:'assets/docs/d-day-05.jpeg',
        content:'De: Emerson (seudónimo de Ernesto Damo)\nPara: josemanuell opez29@yahoo.com.ar (José Manuel López)\nCC: Julio Cleary (Vendedor Autonomía); Jorge González\nFecha: 22 de mayo de 2019, 14:09\nAsunto: Re: licitacion\n\nCONTENIDO DEL MAIL:\n"Va solo DAYDES"\n\nCONTEXTO DE LA LICITACIÓN:\n▸ Licitación Pública 37/2019\n▸ Gobierno Municipal de Buenos Aires — Municipio de San Miguel\n▸ Adquisición de Descartables — Hospital Santa María\n▸ Monto: $9.434.713,40\n\nSIGNIFICANCIA PROBATORIA:\nErnesto Damo, bajo el seudónimo "Emerson", dirige a los representantes de Autonomía Medicinal (Julio Cleary) y otras droguerías sobre qué empresa debe presentarse a la licitación. Esto demuestra la coordinación centralizada de las licitaciones desde Daydes, con total conocimiento de todas las empresas del grupo.' },
      { id:'d-day-06', title:'Mail Ernesto Damo — Manual de Procedimiento a todas las droguerías', type:'mail',
        desc:'Email de Ernesto Damo desde damo@daydes.com.ar enviando el Manual de Procedimiento Daydes a empleados de múltiples droguerías. Prueba del control centralizado.',
        image:'assets/docs/d-day-06.jpeg',
        content:'De: Damo [damo@daydes.com.ar]\nFecha: Jueves 16 de mayo de 2019, 13:45\nPara: gabrielasarmiento@daydes.com.ar; AYELEN BOTELLO; BellaVista@daydes.com.ar\nCC: Jorge Eizayaga; Rolando Illia; Reynaldo Illa\nAsunto: MANUAL DE PROCEDIMIENTO DAYDES\n\nDESTINATARIOS (empleados de distintas droguerías):\n▸ Sarmiento Gabriela\n▸ Botello Ayelen\n▸ Fernandez Daniel\n▸ Romano Luis (hijo)\n▸ Gomez Raul\n▸ Botello Flavio\n▸ Moreno Alberto\n▸ Leizza Diego\n▸ Romano Luis\n\nCONTENIDO:\n"Se pone en conocimiento a todos los arriba mencionados que a partir del 17/5/19 concurrirán a esas dependencias los sres. Jorge Eizayaga y Rolando Illia, para implementar y capacitar a todo el personal respecto al nuevo Manual de Procedimiento."\n\nFIRMA:\nErnesto D. Damo — Apoderado — DAYDES SA\nSan Lorenzo 1640 - San Miguel - Buenos Aires - Argentina\nTel: 54 11 4 664 3715 / 8218 | info@daydes.com.ar | damo@daydes.com.ar\n\nSIGNIFICANCIA: Damo envía procedimientos desde Daydes a empleados de todas las droguerías satélite, demostrando control operativo centralizado. Jorge Eizayaga y Rolando Illia son los mismos gestores que aparecen en todas las sociedades del grupo.' },
      { id:'d-day-07', title:'Mail Rochetti → Damo — Acuerdo de deuda Daydes-Autonomía', type:'mail',
        desc:'Gustavo Rochetti reenvía a Damo un mail de Jorge Eizayaga sobre el plan de cancelación de deuda coordinado entre Daydes y Autonomía Medicinal.',
        image:'assets/docs/d-day-07.jpeg',
        content:'De: Gustavo Rochetti → reenviado a damo@daydes.com.ar\nFecha: 16 de mayo de 2019, 08:33\nAsunto: RV: Ref.: Respuesta correo del día 14/5\n\nMAIL ORIGINAL DE: Jorge Eizayaga [jorge.eizayaga@gmail.com]\nPara: Guillermo Vestel\nCC: Gustavo Rochetti; Angela Perugini\nFecha: 15 de mayo de 2019, 03:31 PM\n\nCONTENIDO:\n"Para hacerlo claro y conciso: todas aquellas entregas referidas al programa de cancelación de deuda de paños, consolidado al 31 de marzo de 2019, consistente en cuatro (4) entregas para Daydes (abril, mayo, junio y julio de 2019) y diecinueve para Autonomía (comenzando en agosto de 2019) darán lugar a la NO CONFECCIÓN de los pagarés respectivos, en la fecha en que se firmen los mismos, SIEMPRE QUE SE HAYA CONCLUÍDO COMPLETAMENTE CON LAS ENTREGAS ACORDADAS a esa fecha."\n\nSIGNIFICANCIA: Prueba directa de la coordinación financiera entre Daydes y Autonomía Medicinal. Las mismas personas (Eizayaga, Rochetti, Perugini) operan como nexo entre ambas sociedades, con Damo como receptor de toda la información.' },
      { id:'d-day-08', title:'Mail Eizayaga → Fehling cc Damo — Cobros importados Daydes Abril 2019', type:'mail',
        desc:'Jorge Eizayaga reporta a Horacio Fehling los cobros de importados y paños de Daydes para municipios, con Damo en copia oculta.',
        image:'assets/docs/d-day-08.jpeg',
        content:'De: Jorge Eizayaga\nPara: Horacio Fehling\nCco (copia oculta): damo@daydes.com.ar\nFecha: 13 de mayo de 2019, 12:06\nAsunto: Cobros de Importados y Paños Abril 2019\n\nCONTENIDO:\n"Horacio, van los cobros de importados, del mes de abril de 2019. En lo que significan Servicios (San Miguel y Malvinas Argentinas), previamente se debieron determinar los consumos de los meses precedentes, y luego los cobros contra esas teóricas facturas. Falta facturar San Miguel Importados, de los meses de Marzo y Abril. Lo cobrado es de meses precedentes."\n\nTabla adjunta: Cobros de Importados y Paños en ABRIL 2019 — DAYDES — Al 30 de Abril de 2019\n\nSIGNIFICANCIA:\n▸ Damo recibe en copia oculta todos los reportes de cobros a los municipios (San Miguel y Malvinas Argentinas)\n▸ Menciona "teóricas facturas" — evidencia de facturación simulada o retroactiva\n▸ Eizayaga, Fehling y Perugini actúan como brazo operativo de Damo en toda la red' },
    ] },

  { id:'mix', lines:['MIX TRADING SRL','(PARAGUAY)'], cx:650, cy:248, bw:180, bh:62, cat:'offshore',
    info:{ title:'Mix Trading S.R.L. — Paraguay', role:'Importadora/exportadora offshore',
      body:'Constituida el 08/02/2018 en Paraguay mediante Escritura N° 21.\nSocios gerentes: Sebastián Damo y Fernando Maximiliano Vinci (contador de Daydes y socio gerente de Autonomía Medicinal).\n\nNUNCA fue mencionada en la rendición de cuentas del administrador pese a su estrecha vinculación con Daydes. Los fondos del grupo podrían triangularse a través de esta sociedad para escapar del circuito fiscal argentino.',
      tags:['Offshore — Paraguay','No declarada en sucesorio','Comercio exterior','Socios: Damo + Vinci'] },
    docs:[
  { id:'mix-01', title:'Escritura N°21 — Constitución Mix Trading SRL (Paraguay, 08/02/2018)', type:'societario',
    desc:'Escritura pública original donde Sebastián Damo y Fernando Vinci compran las 112 cuotas de Mix Trading SRL. Notario: Edgar Caballero Recalde.',
    image:'assets/docs/mix-01.jpeg',
    content:'COLEGIO DE ESCRIBANOS DEL PARAGUAY — Sello Notarial N° 10895695\nEscribano: EDGAR L. CABALLERO RECALDE — Registro N°621 — Asunción\n\nACTO: Escritura de Cesión de Cuotas y Modificación de Estatutos Sociales en la firma MIX TRADING SRL\nNÚMERO: VEINTE Y UNO (21)\nFecha: 8 de Febrero de 2018 — Asunción, Paraguay\n\nCOMPARECIENTES:\n▸ SEBASTIAN DAMO (DNI arg. 25.999.116)\n▸ FERNANDO MAXIMILIANO VINCI (DNI arg. 29.319.534)\n▸ JUAN FELIPE RAMIREZ ARRUA (cédula paraguaya 3.435.237)\n▸ DERLIS IVAN DELFINO (cédula paraguaya 4.990.921)\n\nFirma original constituida el 30/11/2015 (Escritura N°169), RUC N°80089043-4\n\nSIGNIFICANCIA: Prueba la compra de Mix Trading SRL por Damo y Vinci en 2018.' },

  { id:'mix-02', title:'Escritura — Cesión: Sebastián Damo adquiere 111/112 cuotas', type:'societario',
    desc:'Cláusula de cesión donde Juan Felipe Ramirez Arrua transfiere 111 cuotas a Damo y Derlis Delfino transfiere 1 cuota a Vinci.',
    image:'assets/docs/mix-02.jpeg',
    content:'CUOTAS TRANSFERIDAS:\n▸ Juan Felipe Ramirez Arrua → Sebastián Damo: 111 cuotas de G.1.000.000 c/u = G.111.000.000\n▸ Derlis Ivan Delfino → Fernando Maximiliano Vinci: 1 cuota de G.1.000.000 = G.1.000.000\n\nRESULTADO: Capital total G.112.000.000 dividido en 112 cuotas\n▸ SEBASTIÁN DAMO: 111/112 cuotas (99,1%)\n▸ FERNANDO MAXIMILIANO VINCI: 1/112 cuota (0,9%)\n\nCLÁUSULA SÉPTIMA — GERENCIA:\nLa firma social y representación legal de la sociedad, así como la emisión de cheques y de cualquier otro tipo de documentos sean estos públicos o privados estará a cargo del Señor SEBASTIÁN DAMO, quien con su sola firma, obligará válidamente a la Sociedad, con la denominación de SOCIO GERENTE.' },

  { id:'mix-03', title:'Escritura — Carátula y Boletín Oficial Trading Mix SRL (2018/2019)', type:'societario',
    desc:'Carátula de la escritura de cesión y publicación en Boletín Oficial argentino de una escritura posterior (28/05/2019).',
    image:'assets/docs/mix-03.jpeg',
    content:'CARÁTULA ESCRITURA:\nContratos Civiles y Comerciales — Hipotecas — Prendas\nPoderes — Constitución de Sociedad — Asesoramiento\nEDGAR L. CABALLERO RECALDE — Notario Público — Registro N°621\nwww.consultoranotarial.com — Brasil N°782 — Asunción, Paraguay\n\nEscritura N°21, Año 2018\nCesión de Cuotas y Modificación de Estatutos Sociales en la firma MIX TRADING SRL\n\nPUBLICACIÓN BO ARGENTINA (resultado de búsqueda):\nTRADING MIX SRL. Por Escritura Pública 28 del 28/05/2019, pasada al folio 70, ante Escribano Andrés Gabriel Ratzer, Titular. Registro 1001.' },

  { id:'mix-04', title:'ImportGenius — Daydes SA exporta a Mix Trading SRL (Paraguay)', type:'foto',
    desc:'Portal de comercio exterior ImportGenius confirma que Daydes SA es el principal proveedor (shipper) de Mix Trading SRL en Paraguay.',
    image:'assets/docs/mix-04.jpeg',
    content:'IMPORTGENIUS — Perfil de Daydes SA\nURL: es.importgenius.com\n\nTEXTO LITERAL DEL PORTAL:\n"Registros aduaneros gubernamentales para Daydes SA en Paraguay. Ver su historial de importaciones y exportaciones, incluyendo envíos de Mix Trading Srl, un importador establecido en Paraguay."\n\nSIGNIFICANCIA: El propio registro aduanero paraguayo vincula directamente a Daydes SA como proveedor exclusivo de Mix Trading SRL.' },

  { id:'mix-05', title:'ImportGenius — Mix Trading SRL: socios comerciales y orígenes', type:'foto',
    desc:'Gráficos de ImportGenius: Daydes SA es el principal (casi único) socio comercial de Mix Trading, y Argentina su principal origen de importaciones.',
    image:'assets/docs/mix-05.jpeg',
    content:'IMPORTGENIUS — Mix Trading SRL\n\nPRINCIPALES SOCIOS COMERCIALES:\n▸ DAYDES SA (Argentina) — proporción mayoritaria\n▸ ANDRES GUERRERO SENSE — proporción menor\n▸ N/A\n\nORÍGENES DESTACADOS:\n▸ ARGENTINA — mayoritario\n▸ PERU — menor\n\nCOMPAÑÍA RELACIONADA CON MIX TRADING:\n▸ DAYDES SA (Argentina) — menos de 10 envíos registrados\n\nSIGNIFICANCIA: Confirma que casi la totalidad del comercio de Mix Trading proviene de Daydes SA, Argentina. La relación comercial es prácticamente exclusiva — no es una empresa real con múltiples clientes sino un vehículo de Daydes.' },

  { id:'mix-06', title:'ImportGenius — Bill of Lading: Daydes → Mix Trading (Jabón, 9052 kg, 2020)', type:'foto',
    desc:'Conocimiento de embarque registrado en aduana paraguaya: Daydes SA embarca por camión a Mix Trading SRL — Producto: jabón.',
    image:'assets/docs/mix-06.jpeg',
    content:'IMPORTGENIUS — Ejemplo de envío registrado\n\nBILL OF LADING: 003 001TPA05962\n▸ CONSIGNEE (destinatario): MIX TRADING SRL\n▸ SHIPPER (despachante): DAYDES SA\n▸ ARRIVAL DATE: 2020-04-03\n▸ PAÍS DE ORIGEN: ARGENTINA\n▸ DESTINATION: PARAGUAY\n▸ TRANSPORTATION TYPE: CAMION\n▸ GROSS WEIGHT: 9.052 KGS (19.956 lb)\n▸ QUANTITY: 524.160 unidades\n▸ PRODUCT: JABÓN; PRODUCTOS Y PREPARACIONES ORGÁNICOS TENSOACTIVOS\n\nSIGNIFICANCIA: El traslado es por CAMIÓN hacia Paraguay — compatible con la logística del Galpón Balbín (Metabolik). El producto exportado es "jabón/tensoactivos" — no medicamentos — lo que plantea interrogantes sobre la naturaleza real de los envíos.' },

  { id:'mix-07', title:'Mail Rochetti → Ernesto — Resumen Final Paraguay+Daydes (29/4/2019)', type:'mail',
    desc:'Gustavo Rochetti informa a Ernesto Damo el estado de cuentas bancarias en Paraguay, giro de USD 18.381 a Argentina y liquidación del contador.',
    image:'assets/docs/mix-07.jpeg',
    content:'De: Gustavo Rochetti\nPara: damo@daydes.com.ar (y 1 más)\nFecha: 29 de abril de 2019\nAsunto: INFORMACION PARAGUAY - FINAL\n\nCONTENIDO:\n"HOLA ERNESTO. LE PASO EL RESUMEN FINAL DE PARAGUAY + DAYDES\n\n• BANCO NACION: El asistente de cuenta — la documentación de la SRL y SA [...] La documentación se presentará cuando se termine el traspaso 20 días estimado.\n\nGIRO A ARGENTINA: USD 18.381,12 [...] Llegó la Orden de Pago y liquidación de los Dólares a la cta Banco Provincia USD. TENEMOS LOS EXTRACTOS Y MOVIMIENTOS REALIZADOS.\n\nSALDOS Y GASTOS BANCARIOS, ESTÁN OK.\n\n• CONTADOR: LIQUIDACIÓN DE GASTOS Y COMPROBANTES DE PAGO DE ABRIL..."\n\nSIGNIFICANCIA: Rochetti (Gerente Comex Daydes) reporta directamente a Ernesto Damo el estado de las cuentas de Mix Trading en Paraguay, incluyendo giros de dólares hacia Argentina. Prueba la operación financiera conjunta Daydes-Paraguay.' },

  { id:'mix-08', title:'Mail Perugini → Rochetti/Damo — Consumo Abril Importado (6/5/2019)', type:'mail',
    desc:'Angela Perugini envía a Rochetti, Fehling, Eizayaga, Damo y Prudente (con copia a Mariano Costa) el consumo de productos importados de abril.',
    image:'assets/docs/mix-08.jpeg',
    content:'De: angelaperugini@daydes.com.ar\nPara: Gustavo Rochetti; HORACIO Fehling; Jorge Eizayaga; damo@daydes.com.ar; PRUDENTE ANA\nCc: Mariano Costa\nFecha: 6 de mayo de 2019, 12:16\nAsunto: CONSUMO ABRIL IMPORTADO\n\nAdjunto: CONSUMO I...IL 2019.xlsx (59,9 KB)\n\nSIGNIFICANCIA MÚLTIPLE:\n▸ Angela Perugini (Responsable Comex Daydes) reporta el consumo de importados a todo el equipo directivo\n▸ Mariano Costa (presidente formal Daydes) recibe la información en copia\n▸ El informe va a damo@daydes.com.ar — Ernesto sigue siendo el destinatario de toda la información operativa\n▸ El archivo xlsx vincula los movimientos de importación con los registros contables de Daydes' },

  { id:'mix-09', title:'Portal Kompass — Gustavo Rochetti: Gerente de Comercio Exterior de Daydes', type:'societario',
    desc:'Perfil público de Gustavo Rochetti como Gerente de Comercio Exterior de Daydes SA — la misma persona vinculada a todas las operaciones de Mix Trading.',
    image:'assets/docs/mix-09.jpeg',
    content:'PORTAL KOMPASS — Sección Contacto de Daydes SA\n\nCONTACTO:\n▸ GUSTAVO FERNANDO ROCCHETTI\n▸ Cargo: GERENTE COMERCIO EXTERIOR\n▸ Email: GUSTAVOROCCHETTI@DAYDES.COM.AR\n\nDIRECCIÓN: SAN LORENZO 1640, Buenos Aires, Argentina\nINFO: INFO@DAYDES.COM.AR\nWEB: http://WWW.DAYDESSA.COM.AR\nTEL: (+54 11) 46643715\n\nSIGNIFICANCIA: El mismo Rochetti que aparece en todos los mails sobre Paraguay es el Gerente de Comercio Exterior oficial de Daydes. Mix Trading no tiene empleados propios — el comex es manejado enteramente desde Daydes.' },
] },

  { id:'print', lines:['PRINT MED SA'], cx:108, cy:388, bw:132, bh:52, cat:'drogueria',
    info:{ title:'Print Med S.A.', role:'Droguería satélite — José C. Paz',
      body:'Droguería satélite con sede en José C. Paz. Integra el circuito de facturación cruzada con Daydes, Holter, Trust Médica y Autonomía Medicinal.\n\nConcurre a las mismas licitaciones MSM junto al resto del grupo simulando ser empresa independiente.',
      tags:['Droguería satélite','Facturación cruzada','José C. Paz'] },
    docs:[
  { id:'print-01', title:'Ficha ANMAT — Print Med SA: Director Técnico Mirta Fuchs', type:'societario',
    desc:'Ficha oficial del ministerio: Print Med SA, Matrícula 10731, domicilio Gelly y Obes 4763 José C. Paz, Director Técnico Responsable: Mirta FUCHS.',
    image:'assets/docs/print-01.jpeg',
    content:'REGISTRO MINISTERIAL — PRINT MED SA\n\nRAZÓN SOCIAL: PRINT MED SA\nMATRÍCULA: 10731\nRUBRO: Productos Médicos y Productos para Diagnóstico de uso in vitro\n\nDOMICILIO:\n▸ Legal y Depósito: Gelly y Obes N°4763\n▸ Localidad: JOSÉ C. PAZ\n▸ Provincia: BUENOS AIRES\n\nDIRECTOR TÉCNICO RESPONSABLE: Mirta FUCHS\n\nSIGNIFICANCIA: Mirta Fuchs es la misma persona que aparece en el Boletín Oficial como empleada compartida entre múltiples droguerías del grupo — uno de los indicadores clave de la unidad empresarial entre sociedades que se presentan como independientes.' },

  { id:'print-02', title:'Mail Print Med → Angela Perugini y Damo — Autorización de compra (21/5/2019)', type:'mail',
    desc:'Print Med solicita autorización de compra de camisolines directamente a Damo y Angela Perugini — prueba de control centralizado desde Daydes sobre las droguerías satélite.',
    image:'assets/docs/print-02.jpeg',
    content:'De: PrintMed SA\nPara: Angela [Perugini] y 2 más (incluyendo Damo)\nFecha: 21 de mayo de 2019\nAsunto: Autorizacion de compra — 3 mensajes\n\nMENSAJE:\n"Buenos días, Damo y Angela solicito autorización de compra para 1 mes de camisolines."\n\nCOMPARATIVA ADJUNTA:\n▸ Producto: CAMISOLÍN DESCARTABLE MEDIANO/LARGO CON P.H AZ\n▸ Stock: 11.400 — Consumo: 32.000 — Compra propuesta: -20.600\n▸ Precios comparados: Dimex $10,80 / Induset $12,00 / Pademed $24,00 / Kelmer $14,00\n\nPRESUPUESTO:\n21.000 unidades × $10,80 = $226.800 + IVA $47.628 = TOTAL: $274.428\n\nFIRMA:\nRomano Norma — Print Med SA — Droguería Distribuidora\nGelly y Obes 4763 — José C. Paz — Tel. 02320-435464\n\nSIGNIFICANCIA: Print Med SA — supuestamente empresa independiente — pide autorización de compra a Ernesto Damo y Angela Perugini de Daydes SA. Damo actúa como autoridad máxima de aprobación de todas las droguerías del grupo.' },
] },

  { id:'holter', lines:['HOLTER SA'], cx:258, cy:388, bw:120, bh:52, cat:'drogueria',
    info:{ title:'Holter S.A.', role:'Droguería satélite — José C. Paz',
      body:'Droguería satélite con sede en José C. Paz. Históricamente vinculada a Fernando Aldo Huidobro ("Pacho"), socio de Domingo Damo, fallecido en 2019. Integra el circuito de facturación cruzada detectado por la perito oficial.\n\nConcurre a licitaciones MSM junto al resto del grupo.',
      tags:['Droguería satélite','Facturación cruzada','José C. Paz'] },
    docs:[] },

  { id:'trust', lines:['TRUST MÉDICA SA'], cx:415, cy:388, bw:155, bh:52, cat:'core',
    info:{ title:'Trust Médica S.A.', role:'Droguería — 36,8% del sucesorio',
      body:'Droguería que integra el sucesorio con el 36,8% de las acciones. Sebastián Damo, como administrador, está vaciando a través de la facturación cruzada una sociedad cuyos activos en gran parte pertenecen a los herederos.\n\nPatrimonio neto: $59.693.049,81\nActivo: $96.556.613,21 — Pasivo: $36.863.563,40\n\nLibros compulsados en pericia oficial.',
      tags:['36,8% del sucesorio','Facturación cruzada','Pericia realizada'] },
    docs:[
      { id:'d-trust-01', title:'Irregularidad — Medicamentos sin facturar a Liliana Lago', type:'legal',
        desc:'Trust Médica entregó medicamentos psicotrópicos sin factura, usando remitos internos inválidos.',
        content:'IRREGULARIDAD IDENTIFICADA:\n▸ Trust Médica SA entregó medicamentos psicotrópicos a Liliana Lago sin facturar y con remitos internos sin validez legal\n▸ Las droguerías NO están habilitadas a vender de forma particular (LEY 19.303 — Disp. 1710/08)\n\nPUNTOS A ACREDITAR:\n▸ Los remitos presentados son documentos internos sin firma y sin validez legal\n▸ No existe factura válida que respalde la entrega\n▸ Las farmacéuticas de Trust estaban al tanto de la situación psiquiátrica de Liliana\n\nPERSONA A CITAR:\n▸ Yamila Dahir (D.T. de Trust Médica)\n\nENCUADRE LEGAL:\n▸ Violación Ley 19.303 / Disp. 1710/08\n▸ Posible administración fraudulenta en perjuicio de heredera (art. 173 inc. 7 CP)' },
    ] },

  { id:'autonomia', lines:['AUTONOMÍA','MEDICINAL SRL','(CABA)'], cx:590, cy:393, bw:155, bh:72, cat:'drogueria',
    info:{ title:'Autonomía Medicinal S.R.L.', role:'Droguería satélite — CABA',
      body:'Droguería satélite con sede en CABA. Contador y socio gerente: Fernando Maximiliano Vinci (socio de Damo en Mix Trading Paraguay). En su sitio web oficial figuraba el LOGO DE DAYDES S.A., evidenciando la unidad empresarial que el grupo quiere ocultar.\n\nJosé María Lago y su tía Nélida González trabajaron aquí hasta 2019.',
      tags:['Droguería satélite','Logo Daydes en web','Facturación cruzada','CABA'] },
    docs:[
  { id:'aut-01', title:'Captura web — Logo DAYDES SA en sitio oficial de Autonomía Medicinal', type:'foto',
    desc:'Prueba clave: en el pie de página del sitio oficial de autonomiamedicinal.com.ar aparece el logo de DAYDES SA junto al de Laboratorio Mi Flora SRL.',
    image:'assets/docs/aut-01.jpeg',
    content:'FUENTE: autonomiamedicinal.com.ar (captura de pantalla)\n\nOBSERVADO: Al pie del sitio web oficial de Autonomía Medicinal SRL aparecen dos logos:\n▸ DAYDES S.A. (logo completo con imagen corporativa)\n▸ LABORATORIO MI FLORA S.R.L.\n\nCopyright: © 2015 Autonomia Medicinal\n\nSIGNIFICANCIA PROBATORIA DIRECTA:\nAutonomía Medicinal SRL publica en su propio sitio web el logo de Daydes SA, confirmando la unidad empresarial que intentan disimular ante la justicia. Esta captura es una de las pruebas más directas de la conexión entre ambas sociedades.\n\nCONEXIÓN ADICIONAL: El convenio entre Laboratorio Mi Flora SRL, Autonomía Medicinal y Daydes SA en el que intervino el abogado Lembeye demuestra que el letrado conocía esta vinculación antes de asumir la sucesión.' },

  { id:'aut-02', title:'Mail Eizayaga/Rochetti → Damo — Plan cancelación deuda Daydes-Autonomía', type:'mail',
    desc:'Rochetti reenvía a Damo el acuerdo de cancelación de deuda conjunta de Daydes (4 entregas) y Autonomía Medicinal (19 entregas) — prueba de gestión financiera compartida.',
    image:'assets/docs/aut-02.jpeg',
    content:'De: Gustavo Rochetti → damo@daydes.com.ar\nFecha: 16 de mayo de 2019, 08:33\nAsunto: RV: Ref.: Respuesta correo del día 14/5\n\nMAIL ORIGINAL DE: Jorge Eizayaga (jorge.eizayaga@gmail.com)\nPara: Guillermo Vestel\nCC: Gustavo Rochetti; Angela Perugini\nFecha: 15 de mayo de 2019, 03:31 PM\n\nCONTENIDO LITERAL:\n"Para hacerlo claro y conciso: todas aquellas entregas referidas al programa de cancelación de deuda de paños, consolidado al 31 de marzo de 2019, consistente en cuatro (4) entregas para Daydes (abril, mayo, junio y julio de 2019) y diecinueve para Autonomía (comenzando en agosto de 2019) darán lugar a la NO CONFECCIÓN de los pagarés respectivos, en la fecha en que se firmen los mismos, SIEMPRE QUE SE HAYA CONCLUÍDO COMPLETAMENTE CON LAS ENTREGAS ACORDADAS a esa fecha, en el programa de entregas recibido en los meses de abril y mayo, para Daydes y Autonomía."\n\nSIGNIFICANCIA: Un único proveedor gestiona la deuda de Daydes y Autonomía Medicinal simultáneamente, confirmando que son tratadas como una sola empresa. Damo recibe toda la información como destinatario final.' },

  { id:'aut-03', title:'Pregunta pericial — Conflicto de interés del Dr. Álvarez Lembeye', type:'pericia',
    desc:'Interrogatorio propuesto al abogado de la sucesión sobre su actuación previa para las sociedades del grupo.',
    content:'PREGUNTA — a MATÍAS ÁLVAREZ LEMBEYE\n\n¿Había trabajado antes de la sucesión para alguna de las sociedades del grupo?\n¿Tenía conocimiento de la conexión entre las mismas?\n\nPRUEBAS DISPONIBLES:\n▸ Convenio firmado entre LABORATORIO MI FLORA SRL, AUTONOMÍA MEDICINAL SRL y DAYDES SA en el que intervino Lembeye antes de la sucesión\n▸ El logo de Daydes en el sitio de Autonomía es público — Lembeye no podía desconocerlo\n\nENCUADRE LEGAL:\n▸ Violación Ley 23.187 art. 6 — incompatibilidades y deber de lealtad del abogado\n▸ Conflicto de interés grave que invalida su actuación en representación de Liliana Lago\n\nACCIÓN SUGERIDA:\n▸ Solicitar al Colegio de Abogados de Buenos Aires apertura de sumario por falta ética grave\n▸ Solicitar al Juez que disponga nueva representación letrada para Liliana Lago' },
] },

  { id:'metabolik', lines:['METABOLIK SA','(LOGÍSTICA)'], cx:308, cy:515, bw:152, bh:62, cat:'logistica',
    info:{ title:'Metabolik S.A.', role:'Logística exclusiva del grupo',
      body:'Fundada 12/09/2011. Socios: Sebastián Damo, Marcela Soledad Caregnato, Carolina Luján Ríos. Presidente 2016: Sebastián Damo.\n\nOpera EXCLUSIVAMENTE para el grupo: sin clientes externos, sin presencia pública, sin contacto visible. Los pagos de las droguerías a Metabolik transfieren fondos fuera del patrimonio auditable.\n\nSede: Av. Mitre 3659, San Miguel ("Galpón Balbín") — depósito de media manzana con flota de camiones. NO declarado en el inventario sucesorio.',
      tags:['Logística cautiva del grupo','Galpón Balbín — bien no declarado','Control: Sebastián Damo'] },
    docs:[
  { id:'met-01', title:'Google Maps Street View — Cartel DAYDES SA en Av. Balbín 3657', type:'foto',
    desc:'Captura de Google Maps (2024): cartel oficial "DAYDES S.A." en la puerta del galpón de Av. Dr. Ricardo Balbín 3657 — domicilio registrado de Metabolik SA.',
    image:'assets/docs/met-01.jpeg',
    content:'FUENTE: Google Maps Street View — © 2024 Google\nDIRECCIÓN: Av. Dr. Ricardo Balbín 3657, B1663NEZ San Miguel, Provincia de Buenos Aires\n\nOBSERVADO: En la puerta del inmueble ubicado en el número 3657 de la Av. Ricardo Balbín (ex Mitre) figura el cartel corporativo oficial de DAYDES S.A. con su logo.\n\nDOMICILIO FISCAL DE METABOLIK SA (según webs públicas y CUIT Online):\n▸ Av. Mitre (actual Dr. Ricardo Balbín) 3659, San Miguel\n▸ CUIT: 30-71208639-0\n\nSIGNIFICANCIA PROBATORIA CRÍTICA:\nEl galpón operativo de Metabolik SA tiene el cartel de Daydes SA en su puerta. Esto confirma que:\n1. El inmueble pertenece o es usado por Daydes SA\n2. La logística de Daydes y Metabolik opera desde el mismo lugar físico\n3. La separación jurídica entre ambas es una ficción\n4. El bien NO fue declarado en el inventario sucesorio' },

  { id:'met-02', title:'Google Maps Street View — Vista del galpón Av. Balbín 3613 (amplitud)', type:'foto',
    desc:'Vista del galpón desde la calle: depósito de media manzana con portón industrial — infraestructura de Metabolik SA invisible públicamente.',
    image:'assets/docs/met-02.jpeg',
    content:'FUENTE: Google Maps Street View\nDIRECCIÓN: Av. Dr. Ricardo Balbín 3613, San Miguel (marzo 2019)\n\nLO QUE SE VE:\n▸ Galpón/depósito industrial de gran tamaño (media manzana)\n▸ Portón industrial de acceso\n▸ Sin cartel visible en esta posición\n\nCONTEXTO: Esta vista es del número 3613, contiguo al 3657 donde aparece el cartel de Daydes. Ambas imágenes corresponden al mismo predio ampliado que ocupa Media Manzana en la Av. Ricardo Balbín, San Miguel.' },

  { id:'met-03', title:'Google Maps Satélite — Predio completo Av. Balbín/Pichincha/Belgrano', type:'foto',
    desc:'Vista aérea del barrio mostrando la extensión real del predio que ocupa el galpón de Metabolik SA / Daydes SA en San Miguel.',
    image:'assets/docs/met-03.jpeg',
    content:'FUENTE: Google Maps — Vista Satelital\nZONA: Av. Ricardo Balbín / Av. Pichincha / Av. Belgrano — San Miguel\n\nOBSERVADO: El predio correspondiente al galpón ocupa una superficie significativa en la zona industrial de San Miguel, visible como una gran estructura con techo de chapa.\n\nSIGNIFICANCIA: El valor del inmueble no declarado en la sucesión es sustancial dado su tamaño y ubicación sobre avenida principal.' },

  { id:'met-04', title:'Boletín Oficial — Constitución Metabolik SA (12/09/2011)', type:'boletin',
    desc:'Publicación fundacional de Metabolik SA: socios Caregnato, Sebastián Damo y Carolina Ríos. Presidente: Sebastián Damo. Sede original: José C. Paz.',
    image:'assets/docs/met-04.jpeg',
    content:'METABOLIK SA — Boletín Oficial de la Provincia de Buenos Aires\nC.F. 31.916\n\nFECHA CONSTITUCIÓN: 12/09/2011 — Escrit. Púb. N°264\n\nSOCIOS FUNDADORES:\n▸ Marcela Soledad CAREGNATO (DNI 25.104.622, Pilar)\n▸ Sebastián DAMO (DNI 25.999.116, San Miguel)\n▸ Carolina Luján RÍOS (DNI 33.040.444, Carapachay)\n\nAUTORIDADES:\n▸ Presidente: Sebastián Damo\n▸ Director Suplente: Marcela Soledad Caregnato\n\nSEDE ORIGINAL: Rivadavia 1438, José Clemente Paz\n\nOBJETO: Transporte terrestre, marítimo y fluvial. Transporte de carga, fletes, encomiendas, depósito y distribución. Representaciones y mandatos. Servicios de organización, asesoramiento y atención comercial, logística. Agentes marítimos, despachantes de aduana y proveedores marítimos. Constructora de obras públicas y privadas. Inmobiliaria en general.\n\nCAPITAL: $12.000\nDURACIÓN: 99 años' },

  { id:'met-05', title:'Boletín Oficial 2016 — Renovación mandato: Sebastián Damo sigue como Presidente', type:'boletin',
    desc:'Publicación en BO Provincia de Buenos Aires: renovación del mandato de Sebastián Damo como Presidente de Metabolik SA (Asamblea 31/07/2015, publicación 15/12/2016).',
    image:'assets/docs/met-05.jpeg',
    content:'METABOLIK SA — Boletín Oficial de la Provincia de Buenos Aires\nFecha publicación: 15/12/2016 — L.P. 115.639\n\nACTA DE ASAMBLEA GENERAL EXTRAORDINARIA del 31/07/2015\n\nRENOVACIÓN DEL DIRECTORIO:\n▸ PRESIDENTE: Sebastián Damo\n▸ DIRECTOR SUPLENTE: Marcela Soledad Caregnato\n\nEsca. L.L. Pivetta de Pavón, Luisa Lucía — Reg. 4 de José C. Paz\n\nTAMBIÉN PUBLICADO:\nPOR 1 DÍA — Por Acta del 7/11/16, Ref./Cláusula 4\nEstatuto: El Capital Social es de $240.000 dividido en dos millones cuatrocientas mil (2.400.000) cuotas de diez centavos de pesos $0,10 valor nominal cada una.\nJorge A. Pérez, Contador Público Nacional.\nL.P. 115.593\n\nSIGNIFICANCIA: En 2016 — cuando Ernesto Damo estaba vivo — Sebastián ya era presidente de la sociedad logística del grupo.' },

  { id:'met-06', title:'Perfil D&B y Cuit Online — Metabolik SA: domicilio Av. Mitre 3659 San Miguel', type:'societario',
    desc:'Registros comerciales públicos confirman la dirección de Metabolik SA en Av. Mitre (ex Balbín) 3659, San Miguel — el mismo predio con el cartel de Daydes.',
    image:'assets/docs/met-06.jpeg',
    content:'DUN & BRADSTREET — Metabolik SA Company Profile\n\nINDUSTRY: General Freight Trucking; Residential Building Construction; Truck Transportation; Transportation and Warehousing\n\nADDRESS: Av MITRE 3659, San Miguel, BUENOS AIRES, 1663, Argentina\n\nCUIT ONLINE (cuitonline.com):\nMETABOLIK SA — CUIT: 30712086390\nPersona Jurídica\nAv. Mitre (actual Dr. Ricardo Balbín) 3659\nLocalidad: San Miguel\nFecha de contrato social: 2011\n\nSIGNIFICANCIA: Todas las fuentes públicas coinciden: Metabolik SA tiene domicilio en Av. Mitre/Balbín 3659 San Miguel — exactamente donde aparece el cartel de DAYDES SA. El bien inmueble NO fue declarado en el inventario sucesorio.' },

  { id:'met-07', title:'Preguntas periciales — Metabolik y el Galpón Balbín', type:'pericia',
    desc:'Interrogatorio propuesto a Sebastián Damo sobre la relación entre Metabolik SA y Daydes SA, y sobre el galpón no declarado.',
    content:'PREGUNTA — SEBASTIÁN DAMO\n\n¿Qué relación tiene Metabolik SA con DAYDES SA?\n¿Cómo se organiza la logística de DAYDES SA? ¿Cuál es la flota y los comprobantes?\n(especialmente el transporte a Paraguay por tierra)\n\n¿Por qué el "galpón" (Av. Papa Francisco 3659, ex Balbín, ex Mitre) tiene un cartel de DAYDES SA, justo al lado del domicilio fiscal de METABOLIK SA?\n\n¿Cómo se puede acceder a los servicios de METABOLIK SA?\n(No hay ningún contacto en internet: ni mail, ni teléfono, nada)\n\nPRUEBAS DISPONIBLES:\n▸ Foto del cartel de DAYDES SA en el galpón (Google Maps / captura directa)\n▸ Boletín oficial: Sebastián Damo como presidente de Metabolik\n▸ D&B y CuitOnline: Metabolik SA en Av. Mitre 3659 San Miguel\n▸ Informe que demuestra que el lugar fue adquirido por DAYDES SA\n▸ En resúmenes contables figuran "EXPORTACIONES" y "LOGÍSTICA"\n\nPREGUNTA ADICIONAL:\n▸ ¿El depósito cuenta con un D.T. (Director Técnico) a cargo?' },
] },

  { id:'deff', lines:['DEFF SA'], cx:103, cy:612, bw:115, bh:52, cat:'inmob',
    info:{ title:'Deff S.A.', role:'Inmobiliaria / Construcción',
      body:'Sociedad del rubro construcción e inmuebles fundada por Domingo Damo y Fernando Huidobro ("Pacho"). Presidente: Marcela Soledad Caregnato. Director suplente: Fernando Huidobro hijo.\n\nPublicación Boletín Oficial Nacional: 26/06/2019. Las mismas personas que dirigen Daydes aparecen aquí: Mariano Costa y Fernando Huidobro hijo.',
      tags:['Inmobiliaria/construcción','Familia Huidobro + Familia Damo','Boletín Oficial 26/06/2019'] },
    docs:[
  { id:'deff-01', title:'Boletín Oficial — DEFF SA: fundación con Domingo Ernesto Damo como Presidente', type:'boletin',
    desc:'Texto del BO con los datos fundacionales de DEFF SA: Domingo Damo presidente, Marcela Caregnato suplente, sede Viamonte 1481 CABA, objeto construcción e inmuebles.',
    image:'assets/docs/deff-01.jpeg',
    content:'DEFF SOCIEDAD ANONIMA — Boletín Oficial\n\nINTEGRANTES FUNDACIONALES:\n▸ PRESIDENTE: Domingo Ernesto DAMO (DNI 8249403, Catriel 545, Bella Vista)\n▸ SUPLENTE: Marcela Soledad CAREGNATO (DNI 25104622, Saraví s/Nº, Barrio La Rinconada, Pilar)\n\nSEDE SOCIAL: Viamonte 1481, 4° piso, Of. B, CABA\n\nOBJETO SOCIAL:\nA. Construcción de todo tipo de obras públicas o privadas, a través de contrataciones directas o licitaciones, para la construcción, refacción y mantenimiento de viviendas, plantas industriales, edificios.\nB. Compra, venta, permuta, alquiler, arrendamiento y administración de propiedades inmuebles, inclusive las comprendidas bajo el Régimen de Propiedad Horizontal.\n\nDURACIÓN: 99 años\nSIGNIFICANCIA: Ernesto Domingo Damo era el presidente original de Deff SA — la sociedad constructora que habría construido los 10 triplex en José C. Paz.' },

  { id:'deff-02', title:'Boletín Oficial Nacional — DEFF SA: Caregnato presidenta + Huidobro director (26/06/2019)', type:'boletin',
    desc:'Publicación oficial post-fallecimiento de Ernesto Damo: Marcela Caregnato asume la presidencia y Fernando Huidobro (hijo de Pacho) queda como director suplente.',
    image:'assets/docs/deff-02.jpeg',
    content:'BOLETÍN OFICIAL DE LA REPÚBLICA ARGENTINA\nFecha de publicación: 26/06/2019\ne. 26/06/2019 N° 45325/19 v. 26/06/2019\n\nDEFF SA — Acta de Asamblea del 30/4/2019\n\nDESIGNA:\n▸ PRESIDENTE: Marcela Soledad CAREGNATO\n▸ DIRECTOR SUPLENTE: Fernando Aldo HUIDOBRO\n▸ Domicilio especial: Viamonte 1481, 4° piso, Dpto. 15, CABA\n\nAutorizado según Acta de Directorio del 02/05/2019\nMonica Lilian Angeli — Habilitada DNRO N°3666\n\nSIGNIFICANCIA: Tras la muerte de Ernesto Damo, la sociedad constructora que habría edificado los triplex queda en manos de Marcela Caregnato (socia de Sebastián en Metabolik) y Fernando Huidobro hijo. Los herederos de Ernesto no tienen participación ni información sobre esta sociedad.' },

  { id:'deff-03', title:'Mail Mariano Costa → Ernesto Damo — Presupuesto Deff SA (12/4/2019)', type:'mail',
    desc:'Mariano Costa (presidente formal de Daydes) envía a Ernesto Damo el presupuesto de Easy para Deff SA — prueba de la conexión operativa entre Daydes y Deff.',
    image:'assets/docs/deff-03.jpeg',
    content:'De: Mariano Costa\nPara: damo@daydes.com.ar\nFecha: 12 de abril de 2019, 16:18\nAsunto: RV: Presupuesto Deff SA\n\nMENSAJE: "Pachuli [apodo de Ernesto]\nEste es el presupuesto para acopiar con Easy, me lo mejoraron un poco mas y quedó en $368.489.\nMariano"\n\nMAIL ORIGINAL (Easy → Mariano Costa):\nDe: Zabala, Miguel (miguel.zabala@easy.com.ar)\nFecha: 12 de abril de 2019, 12:09\nPara: mariano costa\nAsunto: Re: Presupuesto Deff SA\n"Buenos días Mariano, va el presupuesto solicitado."\nMIGUEL ZABALA — Easy Ventas Especiales — Ruta 8 y 197, José C. Paz\n\nSIGNIFICANCIA: Mariano Costa (presidente formal de Daydes, hijastro de Pacho) gestiona compras para Deff SA y las reporta directamente a Ernesto Damo. Confirma que Daydes y Deff operan como una sola unidad bajo el control de Ernesto.' },

  { id:'deff-04', title:'Testimonio — Los 10 triplex de José C. Paz ocultados en la sucesión', type:'testimonio',
    desc:'Durante el velorio, Sebastián confesó que Ernesto y Pacho habían construido 10 triplex, y que 5 correspondían a Liliana. Nunca más se mencionaron.',
    content:'RELATO TESTIMONIAL DIRECTO:\n\nDurante el velorio del señor Damo, Sebastián pidió hablar en el bar de la estación de servicio de la esquina de la cochería.\n\nSebastián comentó que Ernesto junto a su socio "Pacho" habían construido un predio con 10 triplex en la localidad de José C. Paz (a través de Deff SA), y que necesitaría ayuda para algunas cosas (llevar un inodoro a uno de los departamentos, buscar pagos, etc.), dado que Ernesto tenía la intención de que 5 de los triplex "queden" para Liliana Patricia Lago.\n\nEn la PRIMERA REUNIÓN con el Dr. Álvarez Lembeye, estos inmuebles fueron mencionados. Liliana fue persuadida por Sebastián y Lembeye para realizar la sucesión con un solo abogado.\n\nDESDO ESA REUNIÓN EN ADELANTE, NINGUNO DE LOS DOS VOLVIÓ A MENCIONAR ESTOS BIENES.\n\nEN UNA REUNIÓN POSTERIOR se presentaron los chats (carpeta roja) — Matías Lembeye los desestimó.\n\nPRUEBA ADICIONAL: Mariano Costa (hijastro de Pacho y presidente de Daydes) tiene mails que lo conectan directamente con Deff SA con domicilio fiscal en Catriel — se pueden presentar como prueba documental.' },
] },

  { id:'detal', lines:['DETAL PA SA'], cx:243, cy:612, bw:132, bh:52, cat:'core',
    info:{ title:'Detal PA S.A.', role:'95% del sucesorio — bienes valiosos',
      body:'Fundada en 1999 por Sebastián Damo. El sucesorio posee el 95%; Sebastián conserva solo el 5% personal.\n\nPatrimonio neto: $105.987.218,80 (Activo $106.502.418 — Pasivo $515.199)\n\nBienes:\n• 3 terrenos en Villa La Angostura, Neuquén — USD 438.200\n• Inmueble San Lorenzo 1640, San Miguel — USD 175.000\n• Toyota Hilux SW4 AA007OO (2016) — USD 33.000\n\nIRREGULARIDAD CRÍTICA: la perito detectó libros contables llevados en forma ANTEDATADA. Primer asiento: 31/12/2008 pero el libro fue rubricado el 11/06/2010.',
      tags:['95% del sucesorio','Libros antedatados (perita oficial)','Inmuebles en Neuquén'] },
    docs:[] },
];

const EDGES = [
  { id:'e-mun-day', from:'muni', to:'daydes', type:'licitacion', bi:false,
    info:{ title:'Licitaciones coordinadas', subtitle:'Municipalidad → Daydes y satélites',
      body:'Las droguerías del grupo concurrían en forma coordinada a las licitaciones del Ministerio de Salud de San Miguel y Malvinas Argentinas, simulando ser empresas independientes. Todo se controla desde Daydes.\n\nEsto constituye cartelización en licitaciones públicas, violando la Ley de Defensa de la Competencia.',
      sources:['Resumen documental del caso','Análisis de movilidad societaria'] }},
  { id:'e-day-mix', from:'daydes', to:'mix', type:'offshore', bi:true,
    info:{ title:'Triangulación offshore', subtitle:'Daydes ↔ Mix Trading (Paraguay)',
      body:'Mix Trading S.R.L. fue constituida el 08/02/2018 en Paraguay (Escritura N° 21) con Sebastián Damo y Fernando Vinci como únicos socios gerentes. NUNCA fue mencionada en la rendición de cuentas.',
      sources:['Escritura N° 21 — Paraguay — 08/02/2018','Impugnación rendición de cuentas','Resumen global del caso'] }},
  { id:'e-day-print', from:'daydes', to:'print', type:'facturacion', bi:true,
    info:{ title:'Facturación cruzada circular', subtitle:'Daydes ↔ Print Med (y todo el anillo)',
      body:'La perito oficial admitió: "hay facturas cruzadas entre las diferentes droguerías y sociedades". El mecanismo: cada droguería vende al siguiente eslabón del círculo por el mismo monto.\n\nResultado fiscal: ingresos = gastos → utilidad $0 → Ganancias $0 → IVA $0.\n\nLey 24.769 art. 1 (evasión simple) y art. 2 inc. d) (evasión agravada — prisión 3 años 6 meses a 9 años).',
      sources:['Informe pericial Dall\'Occhio','Análisis sobre el peritaje — delitos configurados'] }},
  { id:'e-day-holter', from:'daydes', to:'holter', type:'facturacion', bi:true,
    info:{ title:'Facturación cruzada circular', subtitle:'Daydes ↔ Holter',
      body:'Holter SA integra el circuito de facturación cruzada. Junto con Print Med, Trust Médica y Autonomía Medicinal forma el anillo que permite a cada empresa declarar $0 de utilidad mientras el grupo genera ganancias reales.',
      sources:['Informe pericial Dall\'Occhio','Impugnación rendición de cuentas'] }},
  { id:'e-day-trust', from:'daydes', to:'trust', type:'sucesorio', bi:true,
    info:{ title:'Facturación cruzada + participación sucesoria', subtitle:'Daydes ↔ Trust Médica (36,8% del sucesorio)',
      body:'Trust Médica SA es simultáneamente parte del sucesorio (36,8% de acciones) e integrante del circuito de facturación cruzada. Sebastián Damo, como administrador del sucesorio, vacía una sociedad cuyos activos en gran parte pertenecen a los herederos.',
      sources:['Informe pericial Dall\'Occhio','Impugnación inventario y avalúo — Expte. 26712-2019'] }},
  { id:'e-day-auto', from:'daydes', to:'autonomia', type:'facturacion', bi:true,
    info:{ title:'Facturación cruzada + logo compartido', subtitle:'Daydes ↔ Autonomía Medicinal',
      body:'Autonomía Medicinal SRL integra el circuito de facturación cruzada Y en su sitio web oficial figuraba el LOGO DE DAYDES SA, prueba directa de la unidad empresarial.',
      sources:['Captura de pantalla — logo Daydes en web de Autonomía Medicinal','Testimonio de José María Lago y Nélida González'] }},
  { id:'e-day-met', from:'daydes', to:'metabolik', type:'logistica', bi:false,
    info:{ title:'Logística cautiva', subtitle:'Daydes → Metabolik S.A.',
      body:'Metabolik SA opera como logística EXCLUSIVA del grupo sin clientes externos. Los pagos de las droguerías a Metabolik transfieren fondos fuera del patrimonio auditable.\n\nEl "Galpón Balbín" (Av. Mitre 3659, San Miguel) — depósito de media manzana con flota de camiones — NO declarado en el inventario sucesorio.',
      sources:['Resumen global del caso','Fotografías del Galpón Balbín (Av. Mitre 3659 San Miguel)'] }},
  { id:'e-day-deff', from:'daydes', to:'deff', type:'vinculacion', bi:false,
    info:{ title:'Vinculación societaria', subtitle:'Daydes → Deff S.A.',
      body:'Las mismas personas que controlan Daydes aparecen en Deff SA: Mariano Costa (administración en ambas), Fernando Huidobro hijo (director suplente Deff). Deff SA fue fundada por Domingo Damo y Pacho Huidobro como sociedad inmobiliaria/constructora.',
      sources:['Boletín Oficial Nacional 26/06/2019','Análisis de movilidad societaria'] }},
  { id:'e-day-detal', from:'daydes', to:'detal', type:'control', bi:false,
    info:{ title:'Control + 95% sucesorio', subtitle:'Daydes → Detal PA S.A.',
      body:'El 95% de Detal PA pertenece al sucesorio. Sebastián Damo, como administrador, debe rendir cuentas por esta sociedad.\n\nIRREGULARIDAD CRÍTICA: la perito oficial detectó libros contables ANTEDATADOS (primer asiento 31/12/2008; libro rubricado 11/06/2010).',
      sources:['Informe pericial Dall\'Occhio (libros antedatados)','Impugnación inventario y avalúo','Análisis de movilidad societaria'] }},
];

function getEdgePoint(fromCx,fromCy,toCx,toCy,toBw,toBh){
  const dx=fromCx-toCx,dy=fromCy-toCy;
  if(dx===0&&dy===0)return{x:toCx,y:toCy};
  const hw=toBw/2+8,hh=toBh/2+8;
  const tx=dx!==0?hw/Math.abs(dx):Infinity,ty=dy!==0?hh/Math.abs(dy):Infinity;
  const t=Math.min(tx,ty);
  return{x:toCx+dx*t,y:toCy+dy*t};
}

function NodeBox({node,selected,hovered,onClick,onHover}){
  const c=CAT[node.cat],isActive=selected||hovered;
  const rx=node.cx-node.bw/2,ry=node.cy-node.bh/2;
  const fontSize=node.lines.length>2?11:node.lines.length>1?12:13;
  const hasDocs=node.docs&&node.docs.length>0;
  return(
    <g style={{cursor:'pointer'}} onClick={()=>onClick(node)} onMouseEnter={()=>onHover(node.id)} onMouseLeave={()=>onHover(null)}>
      {isActive&&<rect x={rx-4} y={ry-4} width={node.bw+8} height={node.bh+8} rx={8} fill={c.glow} style={{filter:'blur(8px)'}}/>}
      <rect x={rx} y={ry} width={node.bw} height={node.bh} rx={5}
        fill={isActive?c.fill.replace('0.1','0.22').replace('0.11','0.22').replace('0.12','0.22'):c.fill}
        stroke={c.stroke} strokeWidth={isActive?2:1.5}/>
      {node.lines.map((line,i)=>{
        const totalH=node.lines.length*(fontSize+4),startY=node.cy-totalH/2+fontSize/2+2;
        return(<text key={i} x={node.cx} y={startY+i*(fontSize+4)} textAnchor="middle"
          dominantBaseline="middle" fill={c.text} fontSize={fontSize}
          fontWeight={node.cat==='central'?'700':'600'}
          fontFamily="'Segoe UI',system-ui,sans-serif" letterSpacing="0.04em">{line}</text>);
      })}
      {hasDocs&&(
        <g>
          <circle cx={node.cx+node.bw/2-9} cy={node.cy-node.bh/2+9} r={8} fill={c.stroke} opacity={0.9}/>
          <text x={node.cx+node.bw/2-9} y={node.cy-node.bh/2+10} textAnchor="middle"
            dominantBaseline="middle" fill="#0d1117" fontSize={8} fontWeight="800">{node.docs.length}</text>
        </g>
      )}
    </g>
  );
}

function EdgePath({edge,nodes,selected,hovered,onClick,onHover}){
  const fn=nodes[edge.from],tn=nodes[edge.to],ec=ETYPE[edge.type],isActive=selected||hovered;
  const p1=getEdgePoint(tn.cx,tn.cy,fn.cx,fn.cy,fn.bw,fn.bh);
  const p2=getEdgePoint(fn.cx,fn.cy,tn.cx,tn.cy,tn.bw,tn.bh);
  const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2,dx=p2.x-p1.x,dy=p2.y-p1.y;
  const len=Math.sqrt(dx*dx+dy*dy)||1,curve=18;
  const cpx=mx+(-dy/len)*curve,cpy=my+(dx/len)*curve;
  const pathD=`M ${p1.x} ${p1.y} Q ${cpx} ${cpy} ${p2.x} ${p2.y}`;
  return(
    <g style={{cursor:'pointer'}} onClick={()=>onClick(edge)} onMouseEnter={()=>onHover(edge.id)} onMouseLeave={()=>onHover(null)}>
      <path d={pathD} fill="none" stroke="transparent" strokeWidth={18}/>
      <path d={pathD} fill="none" stroke={ec.color} strokeWidth={isActive?2.5:1.8}
        strokeDasharray={ec.dash} strokeOpacity={isActive?1:0.7}
        markerEnd={`url(#arr-${edge.type})`}
        markerStart={edge.bi?`url(#arrR-${edge.type})`:undefined}/>
      {isActive&&(
        <g>
          <rect x={cpx-70} y={cpy-11} width={140} height={22} rx={4} fill="#0d1117" stroke={ec.color} strokeWidth={1} opacity={0.95}/>
          <text x={cpx} y={cpy+1} textAnchor="middle" dominantBaseline="middle"
            fill={ec.color} fontSize={10} fontFamily="'Segoe UI',sans-serif" fontWeight="600" letterSpacing="0.05em">{ec.label}</text>
        </g>
      )}
    </g>
  );
}

function DocViewer({doc,onClose}){
  const t=DOC_T[doc.type]||DOC_T.legal;
  return(
    <div className="doc-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="doc-modal">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
          <div>
            <span style={{background:t.bg,border:`1px solid ${t.color}`,color:t.color,
              borderRadius:4,padding:'2px 10px',fontSize:10,fontWeight:700,
              letterSpacing:'0.12em',textTransform:'uppercase'}}>{t.icon} {t.label}</span>
            <h2 style={{color:'#e6edf3',fontSize:16,fontWeight:700,marginTop:10,lineHeight:1.3}}>{doc.title}</h2>
            {doc.desc&&<p style={{color:'#8b949e',fontSize:12,marginTop:4}}>{doc.desc}</p>}
          </div>
          <button onClick={onClose} style={{background:'none',border:'1px solid #30363d',cursor:'pointer',
            color:'#6e7681',fontSize:18,padding:'4px 8px',borderRadius:4,marginLeft:16,flexShrink:0}}>×</button>
        </div>
        {doc.image && (
          <div style={{marginBottom:16,borderRadius:6,overflow:'hidden',border:`1px solid ${t.color}30`}}>
            <img src={doc.image} alt={doc.title}
              style={{width:'100%',height:'auto',display:'block',maxHeight:500,objectFit:'contain',background:'#000'}}/>
          </div>
        )}
        {doc.content && (
          <div style={{background:'#0d1117',borderRadius:6,padding:'16px 18px',
            border:`1px solid ${t.color}30`,borderLeft:`3px solid ${t.color}`,
            color:'#cdd5de',fontSize:13,lineHeight:1.85,whiteSpace:'pre-line'}}>{doc.content}</div>
        )}
      </div>
    </div>
  );
}

function InfoPanel({item,onClose,onOpenDoc}){
  if(!item)return null;
  const isNode='docs' in item;
  const data=item.info;
  const c=isNode?CAT[item.cat]:{stroke:ETYPE[item.type].color,text:ETYPE[item.type].color,fill:'rgba(255,255,255,0.05)',badge:'CONEXIÓN'};
  return(
    <div style={{background:'#161b22',border:`1px solid ${c.stroke}`,borderRadius:8,
      padding:'20px 24px',marginTop:16,position:'relative',animation:'fadeIn 0.18s ease'}}>
      <button onClick={onClose} style={{position:'absolute',top:12,right:14,
        background:'none',border:'none',cursor:'pointer',color:'#6e7681',fontSize:20,lineHeight:1,padding:'0 4px'}}>×</button>
      <div style={{marginBottom:8}}>
        <span style={{background:isNode?(c.fill||'rgba(255,255,255,0.05)'):'rgba(255,255,255,0.05)',
          border:`1px solid ${c.stroke}`,color:c.stroke,borderRadius:4,padding:'2px 10px',
          fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase'}}>{isNode?c.badge:'CONEXIÓN'}</span>
      </div>
      <h2 style={{color:'#e6edf3',fontSize:18,fontWeight:700,marginBottom:4}}>{data.title}</h2>
      {data.subtitle&&<div style={{color:'#8b949e',fontSize:13,marginBottom:12}}>{data.subtitle}</div>}
      {isNode&&data.role&&<div style={{color:c.text,fontSize:12,fontWeight:600,letterSpacing:'0.04em',marginBottom:12}}>{data.role}</div>}
      <div style={{color:'#cdd5de',fontSize:14,lineHeight:1.75,whiteSpace:'pre-line',marginBottom:16,
        borderLeft:`3px solid ${c.stroke}`,paddingLeft:14}}>{data.body}</div>
      {data.tags&&(
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
          {data.tags.map(t=>(
            <span key={t} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',
              color:'#8b949e',borderRadius:4,padding:'3px 10px',fontSize:11}}>{t}</span>
          ))}
        </div>
      )}
      {data.sources&&(
        <div style={{marginBottom:isNode&&item.docs&&item.docs.length?14:0}}>
          <div style={{color:'#6e7681',fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:6}}>Fuentes de prueba</div>
          {data.sources.map((s,i)=>(
            <div key={i} style={{color:'#8b949e',fontSize:12,display:'flex',alignItems:'flex-start',gap:6,marginBottom:3}}>
              <span style={{color:'#3dbf92',marginTop:2}}>▸</span><span>{s}</span>
            </div>
          ))}
        </div>
      )}
      {isNode&&item.docs&&item.docs.length>0&&(
        <div style={{marginTop:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,borderTop:'1px solid #21262d',paddingTop:14}}>
            <span style={{color:'#6e7681',fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Documentos adjuntos</span>
            <span style={{background:'rgba(77,157,224,0.15)',border:'1px solid #4d9de0',
              color:'#4d9de0',borderRadius:10,padding:'1px 8px',fontSize:10,fontWeight:700}}>{item.docs.length}</span>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {item.docs.map(doc=>{
              const dt=DOC_T[doc.type]||DOC_T.legal;
              return(
                <div key={doc.id} onClick={()=>onOpenDoc(doc)}
                  style={{background:'#0d1117',border:`1px solid ${dt.color}40`,borderLeft:`3px solid ${dt.color}`,
                    borderRadius:6,padding:'10px 14px',cursor:'pointer',display:'flex',alignItems:'flex-start',gap:12,transition:'background 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#1c2128'}
                  onMouseLeave={e=>e.currentTarget.style.background='#0d1117'}>
                  <span style={{fontSize:18,flexShrink:0,marginTop:1}}>{dt.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                      <span style={{background:dt.bg,border:`1px solid ${dt.color}`,color:dt.color,
                        borderRadius:3,padding:'1px 7px',fontSize:9,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>{dt.label}</span>
                    </div>
                    <div style={{color:'#e6edf3',fontSize:13,fontWeight:600,lineHeight:1.3,marginBottom:3}}>{doc.title}</div>
                    {doc.desc&&<div style={{color:'#6e7681',fontSize:11,lineHeight:1.4}}>{doc.desc}</div>}
                  </div>
                  <span style={{color:'#30363d',fontSize:16,flexShrink:0,alignSelf:'center'}}>›</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isNode&&item.docs&&item.docs.length===0&&(
        <div style={{marginTop:14,borderTop:'1px solid #21262d',paddingTop:12}}>
          <div style={{color:'#30363d',fontSize:12,textAlign:'center',padding:'8px 0',fontStyle:'italic'}}>
            Sin documentos adjuntos — subí un archivo con prefijo <strong style={{color:'#484f58'}}>{item.id.toUpperCase()}</strong> para agregarlo aquí
          </div>
        </div>
      )}
    </div>
  );
}

function App(){
  const [selected,setSelected]=useState(null);
  const [hovered,setHovered]=useState(null);
  const [activeDoc,setActiveDoc]=useState(null);
  const nodesMap={};
  NODES.forEach(n=>{nodesMap[n.id]=n;});
  const handleNodeClick=useCallback((node)=>{setSelected(prev=>prev&&prev.id===node.id?null:node);},[]);
  const handleEdgeClick=useCallback((edge)=>{setSelected(prev=>prev&&prev.id===edge.id?null:edge);},[]);
  const handleHover=useCallback((id)=>setHovered(id),[]);
  const MARKER_TYPES=Object.keys(ETYPE);
  const legendItems=[
    {color:'#C9971C',dash:'none',label:'Licitaciones públicas'},
    {color:'#b48ef5',dash:'8 4',label:'Triangulación offshore'},
    {color:'#e05252',dash:'6 3',label:'Facturación cruzada'},
    {color:'#4d9de0',dash:'none',label:'Participación sucesoria'},
    {color:'#6bcb5f',dash:'none',label:'Logística cautiva'},
    {color:'#7f8c8d',dash:'4 3',label:'Vinculación societaria'},
  ];
  return(
    <div style={{maxWidth:960,margin:'0 auto',padding:'24px 16px'}}>
      <div style={{marginBottom:20,borderBottom:'1px solid #21262d',paddingBottom:16}}>
        <div style={{color:'#e05252',fontSize:10,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:6}}>
          Expediente 26712-2019 · SI-6167-2025 — Juzgado Civil y Comercial N° 6, San Isidro
        </div>
        <h1 style={{color:'#e6edf3',fontSize:24,fontWeight:700,lineHeight:1.2,marginBottom:4}}>
          Mapa del entramado societario — Familia Damo
        </h1>
        <div style={{color:'#8b949e',fontSize:13}}>
          Hacé clic en cualquier <strong style={{color:'#e6edf3'}}>sociedad</strong> para ver su información y documentos adjuntos · Hacé clic en una <strong style={{color:'#e6edf3'}}>flecha</strong> para ver las pruebas de esa conexión
        </div>
      </div>
      <div style={{background:'#0d1117',border:'1px solid #21262d',borderRadius:8,overflow:'hidden'}}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:'auto',display:'block'}}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </pattern>
            {MARKER_TYPES.map(type=>{
              const col=ETYPE[type].color;
              return(<React.Fragment key={type}>
                <marker id={`arr-${type}`} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill={col}/>
                </marker>
                <marker id={`arrR-${type}`} markerWidth="8" markerHeight="8" refX="1" refY="3" orient="auto-start-reverse">
                  <path d="M0,0 L0,6 L8,3 z" fill={col}/>
                </marker>
              </React.Fragment>);
            })}
          </defs>
          <rect width={W} height={H} fill="url(#grid)"/>
          <text x={W/2} y={H-14} textAnchor="middle" fill="rgba(255,255,255,0.06)"
            fontSize={13} fontFamily="'Segoe UI',sans-serif" letterSpacing="0.08em">
            CASO DAMO — SUCESIÓN TESTAMENTARIA 26712-2019
          </text>
          {EDGES.map(edge=>(
            <EdgePath key={edge.id} edge={edge} nodes={nodesMap}
              selected={selected&&selected.id===edge.id}
              hovered={hovered===edge.id} onClick={handleEdgeClick} onHover={handleHover}/>
          ))}
          {NODES.map(node=>(
            <NodeBox key={node.id} node={node}
              selected={selected&&selected.id===node.id}
              hovered={hovered===node.id} onClick={handleNodeClick} onHover={handleHover}/>
          ))}
        </svg>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:'10px 20px',
        marginTop:12,marginBottom:4,padding:'10px 16px',
        background:'#161b22',borderRadius:6,border:'1px solid #21262d'}}>
        {legendItems.map(l=>(
          <div key={l.label} style={{display:'flex',alignItems:'center',gap:7}}>
            <svg width="28" height="10">
              <line x1="0" y1="5" x2="28" y2="5" stroke={l.color} strokeWidth="2"
                strokeDasharray={l.dash==='none'?undefined:l.dash}/>
            </svg>
            <span style={{color:'#8b949e',fontSize:11}}>{l.label}</span>
          </div>
        ))}
        <div style={{display:'flex',alignItems:'center',gap:7}}>
          <div style={{width:10,height:10,border:'1px solid #e05252',borderRadius:2,background:'rgba(224,82,82,0.12)'}}/>
          <span style={{color:'#8b949e',fontSize:11}}>Droguería central (sucesorio)</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:7}}>
          <div style={{width:10,height:10,border:'1px solid #4d9de0',borderRadius:2,background:'rgba(77,157,224,0.11)'}}/>
          <span style={{color:'#8b949e',fontSize:11}}>Sociedad sucesoria</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:7}}>
          <div style={{width:14,height:14,borderRadius:'50%',background:'#4d9de0',
            display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'#0d1117',fontSize:8,fontWeight:800}}>N</span>
          </div>
          <span style={{color:'#8b949e',fontSize:11}}>Documentos adjuntos al nodo</span>
        </div>
      </div>
      {selected&&<InfoPanel item={selected} onClose={()=>setSelected(null)} onOpenDoc={doc=>setActiveDoc(doc)}/>}
      {!selected&&(
        <div style={{textAlign:'center',color:'#484f58',fontSize:13,marginTop:16}}>
          Seleccioná una sociedad o una conexión para ver los detalles y las pruebas
        </div>
      )}
      {activeDoc&&<DocViewer doc={activeDoc} onClose={()=>setActiveDoc(null)}/>}
    </div>
  );
}

const root=ReactDOM.createRoot(document.getElementById('mapa-app-root'));
root.render(<App/>);


