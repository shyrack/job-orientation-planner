import { electronApi } from "../../electron-src/preload";

declare global {
  interface Window {
    electron: electronApi;
  }
}
