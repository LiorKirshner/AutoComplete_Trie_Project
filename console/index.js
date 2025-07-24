//console interface
const readline = require("readline");
const AutoCompleteTrie = require("../trie/AutoCompleteTrie");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const trie = new AutoCompleteTrie();

// 🟡 הצג הודעת פתיחה ופקודות
console.log("📚 Welcome to the AutoComplete Console Interface!");
console.log("Type 'help' to see available commands.\n");

function showCommands() {
  console.log(`Available commands:
  add <word>       - Add a word to the dictionary
  find <word>      - Check if word exists
  complete <prefix> - Show all completions for prefix
  help             - Show commands
  exit             - Quit the application
  `);
}

// 🔁 לולאת קלט
function prompt() {
  rl.question("> ", (input) => {
    const [command, ...args] = input.trim().split(" ");
    const argument = args.join(" ");

    switch (command.toLowerCase()) {
      case "add":
        if (argument) {
          trie.addWord(argument);
          console.log(`✔️ "${argument}" added.`);
        } else {
          console.log("⚠️ Please provide a word to add.");
        }
        break;

      case "find":
        if (argument) {
          const exists = trie.findWord(argument);
          console.log(exists ? "✅ Found." : "❌ Not found.");
        } else {
          console.log("⚠️ Please provide a word to find.");
        }
        break;

      case "complete":
        if (argument) {
          const results = trie.predictWords(argument) || [];
          console.log(
            "🔎 Completions:",
            results.length ? results : "No suggestions."
          );
        } else {
          console.log("⚠️ Please provide a prefix to complete.");
        }
        break;

      case "help":
        showCommands();
        break;

      case "exit":
        console.log("👋 Goodbye!");
        rl.close();
        return;

      default:
        console.log("❓ Unknown command. Type 'help' for a list of commands.");
    }

    prompt(); // חזור ללולאה
  });
}

// התחלה
showCommands();
prompt();
