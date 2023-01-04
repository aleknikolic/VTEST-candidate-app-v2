import { RenderMessageProps } from "naive-ui/lib/message/src/types";
import { VNodeChild } from "vue";
import VAlert from "~/elements/VAlert.vue";
import { useReactifiedApi } from "./useReactifiedApi";

export interface ErrorNotificationOptions {
    title?: string;
    text: string | (() => VNodeChild);
    icon?: string;
    onClose?: () => void;
    duration?: number;
    type?: "primary" | "error" | "warning";
    closable?: boolean;
}

export const useCustomNotification = (options: ErrorNotificationOptions) => {
    const { messageApi } = useReactifiedApi();
    return messageApi.create("", {
        duration: options?.duration ?? 0,
        render: (props: RenderMessageProps) => (
            <VAlert type={options?.type ?? "primary"} closable={true} onClose={props.onClose} class="mx-3">
                {{
                    ...(options.title && { title: () => <span class="text-lg font-semibold">{options.title}</span> }),
                    default: () => <span class="text-lg">{typeof options.text === "function" ? options.text() : options.text}</span>,
                    icon: () => <span class="iconify text-3xl" data-icon={options?.icon ?? "ph:warning-circle"} />,
                }}
            </VAlert>
        ),
        closable: options?.closable ?? true,
    });
};
