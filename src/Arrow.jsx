import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];



export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Inside your App component
const onNodeClick = (event, node) => {
  const newNodeId = (nodes.length + 1).toString(); // Generate a new unique ID for the child node
  const newNode = {
    id: newNodeId,
    position: { x: node.position.x + 100, y: node.position.y + 100 },
    data: { label: newNodeId },
  };

  // Update the nodes state to add the new child node
  setNodes((prevNodes) => [...prevNodes, newNode]);

  // Add an edge between the clicked node and the new child node
  setEdges((prevEdges) => [
    ...prevEdges,
    { id: `e${node.id}-${newNodeId}`, source: node.id, target: newNodeId },
  ]);
};


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
<ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  onNodeClick={onNodeClick} // Add this line to listen for node clicks
>
  <Controls />
  <MiniMap />
  <Background variant="dots" gap={12} size={1} />
</ReactFlow>

    </div>
  );
}
