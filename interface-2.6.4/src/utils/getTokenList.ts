import { TokenList } from '@uniswap/token-lists';
import contenthashToUri from './contenthashToUri';
import { parseENSAddress } from './parseENSAddress';
import uriToHttp from './uriToHttp';

/**
 * The local token list, in this case for PulseChain tokens.
 */
const pulseChainTokenList: TokenList = {
  name: "DexTop Tokens",
  timestamp: "2024-15-09T00:00:00+00:00",
  version: { major: 39, minor: 1, patch: 0 },
  tokens: [
    { name: "DexTop", symbol: "DEX", address: "0x57953dAC106a4cDa11D90273b1B9D59E169533c0", chainId: 369, decimals: 18, logoURI: "https://tokens.dextop.pro/tokens/exe.png" },
     { name: "HEX", symbol: "HEX", address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", chainId: 369, decimals: 8, logoURI: "https://tokens.dextop.pro/tokens/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39.png" }, 
     { name: "USD Coin from Ethereum", symbol: "USDC from ETH", address: "0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07", chainId: 369, decimals: 6, logoURI: "https://bafybeif7p3lwn44s6siduzasdy3jr5stq72xe7qqd6msbzeuzjmxhdlqdy.ipfs.dweb.link?filename=0x15D38573d2feeb82e7ad5187aB8c1D52810B1f07.png" }, 
     { name: "Dai Stablecoin from Ethereum", symbol: "DAI from ETH", address: "0xefD766cCb38EaF1dfd701853BFCe31359239F305", chainId: 369, decimals: 18, logoURI: "https://bafybeifmym46yqa2incik4dxed4xwzx2plgv4it7g2kvdkglitlruylpoe.ipfs.dweb.link?filename=0xefD766cCb38EaF1dfd701853BFCe31359239F305.png" }, 
     { name: "Hex Bear", symbol: "HXB", address: "0x009a8670E74E1dda3E449E93A9308e5977949967", chainId: 369, decimals: 18, logoURI: "https://i.ibb.co/q9pk1dX/hxb.png" }, { name: "Internet Money", symbol: "IM", address: "0xBBcF895BFCb57d0f457D050bb806d1499436c0CE", chainId: 369, decimals: 18, logoURI: "https://internetmoney.io/_next/image?url=https%3A%2F%2Fd295q1lbtarn4h.cloudfront.net%2Fimages%2Fim-token-small.webp&w=64&q=75" }, 
     { name: "pDAI", symbol: "pDAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", chainId: 369, decimals: 18, logoURI: "https://bafybeic5wbbfzxijaclassb6sraocre73yw3vw2x6itung5fqims26twwi.ipfs.dweb.link?filename=0x6B175474E89094C44Da98b954EedeAC495271d0F.png" }, 
     { name: "Tetra", symbol: "TETRA", address: "0xAeC4C07537B03E3E62fc066EC62401Aed5Fdd361", chainId: 369, decimals: 18, logoURI: "https://static.wixstatic.com/media/90aff7_f58b35dfa0194d38a7ba8672a0dc901b~mv2.png/v1/fill/w_335,h_335,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TETRA.png" }, 
     { name: "Incentive Token", symbol: "INC", address: "0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d", chainId: 369, decimals: 18, logoURI: "https://tokens.app.pulsex.com/images/tokens/0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d.png" }, 
     { name: "IMPLS Token", symbol: "IMPLS", address: "0x5f63BC3d5bd234946f18d24e98C324f629D9d60e", chainId: 369, decimals: 18, logoURI: "https://bafybeiaskey4a6rmteasvjse2lkr6qudnt6jpp3xlxubiq6swzg2u2d5rq.ipfs.nftstorage.link/photo_2024-02-10_14-06-57.jpg" }, 
     { name: "Pepe Token", symbol: "PEPE", address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933", chainId: 369, decimals: 18, logoURI: "https://tokens.app.pulsex.com/images/tokens/0x6982508145454Ce325dDbE47a25d4ec3d2311933.png" }, { name: "Income", symbol: "INCM", address: "0x4D583e167704c2ec46Aec72Cb871C8B96Dd5e394", chainId: 369, decimals: 9, logoURI: "https://tokens.dextop.pro/tokens/0x4D583e167704c2ec46Aec72Cb871C8B96Dd5e394.png" },
      { name: "Hedron Smores Address Token", symbol: "HSA", address: "0xe1d32634516926F0A440ef42b8fCD9fefe71ADBE", chainId: 369, decimals: 18, logoURI: "https://dd.dexscreener.com/ds-data/tokens/pulsechain/0xe1d32634516926f0a440ef42b8fcd9fefe71adbe.png?size=lg" }, 
      { name: "Hex Orange Address", symbol: "HOA", address: "0x7901a3569679AEc3501dbeC59399F327854a70fe", chainId: 369, decimals: 18, logoURI: "https://tokens.dextop.pro/tokens/0x7901a3569679AEc3501dbeC59399F327854a70fe.png" }, 
      { name: "ZKZX", symbol: "ZKZX", address: "0x319e55Be473C77C35316651995C048a415219604", chainId: 369, decimals: 18, logoURI: "https://bafybeid2ty7afisdonqqizomkdexckm4irzvcve5xus6s32snhpwa2lc5i.ipfs.nftstorage.link/ryATaxZ-_400x400.jpg" }, 
      { name: "Louis The Duck", symbol: "Duck", address: "0x88BdfdBbb5f6DeF9fA1B20eeFDB7FbF41Eb789CB", chainId: 369, decimals: 18, logoURI: "https://dd.dexscreener.com/ds-data/tokens/pulsechain/0x88bdfdbbb5f6def9fa1b20eefdb7fbf41eb789cb.png?size=lg" }, 
      { name: "Monsters INC", symbol: "MIKE", address: "0xa8DCD0EB29f6F918289b5C14634C1B5F443Af826", chainId: 369, decimals: 9, logoURI: "https://bafybeih3jylfpixy5yhwt3uwrjpgswi2r2g3ucengaxwggds525i5a2xvm.ipfs.nftstorage.link/miceee.jpg" }, 
      { name: "Twerk", symbol: "TWERK", address: "0xe11a9e0298fBB1248611956db3C8FF556DC1DdbD", chainId: 369, decimals: 18, logoURI: "https://img1.wsimg.com/isteam/ip/dcec858a-2035-46e8-9352-add1264d1581/Logo-Twerk-PNG.png/:/rs=w:200,h:200,cg:true,m/cr=w:200,h:200/qt=q:95" }, 
      { name: "A Free Slice Of Pizza", symbol: "PIZZA", address: "0x3e7ae951d9925E6e5DE6140a99B90c3259445c9B", chainId: 369, decimals: 18, logoURI: "https://bafybeibupusgei6q3y3bljvoqcab5h4l2nrrxesysvkfv5eokffprsluiu.ipfs.nftstorage.link/GGKTILKWIAAMrCs%20(1).jpg" }, 
      { name: "RH_404", symbol: "RH404", address: "0x749ccf4c4308490F3c395De897F58e091090B461", chainId: 369, decimals: 18, logoURI: "https://bafybeicg6upmg2qvwkpw3b7y5jmado6hj52p6rut44zt3jyx6oobgrfagy.ipfs.nftstorage.link/eF8WyGue_400x400.jpg" }, 
      { name: "Caviar", symbol: "CAVIAR", address: "0x8C5eB0F7007c374D6FE14627259B99a5e9613C84", chainId: 369, decimals: 18, logoURI: "https://bafybeialmxubiduarkagecfrh4tqh24d7to5s4jixh4avcvmqjogwxqzyq.ipfs.nftstorage.link/photo_2024-02-12_17-38-12.jpg" }, 
      { name: "Jeet", symbol: "JEET", address: "0x6801fa8Ece9e6e021D2C925d2243ae3890Eb95A4", chainId: 369, decimals: 18, logoURI: "https://bafybeicdur5sbbax5qarg7drvb6qdq7e7tbn2wknfwqmhhogodtm4ny574.ipfs.nftstorage.link/photo_2024-02-12_17-40-46.jpg" }, 
      { name: "Degen Anonymous", symbol: "ANON", address: "0x075F7F657AEAD0e698EDb4E0A47d1DEF869536B4", chainId: 369, decimals: 18, logoURI: "https://bafybeihaflhk73gqke5j3mjewfz2k2vf3zar4f2cqpyscw2vhwym7xhfke.ipfs.nftstorage.link/photo_2024-01-28_14-45-37.jpg" }, 
      { name: "USDL", symbol: "USDL", address: "0x0dEEd1486bc52aA0d3E6f8849cEC5adD6598A162", chainId: 369, decimals: 18, logoURI: "https://tokens.dextop.pro/tokens/usdl.png" }, 
      { name: "Good Old Fashioned Un Registered Security", symbol: "GOFURS", address: "0x54f667dB585b7B10347429C72c36c8B59aB441cb", chainId: 369, decimals: 18, logoURI: "https://bafybeido32w46z4rmxrs4ygrc6wfuxqe6oqsdscpe4prsolpj5jmm5gpra.ipfs.nftstorage.link/asdf346243576%20(1).png" }, 
      { name: "WcDonalds", symbol: "WcDon", address: "0xa3C21B3a0be628F27e4617FBC2D702DD0bA24b28", chainId: 369, decimals: 18, logoURI: "https://bafybeieu526tgmqv7oyq6s6h4voswruaenb6volnycjpvfkhm3p4jszr6i.ipfs.nftstorage.link/wcdondalds%20(1).png" }, 
      { name: "A Free Game Of DUME", symbol: "DUME", address: "0x63bf22258aB005b9FB5087A2349701618BedbdA0", chainId: 369, decimals: 9, logoURI: "https://bafybeibn76otrocalt2dyn6vmpp4jbqnbixvf67jigb6qsc54me5tlcibu.ipfs.nftstorage.link/dume.jpg" }, 
      { name: "Kirk", symbol: "KIRK", address: "0x267b2b0047C2D2Cd6467fa353b9caCEE0dF946D0", chainId: 369, decimals: 18, logoURI: "https://bafybeibyt25x7and4astijvwcwveb3zxxeihoot4awfi4vyde2grg7fjny.ipfs.nftstorage.link/kirklogo.png" }, 
      { name: "PulseX", symbol: "PLSX", address: "0x95B303987A60C71504D99Aa1b13B4DA07b0790ab", chainId: 369, decimals: 18, logoURI: "https://tokens.dextop.pro/tokens/0x95B303987A60C71504D99Aa1b13B4DA07b0790ab.png" }, 
      { name: "Wrapped BTC from Ethereum", symbol: "WBTC", address: "0xb17D901469B9208B17d916112988A3FeD19b5cA1", chainId: 369, decimals: 8, logoURI: "https://tokens.dextop.pro/tokens/0xb17D901469B9208B17d916112988A3FeD19b5cA1.png" }, 
      { name: "Kilobyte Token", symbol: "KB", address: "0xaC55cd59F4d97c50FBeC9b0812352e15BC5d2e59", chainId: 369, decimals: 18, logoURI: "https://bafybeihhucklcvdhalyxsuqfw6ujbxgu52xkf72dnmivvhw5mrw4e4vuse.ipfs.nftstorage.link/kilobyte-logo.FaNPUq7F.png" }, 
      { name: "Dev Token", symbol: "DEV", address: "0x165ad6cD6Db243AB0b52a1D808c4146EB2b07fCC", chainId: 369, decimals: 18, logoURI: "https://bafybeiaraiw3hrgqvfj2rr3ckg5w2h35ikbueyo7vpc2rauqglt46zr7ae.ipfs.nftstorage.link/photo_2024-02-01_16-54-17.jpg" }, {
         name: "Hocus Pocus", symbol: "HOC", address: "0xd22E78C22D7E77229d60cc9fC57b0E294F54488E", chainId: 369, decimals: 18, logoURI: "https://bafybeie2rxp334ndy5g6ioxtyu4g7d7wzloxgxahmxadnt23piooftqrey.ipfs.nftstorage.link/HOC.png" }, 
         { name: "Mega", symbol: "MEGA", address: "0x8eDb13CE75562056DFf2221D193557Fb4A05770D", chainId: 369, decimals: 18, logoURI: "https://tokens.dextop.pro/tokens/mega.jpg" }, 
         { name: "The Grays Currency", symbol: "pTGC", address: "0x94534eeee131840b1c0f61847c572228bdfdde93", chainId: 369, decimals: 18, logoURI: "https://tokens.dextop.pro/tokens/grays.jpg" }, 
         { name: "Richard's Only Brother", symbol: "ROB", address: "0x1c2766F5949A4aA5d4cf0439067051135ffc1b28", chainId: 369, decimals: 18, logoURI: "https://i.ibb.co/Y3990fG/rob12.png" }, 
         { name: "Wrapped Pulse", symbol: "WPLS", address: "0xa1077a294dde1b09bb078844df40758a5d0f9a27", chainId: 369, decimals: 18, logoURI: "" }
        ], logoURI: "https://tokens.dextop.pro/tokens/exe.png"
};

/**
 * Returns the PulseChain token list, with optional ENS resolution.
 * @param listUrl The list URL or ENS name to resolve, if needed.
 * @param resolveENSContentHash Function to resolve ENS content hash.
 */
export default async function getTokenList(
  listUrl: string,
  resolveENSContentHash: (ensName: string) => Promise<string>
): Promise<TokenList> {
  const parsedENS = parseENSAddress(listUrl);
  if (parsedENS) {
    let contentHashUri;
    try {
      contentHashUri = await resolveENSContentHash(parsedENS.ensName);
      const translatedUri = contenthashToUri(contentHashUri);
      const urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ''}`);
      for (const url of urls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const json = await response.json();
            return json as TokenList;
          }
        } catch (error) {
          console.debug('Failed to fetch list from', url, error);
        }
      }
    } catch (error) {
      console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, error);
    }
  }
  // Fallback to using the locally defined token list
  return pulseChainTokenList;
}