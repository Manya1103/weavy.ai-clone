import { Handle, Position, useStore, NodeProps } from 'reactflow';
import { memo } from 'react';

const TextNode = ({ id, data }: NodeProps) => {
  const isConnected = useStore((s) => s.edges.some((e) => e.target === id));

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl p-4 shadow-sm min-w-[240px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-purple-500" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Text Input</span>
      </div>
      
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-purple-500 border-2 border-white" />
      
      <textarea 
        className={`w-full p-2 text-sm rounded-md border outline-none transition-all resize-none
          ${isConnected ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-white border-slate-200 focus:border-purple-500'}`}
        placeholder={isConnected ? "Inherited from source..." : "Type text here..."}
        disabled={isConnected} // Rule: Disable manual input if connected
        rows={3}
      />

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500 border-2 border-white" />
    </div>
  );
};

export default memo(TextNode);