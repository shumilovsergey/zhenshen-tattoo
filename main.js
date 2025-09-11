// Telegram Mini App initialization
let tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    tg.MainButton.hide();
    tg.BackButton.hide();
}

// App state management
const App = {
    currentPage: 'main',
    pages: {
        about: 'pages/about.html',
        portfolio: 'pages/portfolio.html',
        care: 'pages/care.html',
        faq: 'pages/faq.html',
        contacts: 'pages/contacts.html'
    },
    
    init() {
        this.bindEvents();
        this.showMainPage();
    },
    
    bindEvents() {
        // Navigation buttons
        document.querySelectorAll('.nav-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.loadPage(page);
            });
        });
        
        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showMainPage();
        });
        
        // Telegram back button
        if (tg) {
            tg.BackButton.onClick(() => {
                this.showMainPage();
            });
        }
    },
    
    async loadPage(pageName) {
        if (!this.pages[pageName]) return;
        
        try {
            const response = await fetch(this.pages[pageName]);
            const html = await response.text();
            
            const contentContainer = document.getElementById('content-container');
            contentContainer.innerHTML = html;
            
            this.showPage('content');
            this.currentPage = pageName;
            
            // Initialize page-specific functionality
            this.initPageFeatures(pageName);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError();
        }
    },
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        if (pageId === 'main') {
            document.getElementById('main-page').classList.add('active');
            document.getElementById('back-btn').classList.remove('visible');
            if (tg) tg.BackButton.hide();
        } else {
            document.getElementById('content-page').classList.add('active');
            document.getElementById('back-btn').classList.add('visible');
            if (tg) tg.BackButton.show();
        }
    },
    
    showMainPage() {
        this.showPage('main');
        this.currentPage = 'main';
    },
    
    showError() {
        const contentContainer = document.getElementById('content-container');
        contentContainer.innerHTML = `
            <div class="content-page">
                <h2 class="page-title">Ошибка</h2>
                <div class="content-section">
                    <p>Не удалось загрузить страницу. Пожалуйста, попробуйте еще раз.</p>
                </div>
            </div>
        `;
        this.showPage('content');
    },
    
    initPageFeatures(pageName) {
        switch (pageName) {
            case 'faq':
                this.initFAQ();
                break;
            case 'portfolio':
                this.initPortfolio();
                break;
            case 'contacts':
                this.initContacts();
                break;
        }
    },
    
    initFAQ() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    },
    
    initPortfolio() {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                // Portfolio item click handler
                console.log('Portfolio item clicked');
            });
        });
    },
    
    initContacts() {
        document.querySelectorAll('.contact-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (tg) {
                    // For Telegram Mini App, handle links appropriately
                    e.preventDefault();
                    tg.openTelegramLink(link.href);
                }
            });
        });
    }
};

// Booking function
function bookSession() {
    if (tg) {
        tg.openTelegramLink('https://t.me/zhenshen_tattoo');
    } else {
        window.open('https://t.me/zhenshen_tattoo', '_blank');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Handle device back button (Android)
document.addEventListener('backbutton', () => {
    if (App.currentPage !== 'main') {
        App.showMainPage();
    }
}, false);