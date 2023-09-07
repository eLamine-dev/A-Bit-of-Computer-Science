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

   bst.hight = (value) => {
      let hight = -1;

      function nodeHight(root, value) {
         if (root === null) return -1;

         let hightLeft = nodeHight(root.left, value);
         let hightRight = nodeHight(root.right, value);
         let currentHight = Math.max(hightLeft, hightRight) + 1;

         if (root.data === value) hight = currentHight;
         return currentHight;
      }
      nodeHight(bst.root, value);
      return hight;
   };

   // height using find function and passing the found node to the nodeHight helper function
   bst.hight2 = (value) => {
      let node = bst.find(value);

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

   bst.depth = (value, root = bst.root, depth = 0) => {
      if (root === null) return 'Node not found';
      if (root.data === value) return depth;
      else if (value > root.data) {
         depth = bst.depth(value, root.right, depth + 1);
      } else if (value < root.data) {
         depth = bst.depth(value, root.left, depth + 1);
      }

      return depth;
   };

   // isBalanced my solution
   bst.isBalanced2 = () => {
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
      getHeight(bst.root);
      return result;
   };

   // inspired from geeks4geeks
   bst.isBalanced = (root = bst.root) => {
      function getHeight(root) {
         if (root == null) return 0;
         return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
      }

      if (root === null) return true;

      let hightLeft = getHeight(root.left);
      let hightRight = getHeight(root.right);

      if (
         Math.abs(hightLeft - hightRight) <= 1 &&
         bst.isBalanced(root.left) &&
         bst.isBalanced(root.right)
      ) {
         return true;
      }
      return false;
   };

   return bst;
}

let myTree = Tree([
   1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 32, 36, 40, 20, 85, 37, 6345, 324,
]);

// myTree.insert(21);

// prettyPrint(myTree.root);

myTree.delete(8);
myTree.delete(4);
// myTree.delete(1);
// myTree.delete(3);
myTree.delete(4);
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

// console.log(myTree.hight(36));
// console.log(myTree.hight2(36));
// console.log(myTree.depth(6345));
// console.log(myTree.depth(253));

console.log(myTree.isBalanced());
console.log(myTree.isBalanced2());
