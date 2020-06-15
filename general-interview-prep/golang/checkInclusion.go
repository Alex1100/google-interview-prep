// var checkInclusion = function(s1, s2) {
//     let start = 0;
//     let charsLeft = s1.length;
//
//     //Create dictionary from s1
//     let dic = {};
//     for (let i = 0; i < s1.length; i++) {
//         dic[s1[i]] = (dic[s1[i]] || 0) + 1;
//     }
//
//
//     //Iterate s2
//     for (let i = 0; i < s2.length; i++) {
//
//         //Decrease char in dictionary and check for completion
//         if (--dic[s2[i]] >= 0 && --charsLeft === 0) return true;
//
//         //check if window is broken
//         while (start <= i && (isNaN(dic[s2[i]]) || dic[s2[i]] < 0)) {
//             if (++dic[s2[start++]] > 0) charsLeft++;
//         }
//
//     }
//
//     return false;
// };
