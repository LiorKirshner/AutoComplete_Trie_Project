const TrieNode = require("./TrieNode.js");
const printAllLetters = require("./trieUtils.js");

class AutoCompleteTrie {
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(char);
      }
      node = node.children[char];
    }
    node.endOfWord = true;
  }
  findWord(word) {}
}

let node1 = new AutoCompleteTrie();
node1.addWord("lior");
node1.addWord("liel");
node1.addWord("li");
node1.addWord("dani");

printAllLetters(node1);

module.exports = AutoCompleteTrie;
