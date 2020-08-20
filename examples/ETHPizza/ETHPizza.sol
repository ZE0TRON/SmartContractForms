pragma solidity >=0.5.0 <0.7.0;

contract Pizza {
    mapping (address => Order) private _orders;
    uint256 private _orderCounter;
    address owner;
    struct Order {
        uint256 order_id;
        string deliver_address;
        uint8 pizza_type;
        uint8 pizza_size;
    }
    constructor() public {
        owner= msg.sender;
        _orderCounter = 0;
    }
    function order(string memory deliver_address, uint8 pizza_type, uint8 pizza_size) public payable {
        address sender = msg.sender;
        uint256 value = msg.value;
        uint256 pizza_cost = (pizza_size*1 ether) / 20;
        require(value == pizza_cost);
        _orderCounter+=1;
        Order memory new_order = Order(_orderCounter,deliver_address,pizza_type,pizza_size);
        _orders[sender] = new_order;
    }
    function getOrder() public view returns(uint256) {
        return _orders[msg.sender].order_id;
    }
}
