class TrieNode {
  constructor(value = "") {
    this.value = value; // Character stored in this node
    this.children = {}; // Object to hold child nodes
    this.endOfWord = false; // Marks the end of a complete word
    this.frequency = 0; //hold the frequency of each word
  }
}

export default TrieNode;
