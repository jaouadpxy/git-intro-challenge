document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedDestinations();
    loadWeeklyDeals();
    setupStatCounterAnimation();
    setupCategoryFilter();
    loadTrendingNow();
});

async function loadTrendingNow() {
    try {
        const response = await fetch('data/trending.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const trending = await response.json();
        const carousel = document.getElementById('trending-carousel');

        trending.forEach(item => {
            const card = document.createElement('div');
            // Reusing destination-card styles for consistency
            card.className = 'destination-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <a href="/explore/${item.slug}" class="card-cta">Explore →</a>
                </div>
            `;
            carousel.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load trending destinations:', error);
        const carousel = document.getElementById('trending-carousel');
        carousel.innerHTML = '<p>Could not load trending destinations. Please try again later.</p>';
    }
}

function setupCategoryFilter() {
    const filters = document.querySelectorAll('#category-filters .chip');
    const cards = document.querySelectorAll('#category-grid .category-card');

    if (!filters.length || !cards.length) return;

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            document.querySelector('#category-filters .chip.active').classList.remove('active');
            filter.classList.add('active');

            const category = filter.getAttribute('data-category');

            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function setupStatCounterAnimation() {
    const trustSection = document.querySelector('.trust-section');
    if (!trustSection) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    observer.observe(trustSection);
}

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const stepTime = 20; // update every 20ms
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            counter.innerText = formatNumber(target);
        } else {
            counter.innerText = formatNumber(Math.ceil(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k+';
    }
    return num.toString();
}


async function loadWeeklyDeals() {
    try {
        const response = await fetch('data/weeklyDeals.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const deals = await response.json();
        const carousel = document.getElementById('deals-carousel');

        deals.forEach(deal => {
            const card = document.createElement('div');
            card.className = 'deal-card';
            card.innerHTML = `
                <div class="deal-card-image">
                    <img src="${deal.image}" alt="${deal.title}" loading="lazy">
                    <span class="discount-badge">${deal.discount}</span>
                </div>
                <div class="deal-card-content">
                    <h3>${deal.title}</h3>
                    <p>From <span>$${deal.priceFrom}</span></p>
                    <a href="${deal.affiliateUrl}" class="cta-button" rel="sponsored noopener" target="_blank">Book Now</a>
                </div>
            `;
            carousel.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load weekly deals:', error);
        const carousel = document.getElementById('deals-carousel');
        carousel.innerHTML = '<p>Could not load weekly deals. Please try again later.</p>';
    }
}

async function loadFeaturedDestinations() {
    try {
        const response = await fetch('data/featuredDestinations.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const destinations = await response.json();
        const grid = document.getElementById('destination-grid');

        destinations.forEach(destination => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                    ${destination.badge ? `<span class="badge">${destination.badge}</span>` : ''}
                </div>
                <div class="card-content">
                    <h3>${destination.name}</h3>
                    <div class="rating">
                        <span>${'★'.repeat(Math.round(destination.rating))}${'☆'.repeat(5 - Math.round(destination.rating))}</span>
                        <span>${destination.rating.toFixed(1)}</span>
                        <span>(${destination.reviews} reviews)</span>
                    </div>
                    <p>${destination.teaser}</p>
                    <a href="/explore/${destination.slug}" class="card-cta">Explore Destination →</a>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load featured destinations:', error);
        const grid = document.getElementById('destination-grid');
        grid.innerHTML = '<p>Could not load featured destinations. Please try again later.</p>';
    }
}
