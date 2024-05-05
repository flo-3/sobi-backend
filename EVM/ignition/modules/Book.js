const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Book", (m) => {
  const book = m.contract("SobiBook", ["0x0A52E74194d8Dc7DDe6f77903c07eaf0A4D956BF"]);

  return { book };
});