/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  if (!head || !head.next) return head;
  let stash = [];

  while (head) {
    stash.push(head);
    const temp = head.next;
    head.next = null;

    head = temp;
  }

  stash.sort((a, b) => a.val - b.val).reduce((pre, cur) => (pre.next = cur));

  return stash[0];
};
