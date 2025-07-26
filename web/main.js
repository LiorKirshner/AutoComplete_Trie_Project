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
  const addWordInput = document.getElementById("wordInput");
  const feedbackMessage = document.getElementById("feedback-message");
  const prefixInput = document.getElementById("prefixInput");
  addBtn.addEventListener("click", () => {
    const word = addWordInput.value.trim().toLowerCase();

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
    addWordInput.value = ""; // נקה את הקלט
    updateWordCountDisplay();
  });

  const suggestions = document.getElementById("suggestions");
  prefixInput.addEventListener("input", (event) => {
    const currentValue = event.target.value;
    const suggestWords = trie.predictWords(currentValue);
    suggestions.innerHTML = "";
    for (let word of suggestWords) {
      const div = document.createElement("div");
      div.textContent = word.word + ` (${word.freq})`;
      suggestions.appendChild(div);
    }
  });
  updateWordCountDisplay();
});

document;
