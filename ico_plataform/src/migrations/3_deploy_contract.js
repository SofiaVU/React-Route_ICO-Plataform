const  createERC20 = artifacts.require("./createERC20.sol");

module.exports = function(deployer) {
	deployer.deploy( createERC20 );
};

// ERROR: createERC20 contract constructor expected 6 arguments, received 0
// deployer.deploy( createERC20, arg1, arg2, arg3, arg4, arg5, arg6 );
// ERROR: arg1 is not defined