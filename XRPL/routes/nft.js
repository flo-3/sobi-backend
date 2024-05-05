const express = require('express');
const router = express.Router();

const nftController = require('../controllers/nft');

// Mint a book NFT
router.post("/mint-book", nftController.mintBookNFT);
// Mint a share NFT
router.post("/mint-share", nftController.mintSharesNFT);
// Get all NFTs for an account
router.get("/account-info/:account", nftController.getAccountNFT);

module.exports = router;