const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static('../public'));

app.get('/', (req, res) => {
  res.send('hello from server');
});

app.listen(PORT, () => {
  // console.log(`server listening on localhost: ${PORT}`);
});
