# Agile-Assignment1
Creator:Haoxuan Gu
github: https://github.com/foxeatbread/Agile-Assignment1.git

gitlab: https://gitlab.com/GuHaoxuan/agile-assignment1.git

youtube: https://www.youtube.com/watch?v=N7QJ3aWBAbQ

## Overview
This is the Class Agile Assignment1 project, we learnt how to ues practical technology --Cypress, 

how to control git repository,

how to use CI pipeline test by .yml file.

## Feature:
### e2e test: 
changed the test of base.cy.js

+ "The movie details page"
+ "The actor details page"

favourite.cy.js

+ "Delete movie from favourite movies page"


navigation.cy.js

+ "From the movie's detail page to actor details page"
+ "navigates to the movie details page and then actor detail page and change browser URL"

There's nothing new of filtering so I didn't change it.

added the test of pagination.cy.js

+ "The movies in page 2"

- review.cy.js

+ "The review overplay"
+ "The review detail page"

search.cy.js and all of them are working well

+ "Search the movie"

[testResult](https://github.com/foxeatbread/Agile-Assignment1/tree/main/readme_source/testResult.png?raw=true)

### Some cypress Custom commands like 
 Cypress.Commands.add('clickButton', (label) => {
   cy.get('button').contains(label).click()
 })

 Cypress.Commands.add('clickLink', (item,num,label) => {
   cy.get(item).eq(num).contains(label).click()
 })

### Branch policy:
 
 Most of the the test --merge--> develop --merge---> main

### Bundling/Code splitting:
 
 Build and run the localhost:8080 server successfully

 Avaliable on: http://172.16.129.55:8080/

 ![bundling](https://github.com/foxeatbread/Agile-Assignment1/tree/main/readme_source/bundling.png)

 Every page splitted

### CI Test
Test Result:

 ![pipelineTest](https://github.com/foxeatbread/Agile-Assignment1/tree/main/readme_source/pipelineTest.png)
 
### PR Request

![pushRequest](https://github.com/foxeatbread/Agile-Assignment1/tree/main/readme_source/pushRequest.png)

![PrResutl](https://github.com/foxeatbread/Agile-Assignment1/tree/main/readme_source/prResult.png)