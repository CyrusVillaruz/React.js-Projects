import React, { useEffect, useRef } from "react";
import {
  drawBinaryTree,
  BinarySearchTreeNode,
  VisualizationType
} from "binary-tree-visualizer";

function BinaryTree({ nodes }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && nodes.length > 0) {
      const [firstEl] = nodes;
      const root = new BinarySearchTreeNode(firstEl);
      nodes.forEach((num) => root.insert(num));

      drawBinaryTree(root, canvasRef.current, {
        type: VisualizationType.PRETTY,
        maxWidth: window.innerWidth,
        maxHeight: 0
      });
    }
  }, [canvasRef, nodes]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default BinaryTree;
