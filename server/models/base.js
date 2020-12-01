const { log } = require('../logger');

class SimpleCache {
  constructor(timeToLive = 1) {
    // cache ttl in minutes
    this.millisecondsToLive = timeToLive * 60 * 1000;
    this.cache = null;
    this.getData = this.getData.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.isCacheInvalid = this.isCacheInvalid.bind(this);
    this.fetchDate = new Date(0);
  }

  ///
  // Checks if the cache is expired if the ttl is less then current time
  ///
  isCacheExpired() {
    return this.fetchDate.getTime() + this.millisecondsToLive < new Date().getTime();
  }

  ///
  // Checks cache validity if cache is empty or has expired
  ///
  isCacheInvalid() {
    const isInvalid = !this.cache || this.isCacheExpired();
    log('info', `isCacheInvalid - ${isInvalid}`);
    return isInvalid;
  }

  ///
  // Returns data from cache
  ///
  getData() {
    return this.cache;
  }
}

module.exports = SimpleCache;
