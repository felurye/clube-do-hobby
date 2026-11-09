export const THEME_COOKIE = "clube-theme";

export type Theme = "light" | "dark";

export function parseTheme(value: string | undefined): Theme | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}
