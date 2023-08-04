import Web3 from 'web3';
import abi from '../../ABI.json';
const CONTRACT_ADDRESS = "0x5cA45679bC423BacF198C217d3fa113F09862eDc"; // address of the contract

export const initWeb3 = async () => {
    if (window.ethereum) {
        try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
        } catch (error) {
        alert(error);
        }
    }
};

export async function JoinGame(entryBet){
    try{
        const valueToSend = web3.utils.parseEther(entryBet); 
    
        const tx = await contract.methods.joinGame().call({ value: valueToSend, gasLimit: 100000 });// send the ethers and gas to the smart contract
        await tx.wait();
        
    } catch(error){
        alert(error);
    }
}

export async function Guess(betValue, playerGuess){
    try{
        const valueToSend = web3.utils.parseEther(betValue); 
        const guessing = await contract.methods
        .makeGuess(playerGuess).call({ value: valueToSend, from: defaultAccount, gasLimit: 120000})
        await guessing.wait();
        }catch(error){
        alert(error);
        }
    
} 

export async function GetNumber(){
    if(defaultAccount === OWNER_ADDRESS){
        try{
        const Number = await contract.methods.getTargetNumber()
        .call({from: defaultAccount, gasLimit: 100000});
        setTargetNumber(Number.toString());
        setTimeout(() => setTargetNumber(""), 5000 );
        }catch(error){
        alert(error);
    }
    }else{
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 5000);
    }
    
}

export async function Withdraw(){
    
    try{
        await contract.methods.withdraw().call({from:defaultAccount, gasLimit: 100000});
    } catch(error){
        alert(error);
    }
}