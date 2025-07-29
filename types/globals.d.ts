import * as React from "react";

declare module "react" {
  interface CSSProperties extends CustomCSSProperties {}
}

interface CustomCSSProperties {
  "--sidebar-width"?: string;
  "--sidebar-width-mobile"?: string;
}
