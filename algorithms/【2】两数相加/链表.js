function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  !l1 && (l1 = new ListNode(0));
  !l2 && (l2 = new ListNode(0));

  let newNodeHead = new ListNode(0); // 新链表表头
  let cur = newNodeHead; // 新链表表头拷贝
  let cur1 = l1, // 运算数1，运算数2，进位标志（默认为0）
    cur2 = l2,
    carry = 0;

  while (cur1 || cur2) {
    // 求和
    let val1 = cur1 && cur1.val ? cur1.val : 0;
    let val2 = cur2 && cur2.val ? cur2.val : 0;
    let sum = val1 + val2 + carry;

    // 判断是否进位以及添加新单位
    carry = sum / 10 >= 1 ? 1 : 0;
    let newNode = new ListNode(sum % 10);
    cur = cur.next = newNode;

    // 继续向后计算，如果二者都为false则满足while停止条件
    if (cur1) cur1 = cur1.next;
    if (cur2) cur2 = cur2.next;
  }

  // 比如 5 + 5，结果为10,其进位的1因为cur1和cur2都为false而无法正常添加
  if (carry) {
    cur = cur.next = new ListNode(carry);
  }

  return newNodeHead.next;
};

let l1 = new ListNode(5);

let l2 = new ListNode(5);

console.log(addTwoNumbers(l1, l2));
