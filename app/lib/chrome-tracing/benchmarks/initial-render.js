/* eslint-env node */
"use strict";
const InitialRenderBenchmark = require('chrome-tracing').InitialRenderBenchmark;

let benchmark = new InitialRenderBenchmark({
  name: "app initial render",
  url: "http://localhost:4200/?initial-render",
  endMarker: "renderEnd",
  iterations: 10,
  browser: {
    type: "canary"
  }
});

benchmark.run().then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
