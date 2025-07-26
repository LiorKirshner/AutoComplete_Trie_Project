import AutoCompleteTrie from "../trie/AutoCompleteTrie.js";
// 📄 web/main.js
const trie = new AutoCompleteTrie();

function updateWordCountDisplay() {
  const counterDiv = document.getElementById("wordCount");
  counterDiv.textContent = trie.wordCount;
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

  prefixInput.addEventListener("input", (event) => {
    const prefix = event.target.value.toLowerCase().trim();
    const suggestWords = trie.predictWords(prefix);
    suggestions.innerHTML = "";

    if (prefix === "" || suggestWords.length === 0) {
      suggestions.style.display = "none";
      return;
    }

    for (let item of suggestWords) {
      const wordStr = item.word;
      const boldPart = wordStr.slice(0, prefix.length);
      const restPart = wordStr.slice(prefix.length);

      const div = document.createElement("div");
      div.innerHTML = `<span class="highlight">${boldPart}</span>${restPart} <span class="freq">(${item.freq})</span>`;
      div.addEventListener("click", () => {
        prefixInput.value = wordStr;
        suggestions.style.display = "none";
        trie.incrementCount(wordStr); // 🔁 סימון שימוש
      });

      suggestions.appendChild(div);
    }

    suggestions.style.display = "block";
  });

  fetch("../data/defaultWords.json")
    .then((res) => res.json())
    .then((words) => {
      words.forEach((word) => trie.addWord(word));
      updateWordCountDisplay();
    })
    .catch((err) => {
      console.error("❌ Failed to load default words:", err);
      updateWordCountDisplay();
    });
  updateWordCountDisplay();
});

document;
