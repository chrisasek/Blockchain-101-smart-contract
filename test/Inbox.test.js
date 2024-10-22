const assert = require('assert');
const ganache = require('ganache-cli');

const { Web3 } = require('web3');
// const web3 = new Web3(ganache.provider());
const web3 = new Web3("http://127.0.0.1:8545/");

const { abi, bytecode, evm } = require('../compile.js');

// Create Contract
let storageContract = new web3.eth.Contract(abi);
// storageContract.handleRevert = true;

let defaultAccount;
let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    defaultAccount = accounts[0];
    // console.log('Deployer account:', defaultAccount);


    // Deploy
    const contractDeployer = storageContract.deploy({
        data: '0x' + bytecode,
        arguments: [1],
    });

    // Get Gas
    const gas = await contractDeployer.estimateGas({
        from: defaultAccount,
    });
    console.log('Estimated gas:', gas);

    try {
        inbox = await contractDeployer.send({
            from: defaultAccount,
            gas,
            gasPrice: 20000000000,
        });
        console.log('Contract deployed at address: ' + inbox.options.address);

        // const deployedAddressPath = path.join(__dirname, 'StorageAddress.txt');
        // fs.writeFileSync(deployedAddressPath, inbox.options.address);
    } catch (error) {
        console.error(error);
    }

    // use one of those accounts to deploy the contract
    // inbox = new web3.eth.Contract(abi)
    //     .deploy({ data: '0x' + bytecode, arguments: [1] })
    //     .send({
    //         from: defaultAccount,
    //         gas: 1000000,
    //     })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default number', async () => {
        const num = await inbox.methods.retrieve().call();
        console.log('Default number: ', num)
        assert.equal(num, 1);
    });
    
    it('can change the number', async () => {
        await inbox.methods.store(2).send({ from: defaultAccount });

        const newNum = await inbox.methods.retrieve().call();
        assert.equal(newNum, 2);
    });
});