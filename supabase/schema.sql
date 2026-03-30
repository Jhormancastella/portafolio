-- =============================================
-- PORTFOLIO SCHEMA - Supabase
-- =============================================

-- Tabla: perfil personal
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  subtitle_es TEXT,
  subtitle_en TEXT,
  title_es TEXT,
  title_en TEXT,
  description_es TEXT,
  description_en TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  logo_text TEXT,
  footer_subtitle_es TEXT,
  footer_subtitle_en TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: imágenes del carrusel hero
CREATE TABLE hero_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: habilidades (carrusel 3D)
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,  -- clase de Font Awesome, ej: "fab fa-html5"
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: proyectos
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  image_url TEXT,
  image_alt TEXT,
  tags TEXT[],                -- ej: ["PC", "Próximamente en Móviles"]
  btn_clone_url TEXT,
  btn_visit_url TEXT,
  btn_download_id TEXT,       -- key para el objeto downloadLinks en JS
  btn_download_url TEXT,
  btn_source_url TEXT,
  btn_play_url TEXT,
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: textos "sobre mí"
CREATE TABLE about_texts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_es TEXT NOT NULL,
  content_en TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_texts ENABLE ROW LEVEL SECURITY;

-- Lectura pública (portafolio visible para todos)
CREATE POLICY "public read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "public read hero_images" ON hero_images FOR SELECT USING (true);
CREATE POLICY "public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "public read about_texts" ON about_texts FOR SELECT USING (true);

-- Escritura solo con service_role (desde el admin usaremos la anon key
-- pero con un header personalizado, o simplemente desactivamos RLS para writes
-- y protegemos el admin con Firebase Auth en el frontend)
-- OPCIÓN SIMPLE: permitir writes a cualquier usuario autenticado via anon key
-- (la protección real la hace Firebase Auth en el frontend)
CREATE POLICY "admin write profile" ON profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write hero_images" ON hero_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write skills" ON skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "admin write about_texts" ON about_texts FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- DATOS INICIALES (seed con tu info actual)
-- =============================================

INSERT INTO profile (
  name_es, name_en,
  subtitle_es, subtitle_en,
  title_es, title_en,
  description_es, description_en,
  github_url, linkedin_url, email,
  logo_text,
  footer_subtitle_es, footer_subtitle_en
) VALUES (
  'Jhorman Jesus Castellanos Morales', 'Jhorman Jesus Castellanos Morales',
  'Desarrollador, Fotógrafo, Técnico en Sistemas', 'Developer, Photographer, Systems Technician',
  'Freelance', 'Freelance',
  'Desarrollador Web junior, estoy en constante aprendizaje para fortalecer conocimientos y experiencias.',
  'Junior web developer, I am constantly learning to strengthen my knowledge and experience.',
  'https://github.com/Jhormancastella',
  'https://www.linkedin.com/in/jhorman-jesus-castellanos-morales-245b97261',
  'jesusjhorman@gmail.com',
  'Jhorman Castellanos',
  'Desarrollador Web | Fotógrafo | Técnico en Sistemas',
  'Web Developer | Photographer | Systems Technician'
);

INSERT INTO hero_images (url, alt_text, sort_order) VALUES
  ('https://res.cloudinary.com/dipv76dpn/image/upload/v1757879345/Rosy/ke5zgcojsf2jwr8pgrva.jpg', 'Jhorman Castellanos', 1),
  ('https://itechlc.com/wp-content/uploads/2022/11/istockphoto-1367675043-612x612-1.jpg', 'Desarrollo Web', 2),
  ('https://images.unsplash.com/photo-1613235577937-9ac3eed992fc?fm=jpg&q=60&w=3000', 'Fotografía', 3),
  ('https://catnessgames.com/wp-content/uploads/2024/12/tipos-videojuegos-consolas-y-plataformas.jpg', 'Videojuegos', 4),
  ('https://res.cloudinary.com/dipv76dpn/image/upload/v1757879378/Rosy/mea9yccx3mwf78mwqocs.png', 'Sistemas', 5),
  ('https://www.campustraining.es/wp-content/uploads/2024/08/lenguaje-C.jpg.webp', 'Programación', 6);

