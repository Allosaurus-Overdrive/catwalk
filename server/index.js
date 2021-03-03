const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const config = require('./config');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => {
  res.send('hello from server');
});

const options = {
  headers: {
    Authorization: config.TOKEN,
  },
};

app.get('/products/20111/styles', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111/styles', options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/products/20111', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111', options)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });
});

app.listen(PORT, () => {
  // console.log(`server listening on localhost: ${PORT}`);
});
