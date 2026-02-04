export const pageview = (url: string) => {
  if (typeof window === "undefined") return;

  (window as any).gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

export const event = (action: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return;

  (window as any).gtag?.("event", action, params);
};
