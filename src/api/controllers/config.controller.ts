import axios from "axios";

export const ConfigController = {
    getCountries: async (): Promise<Array<{ en_short_name: string }>> => [{ en_short_name: "France" }],
};
