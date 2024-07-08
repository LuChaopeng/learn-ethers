import { ethers } from "ethers";
import { getAlchemySepoliaProvider } from "./provider.js";

export default async () => {
  const usdcAddr = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
  const abi = ["event Transfer(address indexed from, address indexed to, uint amount)"]
  const provider = await getAlchemySepoliaProvider();
  const contract = new ethers.Contract(usdcAddr, abi, provider);

  /**检索事件 */
  const block = await provider.getBlockNumber();
  console.log("区块链长度: " + block);
  // 这里没有跟着wtf教程走，因为教程用的测试链换来换去 ┓( ´∀` )┏
  // queryFilter是专门用来查询指定区块范围的event的，名字取得不太好，也可能contract也没啥别的好查？
  // 那我很容易有一个问题，又是指定合约又是指定事件的，哪有那么多事件可以查到，我部署的合约至今都没几个交易，也没写事件
  // 所以有一点是wtf没说的，如果指定了具体的区块范围，那么必须用活跃的合约来测试，否则就会发现一直返回空，无法验证代码
  // 我这里从etherscan的sepolia的Tokens板块找的一个usdc合约
  const events = await contract.queryFilter('Transfer', block - 9, block - 9);
  console.log('倒数第十个区块上的usdcAddr合约的Transfer事件数量：' + events.length + ",其中第一个是：");
  console.log(events[0]);
    
  /**监听事件 */
  // 封装单次监听
  const listenEventOnce = (contract, eventName) => {
    return new Promise((resolve, reject) => {
      contract.once(eventName, (...args) => {
        resolve(args);
      })
    });
  };
  const res = await listenEventOnce(contract, 'Transfer');
  console.log(res);

  // listenEventOnce执行完过会再执行contract.on，不然contract.on好像会被中断
 
  contract.on('Transfer', (...args) => {
    console.log(args);
  });
};

