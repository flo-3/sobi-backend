const xrpl = require("xrpl");
require('dotenv').config();

const ACCOUNT_SECRET = process.env.ACCOUNT_SECRET;

// Fund an account with 10 XRP
const fundAccount = async (req, res) => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const account = req.body.account;
  const xrpIssuerWallet = xrpl.Wallet.fromSeed(ACCOUNT_SECRET);

  try {
    // send 10 XRP to the new account from the XRP issuer
    const sendJsonTx = {
      "TransactionType": "Payment",
      "Account": xrpIssuerWallet.address,
      "Amount": xrpl.xrpToDrops("10"),
      "Destination": account,
    };

    const sendPrepared = await client.autofill(sendJsonTx);
    const sendSigned = xrpIssuerWallet.sign(sendPrepared);
    const sendTxHash = await client.submitAndWait(sendSigned.tx_blob);
    console.log("SEND_RESULT", sendTxHash);

    const requestTx = await client.request({
      command: "account_info",
      account: account,
      ledger_index: "validated",
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `Error sending transaction: ${e}` })
  }

  return res.json({ success: true });

};

// Get information about an account
const getAccountInfo = async (req, res) => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  const account = req.params.account;

  try {
    const requestRsp = await client.request({
      command: "account_info",
      account: account,
      ledger_index: "validated",
    });
    return res.json(requestRsp);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `Error getting account info: ${e}` });
  }
}

module.exports = {
  fundAccount,
  getAccountInfo
};