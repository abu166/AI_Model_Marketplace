import React, { useEffect, useState } from "react";
import { contract } from "../utils/web3";

const ModelDetails = ({ modelId }) => {
    const [model, setModel] = useState(null);

    useEffect(() => {
        const fetchModelDetails = async () => {
            const modelDetails = await contract.methods.getModelDetails(modelId).call();
            setModel(modelDetails);
        };
        fetchModelDetails();
    }, [modelId]);

    if (!model) return <p>Loading model details...</p>;

    return (
        <div>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
            <p>Price: {model.price} ETH</p>
        </div>
    );
};

export default ModelDetails;
