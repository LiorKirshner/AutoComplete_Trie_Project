const TrieNode = require("../trie/TrieNode");
const {
  printAllLetters,
  _getRemainingTree,
  _allWordsHelper,
} = require("./trieHelpers.js");

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
  predictWords(prefix) {
    //Return: array of all possible completions
    //Example: prefix "ca" might return ["cat", "car", "card", "care"]
    let possibleCompletions = [];

    return possibleCompletions;
  }
}

module.exports = AutoCompleteTrie;
