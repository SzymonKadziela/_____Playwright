import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

export const test = baseTest.extend({
    
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    // fixture 'productsPage'
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    
    // 'loggedInPage', która wykonuje logowanie przed testem
    loggedInPage: async ({ loginPage, page }, use) => {
        const USERNAME = 'standard_user';
        const PASSWORD = 'secret_sauce';
        
        // Wykonanie logowania
        await loginPage.goto();
        await loginPage.login(USERNAME, PASSWORD);
        await loginPage.verifyLoginSuccess();
        
        // Zwraca obiekt 'page' do wykonania reszty testu
        await use(page); 
    },
});