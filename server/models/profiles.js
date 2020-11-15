const _ = require("lodash");
const { log } = require("../logger");
const SimpleCache = require("./base");
const mockData = require('../../data/profiles.json');
const env = process.env.NODE_ENV || "development";
const config = require("../../configs/config.json")[env];

const defaultTTL = config.data.profiles.ttl; // in minutes

class Profiles extends SimpleCache {
  constructor(timeToLive = defaultTTL) {
    super(timeToLive);
    this.getData = this.getData.bind(this);
  }

  ///
  // Gets data from cache or data url if cache is invalid
  ///
  async getData() {
    if (this.isCacheInvalid()) {
      log("info", "profiles data - cache has expired - fetching new data");

      try {
        const profilesData = mockData;
        log(
          "info",
          "profiles data - setting data to memory from request response"
        );
        this.cache = profilesData;
        this.fetchDate = new Date();
        return Promise.resolve(this.cache);
      } catch (err) {
        log(
          "error",
          `profiles data - ${
            err && err.message ? err.message : "error getting data"
          }`
        );
        return Promise.reject(
          `profiles data - ${
            err && err.message ? err.message : "error getting data"
          }`
        );
      }
    } else {
      log("info", "profiles data - cache still valid - getting data from cache");
      return Promise.resolve(this.cache);
    }
  }

  ///
  // Get all profiles
  ///
  async getProfilesList() {
    let profiles = this.cache;

    if (this.isCacheInvalid()) {
      profiles = await this.getData();
    }
    log("info", "calling getProfilesList in profiles model");
    return profiles;
  };

  ///
  // Get profile by given id, retrieves or sets cache as needed
  ///
  async getById(profileId) {
    log("info", "calling getById in profiles model");

    if (!profileId || typeof profileId != "number") {
      log("error", "Invalid Profile Id");
      throw new Error("Invalid Profile Id");
    }

    let profiles = this.cache;
    let foundProfile;

    if (this.isCacheInvalid()) {
      profiles = await this.getData();
    }

    if (profiles) {
      foundProfile = _.find(
        profiles,
        (profile) => profile.id === profileId
      );
    }

    return foundProfile;
  }
}

module.exports = Profiles;
