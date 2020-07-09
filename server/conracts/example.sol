pragma solidity >=0.4.0 <0.7.0;

contract SimpleStorage {
    uint storedData;
    uint storeD;
    constructor(uint x) public {
        storedData = x;
        storeD=1500;
    }
    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
    function getD() public view returns (uint) {
        return storeD;
    }
}
