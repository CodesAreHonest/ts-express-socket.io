import ExpressServer from "./loaders/ExpressServer";

const app = new ExpressServer().app;

export { app };