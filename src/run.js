import { getAlchemySepoliaProvider } from "./provider.js";
import { ethers } from "ethers";

export const demo = async () => {
    const provider = await getAlchemySepoliaProvider();
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const addr = wallet.address;

    const abiWETH = [
        "function balanceOf(address) public view returns(uint)",
        "function deposit() public payable",
        "function transfer(address, uint) public returns (bool)",
        "function withdraw(uint) public",
    ];
    const addressWETH = process.env.WETH_IN_SEPOLIA;
    const contractETH = new ethers.Contract(addressWETH, abiWETH, wallet)
    console.log("ETH最初余额：" + ethers.formatEther(await provider.getBalance(addr)))
    console.log("WETH最初余额：" + ethers.formatEther(await contractETH.balanceOf(addr)));
    const tx = await contractETH.deposit({value: ethers.parseEther('0.0005')});
    await tx.wait();
    console.log('交易回执：')
    console.log(tx)
    console.log("ETH交易后余额：" + ethers.formatEther(await provider.getBalance(addr)))
    console.log("WETH交易后余额：" + ethers.formatEther(await contractETH.balanceOf(addr)));
};

