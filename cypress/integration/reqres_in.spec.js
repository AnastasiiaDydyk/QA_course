// Регистрация юзера
describe ('test register', () => { 
  it ('register', () => { 
    cy.request('POST', 'https://reqres.in/api/register', {email: 'eve.holt@reqres.in',
password: 'pistol' }).then(
  (response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('id', 4)
    expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4') // true
  }
)})
//тест фейлится сайпресом потому что прилетает 400 статус, даже если мы его ожидаем
/*it ('unsuccessful register ', () => { 
  cy.request('POST', 'https://reqres.in/api/register', {email: 'eve.holt@reqres.in'}).then(
(response) => {
  expect(response.status).to.eq(400)
  expect(response.body).to.have.property('error', 'Missing password') // true
}
)
})*/})
// Авторизация
describe ('test login', () => { 
  it ('login', () => { 
    cy.request('POST', 'https://reqres.in/api/login', {email: 'eve.holt@reqres.in',
password: 'cityslicka' }).then(
  (response) => {
    // response.body is automatically serialized into JSON
    expect(response.status).to.eq(200)
    expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4') // true
  }
)})
//тест фейлится сайпресом потому что прилетает 400 статус, даже если мы его ожидаем
/*it ('unsuccessfull login', () => { 
  cy.request('POST', 'https://reqres.in/api/login', {email: 'eve.holt@reqres.in'}).then(
(response) => {
  // response.body is automatically serialized into JSON
  expect(response.status).to.eq(400)
  expect(response.body).to.have.property('error', 'Missing password') // true
}
)
})*/})

 // Получить список
it ('get list', () => {
cy.request ('GET', 'https://reqres.in/api/users/2').then(
  (response) => {
    expect(response.status).to.eq(200)
  }
)
})
// Добавить юзера
it ('PUT user', () => {
  cy.request ('PUT', 'https://reqres.in/api/users/2', {name: 'morpheus',
  job: 'zion resident' }).then(
    (response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name','morpheus')
      expect(response.body).to.have.property('job' , 'zion resident')
      //expect(response.body).to.have.property('updatedAt', '2021-06-01T18:13:23.589Z') время меняется, не проверить это поле
      }) // true
      
  })

  // Удаление
  it ('get list', () => {
    cy.request ('DELETE', 'https://reqres.in/api/users/2').then(
      (response) => {
        expect(response.status).to.eq(204)
      }
    )
    })