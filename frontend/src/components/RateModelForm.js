import React, { useState } from "react";

const RateModelForm = ({ onRateModel }) => {
    const [modelId, setModelId] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!modelId || !rating) {
            alert("Please provide both Model ID and Rating.");
            return;
        }

        const ratingValue = parseInt(rating, 10);
        if (ratingValue < 1 || ratingValue > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }

        onRateModel(modelId, ratingValue);
        setModelId("");
        setRating("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Model ID:</label>
                <input
                    type="number"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Rating (1-5):</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
            </div>
            <button type="submit">Rate Model</button>
        </form>
    );
};

export default RateModelForm;
