//checkBox 
cy.get('input[type="checkbox"]').check({force:true}).should('be.checked')
cy.get('span[class="is-relative is-block pl-5"]').find('before').click({force:false}).should('not.be.unchecked')