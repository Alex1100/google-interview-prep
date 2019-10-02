const firstMissingPositive = (nums) => {
    let lowWatermark = 1;

    const mapped = {};
    for (let i = 0; i < nums.length; i++) {
        mapped[nums[i]] = true;
        if (nums[i] === lowWatermark) {
            while (mapped[lowWatermark]) {
                lowWatermark++;
            }
        }
    }
    return lowWatermark;
};
