import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <div>
      <Component {...pageProps} />
      <footer>
        <p>© {new Date().getFullYear()} Ankita</p>
      </footer>
    </div>
  )
}

export default MyApp
