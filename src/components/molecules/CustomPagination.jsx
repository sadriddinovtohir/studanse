import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function CustomPagination({ setSearchParams, pagination }) {
    if (!pagination) return null;

    const {
        pageNumber,
        pageSize,
        totalElements,
        totalPages,
        hasNext,
        hasPrevious,
        first,
        last,
    } = pagination;

    const currentPage = pageNumber + 1;

    const goTo = (page) => {
        setSearchParams((prev) => {
            prev.set("page", String(page));
            return prev;
        });
    };

    const changeSize = (size) => {
        setSearchParams((prev) => {
            prev.set("size", size);
            prev.set("page", "1");
            return prev;
        });
    };

    return (
        <div className="flex items-center justify-between px-2 py-3">
            <p className="text-sm text-muted-foreground">
                Total data:{" "}
                <span className="font-medium text-foreground">
                    {totalElements}
                </span>
            </p>

            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                    {currentPage} / {totalPages}
                </span>

                <div className="flex items-center gap-1">
                    <Button
                        variant="link"
                        size="icon"
                        className="h-8 w-8"
                        disabled={first}
                        onClick={() => goTo(1)}
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="link"
                        size="icon"
                        className="h-8 w-8"
                        disabled={!hasPrevious}
                        onClick={() => goTo(currentPage - 1)}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="link"
                        size="icon"
                        className="h-8 w-8"
                        disabled={!hasNext}
                        onClick={() => goTo(currentPage + 1)}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="link"
                        size="icon"
                        className="h-8 w-8"
                        disabled={last}
                        onClick={() => goTo(totalPages)}
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={String(pageSize)} onValueChange={changeSize}>
                        <SelectTrigger className="h-8 w-16 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 50].map((n) => (
                                <SelectItem key={n} value={String(n)}>
                                    {n}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
