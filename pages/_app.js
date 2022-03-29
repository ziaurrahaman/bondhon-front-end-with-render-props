import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { Provider } from "react-redux";
import { store } from "../store/store";

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>বন্ধন</title>
        </Head>
        <NotificationContainer />

        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    </ThemeProvider>
  );
}

export default MyApp;
