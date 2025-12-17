import { test } from '../fixtures/baseFixture';
import { expect } from '@playwright/test';

test.describe('Testy zakupowe z automatycznym logowaniem', () => {

    // Używamy Fixture'a 'loggedInPage', który już nas zalogował!
    test('powinno dodać produkt do koszyka po automatycznym zalogowaniu', async ({ loggedInPage, productsPage }) => {
        
        console.log('Dodawanie plecaka do koszyka...');
        await productsPage.addBackpackToCart();
        
        // Asercja na koszyk
        await expect(productsPage.shoppingCartLink).toHaveText('1');
        
        // Krok 3: Przejście do koszyka
        await productsPage.goToCart();
        await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/cart.html');
    });

    test('Test sprawdzający działanie soft asercji', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. To się wywali (celowo błędny tekst), ale test powinien iść dalej
    await expect.soft(page.locator('#login-button')).toHaveValue('NIEISTNIEJE');
    console.log('--- Log po pierwszej asercji (powinien się pojawić) ---');

    // 2. To się wykona i przejdzie
    await expect.soft(page.locator('#user-name')).toBeVisible();
    console.log('--- Log po drugiej asercji (powinien się pojawić) ---');
});
});