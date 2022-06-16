module.exports = {
    get: {
        tags: ["Todo CRUD operations"],
        desciption: "get a todo",
        operationId: "getTodo",
        parameters: [
            {
                name: "id", // name of the param
                in: "path", // location of the param
                schema: {
                    $ref: "#/components/schemas/id", // data model of the param
                },
                required: true, // Mandatory param
                description: "A single todo id", // param desc.
            },
        ],
        responses: {
            200: {
                description: "Todo is obtained", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Todo", // todo data model
                        },
                    },
                },
            },
            // response code
            404: {
                description: "Todo is not found", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error", // error data model
                        },
                    },
                },
            },
        },
    },
};
