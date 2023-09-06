import createNode from './node.js';
import mergeSort from '../2-Merge sort/mergeSort.js';
import prettyPrint from './prettyPrint.js';

const buildTree = (array, start = 0, end = array.length - 1) => {
   if (start > end) return null;

   let mid = parseInt((start + end) / 2);
   let node = createNode(array[mid]);

   node.right = buildTree(array, mid + 1, end);
   node.left = buildTree(array, start, mid - 1);

   return node;
};

function Tree(array) {
   let bst = {};
   let sortedArray = array.length > 0 ? mergeSort(array) : null;

   bst.root = sortedArray ? buildTree(sortedArray) : null;

   bst.insert = (value) => {
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
      bst.root = insertNode(value, bst.root);
   };

   bst.delete = (value) => {
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

      bst.root = deleteNode(value, bst.root);
   };

   bst.find = (value, root = bst.root) => {
      if (root === null) return 'Value non found';
      if (root.data === value) return root;

      if (value > root.data) {
         root = bst.find(value, root.right);
      } else if (value < root.data) {
         root = bst.find(value, root.left);
      }
      return root;
   };

   // recursive levelOrder
   bst.levelOrder = (callBack) => {
      let queue = [];
      queue.push(bst.root);
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
   bst.levelOrder2 = (callBack) => {
      if (bst.root === null) return;
      let queue = [];
      queue.push(bst.root);
      let array = [];

      while (queue.length > 0) {
         let currentNode = queue.shift();
         callBack ? callBack(currentNode) : array.push(currentNode.data);
         if (currentNode.left !== null) queue.push(currentNode.left);
         if (currentNode.right !== null) queue.push(currentNode.right);
      }

      if (!callBack) return array;
   };

   bst.inOrder = (callBack, currentNode = bst.root, array = []) => {
      if (currentNode === null) return;

      if (currentNode.left !== null)
         bst.inOrder(callBack, currentNode.left, array);
      callBack ? callBack(currentNode) : array.push(currentNode.data);
      if (currentNode.right !== null)
         bst.inOrder(callBack, currentNode.right, array);

      if (!callBack) return array;
   };

   bst.preOrder = (callBack, currentNode = bst.root, array = []) => {
      if (currentNode === null) return;
      callBack ? callBack(currentNode) : array.push(currentNode.data);
      if (currentNode.left !== null)
         bst.preOrder(callBack, currentNode.left, array);
      if (currentNode.right !== null)
         bst.preOrder(callBack, currentNode.right, array);

      if (!callBack) return array;
   };

   bst.postOrder = (callBack, currentNode = bst.root, array = []) => {
      if (currentNode === null) return;

      if (currentNode.left !== null)
         bst.postOrder(callBack, currentNode.left, array);
      if (currentNode.right !== null)
         bst.postOrder(callBack, currentNode.right, array);

      callBack ? callBack(currentNode) : array.push(currentNode.data);

      if (!callBack) return array;
   };

   return bst;
}

let myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// myTree.insert(10);

// prettyPrint(myTree.root);

// myTree.delete(8);
// myTree.delete(10);
prettyPrint(myTree.root);
// console.log(myTree.find(324));

function logValue(node) {
   console.log(node.data);
}

// console.log(myTree.levelOrder(log));
// console.log(myTree.levelOrder());

// console.log(myTree.levelOrder2(log));
// console.log(myTree.levelOrder2());

console.table([myTree.preOrder(), myTree.inOrder(), myTree.postOrder()]);
// console.table(myTree.inOrder());
// console.table(myTree.postOrder());
