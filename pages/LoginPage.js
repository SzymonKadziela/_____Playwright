import { expect } from "@playwright/test";

export class LoginPage {

    constructor(page){
        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Login'});
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click();
    }

    async verifyLoginSuccess(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }
}