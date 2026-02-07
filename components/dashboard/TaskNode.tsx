"use client";

import { Handle, Position } from "@xyflow/react";
import { NestedTask } from "./dashboardTable";
import {
    PencilSimple,
    Trash,
    Plus,
    DotsThree,
    Check,
    Folder,
    File,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// We'll use the same props structure as NodeProps usually provides 'data'
export type TaskNodeData = {
    task: NestedTask;
    onEdit: (task: NestedTask, newTitle: string, newDesc: string) => void;
    onDelete: (taskId: string) => void;
    onAddChild: (parentId: string) => void;
};

export default function TaskNode({ data }: { data: TaskNodeData }) {
    const { task, onEdit, onDelete, onAddChild } = data;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);

    const handleSave = () => {
        onEdit(task, editTitle, editDescription);
        setIsEditing(false);
    };

    return (
        <div className="group relative min-w-[250px] max-w-[300px] bg-card text-card-foreground rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow">
            {/* Handles for flow connections */}
            <Handle
                type="target"
                position={Position.Top}
                className="!bg-muted-foreground w-3 h-3"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                className="!bg-muted-foreground w-3 h-3"
            />

            {isEditing ? (
                <div className="space-y-2">
                    <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="h-8 font-medium"
                        placeholder="Task title"
                        autoFocus
                    />
                    <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="text-sm min-h-[60px]"
                        placeholder="Description (optional)"
                    />
                    <div className="flex gap-2 justify-end">
                        <Button size="sm" onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                {task.children && task.children.length > 0 ? (
                                    <Folder size={18} weight="duotone" />
                                ) : (
                                    <File size={18} weight="duotone" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm leading-tight">
                                    {task.title}
                                </h3>
                                <p className="text-[10px] text-muted-foreground">
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-foreground"
                                >
                                    <DotsThree size={16} weight="bold" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                    <PencilSimple className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onAddChild(task.id)}>
                                    <Plus className="mr-2 h-4 w-4" /> Add Subtask
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => onDelete(task.id)}
                                >
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-3">
                            {task.description}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
