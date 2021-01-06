/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let lastSmaller = smallerHead = new ListNode, lastLarger = largerHead = new ListNode;
    let temp = null;

    while (head) {
        temp = head.next;
        head.next = null;

        if (head.val < x) {
            lastSmaller.next = head;
            lastSmaller = head;
        } else {
            lastLarger.next = head;
            lastLarger = head;
        }

        head = temp;
    }

    lastSmaller.next = largerHead.next;

    return smallerHead.next;
};