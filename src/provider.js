import { ethers } from 'ethers';

/**
 * 开发测试期间禁用主网
 */
export const getAnkrProvider = async () => {
    const ankrProvider = await new ethers.JsonRpcProvider('禁用https://rpc.ankr.com/eth');
    return ankrProvider;
};

/**
 * 开发测试期间禁用主网
 */
export const getInfuraProvider = async () => {
    const provider = await new ethers.JsonRpcProvider(`禁用https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);
    return provider;
};

/**
 * 开发测试期间禁用主网
 */
export const getAlchemyProvider = async (isSepolia) => {
    const url = `禁用https://eth-${isSepolia ? 'sepolia' : 'mainnet'}.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;
    const provider = await new ethers.JsonRpcProvider(url);
    return provider;
}

export const getAlchemySepoliaProvider = async () => {
    const url = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;
    const provider = await new ethers.JsonRpcProvider(url);
    return provider;
}
