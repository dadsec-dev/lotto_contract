import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
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

const config = getDefaultConfig({
  appName: 'lotto',
  projectId: '291338137112beb0988ef8ea51e0fbd1',
  chains: [
    baseSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

const client = new QueryClient();
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor:'#D43791',
    connectButtonBackground: '',
  },
} as Theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
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
