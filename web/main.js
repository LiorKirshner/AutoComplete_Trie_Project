import AutoCompleteTrie from "../trie/AutoCompleteTrie.js";
// 📄 web/main.js
const trie = new AutoCompleteTrie();
console.log("🔥 JS loaded!");
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("wordInput");
  const output = document.getElementById("output");
  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", () => {
    const word = input.value.trim().toLowerCase();

    if (!word) {
      output.textContent = "⚠️ Please enter a word.";
      return;
    }

    trie.addWord(word);
    output.textContent = `✅ "${word}" added to dictionary.`;
    input.value = ""; // נקה את הקלט
  });
});
