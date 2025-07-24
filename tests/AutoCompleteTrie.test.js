//const { describe } = require("node:test");
const AutoCompleteTrie = require("../trie/AutoCompleteTrie");
const {
  printAllLetters,
  _getRemainingTree,
  _allWordsHelper,
} = require("../trie/trieHelpers");

describe("addWord method", () => {
  let node1;
  beforeEach(() => {
    node1 = new AutoCompleteTrie();
  });
  test("add first word - (this) ", () => {
    node1.addWord("this");
    const firstKey = Object.keys(node1.root.children)[0];
    const firstChild = node1.root.children[firstKey];
    expect(firstChild.value).toBe("t");
  });

  test("add second word - (that) ", () => {
    node1.addWord("that");
    expect(
      node1.root.children["t"].children["h"].children["a"].children["t"]
        .endOfWord
    ).toBe(true);
  });

  test("add overlapping word - (thin) ", () => {
    node1.addWord("thin");
    expect(
      node1.root.children["t"].children["h"].children["i"].children["n"]
        .endOfWord
    ).toBe(true);
  });

  test("add prefix only - (th)", () => {
    node1.addWord("th");
    expect(node1.root.children["t"].children["h"].endOfWord).toBe(true);
  });

  test("add duplicate word - (this)", () => {
    node1.addWord("this");
    expect(
      node1.root.children["t"].children["h"].children["i"].children["s"]
        .endOfWord
    ).toBe(true);
  });

  test("validate intermediate nodes are not endOfWord if not intended", () => {
    node1.addWord("tree");
    expect(node1.root.children["t"].children["r"].endOfWord).toBe(false);
  });
});

describe("printAllLetters method", () => {
  let trie;
  let consoleSpy;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("hi");
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("prints structure of trie", () => {
    printAllLetters(trie);
    expect(consoleSpy).toHaveBeenCalled(); // בדיקה בסיסית
    // אפשר גם לבדוק קריאות ספציפיות
  });
});

describe("findWord method", () => {
  let node;
  beforeEach(() => {
    node = new AutoCompleteTrie();
    node.addWord("lior");
    node.addWord("li");
    node.addWord("ron");
  });

  test("lior should be a word", () => {
    let ans = node.findWord("lior");
    expect(ans).toBeTruthy();
  });
  test("sub-word - lio :should be FALSE", () => {
    let ans = node.findWord("lio");
    expect(ans).toBe(false);
  });

  test("existing prefix as full word (li)", () => {
    let ans = node.findWord("li");
    expect(ans).toBe(true);
  });

  test("non-existing word with common prefix", () => {
    let ans = node.findWord("lion");
    expect(ans).toBe(false);
  });

  test("empty string input should return false", () => {
    let ans = node.findWord("");
    expect(ans).toBe(false);
  });

  test("case sensitivity - different casing should return false", () => {
    let ans = node.findWord("Lior");
    expect(ans).toBe(false);
  });

  test("completely unrelated word", () => {
    let ans = node.findWord("banana");
    expect(ans).toBe(false);
  });
});

describe("_getRemainingTree function", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    trie.addWord("dog");
  });

  test("should return correct node for valid prefix", () => {
    const result = _getRemainingTree("ca", trie.root);
    expect(result.value).toBe("a");
    expect(Object.keys(result.children)).toEqual(
      expect.arrayContaining(["t", "r"])
    );
  });

  test("should return null for non-existing prefix", () => {
    const result = _getRemainingTree("cab", trie.root);
    expect(result).toBeNull();
  });

  test("should return the root node for empty prefix", () => {
    const result = _getRemainingTree("", trie.root);
    expect(result).toBe(trie.root);
  });

  test("should return node for complete word prefix", () => {
    const result = _getRemainingTree("dog", trie.root);
    expect(result.value).toBe("g");
    expect(result.endOfWord).toBe(true);
  });

  test("should return null for uppercase prefix if not in trie", () => {
    const result = _getRemainingTree("Dog", trie.root);
    expect(result).toBeNull();
  });
});

describe("_allWordsHelper method", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    trie.addWord("dog");
  });
  test("should collect all words in the trie", () => {
    let allWords = [];
    _allWordsHelper("", trie.root, allWords);
    expect(allWords).toEqual(expect.arrayContaining(["cat", "car", "dog"]));
    expect(allWords).toHaveLength(3);
  });

  test("should return only words with shared prefix", () => {
    const caNode = _getRemainingTree("ca", trie.root);
    const results = _allWordsHelper("ca", caNode, []);
    expect(results).toEqual(expect.arrayContaining(["cat", "car"]));
    expect(results).not.toContain("dog");
  });

  test("should return single word for exact match", () => {
    const dogNode = _getRemainingTree("dog", trie.root);
    const results = _allWordsHelper("dog", dogNode, []);
    expect(results).toEqual(["dog"]);
  });

  test("should return empty array if node is null", () => {
    const nullNode = _getRemainingTree("zzz", trie.root);
    const results = nullNode ? _allWordsHelper("zzz", nullNode, []) : [];
    expect(results).toEqual([]);
  });
});

describe("predictWords method", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    trie.addWord("dog");
    trie.addWord("card");
    trie.addWord("care");
    trie.addWord("lior");
    trie.addWord("li");
  });

  test("should return all completions for given prefix", () => {
    const result = trie.predictWords("ca");
    expect(result).toEqual(
      expect.arrayContaining(["cat", "car", "card", "care"])
    );
    expect(result).not.toContain("dog");
  });

  test("should return empty array for unknown prefix", () => {
    const result = trie.predictWords("zoo");
    expect(result).toBeNull();
  });

  test("should return all words starting with prefix 'li'", () => {
    const result = trie.predictWords("li");
    expect(result).toEqual(expect.arrayContaining(["li", "lior"]));
    expect(result).not.toContain("car");
  });

  test("should return empty array for empty trie", () => {
    const emptyTrie = new AutoCompleteTrie();
    const result = emptyTrie.predictWords("a");
    expect(result).toBeNull();
  });

  test("should return all words if prefix is empty", () => {
    const result = trie.predictWords("");
    expect(result).toEqual(
      expect.arrayContaining([
        "cat",
        "car",
        "card",
        "care",
        "dog",
        "li",
        "lior",
      ])
    );
  });
});
