/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  var p = [headA, headB]
  while(p[0] || p[1]) {
     if (p[0] === p[1]) return p[0]
     p = [p[0] ? p[0].next : headB, p[1] ? p[1].next : headA]
  }
};