import { ethers } from 'ethers';
import abi from '../../ABI.json';
const CONTRACT_ADDRESS = "0x8785bb53Ba509A1ceF69EA983F272A60C008320b"; // address of the contract


let contract;
let defaultAccount;

export function SetAddress(address){
    defaultAccount = address;
}

export const initWeb3 = async () => {
    if (window.ethereum) {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangeHandler(result[0]);
            })
            .catch(error => {
                console.error('Error connecting wallet:', error);
            });
            
            const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            const tempSigner = tempProvider.getSigner();
            contract = new ethers.Contract(CONTRACT_ADDRESS, abi, tempSigner);
    } else {
        console.error('MetaMask extension not found.');
    }
};

export async function JoinGame(entryBet){
    try{
        const valueToSend = ethers.utils.parseEther(entryBet); 
    
        const tx = await contract.joinGame({ value: valueToSend, gasLimit: 100000 });// send the ethers and gas to the smart contract
        await tx.wait();
        
    } catch(error){
        alert(error);
    }
}

export async function Guess(betValue, playerGuess){
    try{
        const valueToSend = ethers.utils.parseEther(betValue); 
        const guessing = await contract
        .makeGuess(playerGuess, { value: valueToSend, from: defaultAccount, gasLimit: 120000})
        await guessing.wait();
    }catch(error){
        alert(error);
        }
    
} 

export async function GetNumber(){
    if(defaultAccount === OWNER_ADDRESS){
        try{
            const Number = await contract.getTargetNumber({from: defaultAccount, gasLimit: 100000});
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
        await contract.withdraw({from:defaultAccount, gasLimit: 100000});
    } catch(error){
        alert(error);
    }
}