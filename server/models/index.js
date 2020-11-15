const Profiles = require("./profiles");
const { log } = require("../logger");

const profilesInstance = new Profiles();

const db = {
  async initialize() {
    try {
      await profilesInstance.getData();
    } catch (err) {
      log(
        "error",
        err && err.message ? err.message : "Error occurred initializing data."
      );
    }
  },
};

module.exports = {
  db,
  profiles: profilesInstance,
};
