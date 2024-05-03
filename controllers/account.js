const xrpl = require("xrpl");

const ACCOUNT_SECRET = "sEdVR1BhyYNM3UbCH7WcphR2372uvnh";

// Fund an account with 10 XRP
const fundAccount = async (req, res) => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const account = req.body.account;
  console.log("ACCOUNT", account);
  const xrpIssuerWallet = xrpl.Wallet.fromSeed(ACCOUNT_SECRET);
  console.log("XRP_ISSUER_WALLET", xrpIssuerWallet.address);

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

    console.log("ACC_INFO", requestTx);
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
    console.log("ACC_INFO_RESULT", requestRsp);
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