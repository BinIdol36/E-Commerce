import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store, persistor } from "@/store/redux"
import App from "@/App"
import { BrowserRouter } from "react-router-dom"
import "@/index.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
