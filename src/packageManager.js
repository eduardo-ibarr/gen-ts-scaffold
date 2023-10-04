const fs = require("fs");
const path = require("path");

const validLicenses = ["MIT", "ISC", "GPL-3.0", "UNLICENSED"];

function validateLicense(license) {
  return validLicenses.includes(license);
}

function askQuestion(
  read,
  question,
  field,
  validationFn,
  packageJson,
  defaultAnswer,
  callback
) {
  read.question(
    `${question}${defaultAnswer ? `(${defaultAnswer}) ` : ""}`,
    (answer) => {
      answer = answer.trim() || defaultAnswer;
      if (validationFn && !validationFn(answer)) {
        console.log("Invalid input. Please try again.");
        askQuestion(
          read,
          question,
          field,
          validationFn,
          packageJson,
          defaultAnswer,
          callback
        );
      } else {
        packageJson[field] = answer || packageJson[field];
        callback();
      }
    }
  );
}

function customizePackageJson(
  read,
  filePath,
  projectPath,
  projectName,
  callback
) {
  console.log("\nLet's customize your package.json!\n");
  const packageJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const questions = [
    { question: "Project name: ", field: "name", default: projectName }, // suggest projectName as default
    { question: "Version: ", field: "version", default: "1.0.0" },
    { question: "Description: ", field: "description" },
    { question: "Author: ", field: "author" },
    {
      question: "Keywords (comma-separated): ",
      field: "keywords",
      postProcess: (answer) =>
        answer ? answer.split(",").map((k) => k.trim()) : [],
    },
    {
      question: "License: ",
      field: "license",
      validation: validateLicense,
      default: "MIT",
    },
  ];

  function askNextQuestion(index) {
    if (index < questions.length) {
      const {
        question,
        field,
        validation,
        postProcess,
        default: defaultAnswer,
      } = questions[index];
      askQuestion(
        read,
        question,
        field,
        validation,
        packageJson,
        defaultAnswer,
        () => {
          if (postProcess) {
            packageJson[field] = postProcess(packageJson[field]);
          }
          askNextQuestion(index + 1);
        }
      );
    } else {
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
      console.log("\nYour package.json has been customized!");

      const newProjectName = packageJson.name;

      if (newProjectName !== projectName) {
        const newProjectPath = path.join(
          path.dirname(projectPath),
          newProjectName
        );
        fs.renameSync(projectPath, newProjectPath);
      }

      read.close();
      callback();
    }
  }

  askNextQuestion(0);
}

module.exports = { customizePackageJson };
