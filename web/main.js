import AutoCompleteTrie from "../trie/AutoCompleteTrie.js";
// 📄 web/main.js
const trie = new AutoCompleteTrie();

function updateWordCountDisplay() {
  const count = trie.wordCount;
  const counterDiv = document.getElementById("wordCount");
  counterDiv.textContent = `📊 Total words in dictionary: ${count}`;
}

console.log("🔥 JS loaded!");
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const input = document.getElementById("wordInput");
  const feedbackMessage = document.getElementById("feedback-message");

  addBtn.addEventListener("click", () => {
    const word = input.value.trim().toLowerCase();

    if (!word) {
      feedbackMessage.innerHTML = `<div class="error-message">⚠️ Cannot add empty word`;
      return;
    }

    const added = trie.addWord(word);
    if (added && trie.findWord(word)) {
      feedbackMessage.innerHTML = `<div class="success-message">✅ "${word}" added to dictionary.</div>`;
    } else {
      feedbackMessage.innerHTML = `<div class="error-message">⚠️ "${word}" already exists in the dictionary.</div>`;
    }
    input.value = ""; // נקה את הקלט
    updateWordCountDisplay();
  });

  updateWordCountDisplay();
});
