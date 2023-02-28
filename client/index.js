const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

const merkleTree = new MerkleTree(niceList);

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const index = Math.floor(Math.random() * niceList.length);
  console.log("index", index);
  const proof = merkleTree.getProof(index);
  console.log("proof", proof);
  const leaf = niceList[index];
  console.log("leaf", leaf);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    leaf,
  });

  console.log({ gift });
}

main();
