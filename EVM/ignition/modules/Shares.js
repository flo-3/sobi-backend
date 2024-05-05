const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Shares", (m) => {
  const shares = m.contract("SobiShares", ["0x0A52E74194d8Dc7DDe6f77903c07eaf0A4D956BF"]);

  return { shares };
});