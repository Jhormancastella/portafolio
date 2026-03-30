// ===== FIREBASE AUTH + SUPABASE ADMIN =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== AUTH =====
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadAdminData();
  } else {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
  }
});

document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errorEl.textContent = 'Credenciales incorrectas';
    errorEl.style.display = 'block';
  }
});

document.getElementById('logout-btn').addEventListener('click', () => 
  signOut(auth).then(() => window.location.href = 'index.html')
);

// ===== CARGAR DATOS =====
async function loadAdminData() {
  await Promise.all([
    loadProfile(),
    loadHeroImages(),
    loadSkills(),
    loadProjects(),
    loadAboutTexts()
  ]);
}

// ===== PERFIL =====
async function loadProfile() {
  const { data } = await db.from('profile').select('*').single();
  if (!data) return;
  const form = document.getElementById('profile-form');
  Object.keys(data).forEach(key => {
    const el = form.querySelector(`[name="${key}"]`);
    if (el) el.value = data[key] || '';
  });
}

document.getElementById('profile-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const fields = ['name_es','name_en','subtitle_es','subtitle_en','title_es','title_en',
    'description_es','description_en','github_url','linkedin_url','email','logo_text',
    'footer_subtitle_es','footer_subtitle_en'];
  const data = {};
  fields.forEach(f => data[f] = form.querySelector(`[name="${f}"]`)?.value || '');
  data.updated_at = new Date().toISOString();

  const { error } = await db.from('profile').update(data).neq('id', '00000000-0000-0000-0000-000000000000');
  showToast(error ? 'Error al guardar' : 'Perfil guardado', error ? 'error' : 'success');
});

// ===== HERO IMAGES =====
async function loadHeroImages() {
  const { data } = await db.from('hero_images').select('*').order('sort_order');
  renderAdminList('hero-images-list', data, renderHeroImageRow);
}

function renderHeroImageRow(item) {
  return `
    <div class="admin-row" data-id="${item.id}">
      <img src="${item.url}" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:4px">
      <input type="text" value="${item.url}" placeholder="URL de imagen" data-field="url">
      <input type="text" value="${item.alt_text || ''}" placeholder="Texto alternativo" data-field="alt_text">
      <input type="number" value="${item.sort_order}" placeholder="Orden" data-field="sort_order" style="width:70px">
      <label class="toggle-label">
        <input type="checkbox" ${item.active ? 'checked' : ''} data-field="active"> Activo
      </label>
      <button class="btn-save-row" onclick="saveRow('hero_images', '${item.id}', this)">Guardar</button>
      <button class="btn-delete-row" onclick="deleteRow('hero_images', '${item.id}', loadHeroImages)">Eliminar</button>
    </div>`;
}

document.getElementById('add-hero-image').addEventListener('click', async () => {
  await db.from('hero_images').insert({ url: 'https://', alt_text: '', sort_order: 99, active: true });
  loadHeroImages();
});

// ===== SKILLS =====
async function loadSkills() {
  const { data } = await db.from('skills').select('*').order('sort_order');
  renderAdminList('skills-list', data, renderSkillRow);
}

function renderSkillRow(item) {
  return `
    <div class="admin-row" data-id="${item.id}">
      <i class="${item.icon}" style="font-size:1.5rem;color:var(--accent);width:30px;text-align:center"></i>
      <input type="text" value="${item.name}" placeholder="Nombre" data-field="name">
      <input type="text" value="${item.icon}" placeholder="Clase Font Awesome (ej: fab fa-html5)" data-field="icon">
      <input type="number" value="${item.sort_order}" placeholder="Orden" data-field="sort_order" style="width:70px">
      <label class="toggle-label">
        <input type="checkbox" ${item.active ? 'checked' : ''} data-field="active"> Activo
      </label>
      <button class="btn-save-row" onclick="saveRow('skills', '${item.id}', this)">Guardar</button>
      <button class="btn-delete-row" onclick="deleteRow('skills', '${item.id}', loadSkills)">Eliminar</button>
    </div>`;
}

document.getElementById('add-skill').addEventListener('click', async () => {
  await db.from('skills').insert({ name: 'Nueva Habilidad', icon: 'fas fa-code', sort_order: 99, active: true });
  loadSkills();
});

// ===== PROYECTOS =====
async function loadProjects() {
  const { data } = await db.from('projects').select('*').order('sort_order');
  renderAdminList('projects-list', data, renderProjectRow);
}

