import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { createRouter, createWebHistory } from "vue-router";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
    const businessController = useBusinessController();
    if (!to.meta.auth) next();
    if (!businessController.examState.session) return next({ name: "login" });
    next();
});

router.afterEach(() => {
    // loadingBarApi?.finish?.();
});

export default router;
