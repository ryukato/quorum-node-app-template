echo "Config Environment variables"

export LOG_LEVEL=debug
export VM_INDEX=1
export PROCESS_INDEX=1
export NODE_ENV=local
export PORT=9200
export CONTRACTS='testContract'

echo "LOG_LEVEL="${LOG_LEVEL}
echo "NODE_ENV="${NODE_ENV}
echo "VM_INDEX"=${VM_INDEX}
echo "PROCESS_INDEX"=${PROCESS_INDEX}
echo "PORT"=${PORT}
echo "CONTRACTS"=${CONTRACTS}
echo ""

echo "Build and deploy smart contract"
# build and deploy smart contract
yarn deploy:contract-local

echo ""
echo "Build application"
# build application
yarn run build:app

echo ""
echo "Kill current pm2 processes"
# pm2 kill current processes
pm2 kill

echo ""
echo "Start application with pm2"
#start application with pm2
pm2 start ../build/backend-main.js -i 8
