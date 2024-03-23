import { Chain } from '@wagmi/core'

export const vibiChain = {
  id: 306,
  name: 'VibiChain',
  network: 'VibiChain',
  nativeCurrency: {
    decimals: 18,
    name: 'Vibi',
    symbol: 'Vibi',
  },
  rpcUrls: {
    public: { http: ['https://vibi.vbchain.vn/'] },
    default: { http: ['https://vibi.vbchain.vn/'] }
  },
  blockExplorers: {
    default: { name: "VBChain's Vibi Explorer", url: 'https://blockchain.agridential.vn/vibi' },
  },
} as const satisfies Chain
