// Design an Expression Tree With Evaluate Function


/**
 * This is the interface for the expression tree Node.
 * You should not remove it, and you can define some classes to implement it.
 */

const addition = (x, y) => x + y;
const subtraction = (x, y) => y - x;
const multiplication = (x, y) => x * y;
const division = (x, y) => y / x;

var Node = function (val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;    
};

Node.prototype.evaluate = function () {
    if (Number.isInteger(this.val)) {
        return this.val;
    } else {
        return this.val(this.left.evaluate(), this.right.evaluate());
    }
};

/**
 * This is the TreeBuilder class.
 * You can treat it as the driver code that takes the postinfix input 
 * and returns the expression tree represnting it as a Node.
 */

class TreeBuilder{
	/**
     * @param {string[]} s
     * @return {Node}
     */
	buildTree(postfix) {
        const stack = [];
    
        postfix.forEach(p => {
          switch (p) {
            case '+': {
              stack.push(new Node(addition, stack.pop(), stack.pop()));
              break;
            }
            case '-': {
              stack.push(new Node(subtraction, stack.pop(), stack.pop()));
              break;
            }
            case '*': {
              stack.push(new Node(multiplication, stack.pop(), stack.pop()));
              break;
            }
            case '/': {
              stack.push(new Node(division, stack.pop(), stack.pop()));
              break;
            }
            default: {
              stack.push(new Node(parseInt(p)));
              break;
            }
          }
        });

        return stack[stack.length - 1];
	}
    
}

/**
 * Your TreeBuilder object will be instantiated and called as such:
 * var obj = new TreeBuilder();
 * var expTree = obj.buildTree(postfix);
 * var ans = expTree.evaluate();
 */