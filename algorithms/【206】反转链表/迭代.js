/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let pre = null;
  let cur = head;

  while (head) {
    cur = head;
    head = head.next;
    cur.next = pre;
    pre = cur;
  }

  return cur;
};
