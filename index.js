const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

// Parse JSON
app.use(bodyParser.json());

// Import routers
app.use('/account', require('./routes/account'));
app.use('/nft', require('./routes/nft'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})