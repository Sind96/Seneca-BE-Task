# StudyTracker-Backend

This application manages study session data by providing functionality to persist session events, fetch course lifetime statistics, and retrieve individual study sessions.

## Getting started

- **Node.js (version 18 or above)**: Download and install from the [Node.js](https://nodejs.org/en) website.
- **A command-line interface (CLI)**: Such as Terminal or Command Prompt.

## Installation

1. Clone this repo and enter the main branch:

   ```bash
   git clone https://github.com/Sind96/StudyTracker-Backend
   ```

2. Install dependencies in the main folder:

   ```bash
   npm install
   ```

3. Database Setup:

- In order for you to have your project running locally, you need to create a MongoDB database named **StatsService**. If you don't have MongoDB Compass installed, you can download it from [here](https://www.mongodb.com/docs/compass/current/) and follow the instructions to set it up. Once downloaded and user account is set up, you can set up the MongoDB database.
- Inside the StatsService database, create the following collection:

```sh
stats
```

- If any initial data is required, please ensure to add it accordingly.

4. Start the app for it to work on your localhost:

   ```sh
   npm run dev
   ```

5. In order to run your tests, execute:
   ```sh
   npm test
   ```

## Decisions and Considerations

- Environment Variables: An .env file to hold the port and MongoDB URI was not included for simplicity. In a more sensitive or complex project, creating an .env file and storing sensitive information there would be recommended.

## Tech Stack

[![Express.js][Express.js]][Express.js-url] [![MongoDB][Mongo-Db]][Mongo-Db-url] [![Mongoose][Mongoose]][Mongoose-url] [![Jest][Jest]][Jest-url] [![GitHub][GitHub]][GitHub-url] [![ESLint][ESLint]][ESLint-url] [![Prettier][Prettier]][Prettier-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Mongo-Db]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-Db-url]: https://www.mongodb.com/docs/atlas/getting-started/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[Mongoose]: https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=for-the-badge
[Mongoose-url]: https://mongoosejs.com/docs/index.html
[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge
[ESLint-url]: https://eslint.org/docs/latest/
[GitHub-url]: https://github.com/
[GitHub]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[Prettier]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
[Prettier-url]: https://prettier.io/
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/docs/getting-started
