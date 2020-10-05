/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head) return false;

  let quicker = (slower = head);

  while (quicker) {
    // 如果 快指针 达到终点，则无环
    if (!quicker.next) return false;

    // 快指针每次跑 2 步，慢指针每次跑 1 步
    quicker = quicker.next.next;
    slower = slower.next;

    // 如果快指针反倒追上了慢指针，说明有环
    if (quicker === slower) return true;
  }

  return false;
};
