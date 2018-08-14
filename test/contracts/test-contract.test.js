const TestContract = artifacts.require('./testContract.sol');

contract('TestContract', async(accounts) => {
  let testContract;

  before(async() => {
    testContract = await TestContract.new({from: accounts[0], gas: 3141592});
  });

  it("save value", async() => {
    await testContract.save("key", "value");

    const value = await testContract.getValue("key");

    assert.equal(value, "value");
  });

  it("Returns empty value for the invalid key", async() => {
    await testContract.save("key", "value");

    const value = await testContract.getValue("invalid-key");

    assert.isEmpty(value);
  });
});
