const studentslist = {
    tags: ["Students"],
    description : "List of Students",
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema : {
                        type: "object",
                        example : {
                            count: 0,
                            Students: []
                        }
                    }
                }
            }
        }
    }
}

const addStudent = {
    tags: ["Students"],
    description : "Add New Student",
    requestBody : {
        content: {
            "application/json": {
                schema : {
                    type: "object",
                    properties : {
                        studentname : {
                            type: "string",
                            description: "Student Name",
                            example: "Harpreet"
                        }
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema : {
                        type: "object",
                        example : {
                            count: 0,
                            Students: []
                        }
                    }
                }
            }
        }
    }

}

const studentDoc = {
    "/api/students": {
    get: studentslist,
    post: addStudent
}}

module.exports = studentDoc