export class License {
    constructor(id, software, version, price, key, featured, discount) {
        this.id = id;
        this.software = software;
        this.version = version;
        this.price = price;
        this.key = key;
        this.featured = featured;
        this.discount = discount;
    }

    getFinalPrice() {
        if (this.discount > 0) {
            return (this.price * (1 - this.discount / 100)).toFixed(2);
        }
        return this.price.toFixed(2);
    }

    Render(parent) {
        const card = document.createElement('article');
        card.className = 'license-card';

        const finalPrice = this.getFinalPrice();

        card.innerHTML = `
            <div>
                <div class="badges">
                    ${this.featured ? '<span class="badge badge-featured">Destacado</span>' : ''}
                    ${this.discount > 0 ? `<span class="badge badge-discount">-${this.discount}%</span>` : ''}
                </div>
                <h3 class="card-title">${this.software}</h3>
                <p class="card-version">Versión: ${this.version}</p>
            </div>
            <div>
                <div class="price-container">
                    ${this.discount > 0 ? `<span class="old-price">${this.price.toFixed(2)}€</span>` : ''}
                    <span class="final-price">${finalPrice}€</span>
                </div>
                <button class="btn-buy">Comprar Licencia</button>
            </div>
        `;

        const buyBtn = card.querySelector('.btn-buy');
        buyBtn.addEventListener('click', () => this.comprar());

        parent.appendChild(card);
    }

    comprar() {
        const modal = document.getElementById('key-modal');
        const softwareNameEl = document.getElementById('modal-software-name');
        const keyEl = document.getElementById('modal-license-key');

        softwareNameEl.textContent = `${this.software} (v${this.version})`;
        keyEl.textContent = this.key;
        modal.classList.remove('hidden');
    }
}



