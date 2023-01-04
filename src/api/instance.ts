import axios, { AxiosError, AxiosResponse } from "axios";

export const ApiInstance = axios.create({
    baseURL: `${import.meta.env?.VITE_API_URL ?? ""}/api/v2` as string,
});

export const FormDataConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

ApiInstance.interceptors.request.use((config) => {
    const appStore = useAppStore();
    const businessController = useBusinessController();
    config.headers = {
        ...config.headers,
        locale: appStore.activeLocale,
        ...(businessController.examState.session && {
            Authorization: `Bearer ${businessController.examState.session.accessToken}`,
        }),
    };

    return config;
});
