// code away!
require('dotenv').config();
const server = require('./server.js');
const defaults = require('./config/defaults');

server.listen(
  defaults.port, 
  () => console.log(`API running on port ${defaults.port}`)
);