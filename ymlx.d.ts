// Type declarations for .ymlx files
// This allows TypeScript to understand .ymlx imports for type checking
// .ymlx files are TypeScript files that get transpiled at runtime
declare module '*.ymlx' {
  // Allow any default export - functions, objects, arrays, etc.
  const ymlx: any;
  export default ymlx;
}
