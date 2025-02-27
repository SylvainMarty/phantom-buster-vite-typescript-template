# Phantombuster Script Template with Vite + TypeScript

Template for creating a custom Phantombuster script with a fully equipped TypeScript environment.

You need a Phantombuster account to deploy your script.

## Features

* 🤯 Run your Phantombuster script locally to save execution time while developing
* ✨ Fully customized [eslint](https://eslint.org/) configuration based on the config by [Antfu](https://github.com/antfu/eslint-config)
* 🧪 Write tests quickly and conveniently with [vitest](https://vitest.dev/)
* 🤝 Supports [conventional commits](https://www.conventionalcommits.org/)
* 🚀 Deploy on Phantombuster with just one command
* ♾️ GitHub Actions continuous deployment to Phantombuster
* ✋ Validate your arguments with [superstruct](hhttps://docs.superstructjs.org/)

## Get started

### GitHub Template

This is a template repo. Click the green [Use this template](https://github.com/SylvainMarty/phantombuster-vite-typescript-template/generate) button to get started.

### Requirements

* Node.js 22.x (you can use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions)
* pnpm (`npm install -g pnpm`)
* Docker (optional, only needed if you want to test in a similar Phantombuster web-node agent environment)

## Install dependencies

```bash
pnpm install
```

### Run locally

Open one terminal and Run the following command to start the development watcher:
```bash
pnpm dev
```

Open a second terminal and run the following command to start the script:
```bash
pnpm script --something="some value"
```

Or run the following command to start the script in a Docker container simulating a Phantombuster web-node:v3 agent:
```bash
pnpm script:web-node:v3 --something="some value"
```

### Implement your script

You can quickly get started by editing the `src/my-script.ts` sample file.

> [!NOTE]
> This file is only an example.
>
> If your script is somewhat complex, you can also create more files in the `src` directory, and use them in `src/index.ts`.
>
> It's TypeScript, after all!

## Usage

The template contains the following `pnpm` scripts:

* `dev` - Start the file watcher (will recompile the code on source file change)
* `script` - Start the script locally
* `script:web-node:v3` - Start the script in a Docker container simulating a Phantombuster web-node:v3 agent
* `build` - Build for production
* `deploy` - Deploy on Phantombuster (see the **Deployment** section below)
* `lint` - Checks your code for any linting errors
* `test` - Run all tests
* `test:watch` - Run all tests with watch mode
* `test:coverage` - Run all tests with code coverage report
* `prepare` - Script for setting up husky hooks

### Phantombuster directives

You can change the Phantombuster script directives in the `package.json` under the `phantomBuster` key:
* `image` (required): the Phantombuster image to use (ex: `web-node:v3`)
* `flags` (optional, default `""`): the Phantombuster flags to use (ex: `save-folder`)
* `dependencies` (optional, default `""`): custom Phantombuster dependencies (ex: `lib-Foo.js, lib-OtherModule.js`)

The directives will be appended automatically at the start of the main script uploaded to Phantombuster.

### Deployment

> [!IMPORTANT]
> You must rename the property `name` in the `package.json` to the name of your script.
>
> It will be displayed in Phantombuster UI.

Create a new Github Actions repository secret named `PHANTOM_BUSTER_API_KEY` containing your Phantombuster API key.
Use this documentation to learn [how to create an API key](https://hub.phantombuster.com/docs/api#how-to-find-my-api-key).

The deployment will be done automatically when you or merge your code to the `main` branch.

#### Local deployment
If you want to deploy from your local environment, you must create a file `phantombuster.cson` at the root of the project.
Follow the [Phantombuster SDK documentation](https://hub.phantombuster.com/docs/sdk#setup) to learn how to create this file.

You can run the following command to deploy your script from your local environment:
```bash
pnpm run deploy
```

### Validation

You can validate your script arguments thanks to [superstruct](https://docs.superstructjs.org/).

To start validating, create a typescript file that defines your arguments schema:
```ts
import { string, type } from 'superstruct'

export const MyScriptArguments = type({
  search: string(),
})
```

In `src/index.ts`, add this at the start of the root function:
```ts
// ...
;(async () => {
  const [err, args] = validate(buster.argument, MyScriptArguments)
  if (err) {
    console.error('Argument validation failed', err)
    process.exit(1)
  }

  // ...
})()
```

Now, you can run your script with the following command:
```bash
pnpm script --search="some value"
```

## License

This template was created under the [MIT License](LICENSE).

## Credits

This template repository is based on the work of **hywax** with its repository [vite-vanilla-library-template](https://github.com/hywax/vite-vanilla-library-template).
