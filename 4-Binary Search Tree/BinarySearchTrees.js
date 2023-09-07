import createNode from './node.js';
import mergeSort from '../2-Merge sort/mergeSort.js';
import prettyPrint from './prettyPrint.js';
import randomArray from './randomArray.js';

function MakeBST(array) {
   let tree = {};

   tree.buildTree = (
      array = tree.sortedArray,
      start = 0,
      end = array.length - 1
   ) => {
      if (start > end) return null;

      let mid = parseInt((start + end) / 2);
      let node = createNode(array[mid]);

      node.right = tree.buildTree(array, mid + 1, end);
      node.left = tree.buildTree(array, start, mid - 1);

      return node;
   };

   tree.sortedArray = array.length > 0 ? mergeSort(array) : null;
   tree.root = tree.sortedArray ? tree.buildTree() : null;

   tree.insert = (value) => {
      const insertNode = (value, currentNode) => {
         if (currentNode === null) {
            currentNode = createNode(value);
            return currentNode;
         }
         if (value > currentNode.data) {
            currentNode.right = insertNode(value, currentNode.right);
         } else if (value < currentNode.data) {
            currentNode.left = insertNode(value, currentNode.left);
         }
         return currentNode;
      };
      tree.root = insertNode(value, tree.root);
   };

   tree.delete = (value) => {
      function deleteNode(value, root) {
         if (root === null) return root;
         if (value > root.data) {
            root.right = deleteNode(value, root.right);
         } else if (value < root.data) {
            root.left = deleteNode(value, root.left);
         } else {
            if (root.left !== null && root.right !== null) {
               function findMin(node) {
                  if (node.left == null) return node.data;
                  return findMin(node.left);
               }
               let minRight = findMin(root.right);
               root.data = minRight;
               root.right = deleteNode(root.data, root.right);
            } else if (root.left == null) {
               root = root.right;
            } else if (root.right == null) {
               root = root.left;
            }
         }

         return root;
      }

      tree.root = deleteNode(value, tree.root);
   };

   tree.find = (value, root = tree.root) => {
      if (root === null) return 'Value non found';
      if (root.data === value) return root;

      if (value > root.data) {
         root = tree.find(value, root.right);
      } else if (value < root.data) {
         root = tree.find(value, root.left);
      }
      return root;
   };

   // recursive levelOrder
   tree.levelOrder = (callBack) => {
      let queue = [];
      queue.push(tree.root);
      let array = [];

      const levelOrderRec = (node) => {
         if (node === null) return;
         else if (queue.length > 0) {
            let currentNode = queue.shift();

            callBack ? callBack(currentNode) : array.push(currentNode.data);

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
            levelOrderRec(queue[0]);
         }
         if (!callBack) return array;
      };

      return levelOrderRec(queue[0]);
   };

   // non recursive levelOrder
   tree.levelOrder2 = (callBack) => {
      if (tree.root === null) return;
      let queue = [];
      queue.push(tree.root);
      let array = [];

      while (queue.length > 0) {
         let currentNode = queue.shift();
         callBack ? callBack(currentNode) : array.push(currentNode.data);
         if (currentNode.left !== null) queue.push(currentNode.left);
         if (currentNode.right !== null) queue.push(currentNode.right);
      }

      if (!callBack) return array;
   };

   tree.inOrder = (callBack, currentNode = tree.root, array = []) => {
      if (currentNode === null) return;

      if (currentNode.left !== null)
         tree.inOrder(callBack, currentNode.left, array);
      callBack ? callBack(currentNode) : array.push(currentNode.data);
      if (currentNode.right !== null)
         tree.inOrder(callBack, currentNode.right, array);

      if (!callBack) return array;
   };

   tree.preOrder = (callBack, currentNode = tree.root, array = []) => {
      if (currentNode === null) return;
      callBack ? callBack(currentNode) : array.push(currentNode.data);
      if (currentNode.left !== null)
         tree.preOrder(callBack, currentNode.left, array);
      if (currentNode.right !== null)
         tree.preOrder(callBack, currentNode.right, array);

      if (!callBack) return array;
   };

   tree.postOrder = (callBack, currentNode = tree.root, array = []) => {
      if (currentNode === null) return;

      if (currentNode.left !== null)
         tree.postOrder(callBack, currentNode.left, array);
      if (currentNode.right !== null)
         tree.postOrder(callBack, currentNode.right, array);

      callBack ? callBack(currentNode) : array.push(currentNode.data);

      if (!callBack) return array;
   };

   tree.hight = (value) => {
      let hight = -1;

      function nodeHight(root, value) {
         if (root === null) return -1;

         let hightLeft = nodeHight(root.left, value);
         let hightRight = nodeHight(root.right, value);
         let currentHight = Math.max(hightLeft, hightRight) + 1;

         if (root.data === value) hight = currentHight;
         return currentHight;
      }
      nodeHight(tree.root, value);
      return hight;
   };

   // height using find function and passing the found node to the nodeHight helper function
   tree.hight2 = (value) => {
      let node = tree.find(value);

      function nodeHight(root, hight = 0) {
         if (root === null) return -1;
         else {
            let hightLeft = nodeHight(root.left, hight);
            let hightRight = nodeHight(root.right, hight);
            hight = Math.max(hightLeft, hightRight) + 1;
         }
         return hight;
      }
      return nodeHight(node);
   };

   tree.depth = (value, root = tree.root, depth = 0) => {
      if (root === null) return 'Node not found';
      if (root.data === value) return depth;
      else if (value > root.data) {
         depth = tree.depth(value, root.right, depth + 1);
      } else if (value < root.data) {
         depth = tree.depth(value, root.left, depth + 1);
      }

      return depth;
   };

   // isBalanced my solution
   tree.isBalanced2 = () => {
      let result = true;
      function getHeight(root, height = -1) {
         if (root === null) return -1;

         let hightLeft = getHeight(root.left);
         let hightRight = getHeight(root.right);
         height = Math.max(hightLeft, hightRight) + 1;

         if (Math.abs(hightLeft - hightRight) > 1) {
            result = false;
         }
         return height;
      }
      getHeight(tree.root);
      return result;
   };

   // inspired from geeks4geeks
   tree.isBalanced = (root = tree.root) => {
      function getHeight(root) {
         if (root == null) return 0;
         return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
      }

      if (root === null) return true;

      let hightLeft = getHeight(root.left);
      let hightRight = getHeight(root.right);

      if (
         Math.abs(hightLeft - hightRight) <= 1 &&
         tree.isBalanced(root.left) &&
         tree.isBalanced(root.right)
      ) {
         return true;
      }
      return false;
   };

   tree.rebalance = () => {
      tree.sortedArray = tree.inOrder();
      tree.root = tree.buildTree();
   };

   return tree;
}

