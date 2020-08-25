pragma solidity ^0.6.0;

import "./Ownable.sol";

contract Saas is Ownable{
    
    struct Customer{
        string email;
        string apiKey;
        uint32 created;
        uint32 subEnd;
    }
    
    uint activeSubs;
    mapping (address => Customer ) customers;
    
    uint subCost = 1 ether;
    uint refundDate = 7 days;
    
    event refund(address to,uint amount);
    event subscribed(address who, uint duration);
    
    constructor() Ownable() public{
        activeSubs = 0;
    }
   
    // TODO make this pseudo random with oracle contracts
    function _createApiKey(string memory _seed) private pure returns(string memory) {
        return _seed;
    }
    
    function getSubEnd() public view returns(uint) {
        require(customer[msg.sender].subEnd > 0);
        return customers[msg.sender].subEnd;
    }
    function getSubEmail() public view returns(string memory) {
        require(customers[msg.sender].subEnd > 0);
        return customers[msg.sender].email;
    }
    
    function subscribe(string memory email, uint _duration) public payable{
        require(msg.value == _duration * subCost);
        uint32 monthLater =  uint32(now + _duration * 30 days);
        if(customers[msg.sender].subEnd > 0){
            customers[msg.sender].subEnd = monthLater;
        }
        else {
            customers[msg.sender] =  Customer(email,_createApiKey(string(abi.encodePacked(msg.sender))),uint32(now),monthLater);
        }
        emit subscribed(msg.sender,_duration);

    }
    
    function _refund(uint amount) private{
        address payable customer = address(uint160(msg.sender));
        customer.transfer(amount);
        emit refund(msg.sender,amount);
    }
    
    function cancelSub() public {
        require(customers[msg.sender].subEnd >= now);
        if((customers[msg.sender].created + refundDate ) > now ) {
            uint refundAmount = (((customers[msg.sender].subEnd - now) / 30 days) +1)*subCost;
            _refund(refundAmount);
            customers[msg.sender].created-=uint32(refundDate+1);
        }
        
        customers[msg.sender].subEnd = uint32(now-1);
    }
    
    function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner()));
        uint amount = (address(this).balance - activeSubs*subCost);
        _owner.transfer(amount);
    }
    
}
