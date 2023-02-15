"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../controller/UserController");
const TransactionsController_1 = require("../controller/TransactionsController");
const logger_1 = require("../utils/logger");
const dotenv = require('dotenv');
dotenv.config();
const general_config_1 = require("../config/general.config");
const http = require('http');
const port = general_config_1.default.PORT;
const requestListener = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    switch (true) {
        case req.url.includes('/auth/login'):
            logger_1.log.warn('/auth/login');
            (0, UserController_1.login)(req, res);
            break;
        case req.url.includes('/auth/logout'):
            logger_1.log.warn('/auth/logout');
            (0, UserController_1.logout)(req, res);
            break;
        case req.url.includes('/user/balance'):
            logger_1.log.warn('\n/user/balance');
            (0, UserController_1.getBalance)(req, res);
            break;
        case req.url.includes('/wallet/list'):
            logger_1.log.warn('\n/wallet/list');
            (0, TransactionsController_1.listTransactions)(req, res);
            break;
        case req.url.includes('/wallet/deposit'):
            logger_1.log.warn('\n/wallet/deposit');
            (0, TransactionsController_1.deposit)(req, res);
            break;
        case req.url.includes('/wallet/withdraw'):
            logger_1.log.warn('\n/wallet/withdraw');
            (0, TransactionsController_1.withdraw)(req, res);
            break;
        case req.url.includes('/register'):
            logger_1.log.warn('\n/register');
            (0, UserController_1.register)(req, res);
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({
                error: 'Resource not found',
            }));
            break;
    }
};
const server = http.createServer(requestListener);
server.listen(port, () => {
    logger_1.log.info(`\nServer is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map