//testing

let array = randomArray(100, 50, 150);

let myTree = MakeBST(array);

prettyPrint(myTree.root);
console.log(myTree.isBalanced());
console.log(myTree.preOrder(), myTree.inOrder(), myTree.postOrder());

let array2 = randomArray(100, 0, 200);

array2.forEach((num) => {
   myTree.insert(num);
});

prettyPrint(myTree.root);
console.log(myTree.isBalanced());

myTree.rebalance();
prettyPrint(myTree.root);
console.log(myTree.isBalanced());
console.log(myTree.preOrder(), myTree.inOrder(), myTree.postOrder());

function logValue(node) {
   console.log(node.data);
}

myTree.inOrder(logValue);

// console.log(myTree.levelOrder(log));
// console.log(myTree.levelOrder());

// console.log(myTree.levelOrder2(log));
// console.log(myTree.levelOrder2());

// console.table([myTree.preOrder(), myTree.inOrder(), myTree.postOrder()]);
// console.table(myTree.inOrder());
// console.table(myTree.postOrder());

// console.log(myTree.hight(36));
// console.log(myTree.hight2(36));
// console.log(myTree.depth(6345));
// console.log(myTree.depth(253));

// console.log(myTree.isBalanced());
// console.log(myTree.isBalanced2());

// myTree.rebalance();

// prettyPrint(myTree.root);
// console.log(myTree.isBalanced());
// console.log(myTree.isBalanced2());
