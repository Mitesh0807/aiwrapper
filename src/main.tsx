import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <NextUIProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NextUIProvider>
    </Auth0Provider>
  </BrowserRouter>
);
