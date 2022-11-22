# Agile-Assignment1
# Name:Haoxuan Gu

# e2e test: 
changed the test of base.cy.js, favourite.cy.js, navigation.cy.js. There's nothing new of filtering so I didn't change it.

added the test of pagination.cy.js, review.cy.js, search.cy.js and all of them are working well

![](readme_source\testResult.png)

# Some cypress Custom commands like 
 Cypress.Commands.add('clickButton', (label) => {
   cy.get('button').contains(label).click()
 })

 Cypress.Commands.add('clickLink', (item,num,label) => {
   cy.get(item).eq(num).contains(label).click()
 })

# Branch policy:
 
 All the test --merge--> develop --merge---> main

# Bundling/Code splitting:
 
 Build and run the localhost:8080 server successfully

 Avaliable on: http://172.16.129.55:8080/

 ![](readme_source\bundling.png)

 Every page splitted
