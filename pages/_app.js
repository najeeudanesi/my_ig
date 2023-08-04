import "../styles/globals.css";
// Import the Tailwind CSS

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <Component {...pageProps} />;
}

export default MyApp;
