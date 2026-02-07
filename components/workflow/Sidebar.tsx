"use client";
import React from 'react';
import { Type, Image, Video, Cpu, Crop, Square, Search, Zap } from 'lucide-react';

const NODE_TYPES = [
  { type: 'textNode', label: 'Text Node', icon: Type },
  { type: 'imageNode', label: 'Upload Image', icon: Image },
  { type: 'videoNode', label: 'Upload Video', icon: Video },
  { type: 'llmNode', label: 'Run Any LLM', icon: Cpu },
  { type: 'cropNode', label: 'Crop Image', icon: Crop },
  { type: 'frameNode', label: 'Extract Frame', icon: Square },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 border-r bg-white p-4 flex flex-col gap-6 h-full">
      <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md">
        <Search size={16} className="text-slate-500" />
        <input type="text" placeholder="Search..." className="bg-transparent text-sm outline-none" />
      </div>
      <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Zap size={14} /> Quick Access
        </h3>
        <div className="space-y-2">
          {NODE_TYPES.map((node) => (
            <div
              key={node.type}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-500 cursor-grab transition-all"
              onDragStart={(e) => onDragStart(e, node.type)}
              draggable
            >
              <node.icon size={18} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-700">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}