const core = require('@actions/core');


module.exports = {
    vercel: {
        api: 'https://api.vercel.com',
        environments: core.getInput('environments')?.split(','),
        envType: core.getInput('env_type'),
        project: core.getInput('project'),
        teamId: core.getInput('team_id'),
        token: core.getInput('token'),
    },
    envFile: core.getInput('env_file'),
};
