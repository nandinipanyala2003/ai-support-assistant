
// Format date
export const formatDate = (date) => {

    return new Date(date).toLocaleString();

};

// Capitalize text
export const capitalize = (text) => {

    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

};

// Get status color
export const getStatusColor = (status) => {

    switch (status) {

        case "Open":
            return "#f59e0b";

        case "Closed":
            return "#22c55e";

        default:
            return "#6366f1";

    }

};