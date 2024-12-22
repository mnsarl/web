document.addEventListener('DOMContentLoaded', function() {
    // تهيئة سلايدر الأفلام باستخدام Swiper
    const movieSlider = document.querySelector('.movie-slider');
    if (movieSlider) {
        const swiper = new Swiper('.movie-slider', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    // وظيفة البحث المباشر
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const movies = document.querySelectorAll('.movie-card');
            
            movies.forEach(movie => {
                const title = movie.querySelector('.movie-title').textContent.toLowerCase();
                movie.style.display = title.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    // تصفية النتائج
    const filters = document.querySelectorAll('.filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            // إضافة وظيفة التصفية
        });
    });

    // نافذة تسجيل الدخول
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('login-modal');
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
    }

    // تحسين وظيفة تحميل المزيد
    const moreBtns = document.querySelectorAll('.more-btn');
    moreBtns.forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            const section = this.closest('.movie-section');
            const page = parseInt(this.dataset.page) || 1;
            
            try {
                const response = await fetch(`/api/movies?page=${page}&category=${section.dataset.category}`);
                const data = await response.json();
                
                if (data.movies.length) {
                    // إضافة الأفلام الجديدة للقسم
                    data.movies.forEach(movie => {
                        section.querySelector('.movie-grid').insertAdjacentHTML('beforeend', `
                            <div class="movie-card">
                                <img src="${movie.poster}" alt="${movie.title}">
                                <h3 class="movie-title">${movie.title}</h3>
                            </div>
                        `);
                    });
                    
                    this.dataset.page = page + 1;
                } else {
                    this.style.display = 'none'; // إخفاء الزر إذا لم تعد هناك أفلام
                }
            } catch (error) {
                console.error('خطأ في تحميل المزيد من الأفلام:', error);
            }
        });
    });
}); 