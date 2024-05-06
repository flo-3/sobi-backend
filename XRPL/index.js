const express = require('express')
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = express()
const port = 3000
const bodyParser = require('body-parser');

// Parse JSON
app.use(bodyParser.json());

// Import routers
app.use('/account', require('./routes/account'));
app.use('/nft', require('./routes/nft'));


// Start the server
if (process.env.NODE_ENV === 'production') {
  // SSL certificate
  const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
  const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH, 'utf8');

  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log(`Server is running securely on port 443`);
  });

} else {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}