# vercel-env-push-action
Add multiple environment variables to Vercel from a .env file

# Requirements
If you intend to contribute, you'll need to install `vercel/ncc` globally to build the code into a single module.\
Install running:
```bash
npm i -g @vercel/ncc
```

# The logic behind
This action's logic follows these steps:

1. Read your `.env` file
2. Transform it into a `JSON`
3. Get all variables from your Vercel project (using their API)
4. Compare your env file with Vercel's response
5. Filter only new variables or variables with changed values
6. Changed variables are updated one by one with `PATCH` requests to Vercel API
7. New variables are created with a single `POST` request to Vercel API

# Usage example
```yaml
vercel-sync:
    runs-on: ubuntu-latest
    needs: [install-deps, load-env] # You need to load your .env file before
    name: Vercel Sync
    steps:
      - uses: hackzcompany/vercel-env-push-action@v2
        with:
          project: my-project
          team_id: ${{ secrets.VERCEL_TEAM_ID }}
          token: ${{ secrets.VERCEL_TOKEN }}
          environments: 'development,preview' # Defaults to "development"
          env_type: plain # Defaults to "encrypted"
          env_file: dev/.env # Defaults to ".env"
```

# Arguments

### `project`
The name of your Vercel project.

### `team_id`
The unique id of your Vercel team.

### `token`
The access token for your Vercel account.

Make sure to set the correct scopes for the token.

### `environments`
The environments to target the variables, separated by comma.

For example: `development,preview` will add the variables to `development` and `preview` in Vercel.

Default: `development`.

### `env_type`
The type of the variables. Allowed values are `system`, `encrypted`, `plain` or `secret`.

This will be applied to all new variables.

Default: `encrypted`.

### `env_file`
The path to your env file.

Default: `.env`

# Limitations
If you find any other limitations feel free to contact the maintainers or contribute.\
For now, these are the ones we've found:

- [ ] You can't set a different type for each variable.
- [x] Values with line breaks are not supported.


# Maintainers
- Created by [@jgtvares](https://github.com/jgtvares)
- Maintained by [@HackzCo](https://github.com/HackzCompany) team

# Contributing
Open a pull request pointing to `main` and wait for our review.\
Also, don't forget to build the code in a single module in order to follow the pattern from Github Actions.\
To build the code run:
```bash
ncc build index.js --license licenses.txt
```
