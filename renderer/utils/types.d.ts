import { electronApi } from "../../electron-src/preload";

type Nullable<T> = T | null | undefined;

declare global {
  interface Window {
    electron: electronApi;
  }
}
