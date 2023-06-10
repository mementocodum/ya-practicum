import './src/app/styles/style.css'
import {appRouter} from "./src/app/providers/router/router.js";

window.addEventListener('load', appRouter);
window.addEventListener('popstate', appRouter);
