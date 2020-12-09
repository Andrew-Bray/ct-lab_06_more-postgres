
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Chili = require('../lib/models/Chili');
const pool = require('../lib/utils/pool');

describe('these are my app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/utils/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('should post a new chili in the database and return it', async() => {
    const res = await request(app)
      .post('/chilis')
      .send({
        brand: 'hormel',
        description: 'not bad, add ketchup',
        image_url: 'http://www.hormelnstuff.com'
      });

    expect(res.body).toEqual({
      id: expect.anything(),
      brand: 'hormel',
      description: 'not bad, add ketchup',
      image_url: 'http://www.hormelnstuff.com'
    });
  });

  it('should get one chili that is in the database', async() => {
    const res = await request(app)
      .post('/chilis')
      .send({
        brand: 'stagg',
        description: 'yummmm',
        image_url: 'http://www.hormelnstuff.com'
      });
      
    const myChiliId = res.body.id;

    const newRes = await request(app)
      .get(`/chilis/${myChiliId}`);
    expect(newRes.body).toEqual({
      id: expect.anything(),
      brand: 'stagg',
      description: 'yummmm',
      image_url: 'http://www.hormelnstuff.com'
    });
  
      

  });
});
