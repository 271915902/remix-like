import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygon, arbitrum, optimism, bsc } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const chains = [mainnet, sepolia, polygon, arbitrum, optimism, bsc];

export const config = createConfig({
  chains,
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [bsc.id]: http(),
  },
});