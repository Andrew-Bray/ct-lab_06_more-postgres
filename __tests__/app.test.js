const { setupMaster } = require('cluster');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Chili = require('../lib/models/Chili');
const pool = require('../lib/utils/pool');

describe('these are my app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('../lib/utils/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it()
})
