import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { client } from "./config/reaquest_clinets.js";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext.jsx";
import "./index.css";
import ThemaProvider from "./context/ThemaContext.jsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);


createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={client}>
        <UserProvider >
            <ThemaProvider >
                <App />
                <ToastContainer />
            </ThemaProvider>
        </UserProvider>
    </QueryClientProvider>
);
