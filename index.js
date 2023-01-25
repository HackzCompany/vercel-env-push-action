const github = require('@actions/github');
const core = require('@actions/core');

const { dotEnvToObject, filterChangedValues } = require("./src/dotenv");
const { validateConfig } = require("./src/validation");
const { getVarsFromVercel, patchVercelVars, pushToVercel } = require("./src/vercel");
const { envFile, vercel } = require('./src/config');


(async () => {
    try {
        validateConfig();
        const dotenv = dotEnvToObject(envFile);
        const { envs } = await getVarsFromVercel();
        const vercelEnvsByTarget = envs.filter(e => {
            if (e.target.sort().join(',').includes(vercel.environments.sort().join())) {
                return e;
            }
        });
        const changedVars = filterChangedValues(dotenv, vercelEnvsByTarget);

        if (changedVars.length) {
            const { responses, newVars } = await patchVercelVars(changedVars);
            if (responses.length) console.log("Updated variables (Vercel response):", responses);
            if (newVars.length) await pushToVercel(newVars);
        }
        else console.log("Nothing changed!");
        console.log("Script finished!");
        const eventPayload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`The event payload: ${eventPayload}`);
    } catch (err) {
        core.setFailed(err.message);
    }
})();
