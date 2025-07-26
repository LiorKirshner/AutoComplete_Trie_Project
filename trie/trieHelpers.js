const printAllLetters = function (trie) {
  function traverse(node, indent = "") {
    if (node.value) {
      console.log(indent + node.value + (node.endOfWord ? " *" : ""));
    }
    for (let char in node.children) {
      traverse(node.children[char], indent + "  ");
    }
  }
  traverse(trie.root);
};

function _getRemainingTree(prefix, node) {
  /**
   * Navigates to the last node of the given prefix.
   * @returns {TrieNode|null} - The node where the prefix ends, or null if the prefix is not found.
   * Used by predictWords to find the subtree from which to start collecting completions.
   */
  let current = node;
  for (let char of prefix) {
    if (!current.children[char]) return null;
    current = current.children[char];
  }
  return current;
}

function _allWordsHelper(prefix, node, allWords) {
  /**
   * Recursively collects all complete words from a given node.
   * @param {string} prefix - The prefix built so far.
   * @param {TrieNode} node - The current node in the trie.
   * @param {string[]} allWords - The array to store found complete words.
   *
   * Called by predictWords to explore all paths starting from a node.
   * Adds full words to allWords when endOfWord is true.
   */

  if (node.endOfWord) allWords.push(prefix);
  for (let char in node.children) {
    _allWordsHelper(prefix + char, node.children[char], allWords);
  }

  return allWords;
}

export { printAllLetters, _getRemainingTree, _allWordsHelper };
