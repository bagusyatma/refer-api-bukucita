const express = require("express");
const fetch = require("node-fetch");
const port = 5000;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Custom-Header, Authorization");
  next();
});

const getCategories = async (req, res) => {
  fetch("https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories")
    .then(async (response) => {
      res.status(response.status).json(await response.json());
    })
    .catch(() => {
      res.status(404).json([]);
    });
};

const getBooks = async (req, res) => {
  const { categoryId, size, page } = req.query;

  let params = new URLSearchParams({ categoryId, size, page });

  fetch(`https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?` + params)
    .then(async (response) => {
      res.status(response.status).json(await response.json());
    })
    .catch(() => {
      res.status(404).json([]);
    });
};

app.get("/categories", getCategories);
app.get("/books", getBooks);

app.listen(port, host, () => console.log(`${host}:${port}`));
