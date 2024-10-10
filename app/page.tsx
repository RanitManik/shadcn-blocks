"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Search, Component } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const mockComponents = [
    {
        id: 1,
        name: "Check-in Table Form",
        description:
            "A comprehensive and interactive table form for product check-ins, featuring dynamic tables, multi-store support, and detailed product information entry.",
        link: "/check-in",
    },
];

export default function ComponentGallery() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredComponents = mockComponents.filter(
        (component) =>
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
                        <h1 className="mb-4 text-3xl font-bold md:mb-0">
                            My shadcn Block Components
                        </h1>
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
                    </div>
                    <div className="relative mx-auto max-w-xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search components..."
                            className="w-full py-2 pl-12 pr-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {filteredComponents.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredComponents.map((component) => (
                            <Card
                                key={component.id}
                                className="flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Component className="mr-2 h-5 w-5 text-primary" />
                                        {component.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {component.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Link
                                        href={component.link}
                                        className="w-full"
                                    >
                                        <Button
                                            variant="default"
                                            className="w-full"
                                        >
                                            View Component
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <h2 className="mb-2 text-2xl font-semibold">
                            No components found
                        </h2>
                        <p className="text-muted-foreground">
                            Try adjusting your search term
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
