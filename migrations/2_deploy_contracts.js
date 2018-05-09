const EthereumCenturion = artifacts.require('./EthereumCenturion.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0x8dC0A74f88ae76Cdb92901cC4Eeb99D6C585d4Cb";
    deployer.deploy(EthereumCenturion, owner);
};
