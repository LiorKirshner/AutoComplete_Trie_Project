const AutoCompleteTrie = require("../trie/AutoCompleteTrie");

describe("tests for addWord method", () => {
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

describe("printAllLetters function", () => {
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
    const printAllLetters = require("../trie/trieUtils");
    printAllLetters(trie);
    expect(consoleSpy).toHaveBeenCalled(); // בדיקה בסיסית
    // אפשר גם לבדוק קריאות ספציפיות
  });
});
