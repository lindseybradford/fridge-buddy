import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export const MainErrorFallback = () => {
  const routeError = useRouteError();
  const navigate = useNavigate();

  const message = (() => {
    if (isRouteErrorResponse(routeError)) {
      return `${routeError.status} ${routeError.statusText}`;
    }
    if (routeError instanceof Error) {
      return routeError.message;
    }
    return "Unknown error";
  })();

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong:</h2>
      <pre style={{ color: "red" }}>{message}</pre>
      <button className="mt-4 underline" onClick={() => navigate(0)}>
        Refresh
      </button>
    </div>
  );
};
