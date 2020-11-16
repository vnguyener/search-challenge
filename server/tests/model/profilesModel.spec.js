const ProfilesModel = require('../../models/profiles');
const env = process.env.NODE_ENV || 'test';
const config = require('../../../configs/config.json')[env];
const mockData = require('../../../data/profiles.json');
const ttl = config.data.profiles.ttl;

describe("Profiles Model", () => {
  describe("initial state", () => {
    it("should have set cache to null", () => {
      const profiles = new ProfilesModel();
      expect(profiles.cache).toBeNull();
    });

    it("should set default ttl to 1 (min)", () => {
      const profiles = new ProfilesModel();
      expect(profiles.millisecondsToLive).toEqual(ttl * 60 * 1000);
    });
  });

  describe("getData", () => {
    it("should fetch the data if cache is empty initially", async () => {
      const profiles = new ProfilesModel();
      const res = await profiles.getData();
      expect(res).toBeDefined();
      expect(res).toEqual(mockData);
    });

    it("should not fetch data if cache is still valid", async () => {
      const profilesData = [{ things: "stuff" }];
      const profiles = new ProfilesModel();
      profiles.cache = profilesData;
      profiles.fetchDate = new Date();

      const res = await profiles.getData();
      expect(res).toBeDefined();
      expect(res).toEqual(profilesData);
      expect(profiles.fetchDate.getTime()).toBeGreaterThan(0);
    });
  });

  describe("isCacheExpired", () => {
    it("should return true on init without getdata", () => {
      const profiles = new ProfilesModel();
      const res = profiles.isCacheExpired();
      expect(profiles.fetchDate.getTime()).toEqual(0);
      expect(res).toEqual(true);
    });

    it("should return false if fetchDate has a value (getdata was called and set)", () => {
      const profiles = new ProfilesModel();
      profiles.fetchDate = new Date();
      const res = profiles.isCacheExpired();
      expect(profiles.fetchDate.getTime()).toBeGreaterThan(0);
      expect(res).toEqual(false);
    });
  });

  describe("isCacheInvalid", () => {
    it("should return true if cache is empty (on init)", () => {
      const profiles = new ProfilesModel();
      const res = profiles.isCacheInvalid();
      expect(res).toEqual(true);
    });

    it("should return true if cache is defined but expired", () => {
      const profiles = new ProfilesModel();
      profiles.cache = ["things"];
      const res = profiles.isCacheInvalid();
      expect(res).toEqual(true);
    });

    it("should return false if cache is defined and not expired", () => {
      const profiles = new ProfilesModel();
      profiles.cache = ["valid"];
      profiles.fetchDate = new Date();
      const res = profiles.isCacheInvalid();
      expect(res).toEqual(false);
    });
  });

  describe("getById", () => {
    it("should throw an error if param is invalid - null", async () => {
      const profiles = new ProfilesModel();
      try {
        await profiles.getById();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid Profile Id");
      }
    });

    it("should throw an error if param is invalid - nan", async () => {
      const profiles = new ProfilesModel();
      try {
        await profiles.getById("abc");
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toEqual("Invalid Profile Id");
      }
    });

    it("should return a profile by id from cache", async () => {
      const profiles = new ProfilesModel();
      profiles.cache = [{ "id": 123, "handle": "dave" }, { "id": 456, "handle": "pete" }];
      profiles.fetchDate = new Date();

      const res = await profiles.getById(123);
      expect(res).toEqual({ "id": 123, "handle": "dave" });
    });

    it("should return undefined if requested id is not in data", async () => {
      const profiles = new ProfilesModel();
      profiles.cache = [{ "id": 123, "handle": "dave" }, { "id": 456, "handle": "pete" }];
      profiles.fetchDate = new Date();

      const res = await profiles.getById(9999);
      expect(res).toBeUndefined();
    });
  });
});