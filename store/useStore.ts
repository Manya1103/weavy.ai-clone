import { create } from 'zustand';
import { 
  Connection, Edge, EdgeChange, Node, NodeChange, 
  addEdge, OnNodesChange, OnEdgesChange, 
  applyNodeChanges, applyEdgeChanges 
} from 'reactflow';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  name: string;
  setName: (name: string) => void;
}

export const useStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ 
    edges: addEdge({ 
      ...connection, 
      animated: true, 
      style: { stroke: '#7C3AED', strokeWidth: 2 } // Animated purple edges
    }, get().edges) 
  }),
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  name: 'Untitled Workflow',
  setName: (name: string) => set({ name }),
}));