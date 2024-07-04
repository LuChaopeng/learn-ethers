import { ethers } from "ethers";
import { getAlchemySepoliaProvider } from "./provider.js";

export const demo = async () => {
    const MingsERC20Addr = '0x4dbdD2059446a8181FBee6b207EE9E868D9aaeb6';
    const abi =  [
        "constructor(string memory name_, string memory symbol_)",
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint)",
        "function transfer(address to, uint256 amount) external returns (bool)",
        "function mint(uint amount) external",
    ];
    const adminAccount = process.env.ADDRESS;
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, await getAlchemySepoliaProvider());
    const contract = new ethers.Contract(MingsERC20Addr, abi, wallet);
    console.log('我的代币名称：' + await contract.name());
    console.log('管理员账户资金：' + await contract.balanceOf(adminAccount));
    console.log('挖点币……');
    const tx = await contract.mint("1000");
    await tx.wait();
    console.log('现在管理员账户资金：' + await contract.balanceOf(adminAccount));
};

