export const userDocs = {
    '/post/create-post': {
        post: {
            summary: 'Create a Post',
            description: 'Allows authenticated users to create a post with optional media.',
            tags: ['Post'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                content: { type: 'string', example: 'This is my first post!' },
                                mediaUrl: { type: 'string', format: 'binary' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Post created successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number', example: 4 },
                                    content: { type: 'string', example: 'This is my first post!' },
                                    mediaUrl: { type: 'string', example: 'uploads/image.jpg' },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number', example: 5 },
                                            name: { type: 'string', example: 'John Doe' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/post/like-post': {
        post: {
            summary: 'Like a Post',
            description: 'Allows authenticated users to like a post.',
            tags: ['Post'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: { type: 'number', example: 4 },
                                postId: { type: 'number', example: 3 },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Post liked successfully.' },
                400: { description: 'Post already liked.' },
                404: { description: 'User or Post not found.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/post/comment': {
        post: {
            summary: 'Comment on a Post',
            description: 'Allows authenticated users to comment on a post.',
            tags: ['Post'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: { type: 'number', example: 4 },
                                postId: { type: 'number', example: 3 },
                                content: { type: 'string', example: 'Nice post!' },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: 'Comment added successfully.' },
                404: { description: 'User or Post not found.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/user/follow-user': {
        post: {
            summary: 'Follow a User',
            description: 'Allows authenticated users to follow another user.',
            tags: ['User'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                followerId: { type: 'number', example: 4 },
                                followingId: { type: 'number', example: 3 },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: 'User followed successfully.' },
                400: { description: 'Cannot follow yourself or already following.' },
                404: { description: 'User not found.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/user/unfollow-user': {
        post: {
            summary: 'Unfollow a User',
            description: 'Allows authenticated users to unfollow another user.',
            tags: ['User'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                followerId: { type: 'number', example: 3 },
                                followingId: { type: 'number', example: 4 },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: 'User unfollowed successfully.' },
                404: { description: 'Follow relationship not found.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
};
