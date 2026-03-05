export type CtpColor =
  | "ctp-red"
  | "ctp-green"
  | "ctp-blue"
  | "ctp-yellow"
  | "ctp-purple"
  | "ctp-pink"
  | "ctp-orange"
  | "ctp-peach"
  | "ctp-teal"
  | "ctp-mauve"
  | "ctp-mantle"
  | "ctp-surface0"
  | "ctp-surface1"
  | "ctp-surface2"
  | "ctp-surface3"
  | "ctp-surface4"
  | "ctp-surface5";

/** Accent color names matching the Catppuccin Mocha palette in tailwind.config.js */
export type AppColor =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender";

type ColorPrefix = "text" | "bg" | "border" | "from" | "to" | "shadow";

/** Generate a Catppuccin Tailwind class like `text-ctp-blue` or `bg-ctp-peach` */
export function ctpColorClass(
  prefix: ColorPrefix,
  color: AppColor,
): string {
  return `${prefix}-ctp-${color}`;
}
