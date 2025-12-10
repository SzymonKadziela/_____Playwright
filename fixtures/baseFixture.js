import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

export const test = baseTest.extend({
    
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page)); // Inicjalizujemy i udostępniamy klasę LoginPage
    },

    // Tworzymy nową fixture 'productsPage'
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page)); // Inicjalizujemy i udostępniamy klasę ProductsPage
    },
    
    // Tworzymy fixture 'loggedInPage', która wykonuje logowanie przed testem
    loggedInPage: async ({ loginPage, page }, use) => {
        const USERNAME = 'standard_user';
        const PASSWORD = 'secret_sauce';
        
        // Wykonanie logowania
        await loginPage.goto();
        await loginPage.login(USERNAME, PASSWORD);
        await loginPage.verifyLoginSuccess();
        
        // Zwracamy obiekt 'page' do wykonania reszty testu
        await use(page); 
    },
});