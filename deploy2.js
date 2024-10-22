const HDwalletProvider = require('@truffle/hd-wallet-provider');
const { Web3 } = require('web3');
const { abi, bytecode, evm } = require('../compile.js');

const provider = new HDwalletProvider(
    process.env.SECRET_PHRASES,
    process.env.API_URL
);

const web3 = new Web3(provider);

// const path = require('path');
// const fs = require('fs');

// // const web3 = new Web3(ganache.provider());
// // const web3 = new Web3("http://127.0.0.1:8545/");

// const bytecodePath = path.join(__dirname, 'StorageBytecode.bin');
// const bytecode = fs.readFileSync(bytecodePath, 'utf8');

// const abi = require('./StorageAbi.json');
// const myContract = new web3.eth.Contract(abi);
// myContract.handleRevert = true;

// async function deploy() {
//     const providersAccounts = await web3.eth.getAccounts();
//     const defaultAccount = providersAccounts[0];
//     console.log('Deployer account:', defaultAccount);

//     const contractDeployer = myContract.deploy({
//         data: '0x' + bytecode,
//         arguments: [1],
//     });

//     const gas = await contractDeployer.estimateGas({
//         from: defaultAccount,
//     });
//     console.log('Estimated gas:', gas);

//     try {
//         const tx = await contractDeployer.send({
//             from: defaultAccount,
//             gas,
//             gasPrice: 10000000000,
//         });
//         console.log('Contract deployed at address: ' + tx.options.address);

//         const deployedAddressPath = path.join(__dirname, 'StorageAddress.txt');
//         fs.writeFileSync(deployedAddressPath, tx.options.address);
//     } catch (error) {
//         console.error(error);
//     }
// }

// deploy();