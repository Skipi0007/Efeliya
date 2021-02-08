/// <reference types="cypress" />
import {Auth, user} from './AuthData'

describe('Efelya', () => {
    it('authSignup', () => {
        cy.visit('/sign-up',Auth)

        let passCounter = (alert) => {cy.get('#sign-up-form-password')
        .parents('div[class="field"]')
        .find('.is-danger')
        .should('contain', alert)}

        let warningChecker = (level) => {cy.get('#sign-up-form-password')
        .parents('div[class="field"]')
        .find('.ml-2')
        .should('contain', level)}

        let pass = ''
        
        let passValidator = (simbol) => {
            pass = pass+simbol
            cy.get('#sign-up-form-password').clear().type(pass)
            return(pass)
        
        }

       

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
            
          }

          

        

        // пустой email + кнопка log in
        cy.get('#sign-up-form-email').click() 
        cy.get('#sign-up-form-password').click()
        cy.get('#sign-up-form-email').parents('div[class="field"]')
        .find('.is-danger').should('contain', 'This field is required')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')

        // пустой пароль + кнопка log in + pass strenght
        cy.get('#sign-up-form-email').click()
        cy.get('#sign-up-form-password').parents('div[class="field"]')
        .find('.is-danger').should('contain', 'This field is required')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')
        cy.get('#sign-up-form-password').parents('div[class="field"]')
        .find('.is-danger').should('contain', 'This field is required')
        cy.get('#sign-up-form-password').parents('div[class="field"]')
        .find('span[class="ml-2 has-text-danger"]').should('contain', 'Weak')

        // невалидный email + кнопка log in
        cy.get('#sign-up-form-email').clear().type('123yandex.ru')
        cy.get('#sign-up-form-email').parents('div[class="field"]')
        .find('.is-danger').should('contain', 'Invalid email format')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')

        // существующий email + валидный пароль + кнопка log in + checkbox
        cy.get('#sign-up-form-email').clear()
        cy.get('#sign-up-form-password').clear()
        cy.get('#sign-up-form-email').type(user.mail)
        cy.get('#sign-up-form-email').parents('div[class="field"]')
        .find('.is-danger').should('contain', ' ')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')
        cy.get('#sign-up-form-password').type(user.pass)
        cy.get('#sign-up-form-password').parents('div[class="field"]')
        .find('.is-danger').should('contain', ' ')
        cy.get('input[type="checkbox"]').should('not.be.checked')
        .check({force:true}).should('be.checked')
        cy.get('button[type="submit"]').should('not.have.class', 'disabled')
        cy.get('button[type="submit"]').click()
        cy.get('#sign-up-form-email').parents('div[class="field"]')
        .find('.is-danger').should('contain', 'The email has already been taken.')
        
        
        // валидация пароля
        cy.get('#sign-up-form-email').clear().type('seek'+getRandomInt(1, 1000
          )+'@mail.ru')
        passValidator('a')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Weak')

        passValidator('A')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Weak')

        passValidator('1')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Normal')

        passValidator('!')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        passValidator('a')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        passValidator('a')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        passValidator('a')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        passValidator('a')
        passCounter(' ')
        warningChecker('Strong')

        cy.get('input[type="checkbox"]').check({force:true})
        cy.get('button[type="submit"]').click()

        cy.visit('https://practitioner-efelya-test.noveogroup.com/sign-up',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

        

        //Log in button
        cy.get('p[class="mt-5 has-text-centered"]').find('a').click()

        //Terms and conditions
        cy.get('span[class="is-relative is-block pl-5"]').find('a').click()
        cy.url().should('not.include', '/sign-up')

        
        
    })
})