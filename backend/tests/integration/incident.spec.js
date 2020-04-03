const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incidents', () => {
    const ong = {
        authorization: undefined,
        incident_id: undefined
    }
    function setAuthorization(id) {
        ong.authorization = id;
    }

    function getAuthorization() {
        return ong.authorization;
    }

    function setIncidentId(id) {
        ong.incident_id = id;
    }

    function getIncidentId() {
        return ong.incident_id;
    }

    
    
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const response = await request(app)
            .post('/ongs')
            .send({
                name: "hnIncident",
                email: "contato@hnIncident.com",
                whatsapp: "17897626338",
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

    it('should be able to list all incidents', async () => {
        const response = await request(app)
            .get('/incidents')
        
        expect(response.body).toEqual(expect.arrayContaining([]));
    })

    it('should be able to create a new incident', async () => {

        const response = await request(app)
            .post('/incidents')
            .set('Authorization', getAuthorization())
            .send({
                title: 'Cachorro TEST',
                description: 'Cachorro enfermo, esta com pneumunia TEST',
                value: 340
            });
            
        expect(response.body).toHaveProperty('id');
        setIncidentId(response.body.id);
    })

    

    it('should be able to delete a incident specific of a ONG', async () => {
        
        const response = await request(app)
            .delete('/incidents/' + getIncidentId())
            .set('Authorization', getAuthorization())
            
        expect(response.body).toMatchObject({});
    })

    

})