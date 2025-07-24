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

module.exports = printAllLetters;
