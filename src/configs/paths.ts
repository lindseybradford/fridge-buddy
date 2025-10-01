export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  register: {
    path: "/register",
    getHref: (redirectTo?: string | null | undefined) =>
      `/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  login: {
    path: "/login",
    getHref: (redirectTo?: string | null | undefined) =>
      `/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  fridges: {
    path: "/fridges",
    getHref: () => "/fridges",
  },
  fridge: {
    path: "/fridge/:fridgeId",
    getHref: (id: string) => `/fridge/${id}`,
  },
} as const;
