'use client';
import { Handle, Position, NodeProps } from 'reactflow';
import { Video, PlayCircle } from 'lucide-react';
import { memo } from 'react';

const VideoNode = ({ data }: NodeProps) => {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm min-w-[240px] hover:border-purple-400 transition-colors">
      <div className="bg-slate-50 p-2 border-b border-slate-100 flex items-center gap-2">
        <Video size={14} className="text-purple-600" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Video Upload</span>
      </div>

      <div className="p-4 flex flex-col items-center justify-center min-h-[120px] bg-slate-900">
        {data.videoUrl ? (
          <video src={data.videoUrl} className="w-full h-32 object-cover" controls />
        ) : (
          <PlayCircle size={32} className="text-slate-600" />
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500 border-2 border-white" />
    </div>
  );
};

export default memo(VideoNode);