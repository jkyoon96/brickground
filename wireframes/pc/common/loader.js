/**
 * BrickGround Wireframe - Common Component Loader
 *
 * Usage:
 * 1. Add <div id="header"></div> where you want the header
 * 2. Add <div id="footer"></div> where you want the footer
 * 3. Add <div id="mypage-sidebar"></div> for mypage sidebar
 * 4. Add <div id="admin-sidebar"></div> for admin sidebar
 * 5. Include this script at the end of body
 */

(function() {
    'use strict';

    const BASE_PATH = 'common/';

    // Component configurations
    const components = {
        'header': 'header.html',
        'footer': 'footer.html',
        'mypage-sidebar': 'mypage-sidebar.html',
        'admin-sidebar': 'admin-sidebar.html'
    };

    // Get current page filename
    function getCurrentPage() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    }

    // Determine active navigation based on current page
    function getActiveNav(currentPage) {
        const navMap = {
            // Main pages
            '00_main_home.html': 'home',

            // BrickArt
            '07_brickart_list.html': 'brickart',
            '08_brickart_viewer.html': 'brickart',
            '09_brickart_product.html': 'brickart',
            '10_brickart_create.html': 'brickart',

            // DotArt
            '11_dotart_list.html': 'dotart',
            '12_dotart_editor.html': 'dotart',
            '13_dotart_viewer.html': 'dotart',
            '14_dotart_detail.html': 'dotart',

            // Creation
            '15_creation_list.html': 'creation',
            '16_creation_editor.html': 'creation',
            '17_creation_viewer.html': 'creation',
            '18_creation_detail.html': 'creation',

            // Shop
            '19_product_list.html': 'shop',
            '20_product_detail.html': 'shop',
            '21_product_search.html': 'shop',
            '22_product_set.html': 'shop',
            '23_cart.html': 'shop',
            '24_checkout.html': 'shop',
            '25_order_complete.html': 'shop',
            '26_order_detail.html': 'shop',

            // Manual
            '27_manual_list.html': 'manual',
            '28_manual_viewer.html': 'manual',

            // Class
            '40_class_list.html': 'class',
            '41_class_detail.html': 'class',
            '42_class_apply.html': 'class',

            // Help
            '29_help_center.html': 'help',
            '30_faq.html': 'help',
            '31_qna_list.html': 'help',
            '32_qna_write.html': 'help',

            // MyPage
            '04_mypage.html': 'dashboard',
            '04_mypage_orders.html': 'orders',
            '04_mypage_wishlist.html': 'wishlist',
            '04_mypage_reviews.html': 'reviews',
            '04_mypage_coupons.html': 'coupons',
            '04_mypage_points.html': 'points',
            '04_mypage_profile.html': 'profile',
            '04_mypage_addresses.html': 'addresses',
            '04_mypage_payments.html': 'payments',
            '03_password.html': 'password',

            // Admin
            '06_admin_dashboard.html': 'dashboard',
            '06_admin_stats.html': 'stats',
            '06_admin_users.html': 'users',
            '06_admin_sellers.html': 'sellers',
            '06_admin_products.html': 'products',
            '06_admin_orders.html': 'orders',
            '06_admin_settlements.html': 'settlements',
            '06_admin_brickarts.html': 'brickarts',
            '06_admin_dotarts.html': 'dotarts',
            '06_admin_creations.html': 'creations',
            '06_admin_banners.html': 'banners',
            '06_admin_coupons.html': 'coupons',
            '06_admin_notices.html': 'notices',
            '06_admin_inquiries.html': 'inquiries',
            '06_admin_reports.html': 'reports',
            '06_admin_settings.html': 'settings'
        };

        return navMap[currentPage] || '';
    }

    // Load component HTML
    async function loadComponent(elementId, filename) {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const response = await fetch(BASE_PATH + filename);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            element.innerHTML = html;

            // Set active navigation
            setActiveNav(element);

            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } catch (error) {
            console.warn(`Could not load ${filename}:`, error.message);
        }
    }

    // Set active navigation state
    function setActiveNav(container) {
        const currentPage = getCurrentPage();
        const activeNav = getActiveNav(currentPage);

        // Header navigation
        container.querySelectorAll('.nav-item[data-nav]').forEach(item => {
            item.classList.toggle('active', item.dataset.nav === activeNav);
        });

        // MyPage sidebar
        container.querySelectorAll('.mypage-menu a[data-nav]').forEach(item => {
            item.classList.toggle('active', item.dataset.nav === activeNav);
        });

        // Admin sidebar
        container.querySelectorAll('.admin-nav-item[data-nav]').forEach(item => {
            item.classList.toggle('active', item.dataset.nav === activeNav);
        });

        // Header icons
        container.querySelectorAll('.header-icon[data-icon]').forEach(icon => {
            if (icon.dataset.icon === 'cart' && currentPage.includes('cart')) {
                icon.classList.add('active');
            }
            if (icon.dataset.icon === 'wishlist' && currentPage.includes('wishlist')) {
                icon.classList.add('active');
            }
        });
    }

    // Initialize all components
    async function init() {
        const loadPromises = Object.entries(components).map(([id, file]) =>
            loadComponent(id, file)
        );
        await Promise.all(loadPromises);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for manual use
    window.BrickGroundLoader = {
        loadComponent,
        getCurrentPage,
        getActiveNav
    };
})();
