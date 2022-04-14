const{ app }= require('../server')
const request = require('supertest')
// const request = supertest(app);
const auth = require('../api/controllers/auth.controller');
const routes = require('../api/routes/auth.routes')

// Get User Test
test('signup controlller exist ', () => {
  expect(auth.Signup).toBeDefined();
});
test('signIn controller exist', ()=>{
  expect(auth.Signin).toBeDefined()
});

test('get signup endpoint', async()=> {
  const res = await request(app).get('/')
  expect(res.statusCode).toBe(200)
})

test('signup statuscode', async()=> {
  const res = await request(app).get('/signin')
  expect(res.statusCode).toBe(200)
});

test('get all user in a json Object', async ()=> {
  request(app)
    .get('/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
});

test('checking usersignup details', async()=> {
  const newUser = await request(app).post('/signup').send({
    firstname : 'tyler',
    lastname : 'momoh',
    username : 'tylerjusfly',
    email : 'tylerjusfly2@gmail.com',
    password : 'ladygaga',
    repeat_password : 'ladygaga'
  })
  .expect(newUser.statusCode).toBe(201)
  .expect(newUser.body).toHaveProperty('_id')
  .expect(newUser.body.email).toBe('tylerjusfly2@gmail.com')
});

