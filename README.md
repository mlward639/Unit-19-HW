# Unit-19-HW

<img src='https://img.shields.io/badge/License-MIT-yellow.svg'>

## Description

Budget tracking application that allows users to add expenses and deposits to their budget with or without a connection. If transactions are entered while offline, the total will populate once the user is back online.

## Table of Contents

- [Installation](#installation)
- [User Story](#user-story)
- [Business Context](#business-context)
- [Usage](#usage)
- [Credits](#credits)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [License](#license)

## Installation

- Navigate to heroku site below

## User Story

AS AN avid traveller
I WANT to be able to track my withdrawals and deposits with or without a data/internet connection
SO THAT my account balance is accurate when I am traveling

## Business Context

Giving users a fast and easy way to track their money is important, but allowing them to access that information anytime is even more important. Having offline functionality is paramount to our applications success.

## Usage

- Enter deposits and expenses online.
- Enter deposits and expenses offline. When back online, these offline transactions are added to the tracker.

## Credits

Libraries:

- Mongo database
- Mongoose to create schema
- MongoDB Atlas to connect database to application
- Express.js API to handle routes
- Heroku to deploy
- Path for relative pathing
- Morgan for logging
- Lite-server as a lightweight development web server with support for Single Page Apps
- Compression to decrease our payload size to improve performance of the Node.js application

\***_ In order to cache dynamic content, i.e. users' inputs for withdrawals or deposits, incorporate `indexedDB` from the previous module._**

## Contribution Guidelines

Utilize <a href= "https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md">The Contributor Covenant</a> as reference for appropriate contribution guidelines.

## Test Instructions

n/a

## License

License type: MIT

    "Copyright 2021 <COPYRIGHT HOLDER>

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."

Source for licensing information: <a href="https://opensource.org/licenses/MIT">Link to MIT license information</a>

## Screenshots

Screenshot of budget tracker app:

<img src='public\images\screenshot.png' alt = 'Screenshot of budget tracker app'>

## URLs

<a href="https://github.com/mlward639/Unit-19-HW">Link to GitHub Repository</a>

<a href="#">Link to Deployed Heroku Site</a>
