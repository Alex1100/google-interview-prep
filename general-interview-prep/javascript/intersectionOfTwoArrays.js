/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = (nums1, nums2) => {
  const seenValues = {}

  nums1.forEach(num=>{
    seenValues[num] = true
  })

  const result = []
  nums2.forEach(num=>{
    if(seenValues[num]) {
      result.push(num)
      seenValues[num] = false
    }
  })
  return result
};
