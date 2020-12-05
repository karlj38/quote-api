const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get("/api/quotes/random", (req, res, next) => {
  const rand = getRandomElement(quotes);
  const data = {quote: rand}
  res.send(data);
});

app.get("/api/quotes", (req, res, next) => {
  if (!req.query.person) {
    res.send({quotes: quotes});
  } else {
      const found = quotes.filter(quote => quote.person === req.query.person);
    if (found.length) {
      const data = {quotes: found}
      res.send(data);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    quotes.push( {id: quotes.length, quote: req.query.quote, person: req.query.person});
    const quote = quotes[quotes.length -1];
    const data = {quote: quote};
    res.send(data);
  } else {
    res.sendStatus(400);
  }
});

app.put("/api/quotes", (req, res, next) => {
  console.log(req.query);
  const foundIndex = quotes.findIndex(quote => quote.id === Number(req.query.id));
  if (foundIndex >= 0) {
    const keys = Object.keys(req.query)
    keys.forEach(key => {
      quotes[foundIndex][key] = req.query[key];
    }) ;
    quotes[foundIndex].id = Number(req.query.id);
    const data = {quote: quotes[foundIndex]};
    console.log(data);
    res.send(data);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/api/quotes", (req, res, next) => {
  const foundIndex = quotes.findIndex(quote => quote.id === Number(req.query.id));
  if (foundIndex >= 0) {
    const deleted = quotes.splice(foundIndex, 1)[0];
    const data = {quote: deleted}
    res.status(200).send(data);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});