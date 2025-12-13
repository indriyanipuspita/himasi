// Function to initialize application logic
function initApp() {
    // Hero Typing Animation
    const heroTitle = document.querySelector('.hero-content-centered h1');
    // Check if already initialized to prevent duplicate loops
    if (heroTitle.dataset.typingInitialized) return;
    heroTitle.dataset.typingInitialized = "true";
    heroTitle.classList.add('typing-cursor');

    const phrases = [
        [
            { text: "Himpunan Mahasiswa ", class: "" },
            { text: "Sistem Informasi", class: "highlight-text" }
        ],
        [
            { text: "Mewujudkan Generasi ", class: "" },
            { text: "Sistem Informasi", class: "highlight-text" },
            { text: " yang Unggul & Berkarakter", class: "" }
        ]
    ];

    let phraseIndex = 0;
    let segmentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;
    let deleteSpeed = 30;
    let pauseEnd = 2000;
    let pauseStart = 500;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            // TYPING
            if (segmentIndex < currentPhrase.length) {
                const currentSegment = currentPhrase[segmentIndex];

                // Add characters
                if (charIndex < currentSegment.text.length) {
                    // Ensure DOM element exists for this segment
                    let currentElement = heroTitle.childNodes[segmentIndex];
                    if (!currentElement) {
                        if (currentSegment.class) {
                            currentElement = document.createElement('span');
                            currentElement.className = currentSegment.class;
                            heroTitle.appendChild(currentElement);
                        } else {
                            currentElement = document.createTextNode('');
                            heroTitle.appendChild(currentElement);
                        }
                    }

                    // Append char
                    currentElement.textContent += currentSegment.text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLoop, typeSpeed);
                } else {
                    // Segment finished, move to next
                    segmentIndex++;
                    charIndex = 0;
                    setTimeout(typeLoop, typeSpeed);
                }
            } else {
                // Phrase finished
                isDeleting = true;
                setTimeout(typeLoop, pauseEnd);
            }
        } else {
            // DELETING
            if (segmentIndex >= 0) {
                let currentElement = heroTitle.childNodes[segmentIndex];
                // Handle case where element might be missing if logic drifted (safeguard)
                if (!currentElement) {
                    segmentIndex--;
                    charIndex = 999; // Reset char index helper
                    setTimeout(typeLoop, deleteSpeed);
                    return;
                }

                if (currentElement.textContent.length > 0) {
                    currentElement.textContent = currentElement.textContent.slice(0, -1);
                    setTimeout(typeLoop, deleteSpeed);
                } else {
                    // Segment empty, remove it and move back
                    heroTitle.removeChild(currentElement);
                    segmentIndex--;
                    // If moving back to a previous segment, we need to ready it for deletion (it's already full)
                    // Actually, we don't need to "set" charIndex because we check textContent.length
                    setTimeout(typeLoop, deleteSpeed);
                }
            } else {
                // Phrase deleted completely
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                segmentIndex = 0;
                charIndex = 0;
                setTimeout(typeLoop, pauseStart);
            }
        }
    }

    // Clean initial content
    heroTitle.innerHTML = "";
    // Start loop
    setTimeout(typeLoop, pauseStart);
    // Team Slider Logic
    const sliders = document.querySelectorAll('.team-slider-wrapper');

    sliders.forEach(wrapper => {
        const slider = wrapper.querySelector('.team-slider');
        const prevBtn = wrapper.querySelector('.prev');
        const nextBtn = wrapper.querySelector('.next');

        if (slider && prevBtn && nextBtn) {
            // Remove old listeners to prevent duplicates if initApp is called multiple times
            const newNext = nextBtn.cloneNode(true);
            const newPrev = prevBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNext, nextBtn);
            prevBtn.parentNode.replaceChild(newPrev, prevBtn);

            newNext.addEventListener('click', () => {
                const cardWidth = slider.querySelector('.team-card').offsetWidth + 30; // 30 is gap
                slider.scrollLeft += cardWidth;
            });

            newPrev.addEventListener('click', () => {
                const cardWidth = slider.querySelector('.team-card').offsetWidth + 30; // 30 is gap
                slider.scrollLeft -= cardWidth;
            });
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    if (mobileMenuBtn && mobileMenu) {
        // Clone to remove old listeners
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);

        // Re-select after replacement
        const activeBtn = document.querySelector('.mobile-menu-btn');

        activeBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = activeBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = activeBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            // Clone to remove old listeners
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);

            // Note: We need to re-find the item wrapper context or use closures carefully.
            // Actually, simplest way for re-init safe code is to not clone but check if listener attached? 
            // Or just assume initApp runs once per page load for now.
            // Given the complexity of cloning everything properly, 
            // and that this is a simple page, I'll stick to basic addEventListener.
            // If initApp is called multiple times, we might have duplicate listeners. 
            // Let's rely on the fact that we call initApp ONCE after all sections load.

            // Reverting cloning logic for simplicity, assuming single init.
            // But wait, I already started writing replacement content. I must complete it.
            // I'll stick to the original logic wrapped in function, but I'll skip the cloning complexity for now 
            // assuming we only call initApp once.
        }
    });

    // Re-implementing original logic cleanly

    // Mobile Menu (Clean)
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.onclick = () => { // use onclick to override previous
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        };
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // FAQs
    const faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(item => {
        const h = item.querySelector('.faq-header');
        if (h) {
            h.onclick = () => {
                faqs.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const b = otherItem.querySelector('.faq-body');
                        if (b) b.style.display = 'none';
                        const i = otherItem.querySelector('.faq-icon i');
                        if (i) {
                            i.classList.remove('fa-minus');
                            i.classList.add('fa-plus');
                        }
                    }
                });

                item.classList.toggle('active');
                const body = item.querySelector('.faq-body');
                const icon = item.querySelector('.faq-icon i');

                if (item.classList.contains('active')) {
                    if (body) body.style.display = 'block';
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    if (body) body.style.display = 'none';
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            }
        }
    });

    // Proker Content Data
    const prokerData = {
        'proker1': {
            title: 'Belajar Bersama (Study Club)',
            desc: 'Kegiatan rutin untuk membahas materi perkuliahan dan belajar teknologi baru bersama-sama. Dipandu oleh mentor dari mahasiswa senior atau alumni.',
            label: 'Akademik & Keilmuan',
            img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'proker2': {
            title: 'Webinar Teknologi',
            desc: 'Seminar online menghadirkan pembicara ahli di bidang IT untuk berbagi wawasan tren teknologi terkini.',
            label: 'Media & Publikasi',
            img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'proker3': {
            title: 'Latihan Kepemimpinan',
            desc: 'Program pelatihan untuk membentuk jiwa kepemimpinan dan manajerial organisasi bagi anggota baru.',
            label: 'PSDM',
            img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        'proker4': {
            title: 'HIMASI Cup',
            desc: 'Ajang kompetisi olahraga antar mahasiswa untuk mempererat tali persaudaraan dan sportivitas.',
            label: 'Olahraga',
            img: 'https://images.unsplash.com/photo-1461988320302-9882ac82481c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    };

    // Proker Tabs Logic
    const prokerItems = document.querySelectorAll('.program-item');
    const prokerTitle = document.getElementById('proker-title');
    const prokerDesc = document.getElementById('proker-desc');
    const prokerLabel = document.getElementById('proker-label');
    const prokerImg = document.getElementById('proker-img');

    if (prokerItems.length > 0 && prokerTitle) {
        prokerItems.forEach(item => {
            item.onclick = () => {
                // Remove active class from all
                prokerItems.forEach(i => i.classList.remove('active'));
                // Add active to clicked
                item.classList.add('active');

                // Update Content
                const target = item.getAttribute('data-target');
                const data = prokerData[target];

                if (data) {
                    // Simple fade effect
                    prokerTitle.style.opacity = 0;
                    prokerDesc.style.opacity = 0;

                    setTimeout(() => {
                        prokerTitle.textContent = data.title;
                        prokerDesc.textContent = data.desc;
                        if (prokerLabel) prokerLabel.textContent = data.label;
                        if (prokerImg) prokerImg.src = data.img;

                        prokerTitle.style.opacity = 1;
                        prokerDesc.style.opacity = 1;
                    }, 200);
                }
            };
        });
    }


    // Dark Mode Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const body = document.body;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn) {
        // Clone to replace any potential old listeners
        const newToggleBtn = themeToggleBtn.cloneNode(true);
        themeToggleBtn.parentNode.replaceChild(newToggleBtn, themeToggleBtn);

        // Use the new reference
        const activeToggleBtn = document.getElementById('theme-toggle');
        const activeIcon = activeToggleBtn.querySelector('i');

        activeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (activeIcon) {
                    activeIcon.classList.remove('fa-moon');
                    activeIcon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (activeIcon) {
                    activeIcon.classList.remove('fa-sun');
                    activeIcon.classList.add('fa-moon');
                }
            }
        });
    }
}

// Auto-run on normal pages, wait on dynamic pages
if (!window.HAS_COMPONENT_LOADER) {
    document.addEventListener('DOMContentLoaded', initApp);
}
