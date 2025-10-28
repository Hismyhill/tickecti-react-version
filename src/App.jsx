import { Provider } from "react-redux";
import store from "./app/store";
import ToastProvider from "./components/ToastProvider";
import AppRoutes from "./components/AppRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastProvider />
    </Provider>
  );
}
