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
