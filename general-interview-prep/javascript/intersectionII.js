/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function(nums1, nums2) {
  let res = []

  if (nums1.length < nums2.length) [nums1, nums2] = [nums2, nums1]

  for (let i = 0; i < nums1.length; i++) {
      if (nums2.includes(nums1[i])) {
          delete nums2[nums2.indexOf(nums1[i])]
          res.push(nums1[i])
      }
  }

  return res
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersect = function(nums1, nums2) {
    return nums1.filter(el => {
        if (nums2.includes(el)) {
            nums2.splice(nums2.indexOf(el), 1);
            return true;
        }
        return false;
    });    
};