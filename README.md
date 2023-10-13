# CATIA TRACKER

Description of the program.

## Table of Contents

- [Installation](#installation)
- [Running the Program](#running-the-program)
- [Building as a Windows App](#building-as-a-windows-app)
- [License](#license)

---

## Installation

1. **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Clone the repository**: Clone this repository or download the source code.

   ```bash
   git clone https://github.com/AleksiDu/catia-tracker.git
   cd catia-tracker
   ```

3. **Install dependencies**: Install dependencies using npm.

   ```bash
   npm install
   ```

## Running the Program

To run the program, use the following command:

```bash
npm run build
npm run dev
```

## Building as a Windows App

To package the application as a standalone Windows executable, you can use [pkg](https://github.com/vercel/pkg). Follow the steps below:

1. **Install `pkg` globally:** Install **`pkg`** globally using npm.

   ```bash
   npm install -g pkg
   ```

2. **Compile TypeScript code to JavaScript:** Compile your TypeScript code to JavaScript.

   ```bash
   npm run build
   ```

3. **Package the application:** Package the application.

   ```bash
   cd dist
   pkg index.js --output appName.exe
   ```

   appName.exe is the name you choose for the resulting executable.

## License

This project is licensed under the [MIT](Licence.md) License.
