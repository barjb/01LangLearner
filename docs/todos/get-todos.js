module.exports = {
    get: {
        tags: ["Todo CRUD operations"],
        description: "get todos",
        operationId: "getTodos",
        parameters: [],
        responses: {
            200: {
                description: "Todos were obtained", // response desc.
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Todo", // Todo model
                        },
                    },
                },
            },
        },
    },
};
