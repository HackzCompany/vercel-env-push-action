const { default: axios } = require('axios');

const { vercel } = require('./config');


const { api, project, teamId, token } = vercel;
const headers = { Authorization: `Bearer ${token}` };

const patchVercelVars = async (vars) => {
    const responses = [];
    const newVars = [];
    for (let i = 0; i < vars.length; i++) {
        const { id, key, value, type, target, ...rest } = vars[i];
        if (rest.new) {
            console.log("New variable identified:", vars[i]);
            console.log("Saving it for later...");
            newVars.push(vars[i]);
        } else {
            console.log("Updating environment variable with key:", key);
            const { data } = await axios
                .patch(
                    `${api}/v9/projects/${project}/env/${id}?teamId=${teamId}`,
                    { key, value, type, target, },
                    { headers }
                )
                .catch((err) => {
                    console.log(err.response.data);
                    throw err;
                });

            responses.push(data);
        }
    }

    return {
        responses,
        newVars,
    }
};

const pushToVercel = async (vars) => {
    console.log("Adding new vars...");
    return axios.post(`${api}/v9/projects/${project}/env/?teamId=${teamId}`, vars, { headers }).then((response) => response.data);
};

const getVarsFromVercel = async () => {
    return axios.get(`${api}/v8/projects/${project}/env?decrypt=true&teamId=${teamId}`, { headers })
    .then(({ data }) => data)
    .catch(err => console.log(err.response));
};


module.exports = {
    getVarsFromVercel,
    patchVercelVars,
    pushToVercel,
};
