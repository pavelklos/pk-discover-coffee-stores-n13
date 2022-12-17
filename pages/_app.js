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
