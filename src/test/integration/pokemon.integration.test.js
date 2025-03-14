const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../app');
const { createPokemonTable } = require('../../models/pokemonModel');

describe('Integration Tests - Pokemon API', function() {
  // Ensure the table exists before running tests
  before(async function() {
    await createPokemonTable();
  });

  let createdPokemonId;

  it('should add a new pokemon', async function() {
    const newPokemon = { name: 'Pikachu', colour: 'Yellow', pokemon: 'Electric' };
    const res = await request(app).post('/pokemons').send(newPokemon);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    createdPokemonId = res.body.id;
  });

  it('should retrieve a list of pokemons', async function() {
    const res = await request(app).get('/pokemons');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should update the created pokemon', async function() {
    const updateData = { name: 'Raichu', colour: 'Orange', pokemon: 'Electric' };
    const res = await request(app).put(`/pokemons/${createdPokemonId}`).send(updateData);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('name', 'Raichu');
  });

  it('should return 404 for updating non-existent pokemon', async function() {
    const res = await request(app).put('/pokemons/99999').send({
      name: 'Mewtwo',
      colour: 'Purple',
      pokemon: 'Psychic'
    });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Pokemon not found');
  });

  it('should delete the created pokemon', async function() {
    const res = await request(app).delete(`/pokemons/${createdPokemonId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Pokemon deleted');
  });

  it('should return 404 when deleting non-existent pokemon', async function() {
    const res = await request(app).delete('/pokemons/99999');
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('message', 'Pokemon not found');
  });
});