function renderProjectRow(item) {
  return `
    <div class="admin-card" data-id="${item.id}">
      <div class="admin-card-header">
        <span>${item.title_es}</span>
        <div>
          <button class="btn-save-row" onclick="saveRow('projects', '${item.id}', this)">Guardar</button>
          <button class="btn-delete-row" onclick="deleteRow('projects', '${item.id}', loadProjects)">Eliminar</button>
        </div>
      </div>
      <div class="admin-card-body">
        <div class="form-row">
          <div class="form-group">
            <label>Título ES</label>
            <input type="text" value="${item.title_es || ''}" data-field="title_es">
          </div>
          <div class="form-group">
            <label>Título EN</label>
            <input type="text" value="${item.title_en || ''}" data-field="title_en">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Descripción ES</label>
            <textarea data-field="description_es" rows="3">${item.description_es || ''}</textarea>
          </div>
          <div class="form-group">
            <label>Descripción EN</label>
            <textarea data-field="description_en" rows="3">${item.description_en || ''}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>URL Imagen</label>
            <input type="text" value="${item.image_url || ''}" data-field="image_url">
          </div>
          <div class="form-group">
            <label>Alt Imagen</label>
            <input type="text" value="${item.image_alt || ''}" data-field="image_alt">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>URL Clonar</label>
            <input type="text" value="${item.btn_clone_url || ''}" data-field="btn_clone_url">
          </div>
          <div class="form-group">
            <label>URL Visitar</label>
            <input type="text" value="${item.btn_visit_url || ''}" data-field="btn_visit_url">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>URL Descargar</label>
            <input type="text" value="${item.btn_download_url || ''}" data-field="btn_download_url">
          </div>
          <div class="form-group">
            <label>URL Código Fuente</label>
            <input type="text" value="${item.btn_source_url || ''}" data-field="btn_source_url">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>URL Jugar Web</label>
            <input type="text" value="${item.btn_play_url || ''}" data-field="btn_play_url">
          </div>
          <div class="form-group">
            <label>Tags (separados por coma)</label>
            <input type="text" value="${(item.tags || []).join(', ')}" data-field="tags" data-type="array">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Orden</label>
            <input type="number" value="${item.sort_order || 0}" data-field="sort_order" style="width:100px">
          </div>
          <div class="form-group" style="justify-content:flex-end;align-items:center;display:flex">
            <label class="toggle-label">
              <input type="checkbox" ${item.active ? 'checked' : ''} data-field="active"> Activo
            </label>
          </div>
        </div>
      </div>
    </div>`;
}

document.getElementById('add-project').addEventListener('click', async () => {
  await db.from('projects').insert({
    title_es: 'Nuevo Proyecto', title_en: 'New Project',
    description_es: '', description_en: '',
    sort_order: 99, active: true
  });
  loadProjects();
});

// ===== ABOUT TEXTS =====
async function loadAboutTexts() {
  const { data } = await db.from('about_texts').select('*').order('sort_order');
  renderAdminList('about-list', data, renderAboutRow);
}

function renderAboutRow(item) {
  return `
    <div class="admin-card" data-id="${item.id}">
      <div class="admin-card-header">
        <span>Párrafo #${item.sort_order}</span>
        <div>
          <button class="btn-save-row" onclick="saveRow('about_texts', '${item.id}', this)">Guardar</button>
          <button class="btn-delete-row" onclick="deleteRow('about_texts', '${item.id}', loadAboutTexts)">Eliminar</button>
        </div>
      </div>
      <div class="admin-card-body">
        <div class="form-row">
          <div class="form-group">
            <label>Contenido ES</label>
            <textarea data-field="content_es" rows="3">${item.content_es || ''}</textarea>
          </div>
          <div class="form-group">
            <label>Contenido EN</label>
            <textarea data-field="content_en" rows="3">${item.content_en || ''}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Orden</label>
            <input type="number" value="${item.sort_order || 0}" data-field="sort_order" style="width:100px">
          </div>
          <div class="form-group" style="justify-content:flex-end;align-items:center;display:flex">
            <label class="toggle-label">
              <input type="checkbox" ${item.active ? 'checked' : ''} data-field="active"> Activo
            </label>
          </div>
        </div>
      </div>
    </div>`;
}

document.getElementById('add-about').addEventListener('click', async () => {
  await db.from('about_texts').insert({ content_es: '', content_en: '', sort_order: 99, active: true });
  loadAboutTexts();
});

// ===== HELPERS CRUD =====
function renderAdminList(containerId, data, rowFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = (data || []).map(rowFn).join('');
}

window.saveRow = async function(table, id, btn) {
  const row = btn.closest('[data-id]');
  const data = {};
  row.querySelectorAll('[data-field]').forEach(el => {
    const field = el.dataset.field;
    const type = el.dataset.type;
    if (el.type === 'checkbox') data[field] = el.checked;
    else if (type === 'array') data[field] = el.value.split(',').map(s => s.trim()).filter(Boolean);
    else if (el.type === 'number') data[field] = parseInt(el.value) || 0;
    else data[field] = el.value;
  });
  if (data.updated_at !== undefined) data.updated_at = new Date().toISOString();

  const { error } = await db.from(table).update(data).eq('id', id);
  showToast(error ? 'Error al guardar' : 'Guardado', error ? 'error' : 'success');
};

window.deleteRow = async function(table, id, reloadFn) {
  if (!confirm('¿Eliminar este elemento?')) return;
  const { error } = await db.from(table).delete().eq('id', id);
  if (!error) reloadFn();
  else showToast('Error al eliminar', 'error');
};

// ===== TABS =====
document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.section).classList.add('active');
  });
});

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast toast-${type} visible`;
  setTimeout(() => toast.classList.remove('visible'), 3000);
}
