import React, { useState, useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { web3, contract, loadWeb3 } from "./utils/web3";
import "./App.css";

const App = () => {
    const [models, setModels] = useState([]);
    const [modelDetails, setModelDetails] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", price: "" });
    const [rateData, setRateData] = useState({ modelId: "", rating: "" });
    const [modelIdToPurchase, setModelIdToPurchase] = useState("");

    useEffect(() => {
        loadWeb3();
        fetchModels();
    }, []);

    const fetchModels = async () => {
        const modelCount = await contract.methods.modelCount().call();
        const fetchedModels = [];
        for (let i = 1; i <= modelCount; i++) {
            const model = await contract.methods.models(i).call();
            fetchedModels.push(model);
        }
        setModels(fetchedModels);
    };

    const listModel = async () => {
        const { name, description, price } = formData;
        if (!name || !description || !price) {
            alert("All fields are required.");
            return;
        }
        const accounts = await web3.eth.getAccounts();
        await contract.methods
            .listModel(name, description, web3.utils.toWei(price, "ether"))
            .send({ from: accounts[0] });
        alert("Model listed successfully!");
        setFormData({ name: "", description: "", price: "" });
        fetchModels();
    };

    const purchaseModel = async () => {
        const accounts = await web3.eth.getAccounts();
        const model = await contract.methods.models(modelIdToPurchase).call();
        if (!model.price) {
            alert("Model does not exist.");
            return;
        }
        await contract.methods
            .purchaseModel(modelIdToPurchase)
            .send({ from: accounts[0], value: model.price });
        alert("Model purchased successfully!");
        setModelIdToPurchase("");
    };

    const rateModel = async () => {
        const { modelId, rating } = rateData;
        if (!modelId || !rating) {
            alert("Both Model ID and Rating are required.");
            return;
        }
        const accounts = await web3.eth.getAccounts();
        await contract.methods.rateModel(modelId, parseInt(rating, 10)).send({ from: accounts[0] });
        alert("Model rated successfully!");
        setRateData({ modelId: "", rating: "" });
    };

    const viewModelDetails = async (modelId) => {
        const details = await contract.methods.getModelDetails(modelId).call();
        setModelDetails(details);
    };

    const withdrawFunds = async () => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.withdrawFunds().send({ from: accounts[0] });
        alert("Funds withdrawn successfully!");
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>AI Model Marketplace</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="mt-4 text-center">
                <h2>List a New Model</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price (ETH)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <Button onClick={listModel}>List Model</Button>
                <hr />
                <h2>Available Models</h2>
                {models.map((model, index) => (
                    <div key={index} className="model">
                        <p>ID: {index + 1}</p>
                        <p>Name: {model.name}</p>
                        <p>Description: {model.description}</p>
                        <p>Price: {web3.utils.fromWei(model.price, "ether")} ETH</p>
                        <p>Creator: {model.creator}</p>
                        <Button onClick={() => setModelIdToPurchase(index + 1)}>Purchase</Button>
                        <Button onClick={() => viewModelDetails(index + 1)}>View Details</Button>
                    </div>
                ))}
                <Button onClick={purchaseModel}>Confirm Purchase</Button>
                {modelDetails && (
                    <div>
                        <h3>Model Details</h3>
                        <p>Name: {modelDetails[0]}</p>
                        <p>Description: {modelDetails[1]}</p>
                        <p>Price: {web3.utils.fromWei(modelDetails[2], "ether")} ETH</p>
                        <p>Creator: {modelDetails[3]}</p>
                        <p>Average Rating: {modelDetails[4]}</p>
                    </div>
                )}
                <hr />
                <h2>Rate a Model</h2>
                <input
                    type="number"
                    placeholder="Model ID"
                    value={rateData.modelId}
                    onChange={(e) => setRateData({ ...rateData, modelId: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rateData.rating}
                    onChange={(e) => setRateData({ ...rateData, rating: e.target.value })}
                />
                <Button onClick={rateModel}>Rate Model</Button>
                <hr />
                <Button onClick={withdrawFunds}>Withdraw Funds</Button>
            </Container>
        </div>
    );
};

export default App;
