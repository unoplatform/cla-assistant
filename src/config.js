'use strict';
/**
 * Configuration Module
 *
 * @title config
 * @overview Configuration Module
 */
let path = require('path');

module.exports = {
    server: {
        github: {
            // optional
            protocol: process.env.GITHUB_PROTOCOL || 'https',
            host: process.env.GITHUB_HOST || 'github.com',
            api: process.env.GITHUB_API_HOST || 'api.github.com',
            enterprise: !!process.env.GITHUB_HOST, // flag enterprise version
            version: process.env.GITHUB_VERSION || '3.0.0',

            // required
            client: process.env.GITHUB_CLIENT,
            secret: process.env.GITHUB_SECRET,

            // required
            user: process.env.GITHUB_USER,
            pass: process.env.GITHUB_PASS,

            token: process.env.GITHUB_TOKEN,

            user_scope: ['user:email'],
            admin_scope: ['user:email', 'public_repo', 'repo:status', 'read:repo_hook', 'write:repo_hook', 'read:org', 'gist']
        },

        localport: process.env.PORT || 5000,

        always_recompile_sass: process.env.NODE_ENV === 'production' ? false : true,

        http: {
            protocol: process.env.PROTOCOL || 'https',
            host: process.env.HOST || 'cla-assistant.io',
            port: process.env.HOST_PORT
        },

        security: {
            sessionSecret: process.env.SESSION_SECRET || 'cla-assistant',
            cookieMaxAge: 60 * 60 * 1000
        },

        mongodb: {
            uri: process.env.MONGODB || process.env.MONGOLAB_URI
        },

        slack: {
            token: process.env.SLACK_TOKEN
        },

        slack_url: process.env.SLACK_URL,

        static: [
            path.join(__dirname, 'bower'),
            path.join(__dirname, 'client')
        ],

        api: [
            path.join(__dirname, 'server', 'modules', '*' ,'api.js')
        ],

        api_handler: [
            path.join(__dirname, 'server', 'modules', '*' ,'api.handler.js')
        ],

        free_api: [
            '/api/cla/get',
            '/api/repo/check'
        ],

        webhooks: [
            path.join(__dirname, 'server', 'webhooks', '*.js')
        ],

        documents: [
            path.join(__dirname, 'server', 'documents', '*.js')
        ],

        controller: [
            path.join(__dirname, 'server', 'controller', '!(default).js'),
            path.join(__dirname, 'server', 'controller', 'default.js')
        ],

        middleware: [
            path.join(__dirname, 'server', 'middleware', '*.js')
        ],

        passport: [
            path.join(__dirname, 'server', 'passports', '*.js')
        ]

    },

    client: {
        gacode: process.env.GACODE
    }

};
