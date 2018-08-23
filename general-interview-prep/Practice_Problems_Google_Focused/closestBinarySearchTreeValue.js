/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 */
const closestValue = (root, target, currentDistance = Infinity, closestNode = Infinity) => {
    if (root === null) {
        return;
    }

    let tempDistance;

    if (root.val > target) {
        if (target > root.val) {
            tempDistance = target - root.val;
        } else {
            tempDistance = root.val - target;
        }

        Math.min(currentDistance, tempDistance) !== currentDistance ?
            closestNode = root.val :
            closestNode = closestNode;

        currentDistance = Math.min(currentDistance, tempDistance);

        if (root.left) {
            closestNode = closestValue(root.left, target, currentDistance, closestNode);
        }
    } else if (root.val < target) {
        if (target > root.val) {
            tempDistance = target - root.val;
        } else {
            tempDistance = root.val - target;
        }

        Math.min(currentDistance, tempDistance) !== currentDistance ?
            closestNode = root.val :
            closestNode = closestNode;

        currentDistance = Math.min(currentDistance, tempDistance);

        if (root.right) {
            closestNode = closestValue(root.right, target, currentDistance, closestNode);
        }
    } else if (root.val === target) {
        return target;
    }

    return closestNode;
};
