import "@/styles/globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CustomCursor />
      <Component {...pageProps} />
    </>
  );
}