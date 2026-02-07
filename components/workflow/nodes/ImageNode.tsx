'use client';
import { Handle, Position, NodeProps } from 'reactflow';
import { ImageIcon, UploadCloud } from 'lucide-react';
import { memo } from 'react';

const ImageNode = ({ data }: NodeProps) => {
  // Logic for the pulsating glow during upload will be connected to Trigger.dev later
  const isUploading = data.status === 'uploading';

  return (
    <div className={`bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm min-w-[240px] transition-all
      ${isUploading ? 'ring-2 ring-purple-500 animate-pulse' : 'hover:border-purple-400'}`}>
      
      <div className="bg-slate-50 p-2 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon size={14} className="text-purple-600" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Image Upload</span>
        </div>
      </div>

      <div className="p-4 flex flex-col items-center justify-center min-h-[120px] bg-slate-50/30">
        {data.imageUrl ? (
          <img src={data.imageUrl} alt="Upload" className="w-full h-32 object-cover rounded-md" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <UploadCloud size={24} />
            <span className="text-xs">Click to upload or drag image</span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-purple-500 border-2 border-white" />
    </div>
  );
};

export default memo(ImageNode);