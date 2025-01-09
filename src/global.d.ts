declare global {
    namespace JSX {
      interface IntrinsicElements {
        'economy': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }
  
  export {};  // This empty export makes it a module