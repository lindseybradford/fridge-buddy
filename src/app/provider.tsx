import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallback } from "@src/errors/main";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({children}: AppProviderProps) => {
    return (
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}