pragma solidity ^0.4.4;

contract createERC20 {
    
     // MODIFIER 
     modifier onlyOwner {
         require (msg.sender == icoOwner);
         _;
     }
   	 string public tokenName; // nombre de nuestra criptomoneda
	 string public symbol;// le designamos un simbolo
	 uint public decimals;  // le asignamos el numero de decimales - ether usa 18 decimales
	 uint256 public totalSupply; // total supply of our token 

	 uint256 public buyPrice;
	 //uint256 public sellPrice;
	 
	 uint256 public actualSupply;
	 
	 address public  icoOwner;
	 
	 // keep track of how mucha tokens everybody has
	 mapping(address => uint256) balances; // the addres is the key of the dic balances
	 //mapping (address => mapping (address => uint256)) public allowance;
	 
	 
	 // EVENTOS
	 //event CreateToken (string name, string symbol, uint decimals, uint256 totalSupply, uint256 princeInEther, address icoOwner);
	 event Transfer(address indexed from, address indexed to, uint256 value, uint256 aSupply); // notificamos que se ha realizado una transaccion
     //event Burn(address indexed from, uint256 value); // notificamos de la destruccion de tokens
	
	/*
	* the constructor function of our Token smart contract
	*/
	//function createERC20_v2() public {
	constructor() public {
	    icoOwner = msg.sender;
	}
	
	/*
	* Function to set token parameters
	*/
	 function setERC2Params (string tName, string  tSymbol, uint nDecimals, uint256  initialSup, uint256 p_buy, address owner) public onlyOwner {
	     
	     tokenName = tName;
	     symbol = tSymbol;
	     decimals = nDecimals;
	     // totalSupply = totalSup;// we create totalSup=100 tokens w/ nDecimals=2 decimals
	     totalSupply = initialSup * 10 * uint256(nDecimals); // 
	     buyPrice = p_buy;
	    // sellPrice = p_sell;
	     actualSupply = totalSupply;
	     
	     //icoOwner = owner;
	     
	     balances[icoOwner] = totalSupply; // es lo mismo poner tokenOwner que msgSender por como está progrmado???
	     
	     //emit CreateToken(tName, tSymbol, nDecimals, initialSup, p_buy, owner);
	 }
	 
	 /*
	 * Getter function for the totalSupply variable
	 */
	 function getTotalSupply() public constant returns (uint){
	     return totalSupply;
	 }
	 
	 /*
	 * Gets the balance of the specified address
	 */
	 function balanceOf(address tokenOwner) public constant returns (uint balance){
	     return balances[tokenOwner];
	 }
	 
	 /*
	 * Internal transfer function, it can only be called by this contract
	 */
	 function _transfer(address _from, address _to, uint _value) internal {
        
        require(_to != address(0)); // Prevent transfer to 0x0 address.
        require(balances[_from] >= _value);  // Check if the sender has enough
        require(balances[_to] + _value > balances[_to]); // Check for overflows ?????
        uint previousBalances = balances[_from] + balances[_to]; // Save this for an assertion in the future
        
        balances[_from] -= _value; // Subtract from the sender
        balances[_to] += _value;// Add the same to the recipient
        actualSupply -= _value;
        
        emit Transfer(_from, _to, _value, actualSupply); // emit event
        
        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balances[_from] + balances[_to] == previousBalances);
    }
    
    /* 
    * Externalfunction for transfering
    * Sen (_value) tokens to (_to) account from your account
    *
    * @param _to Address of recipient account
    * @param _value Amount of tokens to send    *
    */
    function transfer( address _to, uint256 _value) payable public {
        _transfer(icoOwner, _to, _value);
    }
    
    
    /*
    * Funcion que actualiza el precio del token creado 
    * solo el creador de la ICO puede actualizar este valor 
    */
    function setPrices (uint256 newBuyPrice) onlyOwner public {
        // sel tamb iria aqui
        buyPrice = newBuyPrice;
    }
    
    /*
    *  buy tokens from contract by sending ether 
    */
    function buy() payable public {
        uint amount = msg.value / buyPrice; // calculates the amoun
        _transfer (this, msg.sender, amount);
        
        emit Transfer(this, msg.sender, amount, actualSupply); // execute an event reflecting the change
    }
    
    /*
    * Function to extract the ehters keep in the contract
    * only the ICO owner can use it
    * ¿ESTA BIIIEN?
    */
    function extractInvestment(uint amount) payable onlyOwner public {
        // COMO ????? 
        icoOwner.transfer(amount); // ??? 
    }
	
}