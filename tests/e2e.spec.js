import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Testy E2E procesu zakupowego na Swag Labs (z POM)', () => {
    
    const USERNAME = 'standard_user';
    const PASSWORD = 'secret_sauce';

    test('powinno przejść przez logowanie i dodać produkt do koszyka', async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);

        // --- KROK 1: Logowanie ---
        
        console.log('Krok 1: Przejście do strony i logowanie...');
        await loginPage.goto();
        await loginPage.login(USERNAME, PASSWORD);
        await loginPage.verifyLoginSuccess();
        
        // --- KROK 2: Dodawanie do koszyka ---
        
        console.log('Krok 2: Dodawanie plecaka do koszyka...');
        await productsPage.addBackpackToCart();
        
        // Asercja: Sprawdź, czy na ikonie koszyka pojawiła się jedynka
        await expect(productsPage.shoppingCartLink).toHaveText('1');
        
        // --- KROK 3: Przejście do koszyka ---
        
        console.log('Krok 3: Przejście do koszyka...');
        await productsPage.goToCart();
        
        // Asercja: Sprawdź, czy strona to koszyk
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.locator('.cart_item')).toHaveCount(1);
    });
});