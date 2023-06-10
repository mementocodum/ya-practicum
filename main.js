import './src/app/styles/style.scss'
import {appRouter} from "./src/app/providers/router/router.js";

window.addEventListener('load', appRouter);
window.addEventListener('popstate', appRouter);
