module.exports = {
    apps: [
        {
            name: "zimage",
            script: "server.js",
            env: {
                NODE_ENV: "production",
                // You can add other env vars here if needed, 
                // otherwise it inherits from system or .env file if configured
            }
        }
    ]
};
