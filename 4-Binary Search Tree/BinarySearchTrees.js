import createNode from './node.js';
import mergeSort from '../2-Merge sort/mergeSort.js';

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
   return bst;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
   if (node === null) {
      return;
   }
   if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
   }
   console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
   if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
   }
};

let myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

myTree.insert(10);

prettyPrint(myTree.root);

myTree.delete(8);
myTree.delete(10);
prettyPrint(myTree.root);
console.log(myTree.find(125));
