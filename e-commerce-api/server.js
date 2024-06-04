const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

const E_COMMERCE_API_BASE_URL = "http://20.244.56.144/test/companies";
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

app.get('/', (req, res) => {
    res.send("Top Products HTTP Microservice");
});