INSERT INTO skills (name, icon, sort_order) VALUES
  ('HTML', 'fab fa-html5', 1),
  ('JS', 'fab fa-js', 2),
  ('CSS', 'fab fa-css3-alt', 3),
  ('Python', 'fab fa-python', 4),
  ('PHP', 'fab fa-php', 5),
  ('Java', 'fab fa-java', 6),
  ('Spring Boot', 'fas fa-leaf', 7),
  ('MySQL', 'fas fa-database', 8),
  ('PostgreSQL', 'fas fa-database', 9),
  ('Photoshop', 'fas fa-paint-brush', 10),
  ('Blender', 'fas fa-cube', 11),
  ('AWS', 'fab fa-aws', 12);

INSERT INTO about_texts (content_es, content_en, sort_order) VALUES
  ('Soy Jhorman Jesus Castellanos Morales, un desarrollador web junior apasionado por la tecnología y la fotografía.',
   'I am Jhorman Jesus Castellanos Morales, a junior web developer passionate about technology and photography.', 1),
  ('Como técnico en sistemas, tengo una sólida base en el funcionamiento de hardware y software.',
   'As a systems technician, I have a solid foundation in hardware and software functionality.', 2),
  ('Mi objetivo es seguir creciendo profesionalmente, aprendiendo nuevas tecnologías y metodologías que me permitan crear soluciones innovadoras y eficientes.',
   'My goal is to continue growing professionally, learning new technologies and methodologies that allow me to create innovative and efficient solutions.', 3),
  ('Estoy abierto a colaboraciones y nuevos proyectos que me permitan expandir mis habilidades y aportar valor con mi experiencia técnica y creativa.',
   'I am open to collaborations and new projects that allow me to expand my skills and bring value with my technical and creative experience.', 4);

INSERT INTO projects (title_es, title_en, description_es, description_en, image_url, image_alt, btn_clone_url, btn_visit_url, sort_order) VALUES
  (
    'MarcaLibros Personalizados', 'Personalized Bookmarks',
    'Aplicación web interactiva que permite crear separadores de libros personalizados. Los usuarios pueden cargar sus propias imágenes, recortarlas y descargar el resultado en múltiples formatos.',
    'Interactive web application that allows users to create personalized bookmarks. Users can upload their own images, crop them, and download the result in multiple formats.',
    'https://res.cloudinary.com/dipv76dpn/image/upload/v1759597977/undefined_Quiero_una_mezcla_de_d4pb5v.png',
    'MarcaLibros Personalizados',
    'https://github.com/Jhormancastella/MarcaLibros-Free',
    'https://jhormancastella.github.io/MarcaLibros-Free/',
    1
  ),
  (
    'Lista de Tareas', 'To-Do List',
    'Aplicación web para gestionar tareas diarias, permitiendo crear, editar, marcar como completadas y eliminar tareas de manera intuitiva.',
    'Web application to manage daily tasks, allowing users to create, edit, mark as complete, and delete tasks intuitively.',
    'https://phoenixnap.com/glossary/wp-content/uploads/2024/06/what-is-java.jpg',
    'Lista de Tareas',
    'https://github.com/Jhormancastella/ListaDeTareas',
    'https://github.com/Jhormancastella/ListaDeTareas',
    2
  ),
  (
    'Fotografía Profesional', 'Professional Photography',
    'Servicios de fotografía profesional para eventos, retratos y productos. Capturando momentos especiales con un enfoque artístico y técnico.',
    'Professional photography services for events, portraits, and products. Capturing special moments with an artistic and technical approach.',
    'https://res.cloudinary.com/dipv76dpn/image/upload/v1757801787/fjtfrshjkyxdtuscpkk5.png',
    'Fotografía Profesional',
    NULL,
    'https://jhormancastella.github.io/FotoStudioRosy/',
    3
  ),
  (
    'Fantasma Come Hamburguesas', 'Hamburger Ghost',
    'Videojuego original desarrollado con un estilo retro. Una aventura divertida donde controlas un fantasma hambriento en busca de hamburguesas por la ciudad.',
    'Original video game developed in a retro style. A fun adventure where you control a hungry ghost looking for hamburgers around the city.',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portada%20de%20fantasma%20come%20videojuego.jpg-0Zpq46spXp9ZBJxdlur2WnwyIm84I7.jpeg',
    'Fantasma Come Hamburguesas',
    NULL,
    'https://jhormancastella.github.io/Fantasma_Come_Hamburguesas/',
    4
  );
