import TrieNode from "./TrieNode.js";
import {
  printAllLetters,
  _getRemainingTree,
  _allWordsHelper,
} from "./trieHelpers.js";

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
    if (node.endOfWord) {
      return false; // המילה כבר קיימת
    }
    node.endOfWord = true;
    return true;
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

    return wordsWithFreq;
  }

  incrementCount(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return 0; // מילה לא קיימת - לא עושים כלום
      node = node.children[char];
    }
    if (node.endOfWord) {
      node.frequency++; // רק אם זו מילה שלמה
    }
    return node.frequency;
  }
}

export default AutoCompleteTrie;
