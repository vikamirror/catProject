const isDevelopment = process.env.NODE_ENV === "development" ? true : false;

export function log(...args) {
    if (isDevelopment) {
        console.log(...args);
    };
};

export function errorLog(...args) {
    if (isDevelopment) {
        console.error(...args);
    };
};

export function warningLog(...args) {
    if (isDevelopment) {
        console.warn(...args);
    };
};