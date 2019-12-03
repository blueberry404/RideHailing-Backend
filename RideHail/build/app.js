"use strict";
const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('App listening on port 8080!');
});
/*
npm run typeorm migration:run

For parameter:
npm run typeorm migration:generate -- -n migrationNameHere
*/
