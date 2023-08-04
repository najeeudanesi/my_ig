import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import "../styles/globals.css"; // You can import other global styles here

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
