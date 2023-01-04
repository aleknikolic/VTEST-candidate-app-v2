import { AuthRequestOutput, AuthRequestPayload, ExamStep } from "~/types/system";
import { ApiInstance, FormDataConfig } from "./../instance";

export const BusinessController = {
    startExam: (authPayload: AuthRequestPayload): Promise<{ success: boolean; data?: AuthRequestOutput; message?: string | string[] }> =>
        ApiInstance.post("/login", authPayload)
            .then((response) => ({ success: true, data: response.data }))
            .catch((err) => ({ success: false, message: err.response.data.message })),
    resolveNextStep: (stepPayload: FormData | { [key: string]: any }): Promise<ExamStep> =>
        ApiInstance.post("/next", stepPayload, stepPayload instanceof FormData ? FormDataConfig : undefined).then((response) => response.data),
};
