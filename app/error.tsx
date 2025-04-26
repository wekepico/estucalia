'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <button
                onClick={reset}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Try again
            </button>
            <Link 
                href="/"
                className="text-blue-500 hover:text-blue-700"
            >
                Return Home
            </Link>
        </main>
    );
} 