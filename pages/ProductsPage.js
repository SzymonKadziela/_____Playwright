import { expect } from '@playwright/test';

export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.backpackButton = page.getByRole('button', { name: 'Add to cart' }).first(); 
        this.shoppingCartLink = page.locator('#shopping_cart_container a');
    }

    async addBackpackToCart() {
        await this.backpackButton.click();
    }
    
    async goToCart() {
        await this.shoppingCartLink.click();
    }
}