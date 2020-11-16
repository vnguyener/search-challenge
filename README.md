
## React Challenge
 
This repo contains the source code to do the following tasks:

1. Modify the current app to replace the profiles pulled from the static JSON file with data pulled from a live api. This api can be any public api, or implement your own api endpoint to return profiles.
2. Add a new page to the site for rendering the full profile. When clicking on a search card, render the new page with the profile data from task #1.

## Shortcuts

* [Getting Started](#getting-started)
* [Initial Run Logs](#initial-run-logs)
* [Architecture Overview](#architecture-overview)
* [Concepts & Thoughts](#concepts-&-thoughts)

## Getting Started 

### Prerequisites
1. Node (locally, I'm using v15.1.0);
2. Yarn
3. Clone of the repo

### Installation

1. git clone https://github.com/vnguyener/search-challenge.git1
2. cd into the project; there should be a 'root' package.json to build and run the server and the web app
3. Running `yarn build:all` should install both `/server` and `/client` dependencies

### Running locally

There are a couple commands to choose from within the root `package.json` after installing dependencies

* `yarn server` runs a nodemon'd version of the server locally from the /server dir
  * `localhost:8080` - you can also hit this url directly since there's no auth to test apis e.g. http://localhost:8080/api/profiles
* `yarn web` runs the react app in the /client dir
  * `localhost:3000` - best to run server first to avoid an error thrown

### Other Commands

I've added a few tests to both `/server` and `/client` both can be ran through `yarn test` or (`yarn test` then press `a` in `/client) in the respective directories

## Initial run logs on running server

When you restart or run your app for the first time you'll notice the following similar logs in the terminal

```
2020-11-16T06:16:24.951Z [INFO] isCacheInvalid - true
2020-11-16T06:16:24.952Z [INFO] profiles data - cache has expired - fetching new data
2020-11-16T06:16:24.952Z [INFO] profiles data - setting data to memory
Server magic happens on port - 8080
```
This is because our server is 'fetching' the data from `profiles.json` and storing the data into local memory to fetch later.

A high level description would be:

1. Check if profiles data cache is still valid? No? Then lets make a request to fetch and store data in memory.
2. The service should be ready when you see `magic happens on port ...` :)

Key things to note:

1. We "initialize" data on server start but only periodically request the data again through the runtime of the app set by a separate ttl (time to live in minutes) per data through configs. I currently set it at 1 minute to simulate a 'quick cache refresh';

But why do this?

1. I thought it would be fun to simulate naive server-side caching without using something like redis. In cases where an app sees the same request/data fetched often, we cache it so we don't have to fetch the file (profiles.json) again for a while.

_Note: Though this should only be for this particular instance, would rather use a separate service to periodically update data and store it into an actual db / cache_


## Architecture Overview

```
/configs
  config.json - contains environment variables for ports, ttl for our "cache", mainly for server configurations, but maybe used for both server and web
/data - where we move our profiles.json to fetch
/server - separate folder for server because we also had an accompanying web app
  /logs - morgan/winston error logging by day
    ...
    errors-2020-01-30.log
  /middleware
    params.js - middleware that returns an error if express-validator rules of each route fails
  /models
    base.js - base for our in-memory cache class object, takes in a ttl (minutes to live)
    index.js - where we wrap, expose, and initialize our models
    profiles.js - extended from base, has functions and logic to get/manipulate profiles data
  /routes
      /api - folder for app api incase we also had a folder for /admin apis we can separate it
        middleware.js - where we encapsulate all of our route middlware per routes
        index.js - where we export all of our different types of routes for /api
        profiles.routes.js - apis pertaining to profiles
  index.js - our main express app, configure global middleware and logging middlware, and initialize data sources
  logger.js - winston logger configuration
  /tests
    /api - tests for api
    /models - tests for models
/client - separate folder to hold the original create-react-app solution
  /src
    /components - our components sorted by feature
      /layout
        /header
          header.test.js - a simple snapshot test
          index.js - our main component logic
          styles.scss - our component styles
      /profile
        /card
      /search
        /card
      /shared
        /minimal-button
    /containers - can be pages/views
      /not-found
      /profile-page
      /search-page
    /core - aka common or shared functionality, may also contain services or types
      /store
        /actions
        /reducers

    app.js - our app, where we set the layout and the routing
    index.js - our main render, where we wrap our app with the provider 

```

## Concepts & Thoughts

* Server
  * `In-Memory Caching` - To be able to avoid saving data locally in the repo or fetching data per call, I decided to store it in memory using a "cache" that also have a time-to-live set by the config
    * The TTL is based on what I thought was valid for the data though this may be dangerous if the data was potentially too large
    * Usually, I would want to implement a separate service to request or maybe even poll data from these endpoints to store in a db/cache which this api would hit
  * `Loggers` - Winston and Morgan provide great resources for internal logging and request logging. Any errors on request (e.g. if there are no headers) will be logged in the log files. You will also see it in the terminal output.
* Client
  * I refactored the original/base repo so things would look more consistent throughout -- moving around styling, componenents
  * I went ahead and removed the original context provider in favor of redux to separate concerns a bit more
  * Testing - I've only added simple snapshot testing for components and containers; I would also like to have reducer/actions tests if time permitted.
  * I've also added a few touches such as skeletons if the web app runs on a slower network, basic error handling, and a 404.
