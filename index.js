// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    message: "What is your project name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your GitHub Username?",
    name: "github",
  },
  {
    type: "input",
    message: "What is your email address",
    name: "email",
  },
  {
    type: "input",
    message: "What is your phone number?",
    name: "phone",
  },
  {
    type: "list",
    message: "What is the best way to get ahold of you?",
    choices: ["Text", "Email", "Social Media", "Phone"],
    name: "contactPreference",
  },
  {
    type: "list",
    message: "What type of license would you like to use for your README?",
    choices: [
      "MIT License",
      "Apache License 2.0",
      "GNU General Public License",
      "BSD Licenses",
    ],
    name: "license",
  },
  {
    type: "input",
    message: "Please add a description for your README file.",
    name: "description",
  },
  {
    type: "input",
    message: "Please add installation instructions for your README file.",
    name: "install",
  },
  {
    type: "input",
    message: "Please add usage information for your README file.",
    name: "usage",
  },
  {
    type: "input",
    message: "Please add contribution guidelines for your README file.",
    name: "contribution",
  },
  {
    type: "input",
    message: "Please add test instructions for your README file.",
    name: "test",
  },
];

function generateREADME(data) {
  const licenseBadgeUrl = `https://img.shields.io/badge/license-${encodeURIComponent(
    data.license
  )}-brightgreen`;

  const {
    name,
    github,
    email,
    phone,
    contactPreference,
    license,
    description,
    install,
    usage,
    contribution,
    test,
  } = data;

  // Table of Contents
  const tableOfContents = `
  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Test Instructions](#test-instructions)
  - [License](#license)
  - [Contact](#contact)
    `;

  // README content
  const userContent = `
  # ${name} README
  
  [![License](${licenseBadgeUrl})](${getLicenseLink(data.license)})

  ${tableOfContents}
  
  ## Description
  ${description}
  
  ## Installation
  ${install}
  
  ## Usage
  ${usage}
  
  ## Contribution Guidelines
  ${contribution}
  
  ## Test Instructions
  ${test}
  
  ## License
  This project is licensed under the ${license}.
  
  ## Questions
  - GitHub: [${github}](https://github.com/${github})
  - Email: ${email}
  - Phone: ${phone} 
  - Prefered Contact Method: ${contactPreference}
  `;

  return userContent;
}

function getLicenseLink(license) {
  const licenseLinks = {
    "MIT License": "https://opensource.org/licenses/MIT",
    "Apache License 2.0": "https://opensource.org/licenses/Apache-2.0",
    "GNU General Public License": "https://opensource.org/licenses/GPL-3.0",
    "BSD Licenses": "https://opensource.org/licenses/BSD-2-Clause",
  };

  return licenseLinks[license] || "";
}

// TODO: Create a function to write README file
function writeToFile(fileName, userContent) {
  fs.writeFile("README.md", userContent, "utf8", function (err, data) {
    err
      ? console.error("Error has taken place", err)
      : console.log("MarkDown Updated");
  });
}
// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then(function (data) {
    const userContent = generateREADME(data);
    writeToFile("README.md", userContent);
  });
}

// Function call to initialize app
init();
