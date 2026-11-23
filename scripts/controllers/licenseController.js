export class LicenseController {
    constructor(licenses = []) {
        this.licenses = licenses;
    }

    /**
     * Renderiza los primeros 'count' productos destacados.
     */

    RenderFeatured(count, parent) {
        parent.innerHTML = '';
        const featuredList = this.licenses
            .filter(lic => lic.featured)
            .slice(0, count);

        featuredList.forEach(lic => lic.Render(parent));
    }

    /**
     * Renderiza los primeros 'count' productos con descuento, ordenados de mayor a menor descuento.
     */

    RenderOffers(count, parent) {
        parent.innerHTML = '';
        const offersList = this.licenses
            .filter(lic => lic.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, count);

        offersList.forEach(lic => lic.Render(parent));
    }

    /**
     * Renderiza las 'count' últimas versiones de cada software distinto.
     */
    RenderLatest(count, parent) {
        parent.innerHTML = '';
        const latestBySoftware = new Map();

        this.licenses.forEach(lic => {
            const existing = latestBySoftware.get(lic.software);
            // Comparamos versiones de forma natural (ej. "24H2" > "23H2", "2026.1" > "2025.3")
            if (!existing || lic.version.localeCompare(existing.version, undefined, { numeric: true }) > 0) {
                latestBySoftware.set(lic.software, lic);
            }
        });

        const latestList = Array.from(latestBySoftware.values()).slice(0, count);
        latestList.forEach(lic => lic.Render(parent));
    }

    /**
     * Renderiza 'count' licencias en orden aleatorio.
     */
    RenderAll(count, parent) {
        parent.innerHTML = '';
        const shuffled = [...this.licenses];

        // Algoritmo Fisher-Yates para barajar aleatoriamente
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        shuffled.slice(0, count).forEach(lic => lic.Render(parent));
    }
}