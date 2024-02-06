import AppStateProvider from "../components/provider/AppStateProvider";
import "./styles.css";

export default function App({ Component, pageProps }: any) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}
