const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
       await connection.destroy(app);
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "hnONG",
                email: "contato@hnONG.com",
                whatsapp: "4700000000",
                city: "Araçatuba",
                uf: "SP"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('shoud be able to list a all ONGs', async () => {
        const response = await request(app).get('/ongs');

        expect(response.body).toEqual(expect.arrayContaining([]));
    });
});