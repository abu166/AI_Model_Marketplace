import Web3 from "web3";
import ContractABI from "../abi/AIModelMarketplace.json";
import { CONTRACT_ADDRESS } from "./constants";

let web3, contract;

const loadWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(ContractABI, CONTRACT_ADDRESS);
    } else {
        alert("Please install MetaMask to interact with this dApp!");
    }
};

export { loadWeb3, web3, contract };
