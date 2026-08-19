// navigator.deviceMemory is a real browser API but is not in TypeScript's DOM lib.
// App.tsx uses it for performance tiering.
interface Navigator {
  deviceMemory?: number;
}
