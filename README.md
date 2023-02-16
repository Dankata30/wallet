# wallet
This is a wallet application  

INSTRUCTIONS:
to set db: npm run setDb
to run the project: npm start 
to run tests: npm test
configured on localhost:3000

db name: wallet 
3 sql tables included with code: users, transactions, sessions

API endpoints + requirements to call
/auth/login      - query params: username, password
/auth/logout     - query params: user_id
/users/balance   - query params: user_id
/wallet/list     - query params: user_id, transactions_to_show
/wallet/deposit  - query params: user_id, amount_to_requested
/wallet/withdraw - query params: user_id, amount_to_requested
/register        - query params: username, password, role (admin/user) 

admin - have access to every endpoint
user  - can only start/end session

Requests are HTTP method independent. You can fire each with any http verb.  