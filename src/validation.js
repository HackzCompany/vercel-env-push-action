const { vercel } = require('./config');
const { ConfigValidationError } = require('./errors');


const validateConfig = (additionalParams) => {
    console.log("Validating configuration...");
    Object.keys(vercel).forEach((key) => {
        if (!vercel[key]) throw new ConfigValidationError(key, vercel[key]);
    });

    if (additionalParams) {
        Object.keys(additionalParams).forEach((key) => {
            if (!additionalParams[key]) throw new ConfigValidationError(key, additionalParams[key]);
        });
    }
};


module.exports = {
    validateConfig,
};
