import { useReactifiedApi } from "./useReactifiedApi";
import { VNodeChild } from "vue";

interface DialogOptions {
    type: "create" | "success" | "error" | "warning" | "info";
    title: string | (() => VNodeChild);
    content?: string | (() => VNodeChild);
    positiveText?: string;
    negativeText?: string;
    closable?: boolean;
    style?: { [key: string]: string } | string;
}

export const useConfirmDialog = ({ type = "create", title, content, style, positiveText = "Yes", negativeText = "No" }: DialogOptions) =>
    new Promise((resolve, reject) => {
        const { dialogApi } = useReactifiedApi();
        dialogApi?.[type]({
            title,
            content,
            positiveText,
            negativeText,
            style: style ?? {},
            onPositiveClick: () => resolve(true),
            onNegativeClick: () => resolve(false),
            onClose: () => resolve(false),
            onMaskClick: () => resolve(false),
        });
    });
