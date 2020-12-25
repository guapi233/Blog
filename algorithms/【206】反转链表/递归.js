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
  return reverse(null, head);
};

const reverse = (pre, cur) => {
  if (!cur) return pre;

  const temp = cur.next;
  cur.next = pre;

  return reverse(cur, temp);
};
