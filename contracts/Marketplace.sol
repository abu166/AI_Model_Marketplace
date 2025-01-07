// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address payable creator;
        uint256 ratingSum;
        uint256 ratingCount;
    }

    mapping(uint256 => Model) public models;
    uint256 public modelCount;
    mapping(address => uint256[]) public purchasedModels;

    event ModelListed(uint256 modelId, string name, uint256 price, address creator);
    event ModelPurchased(uint256 modelId, address buyer);
    event ModelRated(uint256 modelId, uint8 rating, address rater);

    function listModel(string memory name, string memory description, uint256 price) public {
        require(price > 0, "Price must be greater than 0");

        modelCount++;
        models[modelCount] = Model(name, description, price, payable(msg.sender), 0, 0);

        emit ModelListed(modelCount, name, price, msg.sender);
    }

    function purchaseModel(uint256 modelId) public payable {
        Model storage model = models[modelId];
        require(model.price > 0, "Model does not exist");
        require(msg.value == model.price, "Incorrect payment amount");

        model.creator.transfer(msg.value);
        purchasedModels[msg.sender].push(modelId);

        emit ModelPurchased(modelId, msg.sender);
    }

    function rateModel(uint256 modelId, uint8 rating) public {
        require(rating > 0 && rating <= 5, "Rating must be between 1 and 5");

        Model storage model = models[modelId];
        require(model.price > 0, "Model does not exist");

        model.ratingSum += rating;
        model.ratingCount++;
        emit ModelRated(modelId, rating, msg.sender);
    }

    function withdrawFunds() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getModelDetails(uint256 modelId) public view returns (
        string memory name, 
        string memory description, 
        uint256 price, 
        address creator, 
        uint256 averageRating
    ) {
        Model storage model = models[modelId];
        require(model.price > 0, "Model does not exist");

        uint256 avgRating = model.ratingCount > 0 ? model.ratingSum / model.ratingCount : 0;

        return (model.name, model.description, model.price, model.creator, avgRating);
    }
}
