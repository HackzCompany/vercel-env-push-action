class ConfigValidationError extends Error {
    constructor(param, value) {
        super();
        this.name = "ConfigValidationError";
        this.message = `Configuration parameter "${param}" has invalid value: ${value}`;
    }
}

module.exports = {
    ConfigValidationError,
};
