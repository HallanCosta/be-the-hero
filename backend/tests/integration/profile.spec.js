const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {

    const ong = {
        authorization: undefined
    }
    function setAuthorization(id) {
        ong.authorization = id;
    }
    function getAuthorization() {
        return ong.authorization;
    }


    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "hnSession",
                email: "contato@hnSession.com",
                whatsapp: "4700000000",
                city: "Araçatuba",
                uf: "SP"
            })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

        setAuthorization(response.body.id);
    })

    afterAll(async () => {
        await connection.destroy(app);
    })

    it('should be able to list incidents of a ONG specific', async () => {
        const response = await request(app)
            .get('/incidents')
            .set('Authorization', getAuthorization())
        
        expect(response.body).toEqual(expect.arrayContaining([]));
    })
})