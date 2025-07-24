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

    let start_node = _getRemainingTree(prefix, this.root);
    if (!start_node) return [];

    const allWords = [];
    _allWordsHelper(prefix, start_node, allWords);

    const wordsWithFreq = allWords.map((word) => {
      let node = this.root;
      for (let char of word) {
        node = node.children[char];
      }
      return { word, freq: node.frequency };
    });

    wordsWithFreq.sort((a, b) => b.freq - a.freq); // 🔽 ממיין לפי תדירות

    return wordsWithFreq.map((w) => w.word);
  }
}

module.exports = AutoCompleteTrie;
