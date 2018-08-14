pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/testContract.sol";

contract TestTestContract {

  function testInitialStatusUsingDeployedContract() {
    TestContract testContract = new TestContract();

    Assert.isEmpty(testContract.getValue("key"), "TestContract does not have any yet.");
  }

  function testSaveTokenAndGetUserId() {
    TestContract testContract = new TestContract();

    testContract.save("key", "value");
    Assert.equal("value", testContract.getValue("key"), "The saved value should be equal");
  }
}
