const escape = (text) => text.replace(/</g, "&lt;")
                             .replace(/>/g, "&gt;")
                             .replace(/&/g, "&amp;");

export default escape;