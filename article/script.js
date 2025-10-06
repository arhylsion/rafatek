document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close');

    // Mengambil data dari localStorage
    function getLocalStorage(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    // Menyimpan data ke localStorage
    function setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    let blogPosts = [
        {
            id: 1,
            title: "Company profile untuk situs website PT. Rafa Teknologi Solusi",
            author: "Admin",
            date: "29 September 2025",
            excerpt: "Menyediakan solusi teknologi terintegrasi untuk mendukung pertumbuhan bisnis Anda dengan inovasi dan keandalan tinggi.",
            link: "#",
            category: "technology",
            tags: ["software", "development", "inovasi"],
            image: "../assets/rafatekbg.jpeg"
        }
    ];

    const likesData = getLocalStorage('blog_likes') || {};
    blogPosts.forEach(post => {
        if (!likesData[post.id]) {
            likesData[post.id] = 0;
        }
        post.likes = likesData[post.id];
    });

    function createBlogPostCard(post) {
        const tagsHtml = post.tags.map(tag => `<span class="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">${tag}</span>`).join('');
        
        const userLikedStatus = getLocalStorage('user_liked_posts') || {};
        const isLiked = userLikedStatus[post.id] === true;

        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 duration-300 reveal group";
        card.setAttribute('data-category', post.category);
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300">
                <div class="absolute top-4 left-4">
                    <span class="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">${post.category}</span>
                </div>
            </div>
            <div class="p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">${post.title}</h2>
                <p class="text-gray-600 text-sm mb-4">Oleh <span class="font-medium">${post.author}</span> pada ${post.date}</p>
                <p class="text-gray-700 mb-4 line-clamp-3">${post.excerpt}</p>
                <div class="flex flex-wrap mb-4">
                    ${tagsHtml}
                </div>
                <div class="flex items-center justify-between">
                    <button class="like-button text-gray-500 hover:text-red-500 transition-colors flex items-center" data-post-id="${post.id}">
                        <i class="fa-solid fa-heart ${isLiked ? 'text-red-500' : ''}"></i>
                        <span class="ml-2">${post.likes}</span>
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    function renderPosts(filteredPosts) {
        postsContainer.innerHTML = '';
        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full">Tidak ada postingan yang sesuai.</p>';
        } else {
            filteredPosts.forEach(post => {
                const postCard = createBlogPostCard(post);
                postsContainer.appendChild(postCard);
            });
            attachLikeButtonListeners();
        }
    }

    function attachLikeButtonListeners() {
        const likeButtons = document.querySelectorAll('.like-button');
        likeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const postId = parseInt(button.getAttribute('data-post-id'));
                const post = blogPosts.find(p => p.id === postId);

                if (post) {
                    const userLikedStatus = getLocalStorage('user_liked_posts') || {};
                    const isLiked = userLikedStatus[postId] === true;

                    if (isLiked) {
                        post.likes--;
                        userLikedStatus[postId] = false;
                    } else {
                        post.likes++;
                        userLikedStatus[postId] = true;
                    }

                    button.querySelector('span').textContent = post.likes;
                    button.querySelector('i').classList.toggle('text-red-500', !isLiked);

                    const likesData = getLocalStorage('blog_likes') || {};
                    likesData[postId] = post.likes;
                    setLocalStorage('blog_likes', likesData);
                    
                    setLocalStorage('user_liked_posts', userLikedStatus);
                }
            });
        });
    }

    function filterAndSearchPosts() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const searchTerm = searchInput.value.toLowerCase();
        
        const filteredPosts = blogPosts.filter(post => {
            const matchesFilter = activeFilter === 'all' || post.category === activeFilter;
            const matchesSearch = post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm) || post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            return matchesFilter && matchesSearch;
        });

        renderPosts(filteredPosts);
    }
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuCloseButton.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    });
    
    // Filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter and render posts
            filterAndSearchPosts();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', filterAndSearchPosts);

    // Scroll animation functionality
    function handleScrollAnimation() {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const revealTop = reveals[i].getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }

    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('load', handleScrollAnimation);

    // Initial rendering
    renderPosts(blogPosts);
});

// Loader fade-out
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader-wrapper');
            setTimeout(() => loader.classList.add('hidden'), 700);
        });