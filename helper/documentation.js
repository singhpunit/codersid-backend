const studentDoc = require("../docsroutes/studentroutes/studentroutesdocs");

const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "CodersID API",
        version: "0.0.1",
        description: "API documentation for CodersID Portal"
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Local Dev"
        },
        {
            url: "https://codersid-backend.vercel.app",
            description: "Production Dev"
        }
    ],
    tags: [
        {
            name: "Students",
            description: "API for Student functionality"
        }
    ],
    paths: {
        ...studentDoc
    }
};

module.exports = swaggerDocumentation;