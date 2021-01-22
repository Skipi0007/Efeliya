describe('Efelya', () => {
    it('authSignup', () => {
        cy.visit('https://practitioner-efelya-test.noveogroup.com/password/reset/57e762f48da8b2985b31877028424cb859975cfdb577628d4a755e5209660dbe?email=seek%40mail.ru',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

            let passCounter = (alert) => {cy.get('#reset-form-password')
        .parents('div[class="field"]')
        .find('.is-danger')
        .should('contain', alert)}

        let warningAssertion = (alert) => {cy.get('#reset-form-confirm-password')
        .parents('div[class="field"]')
        .find('.is-danger')
        .should('contain', alert)}

        let warningChecker = (level) => {cy.get('#reset-form-password')
        .parents('div[class="field"]')
        .find('.ml-2')
        .should('contain', level)}

        let pass = ''
        
        let passValidator = (simbol) => {
            pass = pass+simbol
            cy.get('#reset-form-password').clear().type(pass)
            return(pass)
        
        }

        let emailNum = ''

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            emailNum = Math.floor(Math.random() * (max - min)) + min;
            return emailNum
          }

          getRandomInt(1, 1000
            )

        // пустые поля паролей + кнопка
        cy.get('#reset-form-password').click()
        cy.get('#reset-form-confirm-password').click()
        passCounter('This field is required')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')

        // валидация пароля
        passValidator('a')
        passCounter('The password must be at least 8 characters long')
        warningChecker('Weak')

        warningAssertion('This field is required')

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

        // поле подтверждения пароля + кнопка
        cy.get('#reset-form-confirm-password').type('1')
        warningAssertion('Passwords don’t match')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')

        cy.get('#reset-form-confirm-password').clear().type(pass)
        warningAssertion(' ')
        cy.get('button[type="submit"]').click()

    })
})