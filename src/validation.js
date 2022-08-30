const { vercel, envFile } = require('./config');
const { ConfigValidationError } = require('./errors');


const validateConfig = () => {
    console.log("Validating configuration...");
    Object.keys(vercel).forEach((key) => {
        if (!vercel[key]) throw new ConfigValidationError(key, vercel[key]);
    });

    if (!envFile) throw new ConfigValidationError('env_file', envFile);
};


module.exports = {
    validateConfig,
};
