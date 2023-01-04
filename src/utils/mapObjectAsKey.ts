export const mapObjectAsKeyPath = (obj: { [key: string]: any }, path = "") => {
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            mapObjectAsKeyPath(obj[key], path + key + ".");
        } else {
            obj[key] = path + key;
        }
    }
    return obj;
};
