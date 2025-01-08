import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./components/Navbar";
import ListModelForm from "./components/ListModelForm";
import ModelList from "./components/ModelList";
import RateModelForm from "./components/RateModelForm";
import WithdrawFundsButton from "./components/WithdrawFundsButton";
import { loadWeb3, contract } from "./utils/web3"; // Correct import
import "./App.css";

const App = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        loadWeb3();
        fetchModels();
    }, []);

    const fetchModels = async () => {
        const modelCount = await contract.methods.modelCount().call();
        const fetchedModels = [];

        for (let i = 1; i <= modelCount; i++) {
            const model = await contract.methods.getModelDetails(i).call();
            fetchedModels.push({
                id: i,
                name: model[0],
                description: model[1],
                price: model[2],
                creator: model[3],
                rating: model[4],
            });
        }
        setModels(fetchedModels);
    };

    const handleListModel = async (name, description, price) => {
        try {
            await contract.methods.listModel(name, description, price).send({
                from: window.ethereum.selectedAddress,
            });
            fetchModels();
        } catch (error) {
            console.error("Error listing model:", error);
        }
    };

    const handlePurchase = async (modelId, price) => {
        try {
            await contract.methods.purchaseModel(modelId).send({
                from: window.ethereum.selectedAddress,
                value: price,
            });
            alert(`Model ${modelId} purchased successfully!`);
        } catch (error) {
            console.error("Error purchasing model:", error);
        }
    };

    const handleRateModel = async (modelId, rating) => {
        try {
            await contract.methods.rateModel(modelId, rating).send({
                from: window.ethereum.selectedAddress,
            });
            fetchModels();
        } catch (error) {
            console.error("Error rating model:", error);
        }
    };

    return (
        <div className="container-wrapper">
            <AppNavbar />
            <Container>
                {/* Form to list a new model */}
                <h2 className="section-title">List Your AI Model</h2>
                <ListModelForm onListModel={handleListModel} />
                <hr />

                {/* List of available models */}
                <h2 className="section-title">Available AI Models</h2>
                <ModelList models={models} onPurchase={handlePurchase} />
                <hr />

                {/* Form to rate a purchased model */}
                <h2 className="section-title">Rate a Purchased Model</h2>
                <RateModelForm
                    onRateModel={(modelId, rating) => {
                        try {
                            handleRateModel(modelId, rating);
                        } catch (error) {
                            console.error("Error rating model:", error);
                        }
                    }}
                />
                <hr />

                {/* Button to withdraw funds */}
                <WithdrawFundsButton />
            </Container>
        </div>
    );
};

export default App;
