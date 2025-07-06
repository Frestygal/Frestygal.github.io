window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.onload = function () {
    const olabgm = new Audio("sounds/break.mp3");
    olabgm.volume = 0.20;
    olabgm.loop = true;

    document.body.addEventListener('click', function playAudio() {
        olabgm.play();
        document.body.removeEventListener('click', playAudio);
    });

    function fadeVolume(audio, targetVolume, duration = 500) {
        const startVolume = audio.volume;
        const steps = 30;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const newVolume = startVolume + (targetVolume - startVolume) * progress;
            audio.volume = Math.max(0, Math.min(1, newVolume));

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            fadeVolume(olabgm, 0.0); // fade out
        } else {
            fadeVolume(olabgm, 0.20); // fade in
        }
    });

    const observer = new MutationObserver(() => {
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            video.addEventListener('play', () => {
                fadeVolume(olabgm, 0.0); // fade out
            });
            video.addEventListener('pause', () => {
                if (!document.hidden) {
                    fadeVolume(olabgm, 0.20); // fade in
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
};


window.addEventListener('DOMContentLoaded', () => {
    // scroll back up
    window.scrollTo(0, 0);

    // title stuff
    const titles = ["ola", "███", "▒▒▒"];
    document.title = titles[0];
    function flashLoop() {
        let flashIndex = 1;
        const flashInterval = setInterval(() => {
            document.title = titles[flashIndex];
            flashIndex = flashIndex === 1 ? 2 : 1;
        }, 20);
        setTimeout(() => {
            clearInterval(flashInterval);
            document.title = titles[0];
            setTimeout(flashLoop, 10000);
        }, 300);
    }
    setTimeout(flashLoop, 10000);

    // shader init
    const canvas = document.querySelector('.glslCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        new GlslCanvas(canvas);
    }

    // splash tilt and click
    const olasplash = document.querySelector('.splash');
    const olatitle = olasplash?.querySelector('h1');
    const olaclavtxt = olasplash?.querySelector('p');
    const olaeverelse = document.querySelector('.evrtelse');
    const olabody = document.body;
    const maxTilt = 15;
    let isHovering = false;

    // define handlers
    const handleMouseEnter = () => { isHovering = true; };
    const handleMouseLeave = () => {
        isHovering = false;
        olasplash.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1) translateX(0) translateY(0)';
    };
    const handleMouseMove = (e) => {
        if (!isHovering) return;
        const { left, top, width, height } = olatitle.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        const nx = x / (width / 2), ny = y / (height / 2);
        const rotY = nx * maxTilt, rotX = -ny * maxTilt;
        olasplash.style.transform = `
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        scale(1.1)
        translateX(${nx * 20}px)
        translateY(${ny * 20}px)
      `;
    };

    // add listeners immediately
    olatitle.addEventListener('mouseenter', handleMouseEnter);
    olatitle.addEventListener('mouseleave', handleMouseLeave);
    olasplash.addEventListener('mousemove', handleMouseMove);

    // click after 1.5s
    setTimeout(() => {
        olasplash.addEventListener('click', () => {
            olasplash.style.transition = "transform 1s ease-in, top .75s ease-out";
            olasplash.style.transform = "scale(0.7)";
            olasplash.style.top = "calc(-76% + 5vh)";
            olasplash.style.position = "absolute";
            olaclavtxt.style.animation = "fadeOut .25s ease-out forwards";
            olaeverelse.style.transition = "top 1s ease-in-out";
            olaeverelse.style.top = "15vh";
            olaeverelse.style.animation = "fadeIn 1s ease-out forwards";
            olabody.style.overflowY = "scroll";

            // fix
            olatitle.removeEventListener('mouseenter', handleMouseEnter);
            olatitle.removeEventListener('mouseleave', handleMouseLeave);
            olasplash.removeEventListener('mousemove', handleMouseMove);
        }, { once: true }); // <== only trigger once
    }, 1500);

    // typing effect
    const olasubtext = "haz click para avanzar...?";
    const olatypetext = document.getElementById("clicktyping");
    let idx = 0;
    olatypetext.textContent = "";

    function olatypesub() {
        if (idx < olasubtext.length) {
            olatypetext.textContent += olasubtext[idx++];
            const current = olatypetext.textContent;
            const delay = current.endsWith("avanzar") ? 3000 : 128;
            setTimeout(olatypesub, delay);
        }
    }
    setTimeout(olatypesub, 3000);

    // wave animation
    document.querySelectorAll('.olawavespan span')
        .forEach((span, i) => span.style.animationDelay = `${i * 0.15}s`);



    const olacrocsfx = new Audio("sounds/croc.mp3");
    const olacroc = document.getElementById("croc");

    olacroc.addEventListener('click', () => {
        olacroc.classList.remove('crocbounce');
        void olacroc.offsetWidth; // Force reflow
        olacroc.classList.add('crocbounce');

        olacrocsfx.volume = 0.20;
        olacrocsfx.play();

        // Remove class after bounce duration
        setTimeout(() => {
            olacroc.classList.remove('crocbounce');
        }, 250);
    });




    // video volume
    const olamuedeo = document.getElementById('muerte');
    olamuedeo.volume = 0.5;
    const olanotitgg = document.getElementById('notitgg');
    olanotitgg.volume = 0.5;

    const galleryItems = [
        { type: "img", src: "images/lovevidogems.jpg", alt: "I LOVE VIDEOGAMES" },
        { type: "img", src: "images/sillly.png", alt: "mis amigos" },
        { type: "img", src: "images/what.jpg", alt: "que" },
        { type: "img", src: "images/wow.jpg", alt: "mi coleccion" },
        { type: "video", src: "https://files.catbox.moe/lb9tae.mp4" },
        { type: "video", src: "https://files.catbox.moe/bcpaa7.mp4" }
    ];

    let currentIndex = 0;

    const galleryContent = document.querySelector('.gallery-content');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const zoomOverlay = document.getElementById('zoomOverlay');
    const zoomInner = document.getElementById('zoomInner');

    function showItem(index) {
        galleryContent.innerHTML = '';

        const item = galleryItems[index];
        if (!item) return;

        if (item.type === "img") {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt || "";
            img.addEventListener('click', () => zoomItem(item));
            galleryContent.appendChild(img);
        } else if (item.type === "video") {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.addEventListener('click', (e) => {
                e.stopPropagation();
                zoomOverlay.classList.add('hidden');
                if (video.paused || video.ended) {
                    video.play();
                } else {
                    video.pause();
                }
            });
            galleryContent.appendChild(video);
        }
    }
    function zoomItem(item) {
        zoomInner.innerHTML = '';

        if (item.type === "img") {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt || "";
            zoomInner.appendChild(img);
        } else if (item.type === "video") {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            zoomInner.appendChild(video);
        }

        zoomOverlay.classList.remove('hidden');
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showItem(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showItem(currentIndex);
    });

    zoomOverlay.addEventListener('click', (e) => {
        if (e.target === zoomOverlay) {
            zoomOverlay.classList.add('hidden');
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            zoomOverlay.classList.add('hidden');
        }
    });

    const videos = document.querySelectorAll('.gallery-content video');
    videos.forEach(video => {
        video.addEventListener('click', (e) => {
            if (zoomOverlay && !zoomOverlay.classList.contains('hidden')) {
                zoomOverlay.classList.add('hidden');
            }
            e.stopPropagation();
        });

        video.addEventListener('dblclick', (e) => {
            e.stopPropagation();
        });
    });

    showItem(currentIndex);

    const sections = [document.getElementById('gustos'), document.getElementById('social')];

    sections.forEach(section => {
        if (section) {
            section.style.display = 'none';
        }
    });

    let crocIndex = 0;
    const crocElement = document.getElementById('croc');

    crocElement.addEventListener('click', () => {

        const currentSection = sections[crocIndex];
        if (currentSection) {
            currentSection.style.display = 'flex';
        }

        crocIndex = (crocIndex + 1) % sections.length;
    });

});
