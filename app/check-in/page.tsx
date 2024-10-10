"use client";

import { useState } from "react";
import { PlusCircle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Github } from "lucide-react";

interface Store {
    id: number;
    name: string;
    quantity: number;
}

interface ProductEntry {
    id: number;
    productName: string;
    stores: Store[];
    reason: string;
    usage: string;
    serialNumbersAdded: boolean;
}

const productOptions = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
];

const storeOptions = ["Store 1", "Store 2", "Store 3", "Store 4", "Store 5"];

const reasonOptions = [
    "New Stock",
    "Replacement",
    "Return",
    "Transfer",
    "Other",
];

export default function Page() {
    const [entries, setEntries] = useState<ProductEntry[]>([
        {
            id: 1,
            productName: "",
            stores: [{ id: 1, name: "", quantity: 0 }],
            reason: "",
            usage: "",
            serialNumbersAdded: false,
        },
    ]);

    const addEntry = () => {
        const newEntry: ProductEntry = {
            id:
                entries.length > 0
                    ? Math.max(...entries.map((e) => e.id)) + 1
                    : 1,
            productName: "",
            stores: [{ id: 1, name: "", quantity: 0 }],
            reason: "",
            usage: "",
            serialNumbersAdded: false,
        };
        setEntries([...entries, newEntry]);
    };

    const updateEntry = (
        id: number,
        field: keyof ProductEntry,
        value: string | boolean,
    ) => {
        setEntries(
            entries.map((entry) =>
                entry.id === id ? { ...entry, [field]: value } : entry,
            ),
        );
    };

    const addStore = (entryId: number) => {
        setEntries(
            entries.map((entry) =>
                entry.id === entryId
                    ? {
                          ...entry,
                          stores: [
                              ...entry.stores,
                              {
                                  id: entry.stores.length + 1,
                                  name: "",
                                  quantity: 0,
                              },
                          ],
                      }
                    : entry,
            ),
        );
    };

    const removeStore = (entryId: number, storeId: number) => {
        const entry = entries.find((e) => e.id === entryId);
        if (entry && entry.stores.length > 1) {
            setEntries(
                entries.map((entry) =>
                    entry.id === entryId
                        ? {
                              ...entry,
                              stores: entry.stores.filter(
                                  (store) => store.id !== storeId,
                              ),
                          }
                        : entry,
                ),
            );
        } else {
            toast({
                variant: "destructive",
                title: "Action Not Allowed",
                description:
                    "You must have at least one store for each entry. Please add a store before attempting to delete.",
            });
        }
    };

    const updateStore = (
        entryId: number,
        storeId: number,
        field: keyof Store,
        value: string | number,
    ) => {
        setEntries(
            entries.map((entry) =>
                entry.id === entryId
                    ? {
                          ...entry,
                          stores: entry.stores.map((store) =>
                              store.id === storeId
                                  ? { ...store, [field]: value }
                                  : store,
                          ),
                      }
                    : entry,
            ),
        );
    };

    const removeEntry = (id: number) => {
        if (entries.length > 1) {
            setEntries(entries.filter((entry) => entry.id !== id));
            return;
        }
        toast({
            variant: "destructive",
            title: "Action Not Allowed",
            description:
                "You must have at least one entry. Please add an entry before attempting to delete.",
        });
    };

    return (
        <div className="grid min-h-svh content-start duration-500 animate-in fade-in">
            <header className="flex w-full justify-between p-4">
                <p>Checkin using shadcn</p>
                <div className="flex gap-4">
                    <Link
                        target="_blank"
                        className="inline-flex h-10 items-center justify-center rounded border border-input bg-background px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                        href="https://github.com/RanitManik/shadcn-blocks"
                    >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Link>
                    <ModeToggle />
                </div>
            </header>
            <main>
                <Card className="mx-auto w-full max-w-4xl rounded-lg">
                    <CardHeader>
                        <CardTitle>General Check-In</CardTitle>
                        <CardDescription>
                            Please provide the necessary details for checking in
                            products.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea
                            type="always"
                            className="h-[400px] rounded-md border"
                        >
                            <div className="min-w-[1200px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">
                                                No.
                                            </TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Stores</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Reason</TableHead>
                                            <TableHead>Usage</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {entries.map((entry, index) => (
                                            <TableRow key={entry.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="min-w-[250px]">
                                                    <div className="flex gap-2">
                                                        <Select
                                                            value={
                                                                entry.productName
                                                            }
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                updateEntry(
                                                                    entry.id,
                                                                    "productName",
                                                                    value,
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select product" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {productOptions.map(
                                                                    (
                                                                        product,
                                                                    ) => (
                                                                        <SelectItem
                                                                            key={
                                                                                product
                                                                            }
                                                                            value={
                                                                                product
                                                                            }
                                                                        >
                                                                            {
                                                                                product
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                removeEntry(
                                                                    entry.id,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="min-w-[250px]">
                                                    <div className="space-y-2">
                                                        {entry.stores.map(
                                                            (store) => (
                                                                <div
                                                                    key={
                                                                        store.id
                                                                    }
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <Select
                                                                        value={
                                                                            store.name
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) =>
                                                                            updateStore(
                                                                                entry.id,
                                                                                store.id,
                                                                                "name",
                                                                                value,
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger className="flex-grow">
                                                                            <SelectValue placeholder="Select store" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {storeOptions.map(
                                                                                (
                                                                                    storeOption,
                                                                                ) => (
                                                                                    <SelectItem
                                                                                        key={
                                                                                            storeOption
                                                                                        }
                                                                                        value={
                                                                                            storeOption
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            storeOption
                                                                                        }
                                                                                    </SelectItem>
                                                                                ),
                                                                            )}
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <Button
                                                                        variant="destructive"
                                                                        size="icon"
                                                                        onClick={() =>
                                                                            removeStore(
                                                                                entry.id,
                                                                                store.id,
                                                                            )
                                                                        }
                                                                        className="px-2"
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            ),
                                                        )}
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                addStore(
                                                                    entry.id,
                                                                )
                                                            }
                                                            className="w-full"
                                                        >
                                                            <PlusCircle className="mr-2 h-4 w-4" />
                                                            Add Store
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="min-w-[150px] align-top">
                                                    <div className="w-full space-y-2">
                                                        {entry.stores.map(
                                                            (store) => (
                                                                <Input
                                                                    key={
                                                                        store.id
                                                                    }
                                                                    type="number"
                                                                    value={
                                                                        store.quantity
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        updateStore(
                                                                            entry.id,
                                                                            store.id,
                                                                            "quantity",
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            ),
                                                                        )
                                                                    }
                                                                    placeholder="Qty"
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="min-w-[250px]">
                                                    <Select
                                                        value={entry.reason}
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            updateEntry(
                                                                entry.id,
                                                                "reason",
                                                                value,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select reason" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {reasonOptions.map(
                                                                (reason) => (
                                                                    <SelectItem
                                                                        key={
                                                                            reason
                                                                        }
                                                                        value={
                                                                            reason
                                                                        }
                                                                    >
                                                                        {reason}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="min-w-[250px]">
                                                    <Input
                                                        placeholder="Describe Usage"
                                                        value={entry.usage}
                                                        onChange={(e) =>
                                                            updateEntry(
                                                                entry.id,
                                                                "usage",
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={
                                                            !entry.productName
                                                        }
                                                        onClick={() =>
                                                            updateEntry(
                                                                entry.id,
                                                                "serialNumbersAdded",
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        Add Serial Numbers
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4">
                        <Button
                            onClick={addEntry}
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                        >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add New Product
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
