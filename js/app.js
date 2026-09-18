const PROOFS = {};
PROOFS['ALVAREZ.png'] = 'assets/proofs/ALVAREZ.png';
PROOFS['DEFF_04.png'] = 'assets/proofs/DEFF_04.png';
PROOFS['MARCHISIO.png'] = 'assets/proofs/MARCHISIO.png';
PROOFS['MARIANO_COSTA.png'] = 'assets/proofs/MARIANO_COSTA.png';
PROOFS['MIRTAF2.png'] = 'assets/proofs/MIRTAF2.png';
PROOFS['MIRTAF3.png'] = 'assets/proofs/MIRTAF3.png';
PROOFS['MIRTAF4.png'] = 'assets/proofs/MIRTAF4.png';
PROOFS['MIRTAF5.png'] = 'assets/proofs/MIRTAF5.png';
PROOFS['MIRTAF6.png'] = 'assets/proofs/MIRTAF6.png';
PROOFS['MIRTA_F.png'] = 'assets/proofs/MIRTA_F.png';
PROOFS['SMS.png'] = 'assets/proofs/SMS.png';
PROOFS['daydes01.png'] = 'assets/proofs/daydes01.png';
PROOFS['daydes_nelida.png'] = 'assets/proofs/daydes_nelida.png';
PROOFS['print_med_cuit.png'] = 'assets/proofs/print_med_cuit.png';
PROOFS['susana_di_dante_DT.png'] = 'assets/proofs/susana_di_dante_DT.png';
PROOFS['daydesfoto_grupal_nelida.jpg'] = 'assets/proofs/daydesfoto_grupal_nelida.jpg';
PROOFS['ANSES_LAGO.pdf'] = 'assets/proofs/ANSES_LAGO.pdf';
PROOFS['DEFF_02.pdf'] = 'assets/proofs/DEFF_02.pdf';
PROOFS['DEFF_03.pdf'] = 'assets/proofs/DEFF_03.pdf';
PROOFS['DEFF_06.pdf'] = 'assets/proofs/DEFF_06.pdf';
PROOFS['DEFF_SA_HEIC.pdf'] = 'assets/proofs/DEFF_SA_HEIC.pdf';
PROOFS['daydes_va_solo.pdf'] = 'assets/proofs/daydes_va_solo.pdf';
PROOFS['print_med_1.pdf'] = 'assets/proofs/print_med_1.pdf';

PROOFS['SUSTITUYE_LETRADOS__IMPUGNA_INVENTARIO_Y_AVALUO.pdf'] = 'assets/proofs/SUSTITUYE_LETRADOS__IMPUGNA_INVENTARIO_Y_AVALUO.pdf';
PROOFS['IMPUGNA_RENDICION_DE_CUENTAS.pdf'] = 'assets/proofs/IMPUGNA_RENDICION_DE_CUENTAS.pdf';
PROOFS['LEMBEYE_CONTESTA_TRASLADO.pdf'] = 'assets/proofs/LEMBEYE_CONTESTA_TRASLADO.pdf';
PROOFS['Peritaje_Informe.pdf'] = 'assets/proofs/Peritaje_Informe.pdf';
PROOFS['CAREGNATO.pdf'] = 'assets/proofs/CAREGNATO.pdf';
PROOFS['IMG_5024_HEIC.pdf'] = 'assets/proofs/IMG_5024_HEIC.pdf';
PROOFS['IMG_50281_HEIC.pdf'] = 'assets/proofs/IMG_50281_HEIC.pdf';
PROOFS['IMG_50361_HEIC.pdf'] = 'assets/proofs/IMG_50361_HEIC.pdf';
PROOFS['PERSONAS_INVOLUCRADAS_Y_COMENTARIO_FINAL.pdf'] = 'assets/proofs/PERSONAS_INVOLUCRADAS_Y_COMENTARIO_FINAL.pdf';
PROOFS['resumen_Seguendo_Escrito_Final.pdf'] = 'assets/proofs/resumen_Seguendo_Escrito_Final.pdf';
PROOFS['RESUMEN_GLOBAL_DAMO.pdf'] = 'assets/proofs/RESUMEN_GLOBAL_DAMO.pdf';
PROOFS['resuemen0.pdf'] = 'assets/proofs/resuemen0.pdf';
PROOFS['Estructura_global_del_proyecto_.pdf'] = 'assets/proofs/Estructura_global_del_proyecto_.pdf';
PROOFS['municipalidad_San_Miguel.png'] = 'assets/proofs/municipalidad_San_Miguel.png';

