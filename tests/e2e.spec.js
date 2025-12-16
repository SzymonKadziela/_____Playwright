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
});