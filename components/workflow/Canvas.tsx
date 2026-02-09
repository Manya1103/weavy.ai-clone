'use client';
import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../../store/useStore';
import TextNode from './nodes/TextNode';
import ImageNode from './nodes/ImageNode';
import VideoNode from './nodes/VideoNode';

const nodeTypes = { textNode: TextNode, imageNode: ImageNode, videoNode: VideoNode };

export default function Canvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useStore();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowWrapper.current) return;

    const position = { x: e.clientX - 300, y: e.clientY - 100 }; // Offset for sidebar
    addNode({ id: `${type}-${Date.now()}`, type, position, data: {} });
  }, [addNode]);

  return (
    <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="black" />
        <Controls position="bottom-left" />
        <MiniMap position="bottom-right" />
      </ReactFlow>
    </div>
  );
}