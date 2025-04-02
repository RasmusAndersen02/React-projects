/// <reference types="vite/client" />
/// <reference types="d3" />
// global.d.ts
declare module '*.css' {
    const styles: { [className: string]: string };
    export default styles;
  }
  declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }