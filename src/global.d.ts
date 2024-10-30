// TypeScript declaration for SCSS modules
// This file allows TypeScript to understand and type-check SCSS module imports in a project.
// It enables importing styles with `import styles from './styles.module.scss';` and 
// provides type safety for class names.

declare module '*.module.scss' {
    // Defines a mapping of class names (keys) to their corresponding generated CSS strings (values)
    const classes: { [key: string]: string };
    
    export default classes; // Exports the classes object as the default export
}
