'use client';

import { useState, useTransition } from 'react';
import { useStore } from '@/store/useStore';
import { saveWorkflowAction } from '@/app/actions/workflow';
import { Save, Loader2, ChevronLeft } from 'lucide-react';

export default function Header() {
  const { nodes, edges, name, setName } = useStore();
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await saveWorkflowAction({ name, nodes, edges });
        // Optional: Add a success toast here
      } catch (error) {
        console.error("Save failed:", error);
      }
    });
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 z-20">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={20} className="text-slate-500" />
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Untitled Workflow"
          className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-purple-100 rounded px-2 transition-all"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-all"
      >
        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {isPending ? 'Saving...' : 'Save Workflow'}
      </button>
    </header>
  );
}