const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const pool = require('../../config/db');
const { getPokemons, addPokemon, updatePokemon, deletePokemon } = require('../../controllers/pokemonController');

describe('Unit Tests - Pokemon Controller', function() {
  afterEach(() => {
    sinon.restore();
  });

  describe('getPokemons', function() {
    it('should return list of pokemons', async function() {
      const fakeRows = [{ id: 1, name: 'Bulbasaur', colour: 'Green', pokemon: 'Grass' }];
      sinon.stub(pool, 'query').resolves({ rows: fakeRows });
      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await getPokemons(req, res);
      expect(res.json.calledWith(fakeRows)).to.be.true;
    });

    it('should handle error when retrieving pokemons', async function() {
      sinon.stub(pool, 'query').rejects(new Error('DB error'));
      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await getPokemons(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property('error').that.includes('DB error');
    });
  });

  describe('addPokemon', function() {
    it('should add a new pokemon successfully', async function() {
      const newPokemon = { name: 'Charmander', colour: 'Red', pokemon: 'Fire' };
      const fakeResult = { rows: [{ id: 2, ...newPokemon }] };
      sinon.stub(pool, 'query').resolves(fakeResult);
      const req = { body: newPokemon };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await addPokemon(req, res);
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(fakeResult.rows[0])).to.be.true;
    });
  });

  describe('updatePokemon', function() {
    it('should update a pokemon successfully', async function() {
      const updateData = { name: 'Squirtle', colour: 'Blue', pokemon: 'Water' };
      const fakeResult = { rows: [{ id: 3, ...updateData }] };
      sinon.stub(pool, 'query').resolves(fakeResult);
      const req = { params: { id: 3 }, body: updateData };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await updatePokemon(req, res);
      expect(res.json.calledWith(fakeResult.rows[0])).to.be.true;
    });

    it('should return 404 when updating non-existent pokemon', async function() {
      sinon.stub(pool, 'query').resolves({ rows: [] });
      const req = { params: { id: 9999 }, body: { name: 'Mewtwo', colour: 'Purple', pokemon: 'Psychic' } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await updatePokemon(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Pokemon not found" })).to.be.true;
    });
  });

  describe('deletePokemon', function() {
    it('should delete a pokemon successfully', async function() {
      const fakeResult = { rows: [{ id: 4, name: 'Eevee', colour: 'Brown', pokemon: 'Normal' }] };
      sinon.stub(pool, 'query').resolves(fakeResult);
      const req = { params: { id: 4 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await deletePokemon(req, res);
      expect(res.json.calledWith({ message: "Pokemon deleted", deletedPokemon: fakeResult.rows[0] })).to.be.true;
    });

    it('should return 404 when trying to delete a non-existent pokemon', async function() {
      sinon.stub(pool, 'query').resolves({ rows: [] });
      const req = { params: { id: 9999 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };
      await deletePokemon(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Pokemon not found" })).to.be.true;
    });
  });
});