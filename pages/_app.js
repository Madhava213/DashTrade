import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import App from "next/app";
import { withRouter } from "next/router";

import "../styles/globals.scss";
import { defaultTheme } from "../styles/theme";
class MyApp extends App {
   // Load App with Initial State
   static async getInitialProps({ Component, ctx }) {
      const pageProps = Component.getInitialProps
         ? await Component.getInitialProps(ctx)
         : {};
      // console.log(pageProps);
      return { pageProps: pageProps };
   }
   render() {
      const { Component, pageProps, router } = this.props;
      return (
         <ChakraProvider resetCSS theme={defaultTheme}>
            <Component {...pageProps} router={router} />
         </ChakraProvider>
      );
   }
}

export default withRouter(MyApp);
