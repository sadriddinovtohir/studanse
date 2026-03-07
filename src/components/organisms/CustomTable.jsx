import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit2, Trash2, Inbox } from "lucide-react";

export default function CustomTable({
    columns,
    data,
    onEdit,
    onDelete,
    isLoading = false,
}) {
    return (
        <div className="rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-white/5 dark:bg-black/20 hover:bg-white/10 dark:hover:bg-black/30">
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                className="font-semibold text-foreground/80"
                            >
                                {column.label}
                            </TableHead>
                        ))}
                        <TableHead className="font-semibold text-foreground/80">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading &&
                        [1, 2, 3, 4, 5].map((i) => (
                            <TableRow
                                key={i}
                                className="hover:bg-white/5 dark:hover:bg-black/20"
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        <Skeleton className="h-5 w-full" />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    {!isLoading && (!data || data.length === 0) && (
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={columns.length + 1}
                                className="py-16 text-center"
                            >
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Inbox className="w-8 h-8 opacity-40" />
                                    <span className="text-sm">
                                        Ma'lumot topilmadi
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}

                    {!isLoading &&
                        data?.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-white/5 dark:hover:bg-black/20"
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.key}>
                                        {column.key === "status" ||
                                        column.key === "userStatus" ? (
                                            <Badge
                                                className={`backdrop-blur-sm border rounded-xl ${
                                                    item[column.key] ===
                                                        "ACTIVE" ||
                                                    item[column.key] ===
                                                        "Active"
                                                        ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30"
                                                        : "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30"
                                                }`}
                                            >
                                                {item[column.key]}
                                            </Badge>
                                        ) : column.key === "isActive" ? (
                                            <Badge
                                                className={`backdrop-blur-sm border rounded-xl ${
                                                    item[column.key]
                                                        ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30"
                                                        : "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30"
                                                }`}
                                            >
                                                {item[column.key]
                                                    ? "Yes"
                                                    : "No"}
                                            </Badge>
                                        ) : column.key === "address" ||
                                          column.key === "description" ? (
                                            <span className="text-foreground/80 max-w-xs truncate block">
                                                {item[column.key] || "—"}
                                            </span>
                                        ) : (
                                            <span className="text-foreground/80">
                                                {item[column.key] ?? "—"}
                                            </span>
                                        )}
                                    </TableCell>
                                ))}

                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={() => onEdit(item.id)}
                                            className="h-8 w-8 p-0 rounded-lg border-white/20 dark:border-white/10 hover:bg-white/10 dark:hover:bg-white/5"
                                        >
                                            <Edit2 className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={() => onDelete(item.id)}
                                            className="h-8 w-8 p-0 rounded-lg border-red-500/30 hover:bg-red-500/10 text-red-500 hover:text-red-400"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
}
