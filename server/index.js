const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(PUBLIC_DIR));

app.get('/', (req, res) => {
  res.send('hello from server');
});

app.listen(PORT, () => {
  // console.log(`server listening on localhost: ${PORT}`);
});
