module.exports = {
    vercel: {
        api: 'https://api.vercel.com',
        environments: process.env.VERCEL_ENVIRONMENTS?.split(','),
        envType: process.env.ENV_TYPE || 'encrypted',
        project: process.env.VERCEL_PROJECT,
        teamId: process.env.VERCEL_TEAM_ID,
        token: process.env.VERCEL_TOKEN,
    },
};
