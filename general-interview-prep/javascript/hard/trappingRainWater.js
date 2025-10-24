// Given n non-negative integers representing an elevation map where the width of each bar is 1, 
// compute how much water it can trap after raining.

// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
// In this case, 6 units of rain water are being trapped.

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

const trap = (height) => {
  if (!height || height.length === 0) {
      return 0;
  }

  let water = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMost = 0;
  let rightMost = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] < leftMost) {
        water += leftMost - height[left];
      } else {
        leftMost = height[left];
      }
      left++;
    } else {
      if (height[right] < rightMost) {
        water += rightMost - height[right];
      } else {
        rightMost = height[right];
      }
      right--;
    }
  }

  return water;
};
