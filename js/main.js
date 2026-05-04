// 1. DADOS DOS PROJETOS
const projetos = [
    {
        id: "doc-urbano",
        titulo: "Documentário Urbano",
        categoria: "Edição de vídeo",
        ferramentas: "Premiere Pro, DaVinci Resolve",
        desc_curta: "Edição imersiva e dinâmica para documentário focado na cultura das ruas.",
        destaque: true,
        ativo: true,
        formato: "horizontal",
        thumb: "./edicao-video/horizontal/documentario-urbano/assets/thumb.jpg",
        link: "./edicao-video/horizontal/documentario-urbano/index.html"
    },
    {
        id: "check-in-pet",
        titulo: "O check-in com pet pode dar errado",
        categoria: "Edição de vídeo",
        ferramentas: "Premiere Pro, Illustrator, After Effects",
        desc_curta: "Projeto explorando estética clean e objetiva, priorizando composições minimalistas.",
        destaque: false,
        ativo: true,
        formato: "horizontal",
        thumb: "./assets/img/check-in-o-que-fazer.jpg",
        link: "./edicao-video/horizontal/check-in-pet/index.html"
    },
    {
        id: "quarentena-pets",
        titulo: "Quarentena de Pets",
        categoria: "Edição de vídeo",
        ferramentas: "Premiere, After Effects, Illustrator",
        desc_curta: "Projeto focado em clareza informativa e design funcional com animação visual direta.",
        destaque: false,
        ativo: true,
        formato: "vertical",
        thumb: "./assets/img/R_QUARENTENA.png",
        link: "./edicao-video/vertical/reels-dinamico/index.html"
    },
    {
        id: "ensaio-retrato",
        titulo: "Ensaio Retrato",
        categoria: "Fotografia",
        ferramentas: "Lightroom, Photoshop",
        desc_curta: "Ensaio fotográfico focado em iluminação dramática e direção de arte.",
        destaque: false,
        ativo: true,
        formato: "horizontal",
        thumb: "./fotografia/ensaio-retrato/assets/thumb.jpg",
        link: "./fotografia/ensaio-retrato/index.html"
    },
    {
        id: "logo-animada",
        titulo: "Logo Animada",
        categoria: "Motion design",
        ferramentas: "After Effects, Illustrator",
        desc_curta: "Animação de marca focada em fluidez e identidade visual.",
        destaque: false,
        ativo: true,
        formato: "horizontal",
        thumb: "./motion-design/logo-animada/assets/thumb.jpg",
        link: "./motion-design/logo-animada/index.html"
    },
    {
        id: "set-fotografico",
        titulo: "Set Fotográfico",
        categoria: "Montagem de cenário",
        ferramentas: "Direção de arte, Iluminação",
        desc_curta: "Cenografia completa e iluminação para campanha de moda.",
        destaque: false,
        ativo: false, // Oculto conforme solicitado
        formato: "horizontal",
        thumb: "./cenario/set-fotografico/assets/thumb.jpg",
        link: "./cenario/set-fotografico/index.html"
    },
    {
        id: "producao-clip",
        titulo: "Produção de Clip",
        categoria: "Gravação/produção",
        ferramentas: "RED Camera, Premiere Pro",
        desc_curta: "Direção e produção completa de videoclipe musical do zero à master.",
        destaque: false,
        ativo: false, // Oculto conforme solicitado
        formato: "horizontal",
        thumb: "./gravacao/producao-clip/assets/thumb.jpg",
        link: "./gravacao/producao-clip/index.html"
    }
];

// 2. LÓGICA DE INTERFACE
const categories = ["Todos", "Edição de vídeo", "Fotografia", "Motion design"];

const elements = {
    filters: document.getElementById('filters'),
    featured: document.getElementById('featured-container'),
    grid: document.getElementById('grid-container'),
    logo: document.getElementById('logo'),
    yearSpan: document.getElementById('current-year')
};

