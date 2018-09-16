class Trie {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }

  addString(string) {
    if (!string) {
      throw new Error('Must pass in a string');
    }

    let stringCharCount = 0;
    let currentChar = string[stringCharCount];
    let currentTrieNode = this;

    while(currentChar) {
      if (!currentTrieNode.children[currentChar]) {
        currentTrieNode.children[currentChar] = new Trie();
      } else {
        currentTrieNode.endOfWord = false;
        currentTrieNode = currentTrieNode.children[currentChar];
        stringCharCount++;
        currentChar = string[stringCharCount];
      }
    }

    currentTrieNode.endOfWord = true;
  }

  contains(string) {
    let stringCharCount = 0;
    let currentChar = string[stringCharCount];
    let currentTrieNode = this;
    let keepSearching = true;

    while(currentChar) {
      if (currentTrieNode.children[currentChar] && stringCharCount !== string.length - 1) {
        currentTrieNode = currentTrieNode.children[currentChar];
        stringCharCount++;
        currentChar = string[stringCharCount];
      } else if (stringCharCount === string.length - 1) {
        return true;
      } else {
        return false;
      }
    }
  }
}


let trie = new Trie();

trie.addString('abc');
trie.addString('abra');
console.log(trie.children['a'].children['b'].children['c'].endOfWord);
trie.addString('abcd');
console.log(trie.children['a'].children['b'].children['c'].endOfWord);
console.log(trie.contains('abc'));
console.log(trie.contains('der'));
console.log(trie.contains('abra'))
console.log(trie.contains('abcd'))
trie.addString('hello world');
console.log(trie.contains('hello world'))
console.log(
  trie
  .children['h']
  .children['e']
  .children['l']
  .children['l']
  .children['o']
  .children[' ']
  .children['w']
  .children['o']
  .children['r']
  .children['l']
  .children['d']
)

