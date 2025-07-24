# 🔤 Autocomplete Trie Project

A simple autocomplete application built with **JavaScript**, **HTML**, and **CSS**, using a **Trie (Prefix Tree)** data structure.  
It suggests word completions based on user input – just like a search engine.

---

## 📁 Project Structure

```
autocomplete-trie/
│
├── index.html              # Main HTML file – contains the input field and result container
├── style.css               # Styling for the user interface
├── main.js                 # Connects Trie logic with the DOM and handles input events
│
├── trie/                   # Trie data structure logic
│   ├── Trie.js             # Trie class – handles insertion, search, and autocomplete
│   └── TrieNode.js         # TrieNode class – represents a character node in the tree
│
├── data/                   # Word list for populating the Trie
│   └── words.txt           # Text file or JSON containing words
│
├── assets/                 # Static assets (images, icons, fonts)
│   └── logo.png            # Example asset (replace with your actual files)
│
├── tests/                  # Optional test files
│   ├── testTrie.js         # Tests for the Trie logic
│   └── testAutocomplete.js # Tests for the autocomplete functionality
│
├── README.md               # Project documentation (this file)
└── .gitignore              # Specifies intentionally untracked files to ignore by Git
```

---

## 📦 Folder Descriptions

| Folder/File       | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `index.html`      | Main entry point – includes search input and results container              |
| `style.css`       | Custom styles for layout, fonts, and autocomplete suggestion box            |
| `main.js`         | Loads words into the Trie and handles user typing + DOM manipulation        |
| `trie/`           | Modular Trie and TrieNode classes used for building and searching the tree  |
| `data/`           | List of words to build the Trie (can use `.txt`, `.json`, or fetch from API)|
| `assets/`         | Static assets such as icons, logos, or background images                    |
| `tests/`          | Contains test files for validating your code logic                          |
| `README.md`       | Overview and structure of the project (you’re reading it!)                  |
| `.gitignore`      | Prevents uploading of temporary or unnecessary files to GitHub              |

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/liorkirshner/autocomplete-trie.git
   ```
2. Open `index.html` in your browser.
3. Start typing in the input field and watch autocomplete in action!

---

## 🧠 Built With

- HTML + CSS
- JavaScript (ES6+)
- Trie data structure

---

## 📌 Future Improvements

- Add dark/light theme toggle  
- Connect to a real-time dictionary API  
- Use localStorage for saving frequently used words  
- Mobile responsiveness

---

## 👤 Author

Created by **[Your Name](https://github.com/your-username)** – feel free to fork, contribute or suggest ideas!
