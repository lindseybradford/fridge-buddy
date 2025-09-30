interface ErrorBoundaryProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export const MainErrorFallback = ({ error, resetErrorBoundary }: ErrorBoundaryProps) => {
    return (
        <div
            className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong:</h2>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <div
                className="mt-4"
                onClick={() => resetErrorBoundary()}
            >
                Refresh
            </div>
        </div>
    );
};