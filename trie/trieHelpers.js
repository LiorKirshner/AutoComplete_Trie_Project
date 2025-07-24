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

/**
 * Navigates to the last node of the given prefix.
 * @param {string} prefix - The prefix to search for in the trie.
 * @param {TrieNode} node - The starting node (usually trie.root).
 * @returns {TrieNode|null} - The node where the prefix ends, or null if the prefix is not found.
 *
 * Used by predictWords to find the subtree from which to start collecting completions.
 */
function _getRemainingTree(prefix, node) {
  let current = node;
  for (let char of prefix) {
    if (!current.children[char]) return null;
    current = current.children[char];
  }
  return current;
}

/**
 * Recursively collects all complete words from a given node.
 * @param {string} prefix - The prefix built so far.
 * @param {TrieNode} node - The current node in the trie.
 * @param {string[]} allWords - The array to store found complete words.
 *
 * Called by predictWords to explore all paths starting from a node.
 * Adds full words to allWords when endOfWord is true.
 */
function _allWordsHelper(prefix, node, allWords) {
  // TODO: implement recursive collection of words
}

module.exports = {
  printAllLetters,
  _getRemainingTree,
  _allWordsHelper,
};
