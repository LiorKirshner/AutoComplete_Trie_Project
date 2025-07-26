class TrieNode {
  constructor(value = "") {
    this.value = value; // Character stored in this node
    this.children = {}; // Object to hold child nodes
    this.endOfWord = false; // Marks the end of a complete word
    this.frequency = 0; //hold the frequency of each word
  }
}

// תמיכה ב-Node.js
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = TrieNode;
} else {
  // תמיכה בדפדפן
  window.TrieNode = TrieNode;
}
