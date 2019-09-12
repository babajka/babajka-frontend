import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { lang } = ctx.query;
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, lang };
  }

  render() {
    const { lang } = this.props;
    return (
      <html lang={lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
