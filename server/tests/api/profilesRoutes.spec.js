const supertest = require('supertest')
const app = require('../../index');
const request = supertest(app)
const mockData = require("../../../data/profiles.json");

describe('Profiles API', () => {

  describe("-GET / - getProfilesList", () => {
    it('should successfully get all profiles', async (done) => {
      const res = await request
        .get('/api/profiles');
      expect(res.body).toBeDefined();
      expect(res.body.success).toEqual(true);
      expect(res.body.httpStatus).toEqual(200);
      expect(res.body.profiles).toEqual(expect.arrayContaining(mockData));
      done();
    });
  });

  describe("- GET /:id - getProfileDetails ", () => {
    it('should successfully get a profile', async (done) => {
      const res = await request
        .get('/api/profiles/123');
      expect(res.body).toBeDefined();
      expect(res.body.success).toEqual(true);
      expect(res.body.httpStatus).toEqual(200);
      expect(res.body.profile).toMatchObject({
        id: 123
      });
      done();
    });

    it('should throw a 404', async (done) => {
      const res = await request
        .get('/api/profiles/987334343');
      expect(res.body).toBeDefined();
      expect(res.body.success).toEqual(false);
      expect(res.body.httpStatus).toEqual(404);
      expect(res.body.error).toEqual("Sorry, we're unable to find the profile you're looking for.");
      done();
    });

    it('should throw a 500', async (done) => {
      const res = await request
        .get('/api/profiles/abc');

      expect(res.body).toBeDefined();
      expect(res.body.httpStatus).toEqual(422);
      expect(res.body.error).toEqual("Validation error(s) has occurred.");
      expect(res.body.validationErrors).toEqual(expect.arrayContaining([{ id: 'Profile identifier must be a number.' }]));
      done();
    });

  });
})