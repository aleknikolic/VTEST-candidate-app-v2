import { AuthRequestPayload } from "~/types/system";

export async function GetClientInfos(): Promise<Omit<AuthRequestPayload, "secureCode">> {
    return {
        userAgent: navigator.userAgent,
        os: navigator.platform,
        browser: navigator.appName,
        isMobile: navigator.userAgent.includes("Mobile"),
        ipAddress: "18.514.235.256",
        //await fetch("https://api.ipify.org?format=json")
        // .then((response) => response.json())
        // .then((data) => data.ip)
    };
}
