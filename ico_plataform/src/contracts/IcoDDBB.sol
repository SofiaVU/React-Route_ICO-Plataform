pragma solidity ^0.4.4;

contract IcoDDBB   {
    
    struct ICO {
        uint id;
        string name;
        address tokenContract;
        string openingDate;
        string closingDate;
        //uint tokenPrice;
        address owner; 
        //address ERC2contract; // guardo la dir del contrato que crea el token de la ico asociado
    }
    
    //mapping (address => ICO) private icoListAdd;
    //address[] public addrIcos;
   
    mapping (uint => ICO) private icoList; // Diccionario (id -> ICO)
    uint[] public arrayIdICOs; // todos los id's
    uint id_counter = 0;
    
    address public owner;
    
    // EVENTS
    event Register(uint id, string name, string oppening, string closing, address icoOwner);
    
    /*
    * Constructor del Smart Contract
    */
    //function IcoDDBB() public {
    constructor() public {
        owner = msg.sender;
    }
      
    /*
    * Funcion registart una nueva ICO en la plataforma
    */
    function register(string name, address token,  string opppening, string clossing) public {
       
       //icoList[id_counter] = ICO(id_counter, name, token, opppening, clossing, tokenPric, msg.sender);
       icoList[id_counter] = ICO(id_counter, name, token, opppening, clossing, msg.sender);
       arrayIdICOs.push(id_counter);
       
       emit Register(id_counter, name, opppening, clossing, msg.sender);// lanzamos evento 
       
       id_counter = id_counter + 1; // actualizamos contador de ICOs
    }
    
    //////////////////////////////////////////////////////////////////////////
    //                                                                      //
    //                      GETTER FUNCTIONS                                //
    //                                                                      //
    //////////////////////////////////////////////////////////////////////////
    
    
    /*
    * Devuelve el numero de ICOs creadas/registradas
    */
    function numberOfIcos() public constant returns (uint) {
        return arrayIdICOs.length;
    }
    
    /*
    * Devuleve el array con todos los id's nde las ICOs
    */
    function getIdIcos ()  public constant returns (uint[]) {
        return arrayIdICOs;
    }
    
    /*
    * Devuleve el nombre de la ICO dado su id
    */
    function getICOnameByID(uint id) public constant returns (string) {
        return icoList[id].name;
    }

    /*
    * Devuleve el precio del token de la ICO dado su id
    */
    /*function getTokenPriceByID(uint id) public constant returns (uint) {
        return icoList[id].tokenPrice;
    }*/
    
    /*
    * Devuleve el nombre del token de la ICO dado su id
    */
    function getTokenAddressByID(uint id) public constant returns (address) {
        return icoList[id].tokenContract;
    }
    
    /*
    * Devuleve la fecha de apertura de la ICO dado su id
    */
    function getOpeningDateNameByID(uint id) public constant returns (string) {
        return icoList[id].openingDate;
    }
    
    /*
    * Devuleve la fecha de apertura de la ICO dado su id
    */
    function getClosingDateNameByID(uint id) public constant returns (string) {
        return icoList[id].closingDate;
    }
    
    /*
    * Devuleve el creador  de la ICO dado su id
    */
    function getOwnerAddeByID(uint id) public constant returns (address) {
        return icoList[id].owner;
    }
}