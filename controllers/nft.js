const xrpl = require("xrpl");
const TRANSFER_FEE = 100;

const mintNFT = async (wallet, ipfsLink, nftTaxon) => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  let mintTxHash;

  try {
    const mintJsonTx = {
      TransactionType: "NFTokenMint",
      Account: wallet.address,
      URI: xrpl.convertStringToHex(ipfsLink),
      Flags: 8,
      TransferFee: TRANSFER_FEE,
      NFTokenTaxon: nftTaxon,
    };

    const mintPepared = await client.autofill(mintJsonTx);
    const mintSigned = wallet.sign(mintPepared);
    mintTxHash = await client.submitAndWait(mintSigned.tx_blob);
    console.log("NFT_MINT_RESULT", mintTxHash);
    return mintTxHash;
  } catch (e) {
    throw e;
  }
}


const mintBookNFT = async (req, res) => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const nftTaxon = req.body.nftTaxon || 0;
    const account_secret = req?.body?.account_secret;
    const ipfsLink = req?.body?.ipfsLink;
    if (!account_secret) {
      return res.status(400).json({ error: "account_secret is required" })
    }
    if (!nftTaxon) {
      return res.status(400).json({ error: "nftTaxon is required" })
    }
    if (!ipfsLink) {
      return res.status(400).json({ error: "ipfsLink is required for the metadata" })
    }
    const wallet = xrpl.Wallet.fromSeed(account_secret);
    const mintTxHash = await mintNFT(wallet, ipfsLink, nftTaxon);
    return res.json(mintTxHash);

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `Error sending transaction: ${e}` })
  }
}

const mintSharesNFT = async (req, res) => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    const nftTaxon = req.body.nftTaxon || 0;
    const account_secret = req?.body?.account_secret;
    const ipfsLink = req?.body?.ipfsLink;
    if (!account_secret) {
      return res.status(400).json({ error: "account_secret is required" })
    }
    if (!nftTaxon) {
      return res.status(400).json({ error: "nftTaxon is required" })
    }
    if (!ipfsLink) {
      return res.status(400).json({ error: "ipfsLink is required for the metadata" })
    }
    const wallet = xrpl.Wallet.fromSeed(account_secret);
    const mintTxHash = await mintNFT(wallet, ipfsLink, nftTaxon);
    return res.json(mintTxHash);

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `Error sending transaction: ${e}` })
  }
}

const getAccountNFT = async (req, res) => {
  try {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    let nfts = [];

    const account = req.params.account;
    nfts = await client.request({
      method: "account_nfts",
      account: account,
    });
    console.log(nfts);
    return res.json(nfts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `Error sending transaction: ${e}` })
  }
}


module.exports = {
  mintBookNFT,
  mintSharesNFT,
  getAccountNFT
}