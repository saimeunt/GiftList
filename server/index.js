const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();
console.log("MERKLE_ROOT", MERKLE_ROOT);

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const { proof, leaf } = body;

  // TODO: prove that a name is in the list
  // const isInTheList = false;
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
