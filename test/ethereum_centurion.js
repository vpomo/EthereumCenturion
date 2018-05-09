var EthereumCenturion = artifacts.require("./EthereumCenturion.sol");
//import assertRevert from './helpers/assertRevert';

contract('EthereumCenturion', (accounts) => {
    var contract;
    //var owner = "0x8dC0A74f88ae76Cdb92901cC4Eeb99D6C585d4Cb";
    var owner = accounts[0];
    var maxTotalSupply = 24*10**14 * 10**8;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await EthereumCenturion.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], 1*10**8, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(1*10**8, balanceAccountTwoAfter);

    });

    it('Checking the purchaise of tokens', async ()  => {

        var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.buyTokens(accounts[3], {from:accounts[3], value: 0});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountThreeBefore);
        assert.equal(100 * 10**8, Number(balanceAccountThreeAfter));

        await contract.buyTokens(accounts[3], {from:accounts[3], value: 0.001 * 10**18});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        assert.equal(3600 * 10**8, Number(balanceAccountThreeAfter));

        await contract.buyTokens(accounts[3], {from:accounts[3], value: 0.1 * 10**18});
        var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        assert.equal(364100 * 10**8, Number(balanceAccountThreeAfter));

        //await contract.buyTokens(accounts[3], {from:accounts[3], value: 10 * 10**8});
    });

});



