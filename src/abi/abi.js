//调用智能合约abi接口
import { ethers } from "ethers"; //引入ethers.js
import Web3Modal from "web3modal"; //引入web3modal
async function abiContract() {
  //连接钱包，获取签名
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  return {
    provider: provider,
    signer: signer,
  }
}
export default abiContract;
