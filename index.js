const { dotEnvToObject, filterChangedValues } = require("./src/dotenv");
const { validateConfig } = require("./src/validation");
const { getVarsFromVercel, patchVercelVars, pushToVercel } = require("./src/vercel");


(async () => {
    const envFile = process.argv[2];
    validateConfig({ env_file: envFile });
    const dotenv = dotEnvToObject(envFile);
    const vercelVars = await getVarsFromVercel();
    const changedVars = filterChangedValues(dotenv, vercelVars.envs);

    if (changedVars.length) {
        const { responses, newVars } = await patchVercelVars(changedVars);
        if (responses.length) console.log("Updated variables (Vercel response):", responses);
        if (newVars.length) await pushToVercel(newVars);
    }
    else console.log("Nothing changed!");
    console.log("Script finished!");
})();
