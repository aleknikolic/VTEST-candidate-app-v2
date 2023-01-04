import { InfractionType } from "~/types/security";
import { ApiInstance, FormDataConfig } from "./../instance";

export const SecurityController = {
    uploadPhotocheck: (file: FormData) => ApiInstance.post("/store-proctoring-photo", file, FormDataConfig).then((response) => response.data),
    declareInfraction: (infractionType: InfractionType) => ApiInstance.post("/declare-infraction", { infractionType }).then((response) => response.data),
};
