/**
 * Initialize your data structure here.
 */
 var Logger = function() {
  this.printingQueue = {};
};

/**
* Returns true if the message should be printed in the given timestamp, otherwise returns false.
      If this method returns false, the message will not be printed.
      The timestamp is in seconds granularity. 
* @param {number} timestamp 
* @param {string} message
* @return {boolean}
*/
Logger.prototype.shouldPrintMessage = function(timestamp, message) {
  if (this.printingQueue[message] === undefined) {
      this.printingQueue[message] = timestamp + 10;
      return true;
  }
  
  if (this.printingQueue[message] !== undefined) {
      let queuedTime = this.printingQueue[message];
      if (queuedTime <= timestamp) {
          this.printingQueue[message] = timestamp + 10;
          return true;
      }
  }
  
  return false;
};

/** 
* Your Logger object will be instantiated and called as such:
* var obj = new Logger()
* var param_1 = obj.shouldPrintMessage(timestamp,message)
*/