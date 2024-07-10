# Phantombuster Script Template with Vite + TypeScript

Template for creating a custom Phantombuster script with a fully customized environment.

You need a Phantombuster account to use this template.

## Get started

### GitHub Template

This is a template repo. Click the green [Use this template](https://github.com/SylvainMarty/phantombuster-vite-typescript-template/generate) button to get started.

## Phantombuster directives

You can change the Phantombuster script directives in the `package.json` under the `phantomBuster` key:
* `image` (required): the Phantombuster image to use (ex: `web-node:v3`)
* `flags` (optional, default `""`): the Phantombuster flags to use (ex: `save-folder`)
* `dependencies` (optional, default `""`): custom Phantombuster dependencies (ex: `lib-Foo.js, lib-OtherModule.js`)

The directives will be appended automatically at the start of the main script uploaded to Phantombuster.

## License

This template was created under the [MIT License](LICENSE).

## Credits

This template repository is based on the work of **hywax** with its repository [vite-vanilla-library-template](https://github.com/hywax/vite-vanilla-library-template).
