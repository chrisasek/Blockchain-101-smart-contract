const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractName = 'Storage';
const fileName = `${contractName}.sol`;

const storagePath = path.resolve(__dirname, 'contracts', fileName);
const sourceCode = fs.readFileSync(storagePath, 'utf8');


var input = {
    language: 'Solidity',
    sources: {
        [fileName]: {
            content: sourceCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

// Compile the Solidity code using solc
const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
// Get the ABI from the compiled contract
const abi = compiledCode.contracts[fileName][contractName].abi;

const evm = compiledCode.contracts[fileName][contractName].evm;
// Get the ByteCode from the compiled contract
const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;


// Write the bytecode to a new file
const bytecodePath = path.join(__dirname, contractName + 'Bytecode.bin');
fs.writeFileSync(bytecodePath, bytecode);

// Write the Contract ABI to a new file
const abiPath = path.join(__dirname, contractName + 'Abi.json');
fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));

module.exports = { abi, bytecode, evm };



// module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Storage.sol']['Storage'];

// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Storage.sol']['Storage'])

// var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output.contracts['Storage.sol']['Storage']);
// return;

// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['Storage.sol']) {
//     console.log(
//         contractName +
//         ': ' +
//         output.contracts['Storage.sol'][contractName].evm.bytecode.object
//     );
// }