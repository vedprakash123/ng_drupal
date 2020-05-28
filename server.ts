import "zone.js/dist/zone-node";
import "reflect-metadata";
import { enableProdMode } from "@angular/core";
// Express Engine
import { ngExpressEngine } from "@nguniversal/express-engine";
// Import module map for lazy loading
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";

import * as express from "express";
import { join } from "path";
//import * as apiController from './src/controller/apiController';
const portalController = require("./src/controller/portal/portalController");
//import * as environment from "./environment.json";
import { readFileSync } from "fs";
var cors = require("cors");
var bodyParser = require("body-parser");
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 9091;
const DIST_FOLDER = join(process.cwd(), "dist");

const template = readFileSync(join(DIST_FOLDER, "browser", "index.html"), {
  encoding: "utf8"
}).toString();
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require("./dist/server/main");

/* Server-side rendering */
function angularRouter(req, res) {
  console.log("123");
  res.render(join(DIST_FOLDER, "browser", "index.html"), {
    req: req,
    res: res,
    providers: [
      {
        provide: "serverUrl",
        useValue: "http://localhost:9091"
      }
    ]
  });
}
app.get("/", angularRouter);

// Add headers
function setResponseHeader(res) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
}

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set("view engine", "html");
app.set("views", join(DIST_FOLDER, "browser"));

// Body-Parser
const MAX_SIZE_PAYLOAD = "1000mb";
app.use(bodyParser.json({ limit: MAX_SIZE_PAYLOAD }));
app.use(
  bodyParser.urlencoded({
    limit: MAX_SIZE_PAYLOAD,
    parameterLimit: 100 * 1000,
    extended: false
  })
);
// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
app.use(cors());
// Server static files from /browser
app.get(
  "*.*",
  express.static(join(DIST_FOLDER, "browser"), {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("/api/getContentDetails", (req, res) => {
  console.log("Api call");
  setResponseHeader(res);
  portalController.getApiDataFromDrupal(req, res);
});

// ALl regular routes use the Universal engine
app.get("*", angularRouter);
// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
