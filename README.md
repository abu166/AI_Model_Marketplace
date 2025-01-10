# AI Model Marketplace

A decentralized application for listing, purchasing, rating, and managing AI models using blockchain technology.

---

## Usage

1. **List a New Model**:
   - Enter the model name, description, and price in ETH.
   - Click the **List Model** button to add it to the marketplace.

2. **View Available Models**:
   - See all listed models under the **Available Models** section.

3. **Purchase a Model**:
   - Click the **Confirm Purchase** button for the desired model to complete the transaction.

4. **Rate a Purchased Model**:
   - Enter the model ID and a rating between 1 and 5.
   - Click the **Rate Model** button to submit your feedback.

5. **Withdraw Funds**:
   - Creators can withdraw their earnings by clicking the **Withdraw Funds** button.

---


## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Solidity**: Smart contract development for blockchain interactions.
- **Web3.js**: Library for interacting with the blockchain and smart contracts.
- **Bootstrap**: UI framework for styling and layout.


---

## Demo Screenshots

### Main Page
![Main Page](photos/main.png)

### Listing a Model
![List Model](photos/list.png)

### Available Models
![Available Models](photos/available_models.png)

### View Details
![View Details](photos/details.png)

### Confirm Purchase
![Confirm Purchase](photos/purchase.png)

### Rating a Model
![Rate Model](photos/rate.png)

---

## How to Run the Project

1. **Clone the repository**:
```bash
git clone https://github.com/your-repository/ai-model-marketplace.git
cd ai-model-marketplace
```
2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Set up the blockchain environment:**
   - Deploy the smart contracts using RemixIDE.
   - Update the contractAddress and ABI in your project under src/utils/web3.js.

5. **Run the DApp:**
  - Open http://localhost:3000 in your browser.

---

## Examples

### Listing a New Model
1. Fill in the form with:
   - **Name**: "AI Assistant"
   - **Description**: "An advanced chatbot powered by GPT-4."
   - **Price**: 0.5 ETH
2. Click **List Model**.

### Purchasing a Model
1. Select the model from the **Available Models** section.
2. Click **Confirm Purchase**.

### Rating a Purchased Model
1. Enter:
   - **Model ID**: 1
   - **Rating**: 5
2. Click **Rate Model**.

### Withdrawing Funds
1. As the model creator, click the **Withdraw Funds** button.
2. Confirm the transaction.

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).

