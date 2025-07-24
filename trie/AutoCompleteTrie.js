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
  findWord(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    console.log(
      `🔍 Does the word "${word}" exist in the trie? → ${node.endOfWord}`
    );
    return node.endOfWord;
  }
}

// let node1 = new AutoCompleteTrie();
// node1.addWord("lior");
// node1.addWord("liel");
// node1.addWord("li");
// node1.addWord("dani");

// printAllLetters(node1);
// node1.findWord("li");

module.exports = AutoCompleteTrie;
