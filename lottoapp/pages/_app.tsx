import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Connector, WagmiProvider, createConfig } from 'wagmi';
import {
  Chain,
  arbitrum,
  base,
  baseSepolia,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider,  darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { ChakraProvider } from '@chakra-ui/react'
import merge from 'lodash.merge'
import { injected } from 'wagmi/connectors'
import { TransportConfig, EIP1193RequestFn, http } from 'viem';
import { StoreApi } from 'zustand/vanilla';


// const config = getDefaultConfig({
//   appName: 'lotto',
//   projectId: '22c31ad0c4fcd5516c0b769641b1f00d',
//   chains: [
//     baseSepolia,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [baseSepolia] : []),
//   ],
//   ssr: true,
// });

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  //@ts-ignore
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/oDFA6iwybGc1efkLGghYfZh1PNn2B3pB'),
  },
})

const client = new QueryClient();
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor:'#D43791',
    connectButtonBackground: '',
  },
} as Theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={myTheme} modalSize='compact'>
        <ChakraProvider>
          <Component {...pageProps} />
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
