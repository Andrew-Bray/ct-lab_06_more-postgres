
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

  // POSTS 
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

  // GET ONE
  it('should get one chili that is in the database', async() => {

    const chili = await Chili
      .insert({
        brand: 'stagg',
        description: 'yummmm',
        image_url: 'http://www.hormelnstuff.com'
      });

    const newRes = await request(app)
      .get(`/chilis/${chili.id}`);
    expect(newRes.body).toEqual({
      id: expect.any(String),
      brand: 'stagg',
      description: 'yummmm',
      image_url: 'http://www.hormelnstuff.com'
    });
  });

  // GET ALL
  it('should get all chilis', async() => {

    const chilis = await Promise.all([
      {
        brand: 'hormel',
        description: 'not bad',
        image_url: 'http://www.hormelnstuff.com'
      },
      {
        brand: 'stagg',
        description: 'yummmm',
        image_url: 'http://www.staggymcgee.com'
      },
      {
        brand: 'annies',
        description: 'annies whyyy',
        image_url: 'http://www.annieschilimakesvegetarianslookbad.com'
      }
    ].map(chili => Chili.insert(chili)));

    const response = await request(app)
      .get('/chilis');

    expect(response.body).toEqual(expect.arrayContaining(chilis));
  });

  // UPDATE
  it('updates my chili stats', async() => {
    const chili = await Chili.insert({
      brand: 'stagg',
      description: 'yummmm',
      image_url: 'http://www.staggymcgee.com'
    });

    const response = await request(app)
      .put(`/chilis/${chili.id}`)
      .send({
        brand: 'stagg',
        description: 'yummmmmmmy stuff',
        image_url: 'http://www.staggymcgee.com'
      });

    expect(response.body).toEqual(
      {
        id: chili.id,
        brand: 'stagg',
        description: 'yummmmmmmy stuff',
        image_url: 'http://www.staggymcgee.com'
      });
  });

  // DELETE
  it('will delete a chili', async() => {
    const chili = await Chili.insert({
      brand: 'stagg',
      description: 'yummmm',
      image_url: 'http://www.staggymcgee.com'
    });

    const response = await request(app)
      .delete(`/chilis/${chili.id}`);

    expect(response.body).toEqual(chili);
  });
});
