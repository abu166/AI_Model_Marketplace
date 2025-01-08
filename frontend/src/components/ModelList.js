import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { contract, web3 } from "../utils/web3";
import ModelDetails from "./ModelDetails";
import RateModelForm from "./RateModelForm";

const ModelList = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            const totalModels = await contract.methods.totalModels().call();
            const modelsArray = [];
            for (let i = 0; i < totalModels; i++) {
                const model = await contract.methods.getModelDetails(i).call();
                modelsArray.push({ id: i, ...model });
            }
            setModels(modelsArray);
        };
        fetchModels();
    }, []);

    const purchaseModel = async (id, price) => {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.purchaseModel(id).send({
            from: accounts[0],
            value: price,
        });
        alert("Model purchased successfully!");
    };

    return (
        <Row>
            {models.map((model) => (
                <Col key={model.id} md={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>{model.name}</Card.Title>
                            <Card.Text>{model.description}</Card.Text>
                            <Card.Text>Price: {web3.utils.fromWei(model.price, "ether")} ETH</Card.Text>
                            <Button
                                variant="success"
                                className="me-2"
                                onClick={() => purchaseModel(model.id, model.price)}
                            >
                                Buy
                            </Button>
                            <ModelDetails modelId={model.id} />
                            <RateModelForm modelId={model.id} />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default ModelList;
