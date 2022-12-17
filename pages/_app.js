import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

// <footer className={styles.footer}>
//   <p>© {new Date().getFullYear()} Ankita</p>
// </footer>
