import moment from "moment";

export const msToTimeFormat = (millisecond: number): string => {
    return moment(new Date(millisecond)).format("mm:ss");
};
