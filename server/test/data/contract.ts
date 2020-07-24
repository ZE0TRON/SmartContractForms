export const abi = `{
      "constant": false,
      "inputs": [
        {
          "name": "newMessage",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "initialMessage",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }`;
export const address = "0xE875927e83A6A009521cBbA9abbc5bfA42B946B3";
