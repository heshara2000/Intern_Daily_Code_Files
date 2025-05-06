const request = require('supertest');
const app = require('./app');

describe('Todos API', () => {
    it('GET /todos --> array todos', async () => {
        const response = await request(app)
            .get('/todos')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    completed: expect.any(Boolean),
                }),
            ])
        );
    });

    it('GET /todos/:id --> specific todo by ID', () => {
        return request(app)
            .get('/todos/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean),
                    })
                );
            });
    });

    it('GET /todos/:id --> 404 not found', () => {
        return request(app)
            .get('/todos/9999')
            .expect(404);
    });

    it('POST /todos --> create a new todo', () => {
        return request(app)
            .post('/todos')
            .send({ name: 'do dishes' })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: 'do dishes',
                        completed: false,
                    })
                );
            });
    });

    it('POST /todos --> validates request body', () => {
        return request(app)
            .post('/todos')
            .send({ name: 123 })
            .expect(422);
    });
});
