describe('Efelya', () => {
    it('authLogin', () => {
        cy.visit('https://practitioner-efelya-test.noveogroup.com/',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

           // Forgot your password? переход
         cy.get('[class="mb-6 has-text-right"]').find('a').click()
         cy.get('[class="title mb-6 has-text-centered"]').should('contain', 'Restore my password')
         cy.url().should('include', '/forget')

         cy.visit('https://practitioner-efelya-test.noveogroup.com/',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

            // Sign up переход
         cy.get('[class="mt-5 has-text-centered"]').find('a').click()
         cy.get('[class="title mb-6 has-text-centered"]').should('contain', 'Sign up')
         cy.url().should('include', '/sign-up')

         cy.visit('https://practitioner-efelya-test.noveogroup.com/',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

        // пустой email + кнопка log in
        cy.get('#login-form-email').click() 
        cy.get('#login-form-password').click()
        cy.get('#login-form-email').parents('div[class="field"]').find('.is-danger').should('contain', 'This field is required')
        cy.get('button[type="submit"]').invoke('attr', 'disabled').should('contain', 'disabled')

        // пустой пароль + кнопка log in
        cy.get('#login-form-email').click()
        cy.get('#login-form-password').parents('div[class="field"]').find('.is-danger').should('contain', 'This field is required')
        cy.get('button[type="submit"]').invoke('attr', 'disabled').should('contain', 'disabled')

        // невалидный email + кнопка log in
        cy.get('#login-form-email').clear().type('123yandex.ru')
        cy.get('#login-form-email').parents('div[class="field"]').find('.is-danger').should('contain', 'Invalid email format')
        cy.get('button[type="submit"]').invoke('attr', 'disabled').should('contain', 'disabled')

        // валидный email + невалидный пароль + кнопка log in
        cy.get('#login-form-email').clear()
        cy.get('#login-form-password').clear()
        cy.get('#login-form-email').clear().type('seek@mail.ru')
        cy.get('#login-form-email').parents('div[class="field"]').find('.is-danger').should('contain', ' ')
        cy.get('button[type="submit"]').invoke('attr', 'disabled').should('contain', 'disabled')
        cy.get('#login-form-password').type('Vi789456')
        cy.get('#login-form-password').parents('div[class="field"]').find('.is-danger').should('contain', ' ')
        cy.get('button[type="submit"]').should('not.have.class', 'disabled')
        cy.get('button[type="submit"]').click()
        cy.get('#login-form-email').parents('div[class="field"]').find('.is-danger').should('contain', 'These credentials do not match our records.')

         // валидный email + валидный пароль + кнопка log in
         cy.get('#login-form-email').clear()
         cy.get('#login-form-password').clear()
         cy.get('#login-form-email').clear().type('seek@mail.ru')
         cy.get('#login-form-email').parents('div[class="field"]').find('.is-danger').should('contain', ' ')
         cy.get('button[type="submit"]').invoke('attr', 'disabled').should('contain', 'disabled')
         cy.get('#login-form-password').type('Vi789456!')
         cy.get('#login-form-password').parents('div[class="field"]').find('.is-danger').should('contain', ' ')
         cy.get('button[type="submit"]').should('not.have.class', 'disabled')
         cy.get('button[type="submit"]').click()

         //Log out
         cy.get('[class="subtitle has-text-weight-semibold mb-0"]').click()
         cy.get('[class="navbar-item"]').contains('Log out').click()
         


    })    
});