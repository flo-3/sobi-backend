# Express XRPL Backend

This project is an Express.js backend that interacts with the XRPL blockchain. It provides functionalities to mint NFTs and fund accounts with XRPL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository
```bash
git clone https://github.com/flo-3/sobi-backend
```

2. Install dependencies
```bash
cd sobi-backend/XRPL
npm install
```

3. Copy the `.env.example` file and rename it to `.env`. Fill in the environment variables with your XRPL secret and address.
For production, you can also add the path to your SSL certificate and private key files. The `.env` file should look like this:
```bash
NODE_ENV=development  # development or production

# XRPL account credentials
ACCOUNT_PUBLIC=""
ACCOUNT_SECRET=""

# Production ssl certificate
PRIVATE_KEY_PATH=""
CERTIFICATE_PATH=""
```

4. Start the server
```bash
npm run start
```

## Built With

- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [xrpl.js](https://xrpl.org/) - XRPL JavaScript library
