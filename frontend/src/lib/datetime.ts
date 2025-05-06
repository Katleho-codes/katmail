export const datetimestamp = new Date()
    .toISOString()
    .split(".")[0]
    .replace("T", " ");
