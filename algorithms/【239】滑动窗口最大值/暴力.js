/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if (!nums.length) return [];
    const maxers = [];
    
    for (let i = 0; i <= nums.length - k; i++) {
        const slider = [nums[i]];
        for (let j = 0; j < k && j < nums.length; j++) {
            slider.push(nums[i + j]);
        }

        maxers.push(Math.max(...slider));
    }

    return maxers;
};