// 1. DADOS DOS PROJETOS
const projetos = [
    {
        id: "doc-urbano",
        titulo: "Documentário Urbano",
        categoria: "Edição de vídeo",
        ferramentas: "Premiere Pro, DaVinci Resolve",
        desc_curta: "Edição imersiva e dinâmica para documentário focado na cultura das ruas.",
        destaque: false,
        ativo: false,
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
        thumb: "./fotografia/ensaio-retrato/assets/img_capa_fotografia_01.png",
        link: "./fotografia/ensaio-retrato/index.html"
    },
    {
        id: "ABA_MOTION_001",
        titulo: "Algumas peças de motions",
        categoria: "Motion design",
        ferramentas: "After Effects, Illustrator",
        desc_curta: "Algumas animações que fiz para colocar em um video do youtube.",
        destaque: true,
        ativo: true,
        formato: "horizontal",
        thumb: "./motion-design/ABA_MOTION_001/assets/ABA-001_MOTION_004.gif",
        link: "./motion-design/ABA_MOTION_001/index.html"
    },
    {
        id: "ABA_FOTOS_002",
        titulo: "Fotos na pista do Analhafranco",
        categoria: "Fotografia",
        ferramentas: "Lightroom, Canon SL2,",
        desc_curta: "Algumas fotografias que fiz durante o dia no analhafranco.",
        destaque: false,
        ativo: true,
        formato: "horizontal",
        thumb: "./fotografia/ABA_FOTOS_002/assets/img_capa_fotografia_01.png",
        link: "./fotografia/ABA_FOTOS_002/index.html"
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
    },
    {
        id: "ABA_MOTION_002",
        titulo: "Efeito elasrtic aplicado",
        categoria: "Motion design",
        ferramentas: "After Effects, Illustrator, Premiere Pro",
        desc_curta: "Algumas animações que fiz para colocar em um video do youtube.",
        destaque: true,
        ativo: true,
        formato: "horizontal",
        thumb: "./motion-design/ABA_MOTION_002/assets/ABA-002_MOTION_001.mp4",
        link: "./motion-design/ABA_MOTION_002/index.html"
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

function isVideoUrl(url) {
    return /\.(mp4|webm|ogg|mov)$/i.test(url || '');
}

function renderMediaPreview(project, mediaClass) {
    const isVideo = isVideoUrl(project.thumb);

    if (isVideo) {
        return `
            <video class="${mediaClass}" autoplay loop muted playsinline preload="metadata" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <source src="${project.thumb}" type="video/mp4">
            </video>
            <div class="placeholder-text" style="display: none;">[ Inserir Mídia: ${project.thumb} ]</div>
        `;
    }

    return `
        <img src="${project.thumb}" alt="${project.titulo}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="placeholder-text" style="display: none;">[ Inserir Mídia: ${project.thumb} ]</div>
    `;
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
                ${renderMediaPreview(featuredProject, 'featured-media')}
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
                        ${renderMediaPreview(p, 'card-media')}
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
        let startX = 0;
        let endX = 0;

        if (slides.length === 0) return;

        function setActiveSlide(index) {
            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === index;
                slide.classList.toggle('active', isActive);
                if (dots[slideIndex]) {
                    dots[slideIndex].classList.toggle('active', isActive);
                }
            });
        }

        function goToSlide(n) {
            currentSlide = (n + slides.length) % slides.length;
            setActiveSlide(currentSlide);
        }

        function handleSwipe() {
            const deltaX = endX - startX;
            if (Math.abs(deltaX) < 50) return;
            if (deltaX < 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
        }

        slider._setActiveSlide = setActiveSlide;
        slider._goToSlide = goToSlide;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        slider.addEventListener('touchstart', (event) => {
            if (event.touches.length === 1) {
                startX = event.touches[0].clientX;
            }
        }, { passive: true });

        slider.addEventListener('touchend', (event) => {
            if (event.changedTouches.length === 0) return;
            endX = event.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
    });
}

// 4. LÓGICA DO LIGHTBOX (EXPANSÃO DE IMAGENS E VÍDEOS)
function initLightbox() {
    let lightbox = document.getElementById('lightbox');

    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-btn lightbox-prev">❮</button>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-media"></div>
            </div>
            <button class="lightbox-btn lightbox-next">❯</button>
        `;
        document.body.appendChild(lightbox);
    }

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const lightboxMedia = lightbox.querySelector('.lightbox-media');

    function stopActiveVideo() {
        const activeVideo = lightboxMedia.querySelector('video');
        if (activeVideo) {
            activeVideo.pause();
            activeVideo.currentTime = 0;
        }
    }

    function getSliderContext(mediaItem) {
        const parentSlider = mediaItem.closest('.project-slider');
        const mediaList = parentSlider
            ? Array.from(parentSlider.querySelectorAll('.slide .slide-grid img, .slide .slide-grid video'))
            : Array.from(document.querySelectorAll('.slide .slide-grid img, .slide .slide-grid video'));
        const parentSlide = mediaItem.closest('.slide');
        const slides = parentSlider ? parentSlider.querySelectorAll('.slide') : document.querySelectorAll('.slide');
        const slideIndex = parentSlide ? Array.from(slides).indexOf(parentSlide) : 0;

        return { mediaList, parentSlider, slideIndex };
    }

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        stopActiveVideo();
    });

    lightbox.addEventListener('click', (e) => {
        const content = lightbox.querySelector('.lightbox-content');
        if (e.target === lightbox || e.target === content || e.target === lightbox.querySelector('.lightbox-media')) {
            lightbox.classList.remove('active');
            stopActiveVideo();
        }
    });

    function showLightboxMedia(index, context) {
        const currentMedia = context?.mediaList || lightbox.currentContext?.mediaList || [];
        if (currentMedia.length === 0) return;

        lightbox.currentContext = context || lightbox.currentContext || { mediaList: currentMedia };
        lightbox.currentIndex = (index + currentMedia.length) % currentMedia.length;
        const media = currentMedia[lightbox.currentIndex];
        const isVideo = media.tagName.toLowerCase() === 'video';

        if (lightbox.currentContext.parentSlider && lightbox.currentContext.parentSlider._setActiveSlide) {
            const mediaSlide = media.closest('.slide');
            const slides = lightbox.currentContext.parentSlider.querySelectorAll('.slide');
            const targetSlideIndex = mediaSlide ? Array.from(slides).indexOf(mediaSlide) : lightbox.currentContext.slideIndex || 0;
            lightbox.currentContext.parentSlider._setActiveSlide(targetSlideIndex);
        }

        lightboxMedia.innerHTML = '';

        if (isVideo) {
            const video = document.createElement('video');
            video.className = 'lightbox-video';
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.controls = false;
            video.poster = media.poster || '';
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('loop', '');
            video.setAttribute('muted', '');
            video.setAttribute('autoplay', '');

            const source = media.querySelector('source');
            if (source) {
                video.src = source.src;
            } else if (media.getAttribute('src')) {
                video.src = media.getAttribute('src');
            }

            lightboxMedia.appendChild(video);
            video.play().catch(() => {});
        } else {
            const img = document.createElement('img');
            img.className = 'lightbox-img';
            img.src = media.src;
            img.alt = media.alt || 'Imagem Expandida';
            lightboxMedia.appendChild(img);
        }

        lightbox.classList.add('active');
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxMedia(lightbox.currentIndex - 1, lightbox.currentContext);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showLightboxMedia(lightbox.currentIndex + 1, lightbox.currentContext);
    });

    lightbox._showMedia = showLightboxMedia;
    lightbox.currentIndex = 0;
    lightbox.currentContext = null;

    const mediaItems = document.querySelectorAll('.slide-grid img, .slide-grid video');
    mediaItems.forEach((media) => {
        media.style.cursor = 'pointer';
        media.addEventListener('click', (e) => {
            e.stopPropagation();
            const context = getSliderContext(media);
            const visibleIndex = context.mediaList.indexOf(media);
            if (visibleIndex !== -1) {
                lightbox._showMedia(visibleIndex, context);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    initLightbox();
});
