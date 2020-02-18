module.exports = {
    DB_URL: 'mongodb://localhost:27017/ltl',
    userRoles: {
        ADMIN: 'ADMIN',
        EE: 'EE',
        SPE: 'SPE',
        ECP: 'EC&P',
        ELI: 'EL&I',
        PE: 'PE',
        TE: 'TE',
        ANY: 'ANY',
    },
    templates: {
        ACTION_PLAN: 'ACTION_PLAN',
    },
    JWT_SECRET: 'mqGiNcwtbrAnuE3jnPuY',
    COOKIE_LIFETIME_MS: 3600000,
    AUTH_COOKIE_NAME: 'token',
    AUTH_HEADER_NAME: 'token',
};