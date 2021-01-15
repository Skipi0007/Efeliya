describe('Efelya', () => {
    it('authSignup', () => {
        cy.visit('https://practitioner-efelya-test.noveogroup.com/sign-up',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

        let passCounter = (alert) => {cy.get('#sign-up-form-password')
        .parents('div[class="field"]')
        .find('.is-danger')
        .should('contain', alert)}

        let warningChecker = (level) => {cy.get('#sign-up-form-password')
        .parents('div[class="field"]')
        .find('.ml-2')
        .should('contain', level)}

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

        // существующий email + валидный пароль + кнопка log in
        cy.get('#sign-up-form-email').clear()
        cy.get('#sign-up-form-password').clear()
        cy.get('#sign-up-form-email').type('seek@mail.ru')
        cy.get('#sign-up-form-email').parents('div[class="field"]')
        .find('.is-danger').should('contain', ' ')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')
        cy.get('#sign-up-form-password').type('Vi789456!')
        cy.get('#sign-up-form-password').parents('div[class="field"]')
        .find('.is-danger').should('contain', ' ')
        cy.get('input[type="checkbox"]').check({force:true})
        cy.get('button[type="submit"]').should('not.have.class', 'disabled')
        cy.get('button[type="submit"]').click()
        cy.get('#sign-up-form-email').parents('div[class="field"]')
        .find('.is-danger').should('contain', 'The email has already been taken.')
        
         
        // валидация пароля
        cy.get('#sign-up-form-email').clear().type('seek@mail.ru')
        cy.get('#sign-up-form-password').clear().type('a')
        cy.get('#sign-up-form-password').parents('div[class="field"]')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Weak')

        cy.get('#sign-up-form-password').clear().type('aA')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Weak')

        cy.get('#sign-up-form-password').clear().type('aA1')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Normal')

        cy.get('#sign-up-form-password').clear().type('aA1!')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        cy.get('#sign-up-form-password').clear().type('aA1!a')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        cy.get('#sign-up-form-password').clear().type('aA1!aa')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        cy.get('#sign-up-form-password').clear().type('aA1!aaa')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Strong')

        cy.get('#sign-up-form-password').clear().type('aA1!aaaa')
        passCounter(' ')
        warningChecker('Strong')
    })
})