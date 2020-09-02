/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let mergedList = new ListNode(-1);

  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      mergedList.next = l1;
      l1 = l1.next;
    } else {
      mergedList.next = l2;
      l2 = l2.next;
    }
  }

  mergedList.next = l1 === null ? l2 : l1;

  return mergedList.next;
};
