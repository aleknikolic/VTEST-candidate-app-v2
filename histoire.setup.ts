import "virtual:windi.css";
import naive from "naive-ui";

export function setupVue3({ app }) {
    app.provide("test", "hello");
    app.use(naive);
}
