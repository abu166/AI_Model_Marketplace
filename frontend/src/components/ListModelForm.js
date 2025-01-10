import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { contract, web3 } from "../utils/web3";

const ListModelForm = ({ fetchModels }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const listModel = async (e) => {
        e.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods
                .listModel(name, description, web3.utils.toWei(price, "ether"))
                .send({ from: accounts[0] });

            alert("Model listed successfully!");
            setName("");
            setDescription("");
            setPrice("");

            // Fetch the updated list of models
            await fetchModels();
        } catch (err) {
            alert("Failed to list model: " + err.message);
        }
    };

    return (
        <Form onSubmit={listModel}>
            <Form.Group>
                <Form.Label>Model Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter model name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price (ETH)</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price in ETH"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                List Model
            </Button>
        </Form>
    );
};

export default ListModelForm;
