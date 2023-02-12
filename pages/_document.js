import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// import Document, { Head, Html, Main, NextScript } from 'next/document'

// class MyDocument extends Document {
//   render() {
//     return (
//       <Html lang='en'>
//         <Head></Head>
//         <body>
//           <Main></Main>
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

// export default MyDocument
