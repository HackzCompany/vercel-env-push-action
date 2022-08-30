const { readFileSync } = require('fs');
const { parse } = require('dotenv');

const { vercel } = require('./config');


const dotEnvToObject = (dotEnvPath) => {
    console.log("Reading dotenv file:", dotEnvPath);
    const dotEnv = readFileSync(dotEnvPath, { encoding: 'utf-8' });
    const parsed = parse(dotEnv);
    const variables = Object.keys(parsed).map((key) => {
        return {
            key,
            target: vercel.environments,
            type: vercel.envType,
            value: parsed[key],
        };
    });
    return variables;
};

const filterChangedValues = (dotenv, vercelVars) => {
    const changed = dotenv.map(d => {
        const objV = vercelVars[vercelVars.map(v => v?.key).indexOf(d.key)];
        const objD = dotenv[dotenv.map(d2 => d2.key).indexOf(d.key)];
        if (!objV && objD) {
            objD.new = true;
            return objD;
        }
        else if (objV.value !== objD.value) {
            objD.id = objV.id
            return objD;
        };
    });
    return changed.filter(c => c);
};


module.exports = {
    dotEnvToObject,
    filterChangedValues,
};
