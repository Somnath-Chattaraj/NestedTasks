"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Position,
    Background,
    Controls,
    MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TaskNode, { TaskNodeData } from "./TaskNode";
import { NestedTask } from "./dashboardTable";

const nodeTypes = {
    task: TaskNode,
};

const NODE_WIDTH = 250;
const NODE_HEIGHT = 100;
const X_SPACING = 350; // Horizontal space between levels
const Y_SPACING = 180; // Vertical space between siblings

// Simple layout function that positions nodes based on depth (x) and a running y counter
// This ensures no overlap but might not be the most compact tree
const getLayoutElements = (
    tasks: NestedTask[],
    rootX = 0,
    rootY = 0
): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let globalY = rootY;

    const traverse = (task: NestedTask, depth: number) => {
        const position = { x: depth * X_SPACING, y: globalY };
        globalY += Y_SPACING;

        nodes.push({
            id: task.id,
            type: "task",
            position,
            data: { task } as TaskNodeData, // We'll patch handlers later
        });

        if (task.parentId) {
            edges.push({
                id: `${task.parentId}-${task.id}`,
                source: task.parentId,
                target: task.id,
                type: "smoothstep",
                animated: true,
            });
        }

        if (task.children) {
            task.children.forEach((child) => traverse(child, depth + 1));
        }
    };

    tasks.forEach((task) => traverse(task, 0));

    return { nodes, edges };
};

type Props = {
    tasks: NestedTask[];
    onTaskUpdate: (task: NestedTask, title: string, description: string) => void;
    onTaskDelete: (taskId: string) => void;
    onTaskAdd: (parentId: string, title?: string, desc?: string) => void;
};

export default function TaskFlow({ tasks, onTaskUpdate, onTaskDelete, onTaskAdd }: Props) {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    // Recalculate layout when tasks change
    useEffect(() => {
        const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(tasks);

        // Inject handlers into node data
        const nodesWithHandlers = layoutNodes.map(node => ({
            ...node,
            data: {
                ...node.data as any,
                onEdit: onTaskUpdate,
                onDelete: onTaskDelete,
                onAddChild: (parentId: string) => onTaskAdd(parentId, "New Subtask", "Description..."),
            }
        }));

        setNodes(nodesWithHandlers);
        setEdges(layoutEdges);
    }, [tasks, setNodes, setEdges, onTaskUpdate, onTaskDelete, onTaskAdd]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm bg-background">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-muted/10"
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}
