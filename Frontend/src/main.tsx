
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import StudentContextProvider from "./context/student.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ChakraProvider>
      <StudentContextProvider>
        <App />
      </StudentContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);
