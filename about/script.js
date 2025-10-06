 // Loader fade-out
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader-wrapper');
            setTimeout(() => loader.classList.add('hidden'), 700);
        });

        // Mobile menu toggle
        const openBtn = document.getElementById('mobile-menu-button');
        const closeBtn = document.getElementById('mobile-menu-close');
        const menu = document.getElementById('mobile-menu');

        openBtn.addEventListener('click', () => menu.classList.remove('hidden'));
        closeBtn.addEventListener('click', () => menu.classList.add('hidden'));