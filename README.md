# gen-ts-scaffold

A CLI tool for quickly scaffolding TypeScript projects.

## Installation

To install globally:

    npm install -g gen-ts-scaffold

Or you can run directly using `npx`:

    npx gen-ts-scaffold [project-name]

## Usage

After installation, you can run the CLI with the following command:

    gen-ts-scaffold [project-name]

Where [project-name] is an optional argument for the name of your new project. If you don't provide this, it defaults to "my-new-project".

This will start the CLI wizard, which will guide you through the process of creating a new TypeScript project.

### Customizing `package.json`

The CLI will ask if you'd like to customize the package.json for your new project. If you choose yes, the CLI will prompt you with questions to populate the fields in package.json. If you provided a [project-name], it will be used as a default suggestion for the project name during customization.

## Features

- Quick TypeScript project setup
- Option to specify the project name as a command-line argument
- Option to customize `package.json`

## Contributing

Contributions are always welcome! Feel free to open an issue or create a Pull Request.

## License

MIT
