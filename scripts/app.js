import { License } from './types/license.js';
import { LicenseController } from './controllers/licenseController.js';

class App {
    constructor() {
        this.controller = null;
        this.setupModalEvents();
    }

    async init() {
        try {
            const response = await fetch('./data/licenses.json');
            if (!response.ok) throw new Error('No se pudo cargar licenses.json');
            
            const rawData = await response.json();

            // Convertimos los datos planos del JSON en instancias de Type License
            const licenseInstances = rawData.map(item => new License(
                item.id,
                item.software,
                item.version,
                item.price,
                item.key,
                item.featured,
                item.discount
            ));

            // Inicializamos el controlador
            this.controller = new LicenseController(licenseInstances);

            // Renderizamos las secciones en el orden deseado
            this.renderStoreSections();

        } catch (error) {
            console.error('Error inicializando la aplicación:', error);
        }
    }

    renderStoreSections() {
        const featuredContainer = document.getElementById('featured-container');
        const offersContainer = document.getElementById('offers-container');
        const latestContainer = document.getElementById('latest-container');
        const allContainer = document.getElementById('all-container');

        // 1. Primeros 4 destacados
        this.controller.RenderFeatured(4, featuredContainer);

        // 2. Primeras 4 ofertas ordenadas por mayor descuento
        this.controller.RenderOffers(4, offersContainer);

        // 3. Últimas versiones de 8 softwares distintos
        this.controller.RenderLatest(8, latestContainer);

        // 4. 8 licencias aleatorias del catálogo
        this.controller.RenderAll(8, allContainer);
    }

    setupModalEvents() {
        const modal = document.getElementById('key-modal');
        const closeBtn = document.getElementById('close-modal');
        const copyBtn = document.getElementById('copy-key-btn');
        const keyEl = document.getElementById('modal-license-key');

        closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(keyEl.textContent);
            copyBtn.textContent = '¡Copiado!';
            setTimeout(() => copyBtn.textContent = 'Copiar', 2000);
        });
    }
}

// Arrancar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});