function init() {
    if (elements.yearSpan) {
        elements.yearSpan.textContent = new Date().getFullYear();
    }

    // Executar lógica apenas se estivermos na Home (onde os contêineres existem)
    if (elements.filters && elements.featured && elements.grid) {
        renderFilters();
        renderProjects('Todos');

        // Navegação pelo Logo
        if (elements.logo) {
            elements.logo.addEventListener('click', () => {
                renderProjects('Todos');
                updateActiveFilter('Todos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
}

function renderFilters() {
    elements.filters.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === 'Todos' ? 'active' : ''}`;
        btn.textContent = cat;
        btn.dataset.cat = cat;

        btn.addEventListener('click', (e) => {
            updateActiveFilter(cat);
            renderProjects(cat);
        });

        elements.filters.appendChild(btn);
    });
}

function updateActiveFilter(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.cat === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function renderProjects(category) {
    elements.featured.innerHTML = '';
    elements.grid.innerHTML = '';

    // Filtrar projetos ativos e pela categoria selecionada
    const ativos = projetos.filter(p => p.ativo);
    const filtered = category === 'Todos' ? ativos : ativos.filter(p => p.categoria === category);

    if (filtered.length === 0) return;

    // Define o Destaque
    const featuredProject = filtered.find(p => p.destaque) || filtered[0];

    // Renderiza Destaque
    const isFeaturedVertical = featuredProject.formato === 'vertical';
    elements.featured.innerHTML = `
        <a href="${featuredProject.link}" class="featured-card ${isFeaturedVertical ? 'vertical' : ''}">
            <div class="featured-thumb">
                <img src="${featuredProject.thumb}" alt="${featuredProject.titulo}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="placeholder-text" style="display: none;">[ Inserir Mídia: ${featuredProject.thumb} ]</div>
            </div>
            <div class="featured-info">
                <span class="badge">${featuredProject.categoria}</span>
                <h3 class="featured-title">${featuredProject.titulo}</h3>
                <p class="featured-desc">${featuredProject.desc_curta}</p>
                <div class="tags">
                    ${featuredProject.ferramentas.split(', ').map(f => `<span class="tag">${f}</span>`).join('')}
                </div>
            </div>
        </a>
    `;

    // Renderiza Grid (os demais)
    const others = filtered.filter(p => p.id !== featuredProject.id);
    others.forEach(p => {
        const tagsList = p.ferramentas.split(', ');
        const tagsToDisplay = tagsList.slice(0, 2);
        const hasMore = tagsList.length > 2;
        const isVertical = p.formato === 'vertical';

        elements.grid.innerHTML += `
            <a href="${p.link}" class="card ${isVertical ? 'card-vertical' : ''}">
                <div class="card-content-wrapper">
                    <div class="card-thumb">
                        <img src="${p.thumb}" alt="${p.titulo}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="placeholder-text" style="display: none;">[ Mídia ${isVertical ? 'Vertical' : 'Horizontal'}: ${p.thumb} ]</div>
                    </div>
                    <div class="card-info">
                        <span class="badge">${p.categoria}</span>
                        <h3 class="card-title">${p.titulo}</h3>
                        <p class="card-desc">${p.desc_curta}</p>
                        <div class="tags">
                            ${tagsToDisplay.map(f => `<span class="tag">${f}</span>`).join('')}
                            ${hasMore ? '<span class="tag">...</span>' : ''}
                        </div>
                    </div>
                </div>
            </a>
        `;
    });
}

// Inicializa o app
document.addEventListener('DOMContentLoaded', init);

// 3. LÓGICA DO SLIDER DE PROJETOS
function initSliders() {
    const sliders = document.querySelectorAll('.project-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const dots = slider.querySelectorAll('.dot');
        let currentSlide = 0;
        
        if (slides.length === 0) return;

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if(dots[currentSlide]) dots[currentSlide].classList.add('active');
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
    });
}

// 4. LÓGICA DO LIGHTBOX (EXPANSÃO DE IMAGENS)
function initLightbox() {
    let lightbox = document.getElementById('lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-btn lightbox-prev">❮</button>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img class="lightbox-img" src="" alt="Imagem Expandida">
            </div>
            <button class="lightbox-btn lightbox-next">❯</button>
        `;
        document.body.appendChild(lightbox);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const lightboxImg = lightbox.querySelector('.lightbox-img');

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        function showLightboxImage(index) {
            const currentImgs = Array.from(document.querySelectorAll('.slide-grid img'));
            if (currentImgs.length === 0) return;
            lightbox.currentIndex = (index + currentImgs.length) % currentImgs.length;
            lightboxImg.src = currentImgs[lightbox.currentIndex].src;
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(lightbox.currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(lightbox.currentIndex + 1);
        });

        lightbox._showImage = showLightboxImage;
        lightbox.currentIndex = 0;
    }

    const imgs = document.querySelectorAll('.slide-grid img');
    imgs.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightbox._showImage(index);
            lightbox.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    initLightbox();
});
