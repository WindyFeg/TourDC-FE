import { defineChain } from 'viem'
 
const Vibichain = defineChain({
  id: 306,
  name: 'VibiChain',
  nativeCurrency: { name: 'TourDC', symbol: 'DC', decimals: 18 },
  rpcUrls: {
    default: { https: ['https://vibi.vbchain.vn/'] },
  },
  blockExplorers: {
    default: { name: 'VBChain Explorer', url: 'https://blockchain.agridential.vn/vibi' },
  },
  contracts: {
    ensRegistry: {
      address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    ensUniversalResolver: {
      address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
      blockCreated: 16773775,
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
})

export default Vibichain;