// Inject thumbnails after load
window.addEventListener('load', function() {
  var thumbMap = {
    'th-daydes01': 'daydes01.png',
    'th-daydes_nelida': 'daydes_nelida.png',
    'th-daydesfoto': 'daydesfoto_grupal_nelida.jpg',
    'th-DEFF_04': 'DEFF_04.png',
    'th-MIRTA_F': 'MIRTA_F.png',
    'th-MIRTAF2': 'MIRTAF2.png',
    'th-MIRTAF3': 'MIRTAF3.png',
    'th-MIRTAF4': 'MIRTAF4.png',
    'th-MIRTAF5': 'MIRTAF5.png',
    'th-MIRTAF6': 'MIRTAF6.png',
    'th-MARCHISIO': 'MARCHISIO.png',
    'th-ALVAREZ': 'ALVAREZ.png',
    'th-susana': 'susana_di_dante_DT.png',
    'th-MARIANO_COSTA': 'MARIANO_COSTA.png',
    'th-SMS': 'SMS.png',
    'th-print_med_cuit': 'print_med_cuit.png'
  };
  for(var id in thumbMap) {
    var el = document.getElementById(id);
    if(el && PROOFS[thumbMap[id]]) {
      var img = document.createElement('img');
      img.src = PROOFS[thumbMap[id]];
      el.appendChild(img);
    }
  }
});

var currentFile = null;

function openProof(filename, title) {
  currentFile = filename;
  var content = document.getElementById('modal-content');
  content.innerHTML = '';
  var data = PROOFS[filename];
  if(!data) {
    content.innerHTML = '<div class="no-preview" style="padding:40px;text-align:center;color:var(--text2)">⚠ Archivo no disponible en esta versión.</div>';
    document.getElementById('modal-title').textContent = filename;
    document.getElementById('modal').classList.add('open');
    return;
  }
  document.getElementById('modal-title').textContent = title || filename;
  if(filename.match(/\.pdf$/i)) {
    var iframe = document.createElement('iframe');
    iframe.src = data;
    iframe.style.cssText = 'width:100%;height:72vh;border:none;';
    content.appendChild(iframe);
    var link = document.createElement('div');
    link.style.cssText = 'text-align:right;padding:6px 12px;';
    link.innerHTML = '<a href="'+data+'" target="_blank" style="color:var(--amber);font-family:var(--mono);font-size:10px;text-decoration:none;">↗ Abrir en nueva pestaña</a>';
    content.appendChild(link);
  } else {
    var img = document.createElement('img');
    img.src = data;
    img.style.cssText = 'max-width:100%;max-height:75vh;object-fit:contain;display:block;margin:auto;';
    content.appendChild(img);
  }
  document.getElementById('modal').classList.add('open');
}


function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('modal-content').innerHTML = '';
  currentFile = null;
}

function downloadProof() {
  if(!currentFile || !PROOFS[currentFile]) return;
  var a = document.createElement('a');
  a.href = PROOFS[currentFile];
  a.download = currentFile;
  a.click();
}

document.getElementById('modal').addEventListener('click', function(e) {
  if(e.target === this) closeModal();
});

function filterProofs(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.proof-item').forEach(function(item){
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
}

function showPage(id, el) {
  document.querySelectorAll('.page-section').forEach(function(s){ s.classList.remove('visible'); });
  document.getElementById('page-'+id).classList.add('visible');
  if(el) {
    document.querySelectorAll('nav a').forEach(function(a){ a.classList.remove('active'); });
    document.querySelectorAll('.sidebar-link').forEach(function(a){ a.classList.remove('active'); });
    el.classList.add('active');
  }
}
