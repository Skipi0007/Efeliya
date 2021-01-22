

describe('Efelya', () => {
    it('authLogin', () => {
        cy.visit('https://practitioner-efelya-test.noveogroup.com/forget',{
            auth: {
              username: 'owner@efelya.com',
              password: 'secret4efelya'
            }})

        // пустое поле email + кнопка подтверждения
        cy.get('#restore-form-email').click()
        cy.get('h1[class="title mb-6 has-text-centered"]').click()
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')
        cy.get('#restore-form-email').parents('div[class="field mb-6"]')
        .find('.is-danger').should('contain', 'This field is required')

        // невалидный email + кнопка подтверждения
        cy.get('#restore-form-email').clear().type('123yandex.ru')
        cy.get('#restore-form-email').parents('div[class="field mb-6"]')
        .find('.is-danger').should('contain', 'Invalid email format')
        cy.get('button[type="submit"]').invoke('attr', 'disabled')
        .should('contain', 'disabled')

        // невалидный, существующий email + кнопка подтверждения
        cy.get('#restore-form-email').clear()
        cy.get('#restore-form-email').type('unexistEmail@mail.ru')
        cy.get('#restore-form-email').parents('div[class="field mb-6"]')
        .find('.is-danger').should('contain', ' ')
        cy.get('button[type="submit"]').should('not.have.class', 'disabled')
        .click()
        cy.get('#restore-form-email').parents('div[class="field mb-6"]')
        .find('.is-danger').should('contain', 'find a user with that e-mail address.')

        // валидный, существующий email + кнопка подтверждения
        cy.get('#restore-form-email').clear()
        cy.get('#restore-form-email').type('seek@mail.ru')
        cy.get('#restore-form-email').parents('div[class="field mb-6"]')
        .find('.is-danger').should('contain', ' ')
        cy.get('button[type="submit"]').should('not.have.class', 'disabled')
        .click()
        cy.get('#restore-form-email').parents('div[class="field mb-6"]')
        .find('.is-success').should('contain', 'Please check your inbox')
    });

    
        it.only('emailSubmit', () => {
        cy.visit('https://mailtrap.io/signin')
        
        cy.get('input[type="email"]').type('Ilnar.Kantuganov@noveogroup.com')
        cy.get('input[type="password"]').type('mailtrapnoveogroup')
        cy.get('input[type="submit"]').click()
        cy.get('a[title="Demo inbox"]').click()
        cy.get('ul[class="messages_list n1fjobqo"]').find('li').eq(0).click()
        


        })  
    });  
    