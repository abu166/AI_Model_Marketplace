import React from "react";
import { Button } from "react-bootstrap";
import { contract, web3 } from "../utils/web3";

const WithdrawFundsButton = () => {
    const withdrawFunds = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.withdrawFunds().send({ from: accounts[0] });
        alert("Funds withdrawn successfully!");
    };

    return (
        <Button variant="warning" onClick={withdrawFunds}>
            Withdraw Funds
        </Button>
    );
};

export default WithdrawFundsButton;
