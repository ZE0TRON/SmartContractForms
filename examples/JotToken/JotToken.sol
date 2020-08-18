pragma solidity ^0.5.11;



contract JotToken{

  address owner;

  string name;

  string symbol;

  uint256 totalJotTokens;

  mapping (address => uint256) public balance;


  constructor(string memory _name, string memory _symbol, uint256 _totalJotTokens) public {

    owner = msg.sender;

    name = _name;

    symbol = _symbol;

    totalJotTokens = _totalJotTokens;

    balance[owner] = totalJotTokens/2;

}

  event Transfer(address indexed _from, address indexed _to, uint256 _value);

  function totalSuply() view public returns (uint256) {

    return totalJotTokens;

  }

  function balanceOf(address _owner) view public returns(uint256) {

    return balance[_owner];

  }

  function transfer(address _to, uint256 _value) public returns (bool) {

    require (balance[msg.sender]> _value);

    require (value > 0);

    address _from = msg.sender;

    emit Transfer(_from,_to,_value);

    balance[_from] = balance[_from] - _value;

    balance[_to] = balance[_to] += _value;

    return true;

  }

}
