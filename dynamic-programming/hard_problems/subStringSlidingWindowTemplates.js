function findSubstring(s){
        let map = {};
        for(let val of s){
            map[val] = ++map[val] || 1;
        }
        let counter; // check whether the substring is valid
        let begin = 0;
        let end = 0;
        //two pointers, one point to tail and one  head
        let d; //the length of substring

        for() { /* initialize the hash map here */ }

        while(end < s.length){

            if(map[s[end++]]-- /* condition here aka > 0 or < 0 or === 0 */){
              /* modify counter here */
            }

            while(/* counter condition */){

                 /* update d here if finding minimum*/

                //increase begin to make it invalid/valid again

                if(map[s[begin++]]++ /* condition here aka > 0 or < 0 or === 0 */){
                  /*modify counter here*/
                }
            }

            /* update d here if finding maximum*/
        }
        return d;
  }
