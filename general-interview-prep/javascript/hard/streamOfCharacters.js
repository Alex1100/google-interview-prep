// https://leetcode.com/problems/stream-of-characters/description/

// Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings words.

// For example, if words = ["abc", "xyz"] and the stream added the four characters (one by one) 'a', 'x', 'y', and 'z', your algorithm should detect that the suffix "xyz" of the characters "axyz" matches "xyz" from words.

// Implement the StreamChecker class:

// StreamChecker(String[] words) Initializes the object with the strings array words.
// boolean query(char letter) Accepts a new character from the stream and returns true if any non-empty suffix from the stream forms a word that is in words.



// Constraints:

// 1 <= words.length <= 2000
// 1 <= words[i].length <= 200
// words[i] consists of lowercase English letters.
// letter is a lowercase English letter.
// At most 4 * 104 calls will be made to query.

// Put the words into a trie, and manage a set of pointers within that trie.


/**
 * @param {string[]} words
 */
var StreamChecker = function(words) {
  this.root = {};
  for (let w of words) {
    w = w.split('').reverse().join('');  
    let node = this.root;
    for (let c of w) {
      if (!node[c]) node[c] = {};
      node = node[c];
    }
    node.word = w;
  }
  this.letters = [];
};

/** 
* @param {character} letter
* @return {boolean}
*/
StreamChecker.prototype.query = function(letter) {
  this.letters.push(letter);
  let lookingIn = this.root;
  for(let i = this.letters.length-1; i >=0; i--) {
      if(lookingIn[this.letters[i]]) {
          lookingIn = lookingIn[this.letters[i]];
          if(lookingIn.word) return true;
      } else {
          return false;
      }
  }
  return false
};


/** 
* Your StreamChecker object will be instantiated and called as such:
* var obj = new StreamChecker(words)
* var param_1 = obj.query(letter)
*/