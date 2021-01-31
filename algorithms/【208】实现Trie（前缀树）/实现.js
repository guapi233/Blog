/**
 * Initialize your data structure here.
 */
var Trie = function() {
    this.root = {};
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    const letters = word.split("");

    let node = this.root;

    for (let letter of letters) {
        if (node[letter]) node = node[letter];
        else node = node[letter] = {};
    }

    node.end = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word, passEnd) {
    const letters = word.split("");

    let node = this.root;

    for (let letter of letters) {
        if (node[letter]) node = node[letter];
        else return false;
    }

    return passEnd ?true :!!node.end;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return this.search(prefix, true);
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */