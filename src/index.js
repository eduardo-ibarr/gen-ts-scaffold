#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { customizePackageJson } = require("./packageManager");

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\nWelcome to ts-gen!\n");

function copyFile(source, target) {
  const targetPath = fs.lstatSync(target).isDirectory()
    ? path.join(target, path.basename(source))
    : target;
  fs.writeFileSync(targetPath, fs.readFileSync(source));
}

function copyFolder(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  fs.readdirSync(source).forEach((file) => {
    const curSource = path.join(source, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolder(curSource, path.join(target, file));
    } else {
      copyFile(curSource, target);
    }
  });
}

function createProject(projectName, shouldCustomize) {
  console.log("\nCreating your TypeScript project...");

  const templatePath = path.join(__dirname, "..", "template");
  const projectPath = path.join(process.cwd(), projectName);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  copyFolder(templatePath, projectPath);

  if (shouldCustomize) {
    const packageJsonPath = path.join(projectPath, "package.json");
    customizePackageJson(
      read,
      packageJsonPath,
      projectPath,
      projectName,
      finalizeProject
    );
  } else {
    finalizeProject();
  }

  function finalizeProject() {
    console.log(`\nProject ${projectName} has been successfully created! `);
    console.log("\nHere's how you can get started:");
    console.log(`1. Navigate to your project folder: cd ${projectPath}`);
    console.log("2. Install the dependencies: npm install");
    console.log("3. Start the development server: npm start");
    console.log("\nHappy coding!\n");
    read.close();
  }
}

read.question("Do you want to customize package.json? (y/n): ", (answer) => {
  const projectName = process.argv[2] || "my-new-project";
  const shouldCustomize = answer.toLowerCase() === "y";

  createProject(projectName, shouldCustomize);
});
