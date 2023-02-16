import StoreProvider from '../store/store-context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp

// <footer className={styles.footer}>
//   <p>© {new Date().getFullYear()} Ankita</p>
// </footer>
