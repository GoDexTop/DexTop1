import { transparentize } from 'polished'
import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#111111', // Darken light mode
    text2: darkMode ? '#C3C5CB' : '#4A4E57', // Darken light mode
    text3: darkMode ? '#6C7284' : '#777B87', // Darken light mode
    text4: darkMode ? '#565A69' : '#B3B6C1', // Darken light mode
    text5: darkMode ? '#2C2F36' : '#DADCE3', // Darken light mode

    // backgrounds / greys
    bg1: darkMode ? '#121416' : '#ECEEEF', // Darken light mode
    bg2: darkMode ? '#1F2228' : '#E1E2E5', // Darken light mode
    bg3: darkMode ? '#2B2F39' : '#D4D5D8', // Darken light mode
    bg4: darkMode ? '#3A3E49' : '#BEC0C8', // Darken light mode
    bg5: darkMode ? '#4B4F5A' : '#70747F', // Darken light mode

    // specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,0.4)', // Darken light mode transparency
    advancedBG: darkMode ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.5)', // Darken light mode transparency

    // primary colors
    primary1: darkMode ? '#1C4A7F70' : '#0054CC', // Darken light mode
    primary2: darkMode ? '#3178CC' : '#4D9FFF', // Darken light mode
    primary3: darkMode ? '#4D84D1' : '#81BFF8', // Darken light mode
    primary4: darkMode ? '#336B9B70' : '#99CFFF', // Darken light mode
    primary5: darkMode ? '#1C4A7F70' : '#A9DCFF', // Darken light mode

    // color text
    primaryText1: darkMode ? '#6DA8FF' : '#0064CC', // Darken light mode

    // secondary colors
    secondary1: darkMode ? '#1D62B8' : '#0055AA', // Darken light mode
    secondary2: darkMode ? '#0F001A26' : '#A3BBD2', // Darken light mode
    secondary3: darkMode ? '#0F001A26' : '#B6CBE2', // Darken light mode

    // other colors
    red1: '#FF6871', // Unchanged
    red2: '#F82D3A', // Unchanged
    green1: '#27AE60', // Unchanged
    yellow1: '#FFE270', // Unchanged
    yellow2: '#F3841E', // Unchanged
  };
}


export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primaryText1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primaryText1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.05em;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: "Orbitron", sans-serif;
  }
}

html,
body {
/* Add star layers as background elements */
  &::before, &::after, &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none; /* Keeps the stars from affecting content interactions */
    z-index: -1;
  }
    
    &::before {
    #stars;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 448px 435px #FFF , 1681px 855px #FFF , 1465px 1107px #FFF , 1576px 631px #FFF , 649px 240px #FFF , 1252px 395px #FFF , 307px 1167px #FFF , 1813px 56px #FFF , 1268px 425px #FFF , 1699px 1249px #FFF , 1722px 1154px #FFF , 589px 1138px #FFF , 751px 796px #FFF , 472px 511px #FFF , 66px 212px #FFF , 1758px 1607px #FFF , 674px 1003px #FFF , 1560px 1302px #FFF , 675px 1662px #FFF , 837px 566px #FFF , 1932px 1445px #FFF , 1384px 194px #FFF , 1566px 1988px #FFF , 420px 255px #FFF , 740px 452px #FFF , 1899px 1806px #FFF , 1430px 657px #FFF , 612px 285px #FFF , 1577px 702px #FFF , 1773px 137px #FFF , 973px 1668px #FFF , 1530px 267px #FFF , 1168px 440px #FFF , 1615px 694px #FFF , 1074px 1290px #FFF , 1061px 1274px #FFF , 458px 387px #FFF , 556px 1897px #FFF , 1863px 1056px #FFF , 213px 1003px #FFF , 1614px 1170px #FFF , 1533px 760px #FFF , 1678px 1675px #FFF , 1963px 1045px #FFF , 1257px 1965px #FFF , 1098px 1394px #FFF , 1692px 1426px #FFF , 402px 415px #FFF , 646px 1752px #FFF , 1549px 1971px #FFF , 1127px 1527px #FFF , 1700px 778px #FFF , 751px 724px #FFF , 105px 269px #FFF , 1550px 1475px #FFF , 224px 1296px #FFF , 17px 87px #FFF , 234px 176px #FFF , 510px 570px #FFF , 1649px 670px #FFF , 1509px 731px #FFF , 694px 1510px #FFF , 572px 324px #FFF , 224px 1822px #FFF , 226px 1393px #FFF , 737px 526px #FFF , 223px 331px #FFF , 296px 492px #FFF , 1633px 532px #FFF , 997px 1533px #FFF , 1584px 168px #FFF , 97px 1360px #FFF , 1709px 992px #FFF , 1442px 1630px #FFF , 1862px 486px #FFF , 868px 1792px #FFF , 573px 936px #FFF , 962px 1850px #FFF , 901px 468px #FFF , 619px 1007px #FFF , 1046px 675px #FFF , 526px 1167px #FFF , 1402px 190px #FFF , 869px 1898px #FFF , 1783px 467px #FFF , 997px 894px #FFF , 733px 1689px #FFF , 829px 356px #FFF , 3px 809px #FFF , 663px 578px #FFF , 1516px 1700px #FFF , 1416px 713px #FFF , 1195px 1004px #FFF , 1156px 1303px #FFF , 1965px 1940px #FFF , 135px 976px #FFF , 379px 888px #FFF , 1747px 1359px #FFF , 629px 880px #FFF , 173px 1470px #FFF , 872px 151px #FFF , 32px 1704px #FFF , 1365px 1454px #FFF , 236px 1485px #FFF , 1159px 1352px #FFF , 314px 70px #FFF , 1178px 92px #FFF , 619px 972px #FFF , 1039px 1146px #FFF , 1850px 1885px #FFF , 648px 529px #FFF , 97px 1528px #FFF , 1866px 803px #FFF , 1422px 679px #FFF , 1069px 1923px #FFF , 1379px 1288px #FFF , 193px 250px #FFF , 1243px 1391px #FFF , 742px 1961px #FFF , 1032px 361px #FFF , 1345px 1660px #FFF , 1735px 1828px #FFF , 485px 717px #FFF , 1872px 250px #FFF , 1881px 835px #FFF , 852px 902px #FFF , 1011px 286px #FFF , 886px 822px #FFF , 650px 1795px #FFF , 1543px 56px #FFF , 703px 1822px #FFF , 696px 482px #FFF , 942px 796px #FFF , 1279px 846px #FFF , 165px 776px #FFF , 1232px 1553px #FFF , 1493px 569px #FFF , 1447px 743px #FFF , 101px 1119px #FFF , 1375px 1233px #FFF , 377px 1439px #FFF , 1443px 207px #FFF , 488px 1735px #FFF , 1376px 1141px #FFF , 1935px 1208px #FFF , 783px 176px #FFF , 388px 748px #FFF , 1559px 1091px #FFF , 212px 975px #FFF , 823px 1520px #FFF , 1003px 891px #FFF , 731px 1293px #FFF , 861px 1646px #FFF , 468px 694px #FFF , 1815px 967px #FFF , 599px 788px #FFF , 274px 1848px #FFF , 1603px 1378px #FFF , 312px 600px #FFF , 997px 75px #FFF , 810px 1585px #FFF , 377px 1030px #FFF , 1330px 1588px #FFF , 1101px 660px #FFF , 520px 861px #FFF , 1266px 1590px #FFF , 215px 1226px #FFF , 1864px 552px #FFF , 738px 1907px #FFF , 763px 966px #FFF , 1374px 502px #FFF , 399px 1675px #FFF , 8px 1273px #FFF , 846px 1256px #FFF , 1798px 1455px #FFF , 599px 1360px #FFF , 1292px 63px #FFF , 442px 294px #FFF , 928px 800px #FFF , 1443px 1908px #FFF , 281px 1942px #FFF , 1876px 1270px #FFF , 64px 1995px #FFF , 1484px 1018px #FFF , 333px 1946px #FFF , 1240px 820px #FFF , 1410px 54px #FFF , 93px 122px #FFF , 550px 1657px #FFF , 326px 1067px #FFF , 637px 179px #FFF , 1416px 976px #FFF , 1873px 419px #FFF , 1301px 1021px #FFF , 1518px 1695px #FFF , 1158px 231px #FFF , 1135px 561px #FFF , 1650px 1988px #FFF , 361px 1587px #FFF , 940px 1223px #FFF , 380px 216px #FFF , 1611px 391px #FFF , 1352px 238px #FFF , 631px 1386px #FFF , 570px 1503px #FFF , 818px 1620px #FFF , 1110px 201px #FFF , 1219px 168px #FFF , 1835px 447px #FFF , 1314px 162px #FFF , 1527px 431px #FFF , 45px 1027px #FFF , 1987px 558px #FFF , 924px 695px #FFF , 986px 1083px #FFF , 1473px 588px #FFF , 439px 983px #FFF , 1602px 1142px #FFF , 535px 126px #FFF , 1606px 803px #FFF , 1261px 1214px #FFF , 1467px 1345px #FFF , 587px 481px #FFF , 1135px 1534px #FFF , 140px 654px #FFF , 460px 1642px #FFF , 810px 289px #FFF , 275px 333px #FFF , 1937px 141px #FFF , 1206px 234px #FFF , 1347px 84px #FFF , 501px 272px #FFF , 856px 1824px #FFF , 124px 945px #FFF , 963px 1989px #FFF , 1269px 1846px #FFF , 1427px 1119px #FFF , 1762px 1294px #FFF , 565px 766px #FFF , 378px 1120px #FFF , 487px 1277px #FFF , 1334px 1437px #FFF , 1454px 699px #FFF , 250px 788px #FFF , 64px 1014px #FFF , 15px 993px #FFF , 1079px 1377px #FFF , 195px 452px #FFF , 1741px 1717px #FFF , 302px 563px #FFF , 922px 1360px #FFF , 1362px 758px #FFF , 1836px 232px #FFF , 554px 1836px #FFF , 544px 1512px #FFF , 410px 1856px #FFF , 188px 1359px #FFF , 1979px 460px #FFF , 880px 952px #FFF , 1609px 1110px #FFF , 1149px 898px #FFF , 474px 766px #FFF , 1285px 752px #FFF , 1182px 1686px #FFF , 887px 850px #FFF , 838px 1117px #FFF , 207px 1219px #FFF , 1672px 1662px #FFF , 1611px 75px #FFF , 207px 1750px #FFF , 1393px 519px #FFF , 490px 1021px #FFF , 1655px 1031px #FFF , 932px 187px #FFF , 995px 363px #FFF , 511px 1520px #FFF , 428px 1133px #FFF , 1648px 1755px #FFF , 591px 1788px #FFF , 1208px 137px #FFF , 1150px 1354px #FFF , 487px 1685px #FFF , 1133px 1232px #FFF , 208px 685px #FFF , 484px 1638px #FFF , 984px 842px #FFF , 1055px 188px #FFF , 1637px 400px #FFF , 764px 234px #FFF , 1243px 707px #FFF , 413px 1198px #FFF , 1333px 1355px #FFF , 702px 1895px #FFF , 1348px 119px #FFF , 528px 557px #FFF , 574px 919px #FFF , 311px 870px #FFF , 1736px 1973px #FFF , 840px 991px #FFF , 986px 575px #FFF , 1231px 1209px #FFF , 1632px 1824px #FFF , 72px 1991px #FFF , 1758px 314px #FFF , 167px 1863px #FFF , 544px 977px #FFF , 1327px 779px #FFF , 1710px 886px #FFF , 1156px 129px #FFF , 608px 1680px #FFF , 975px 1299px #FFF , 1579px 17px #FFF , 1199px 1242px #FFF , 1948px 1724px #FFF , 14px 269px #FFF , 1759px 1081px #FFF , 1465px 176px #FFF , 539px 88px #FFF , 1478px 1834px #FFF , 64px 1508px #FFF , 1037px 480px #FFF , 214px 1877px #FFF , 1191px 928px #FFF , 541px 1408px #FFF , 9px 1325px #FFF , 629px 896px #FFF , 1255px 77px #FFF , 130px 1393px #FFF , 1954px 509px #FFF , 1530px 1599px #FFF , 572px 873px #FFF , 996px 173px #FFF , 1284px 69px #FFF , 1412px 1160px #FFF , 908px 1370px #FFF , 1136px 1069px #FFF , 1458px 1916px #FFF , 472px 1982px #FFF , 968px 988px #FFF , 506px 620px #FFF , 195px 447px #FFF , 1276px 542px #FFF , 350px 1771px #FFF , 1504px 613px #FFF , 623px 350px #FFF , 1838px 492px #FFF , 1258px 374px #FFF , 1558px 272px #FFF , 1868px 1232px #FFF , 1284px 245px #FFF , 819px 1086px #FFF , 1460px 1847px #FFF , 1303px 1677px #FFF , 337px 290px #FFF , 435px 1452px #FFF , 1605px 1987px #FFF , 1530px 1133px #FFF , 539px 1081px #FFF , 1310px 1661px #FFF , 220px 1058px #FFF , 872px 1589px #FFF , 1118px 1209px #FFF , 856px 1679px #FFF , 705px 1170px #FFF , 1500px 764px #FFF , 486px 530px #FFF , 1772px 1599px #FFF , 1641px 1256px #FFF , 1005px 1079px #FFF , 1718px 1774px #FFF , 1530px 1114px #FFF , 545px 1281px #FFF , 796px 1629px #FFF , 1915px 768px #FFF , 1201px 970px #FFF , 441px 1462px #FFF , 234px 131px #FFF , 1304px 153px #FFF , 1899px 162px #FFF , 951px 687px #FFF , 1478px 84px #FFF , 279px 1732px #FFF , 1597px 430px #FFF , 1801px 1260px #FFF , 620px 1837px #FFF , 246px 383px #FFF , 1044px 680px #FFF , 778px 155px #FFF , 1304px 1580px #FFF , 370px 926px #FFF , 437px 1548px #FFF , 1509px 1997px #FFF , 1832px 1415px #FFF , 206px 1564px #FFF , 302px 1900px #FFF , 1270px 995px #FFF , 1376px 1041px #FFF , 1899px 21px #FFF , 94px 1375px #FFF , 863px 804px #FFF , 769px 990px #FFF , 973px 583px #FFF , 1883px 1521px #FFF , 7px 565px #FFF , 602px 874px #FFF , 1575px 555px #FFF , 445px 1918px #FFF , 964px 77px #FFF , 1121px 1861px #FFF , 1236px 1198px #FFF , 454px 72px #FFF , 1691px 818px #FFF , 485px 622px #FFF , 1915px 515px #FFF , 437px 1282px #FFF , 354px 1536px #FFF , 326px 559px #FFF , 228px 28px #FFF , 1119px 1641px #FFF , 1785px 1325px #FFF , 516px 1731px #FFF , 1586px 1986px #FFF , 1087px 1992px #FFF , 1207px 825px #FFF , 1248px 230px #FFF , 499px 141px #FFF , 1855px 137px #FFF , 952px 735px #FFF , 1480px 106px #FFF , 626px 966px #FFF , 1097px 1654px #FFF , 513px 1951px #FFF , 1218px 1585px #FFF , 1719px 359px #FFF , 1405px 529px #FFF , 1574px 1659px #FFF , 1501px 106px #FFF , 1927px 1434px #FFF , 494px 1347px #FFF , 877px 1538px #FFF , 1129px 1575px #FFF , 597px 444px #FFF , 1259px 662px #FFF , 789px 1055px #FFF , 1096px 13px #FFF , 1088px 371px #FFF , 469px 571px #FFF , 222px 1533px #FFF , 971px 1456px #FFF , 1580px 318px #FFF , 1923px 371px #FFF , 109px 1761px #FFF , 1319px 1371px #FFF , 1997px 401px #FFF , 306px 429px #FFF , 79px 1964px #FFF , 574px 1955px #FFF , 1951px 325px #FFF , 927px 237px #FFF , 1990px 1126px #FFF , 1349px 1964px #FFF , 1577px 1521px #FFF , 1835px 1319px #FFF , 1901px 1346px #FFF , 1693px 1715px #FFF , 1290px 1313px #FFF , 961px 1404px #FFF , 1416px 68px #FFF , 154px 270px #FFF , 1166px 985px #FFF , 721px 1932px #FFF , 988px 1353px #FFF , 1186px 1188px #FFF , 538px 1364px #FFF , 1591px 1222px #FFF , 1363px 223px #FFF , 1440px 503px #FFF , 1310px 321px #FFF , 779px 1885px #FFF , 1636px 392px #FFF , 751px 1663px #FFF , 810px 430px #FFF , 1569px 1651px #FFF , 1489px 1969px #FFF , 1017px 1474px #FFF , 549px 521px #FFF , 108px 699px #FFF , 1136px 1710px #FFF , 1354px 477px #FFF , 647px 364px #FFF , 40px 17px #FFF , 534px 73px #FFF , 805px 1304px #FFF , 838px 438px #FFF , 1953px 1852px #FFF , 705px 1517px #FFF , 958px 742px #FFF , 1785px 1626px #FFF , 18px 770px #FFF , 1601px 1280px #FFF , 1164px 1356px #FFF , 1969px 138px #FFF , 158px 227px #FFF , 602px 970px #FFF , 1062px 1631px #FFF , 83px 63px #FFF , 1104px 349px #FFF , 112px 751px #FFF , 927px 1069px #FFF , 273px 1359px #FFF , 952px 1364px #FFF , 1299px 663px #FFF , 1207px 173px #FFF , 1608px 506px #FFF , 329px 971px #FFF , 1056px 1568px #FFF , 1641px 495px #FFF , 163px 1780px #FFF , 1468px 1566px #FFF , 1423px 105px #FFF , 1493px 645px #FFF , 1951px 1695px #FFF , 483px 627px #FFF , 426px 21px #FFF , 1011px 335px #FFF , 1989px 1774px #FFF , 941px 235px #FFF , 1020px 1856px #FFF , 254px 295px #FFF , 1287px 1979px #FFF , 185px 1748px #FFF , 103px 887px #FFF , 829px 1923px #FFF , 1220px 1910px #FFF , 618px 308px #FFF , 1908px 866px #FFF , 1316px 518px #FFF , 294px 1799px #FFF , 1456px 434px #FFF , 82px 604px #FFF , 390px 1731px #FFF , 1066px 755px #FFF , 1703px 1920px #FFF , 1134px 989px #FFF , 580px 383px #FFF , 842px 1040px #FFF , 1062px 1624px #FFF , 1420px 1533px #FFF , 1692px 537px #FFF , 1672px 295px #FFF , 1974px 1257px #FFF , 1122px 1774px #FFF , 1538px 221px #FFF , 1023px 1331px #FFF , 1337px 903px #FFF , 1466px 241px #FFF , 846px 1887px #FFF , 1093px 1657px #FFF , 520px 579px #FFF , 1696px 350px #FFF , 1456px 1593px #FFF , 855px 1433px #FFF , 115px 606px #FFF , 1745px 948px #FFF , 239px 1246px #FFF , 115px 555px #FFF , 1861px 204px #FFF , 882px 1407px #FFF , 198px 842px #FFF , 961px 1468px #FFF , 1503px 1360px #FFF , 1015px 1837px #FFF , 1779px 550px #FFF , 1028px 1805px #FFF , 725px 1988px #FFF , 440px 1147px #FFF , 891px 1392px #FFF , 483px 792px #FFF , 551px 368px #FFF , 135px 536px #FFF , 1276px 979px #FFF , 1986px 70px #FFF , 1970px 1503px #FFF , 1260px 221px #FFF , 952px 1164px #FFF , 1539px 239px #FFF , 1874px 1206px #FFF , 1770px 1067px #FFF , 1109px 172px #FFF , 1573px 961px #FFF , 1965px 655px #FFF , 1976px 1346px #FFF , 1759px 1586px #FFF , 1220px 165px #FFF , 1186px 355px #FFF , 6px 1372px #FFF , 1916px 62px #FFF , 928px 1622px #FFF , 749px 1244px #FFF , 1341px 1039px #FFF , 195px 451px #FFF , 1991px 1448px #FFF , 260px 1488px #FFF , 22px 1080px #FFF , 371px 469px #FFF , 892px 672px #FFF , 116px 1967px #FFF , 71px 1482px #FFF , 543px 743px #FFF , 1360px 821px #FFF , 1186px 1684px #FFF , 1713px 921px #FFF , 1742px 1730px #FFF , 1170px 341px #FFF , 1489px 1030px #FFF , 54px 141px #FFF , 1767px 1863px #FFF , 1822px 533px #FFF , 304px 857px #FFF , 731px 187px #FFF , 1503px 364px #FFF , 749px 1498px #FFF , 1254px 1913px #FFF , 1805px 411px #FFF , 344px 1168px #FFF , 544px 1228px #FFF , 1954px 1148px #FFF , 354px 869px #FFF , 1428px 212px #FFF , 947px 970px #FFF , 1658px 515px #FFF , 1338px 607px #FFF , 1093px 809px #FFF , 1527px 49px #FFF , 1918px 642px #FFF , 1586px 1668px #FFF , 1639px 325px #FFF , 679px 983px #FFF , 1311px 245px #FFF , 256px 1340px #FFF , 1272px 1758px #FFF , 1955px 1075px #FFF , 1386px 1038px #FFF , 435px 999px #FFF , 613px 1784px #FFF , 631px 364px #FFF , 1536px 996px #FFF , 268px 130px #FFF , 1961px 1131px #FFF , 1295px 882px #FFF , 471px 814px #FFF , 1784px 1794px #FFF , 1874px 1310px #FFF , 251px 441px #FFF , 309px 1764px #FFF , 1899px 456px #FFF , 1749px 1742px #FFF , 1680px 1721px #FFF , 1625px 1095px #FFF , 1006px 1250px #FFF , 1736px 301px #FFF , 1139px 1416px #FFF , 455px 729px #FFF , 1252px 1315px #FFF , 1486px 916px #FFF , 1904px 96px #FFF , 799px 488px #FFF , 691px 1478px #FFF , 1625px 1743px #FFF , 168px 1589px #FFF , 1908px 834px #FFF , 433px 1524px #FFF , 562px 1335px #FFF , 1840px 1142px #FFF , 1244px 1014px #FFF , 1111px 213px #FFF , 1536px 583px #FFF , 617px 526px #FFF , 887px 1388px #FFF , 1763px 299px #FFF , 851px 1947px #FFF , 443px 398px #FFF , 1972px 1254px #FFF , 1541px 1327px #FFF , 929px 957px #FFF , 472px 1324px #FFF , 1539px 1056px #FFF , 765px 1998px #FFF , 919px 753px #FFF , 333px 166px #FFF , 1032px 1295px #FFF , 26px 1044px #FFF , 1228px 232px #FFF , 1990px 1962px #FFF , 1371px 561px #FFF , 1129px 414px #FFF , 733px 1268px #FFF , 1181px 1932px #FFF , 1510px 300px #FFF , 610px 948px #FFF;
  animation: animStar 50s linear infinite;
}
&::after {
    #stars1;
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 448px 435px #FFF , 1681px 855px #FFF , 1465px 1107px #FFF , 1576px 631px #FFF , 649px 240px #FFF , 1252px 395px #FFF , 307px 1167px #FFF , 1813px 56px #FFF , 1268px 425px #FFF , 1699px 1249px #FFF , 1722px 1154px #FFF , 589px 1138px #FFF , 751px 796px #FFF , 472px 511px #FFF , 66px 212px #FFF , 1758px 1607px #FFF , 674px 1003px #FFF , 1560px 1302px #FFF , 675px 1662px #FFF , 837px 566px #FFF , 1932px 1445px #FFF , 1384px 194px #FFF , 1566px 1988px #FFF , 420px 255px #FFF , 740px 452px #FFF , 1899px 1806px #FFF , 1430px 657px #FFF , 612px 285px #FFF , 1577px 702px #FFF , 1773px 137px #FFF , 973px 1668px #FFF , 1530px 267px #FFF , 1168px 440px #FFF , 1615px 694px #FFF , 1074px 1290px #FFF , 1061px 1274px #FFF , 458px 387px #FFF , 556px 1897px #FFF , 1863px 1056px #FFF , 213px 1003px #FFF , 1614px 1170px #FFF , 1533px 760px #FFF , 1678px 1675px #FFF , 1963px 1045px #FFF , 1257px 1965px #FFF , 1098px 1394px #FFF , 1692px 1426px #FFF , 402px 415px #FFF , 646px 1752px #FFF , 1549px 1971px #FFF , 1127px 1527px #FFF , 1700px 778px #FFF , 751px 724px #FFF , 105px 269px #FFF , 1550px 1475px #FFF , 224px 1296px #FFF , 17px 87px #FFF , 234px 176px #FFF , 510px 570px #FFF , 1649px 670px #FFF , 1509px 731px #FFF , 694px 1510px #FFF , 572px 324px #FFF , 224px 1822px #FFF , 226px 1393px #FFF , 737px 526px #FFF , 223px 331px #FFF , 296px 492px #FFF , 1633px 532px #FFF , 997px 1533px #FFF , 1584px 168px #FFF , 97px 1360px #FFF , 1709px 992px #FFF , 1442px 1630px #FFF , 1862px 486px #FFF , 868px 1792px #FFF , 573px 936px #FFF , 962px 1850px #FFF , 901px 468px #FFF , 619px 1007px #FFF , 1046px 675px #FFF , 526px 1167px #FFF , 1402px 190px #FFF , 869px 1898px #FFF , 1783px 467px #FFF , 997px 894px #FFF , 733px 1689px #FFF , 829px 356px #FFF , 3px 809px #FFF , 663px 578px #FFF , 1516px 1700px #FFF , 1416px 713px #FFF , 1195px 1004px #FFF , 1156px 1303px #FFF , 1965px 1940px #FFF , 135px 976px #FFF , 379px 888px #FFF , 1747px 1359px #FFF , 629px 880px #FFF , 173px 1470px #FFF , 872px 151px #FFF , 32px 1704px #FFF , 1365px 1454px #FFF , 236px 1485px #FFF , 1159px 1352px #FFF , 314px 70px #FFF , 1178px 92px #FFF , 619px 972px #FFF , 1039px 1146px #FFF , 1850px 1885px #FFF , 648px 529px #FFF , 97px 1528px #FFF , 1866px 803px #FFF , 1422px 679px #FFF , 1069px 1923px #FFF , 1379px 1288px #FFF , 193px 250px #FFF , 1243px 1391px #FFF , 742px 1961px #FFF , 1032px 361px #FFF , 1345px 1660px #FFF , 1735px 1828px #FFF , 485px 717px #FFF , 1872px 250px #FFF , 1881px 835px #FFF , 852px 902px #FFF , 1011px 286px #FFF , 886px 822px #FFF , 650px 1795px #FFF , 1543px 56px #FFF , 703px 1822px #FFF , 696px 482px #FFF , 942px 796px #FFF , 1279px 846px #FFF , 165px 776px #FFF , 1232px 1553px #FFF , 1493px 569px #FFF , 1447px 743px #FFF , 101px 1119px #FFF , 1375px 1233px #FFF , 377px 1439px #FFF , 1443px 207px #FFF , 488px 1735px #FFF , 1376px 1141px #FFF , 1935px 1208px #FFF , 783px 176px #FFF , 388px 748px #FFF , 1559px 1091px #FFF , 212px 975px #FFF , 823px 1520px #FFF , 1003px 891px #FFF , 731px 1293px #FFF , 861px 1646px #FFF , 468px 694px #FFF , 1815px 967px #FFF , 599px 788px #FFF , 274px 1848px #FFF , 1603px 1378px #FFF , 312px 600px #FFF , 997px 75px #FFF , 810px 1585px #FFF , 377px 1030px #FFF , 1330px 1588px #FFF , 1101px 660px #FFF , 520px 861px #FFF , 1266px 1590px #FFF , 215px 1226px #FFF , 1864px 552px #FFF , 738px 1907px #FFF , 763px 966px #FFF , 1374px 502px #FFF , 399px 1675px #FFF , 8px 1273px #FFF , 846px 1256px #FFF , 1798px 1455px #FFF , 599px 1360px #FFF , 1292px 63px #FFF , 442px 294px #FFF , 928px 800px #FFF , 1443px 1908px #FFF , 281px 1942px #FFF , 1876px 1270px #FFF , 64px 1995px #FFF , 1484px 1018px #FFF , 333px 1946px #FFF , 1240px 820px #FFF , 1410px 54px #FFF , 93px 122px #FFF , 550px 1657px #FFF , 326px 1067px #FFF , 637px 179px #FFF , 1416px 976px #FFF , 1873px 419px #FFF , 1301px 1021px #FFF , 1518px 1695px #FFF , 1158px 231px #FFF , 1135px 561px #FFF , 1650px 1988px #FFF , 361px 1587px #FFF , 940px 1223px #FFF , 380px 216px #FFF , 1611px 391px #FFF , 1352px 238px #FFF , 631px 1386px #FFF , 570px 1503px #FFF , 818px 1620px #FFF , 1110px 201px #FFF , 1219px 168px #FFF , 1835px 447px #FFF , 1314px 162px #FFF , 1527px 431px #FFF , 45px 1027px #FFF , 1987px 558px #FFF , 924px 695px #FFF , 986px 1083px #FFF , 1473px 588px #FFF , 439px 983px #FFF , 1602px 1142px #FFF , 535px 126px #FFF , 1606px 803px #FFF , 1261px 1214px #FFF , 1467px 1345px #FFF , 587px 481px #FFF , 1135px 1534px #FFF , 140px 654px #FFF , 460px 1642px #FFF , 810px 289px #FFF , 275px 333px #FFF , 1937px 141px #FFF , 1206px 234px #FFF , 1347px 84px #FFF , 501px 272px #FFF , 856px 1824px #FFF , 124px 945px #FFF , 963px 1989px #FFF , 1269px 1846px #FFF , 1427px 1119px #FFF , 1762px 1294px #FFF , 565px 766px #FFF , 378px 1120px #FFF , 487px 1277px #FFF , 1334px 1437px #FFF , 1454px 699px #FFF , 250px 788px #FFF , 64px 1014px #FFF , 15px 993px #FFF , 1079px 1377px #FFF , 195px 452px #FFF , 1741px 1717px #FFF , 302px 563px #FFF , 922px 1360px #FFF , 1362px 758px #FFF , 1836px 232px #FFF , 554px 1836px #FFF , 544px 1512px #FFF , 410px 1856px #FFF , 188px 1359px #FFF , 1979px 460px #FFF , 880px 952px #FFF , 1609px 1110px #FFF , 1149px 898px #FFF , 474px 766px #FFF , 1285px 752px #FFF , 1182px 1686px #FFF , 887px 850px #FFF , 838px 1117px #FFF , 207px 1219px #FFF , 1672px 1662px #FFF , 1611px 75px #FFF , 207px 1750px #FFF , 1393px 519px #FFF , 490px 1021px #FFF , 1655px 1031px #FFF , 932px 187px #FFF , 995px 363px #FFF , 511px 1520px #FFF , 428px 1133px #FFF , 1648px 1755px #FFF , 591px 1788px #FFF , 1208px 137px #FFF , 1150px 1354px #FFF , 487px 1685px #FFF , 1133px 1232px #FFF , 208px 685px #FFF , 484px 1638px #FFF , 984px 842px #FFF , 1055px 188px #FFF , 1637px 400px #FFF , 764px 234px #FFF , 1243px 707px #FFF , 413px 1198px #FFF , 1333px 1355px #FFF , 702px 1895px #FFF , 1348px 119px #FFF , 528px 557px #FFF , 574px 919px #FFF , 311px 870px #FFF , 1736px 1973px #FFF , 840px 991px #FFF , 986px 575px #FFF , 1231px 1209px #FFF , 1632px 1824px #FFF , 72px 1991px #FFF , 1758px 314px #FFF , 167px 1863px #FFF , 544px 977px #FFF , 1327px 779px #FFF , 1710px 886px #FFF , 1156px 129px #FFF , 608px 1680px #FFF , 975px 1299px #FFF , 1579px 17px #FFF , 1199px 1242px #FFF , 1948px 1724px #FFF , 14px 269px #FFF , 1759px 1081px #FFF , 1465px 176px #FFF , 539px 88px #FFF , 1478px 1834px #FFF , 64px 1508px #FFF , 1037px 480px #FFF , 214px 1877px #FFF , 1191px 928px #FFF , 541px 1408px #FFF , 9px 1325px #FFF , 629px 896px #FFF , 1255px 77px #FFF , 130px 1393px #FFF , 1954px 509px #FFF , 1530px 1599px #FFF , 572px 873px #FFF , 996px 173px #FFF , 1284px 69px #FFF , 1412px 1160px #FFF , 908px 1370px #FFF , 1136px 1069px #FFF , 1458px 1916px #FFF , 472px 1982px #FFF , 968px 988px #FFF , 506px 620px #FFF , 195px 447px #FFF , 1276px 542px #FFF , 350px 1771px #FFF , 1504px 613px #FFF , 623px 350px #FFF , 1838px 492px #FFF , 1258px 374px #FFF , 1558px 272px #FFF , 1868px 1232px #FFF , 1284px 245px #FFF , 819px 1086px #FFF , 1460px 1847px #FFF , 1303px 1677px #FFF , 337px 290px #FFF , 435px 1452px #FFF , 1605px 1987px #FFF , 1530px 1133px #FFF , 539px 1081px #FFF , 1310px 1661px #FFF , 220px 1058px #FFF , 872px 1589px #FFF , 1118px 1209px #FFF , 856px 1679px #FFF , 705px 1170px #FFF , 1500px 764px #FFF , 486px 530px #FFF , 1772px 1599px #FFF , 1641px 1256px #FFF , 1005px 1079px #FFF , 1718px 1774px #FFF , 1530px 1114px #FFF , 545px 1281px #FFF , 796px 1629px #FFF , 1915px 768px #FFF , 1201px 970px #FFF , 441px 1462px #FFF , 234px 131px #FFF , 1304px 153px #FFF , 1899px 162px #FFF , 951px 687px #FFF , 1478px 84px #FFF , 279px 1732px #FFF , 1597px 430px #FFF , 1801px 1260px #FFF , 620px 1837px #FFF , 246px 383px #FFF , 1044px 680px #FFF , 778px 155px #FFF , 1304px 1580px #FFF , 370px 926px #FFF , 437px 1548px #FFF , 1509px 1997px #FFF , 1832px 1415px #FFF , 206px 1564px #FFF , 302px 1900px #FFF , 1270px 995px #FFF , 1376px 1041px #FFF , 1899px 21px #FFF , 94px 1375px #FFF , 863px 804px #FFF , 769px 990px #FFF , 973px 583px #FFF , 1883px 1521px #FFF , 7px 565px #FFF , 602px 874px #FFF , 1575px 555px #FFF , 445px 1918px #FFF , 964px 77px #FFF , 1121px 1861px #FFF , 1236px 1198px #FFF , 454px 72px #FFF , 1691px 818px #FFF , 485px 622px #FFF , 1915px 515px #FFF , 437px 1282px #FFF , 354px 1536px #FFF , 326px 559px #FFF , 228px 28px #FFF , 1119px 1641px #FFF , 1785px 1325px #FFF , 516px 1731px #FFF , 1586px 1986px #FFF , 1087px 1992px #FFF , 1207px 825px #FFF , 1248px 230px #FFF , 499px 141px #FFF , 1855px 137px #FFF , 952px 735px #FFF , 1480px 106px #FFF , 626px 966px #FFF , 1097px 1654px #FFF , 513px 1951px #FFF , 1218px 1585px #FFF , 1719px 359px #FFF , 1405px 529px #FFF , 1574px 1659px #FFF , 1501px 106px #FFF , 1927px 1434px #FFF , 494px 1347px #FFF , 877px 1538px #FFF , 1129px 1575px #FFF , 597px 444px #FFF , 1259px 662px #FFF , 789px 1055px #FFF , 1096px 13px #FFF , 1088px 371px #FFF , 469px 571px #FFF , 222px 1533px #FFF , 971px 1456px #FFF , 1580px 318px #FFF , 1923px 371px #FFF , 109px 1761px #FFF , 1319px 1371px #FFF , 1997px 401px #FFF , 306px 429px #FFF , 79px 1964px #FFF , 574px 1955px #FFF , 1951px 325px #FFF , 927px 237px #FFF , 1990px 1126px #FFF , 1349px 1964px #FFF , 1577px 1521px #FFF , 1835px 1319px #FFF , 1901px 1346px #FFF , 1693px 1715px #FFF , 1290px 1313px #FFF , 961px 1404px #FFF , 1416px 68px #FFF , 154px 270px #FFF , 1166px 985px #FFF , 721px 1932px #FFF , 988px 1353px #FFF , 1186px 1188px #FFF , 538px 1364px #FFF , 1591px 1222px #FFF , 1363px 223px #FFF , 1440px 503px #FFF , 1310px 321px #FFF , 779px 1885px #FFF , 1636px 392px #FFF , 751px 1663px #FFF , 810px 430px #FFF , 1569px 1651px #FFF , 1489px 1969px #FFF , 1017px 1474px #FFF , 549px 521px #FFF , 108px 699px #FFF , 1136px 1710px #FFF , 1354px 477px #FFF , 647px 364px #FFF , 40px 17px #FFF , 534px 73px #FFF , 805px 1304px #FFF , 838px 438px #FFF , 1953px 1852px #FFF , 705px 1517px #FFF , 958px 742px #FFF , 1785px 1626px #FFF , 18px 770px #FFF , 1601px 1280px #FFF , 1164px 1356px #FFF , 1969px 138px #FFF , 158px 227px #FFF , 602px 970px #FFF , 1062px 1631px #FFF , 83px 63px #FFF , 1104px 349px #FFF , 112px 751px #FFF , 927px 1069px #FFF , 273px 1359px #FFF , 952px 1364px #FFF , 1299px 663px #FFF , 1207px 173px #FFF , 1608px 506px #FFF , 329px 971px #FFF , 1056px 1568px #FFF , 1641px 495px #FFF , 163px 1780px #FFF , 1468px 1566px #FFF , 1423px 105px #FFF , 1493px 645px #FFF , 1951px 1695px #FFF , 483px 627px #FFF , 426px 21px #FFF , 1011px 335px #FFF , 1989px 1774px #FFF , 941px 235px #FFF , 1020px 1856px #FFF , 254px 295px #FFF , 1287px 1979px #FFF , 185px 1748px #FFF , 103px 887px #FFF , 829px 1923px #FFF , 1220px 1910px #FFF , 618px 308px #FFF , 1908px 866px #FFF , 1316px 518px #FFF , 294px 1799px #FFF , 1456px 434px #FFF , 82px 604px #FFF , 390px 1731px #FFF , 1066px 755px #FFF , 1703px 1920px #FFF , 1134px 989px #FFF , 580px 383px #FFF , 842px 1040px #FFF , 1062px 1624px #FFF , 1420px 1533px #FFF , 1692px 537px #FFF , 1672px 295px #FFF , 1974px 1257px #FFF , 1122px 1774px #FFF , 1538px 221px #FFF , 1023px 1331px #FFF , 1337px 903px #FFF , 1466px 241px #FFF , 846px 1887px #FFF , 1093px 1657px #FFF , 520px 579px #FFF , 1696px 350px #FFF , 1456px 1593px #FFF , 855px 1433px #FFF , 115px 606px #FFF , 1745px 948px #FFF , 239px 1246px #FFF , 115px 555px #FFF , 1861px 204px #FFF , 882px 1407px #FFF , 198px 842px #FFF , 961px 1468px #FFF , 1503px 1360px #FFF , 1015px 1837px #FFF , 1779px 550px #FFF , 1028px 1805px #FFF , 725px 1988px #FFF , 440px 1147px #FFF , 891px 1392px #FFF , 483px 792px #FFF , 551px 368px #FFF , 135px 536px #FFF , 1276px 979px #FFF , 1986px 70px #FFF , 1970px 1503px #FFF , 1260px 221px #FFF , 952px 1164px #FFF , 1539px 239px #FFF , 1874px 1206px #FFF , 1770px 1067px #FFF , 1109px 172px #FFF , 1573px 961px #FFF , 1965px 655px #FFF , 1976px 1346px #FFF , 1759px 1586px #FFF , 1220px 165px #FFF , 1186px 355px #FFF , 6px 1372px #FFF , 1916px 62px #FFF , 928px 1622px #FFF , 749px 1244px #FFF , 1341px 1039px #FFF , 195px 451px #FFF , 1991px 1448px #FFF , 260px 1488px #FFF , 22px 1080px #FFF , 371px 469px #FFF , 892px 672px #FFF , 116px 1967px #FFF , 71px 1482px #FFF , 543px 743px #FFF , 1360px 821px #FFF , 1186px 1684px #FFF , 1713px 921px #FFF , 1742px 1730px #FFF , 1170px 341px #FFF , 1489px 1030px #FFF , 54px 141px #FFF , 1767px 1863px #FFF , 1822px 533px #FFF , 304px 857px #FFF , 731px 187px #FFF , 1503px 364px #FFF , 749px 1498px #FFF , 1254px 1913px #FFF , 1805px 411px #FFF , 344px 1168px #FFF , 544px 1228px #FFF , 1954px 1148px #FFF , 354px 869px #FFF , 1428px 212px #FFF , 947px 970px #FFF , 1658px 515px #FFF , 1338px 607px #FFF , 1093px 809px #FFF , 1527px 49px #FFF , 1918px 642px #FFF , 1586px 1668px #FFF , 1639px 325px #FFF , 679px 983px #FFF , 1311px 245px #FFF , 256px 1340px #FFF , 1272px 1758px #FFF , 1955px 1075px #FFF , 1386px 1038px #FFF , 435px 999px #FFF , 613px 1784px #FFF , 631px 364px #FFF , 1536px 996px #FFF , 268px 130px #FFF , 1961px 1131px #FFF , 1295px 882px #FFF , 471px 814px #FFF , 1784px 1794px #FFF , 1874px 1310px #FFF , 251px 441px #FFF , 309px 1764px #FFF , 1899px 456px #FFF , 1749px 1742px #FFF , 1680px 1721px #FFF , 1625px 1095px #FFF , 1006px 1250px #FFF , 1736px 301px #FFF , 1139px 1416px #FFF , 455px 729px #FFF , 1252px 1315px #FFF , 1486px 916px #FFF , 1904px 96px #FFF , 799px 488px #FFF , 691px 1478px #FFF , 1625px 1743px #FFF , 168px 1589px #FFF , 1908px 834px #FFF , 433px 1524px #FFF , 562px 1335px #FFF , 1840px 1142px #FFF , 1244px 1014px #FFF , 1111px 213px #FFF , 1536px 583px #FFF , 617px 526px #FFF , 887px 1388px #FFF , 1763px 299px #FFF , 851px 1947px #FFF , 443px 398px #FFF , 1972px 1254px #FFF , 1541px 1327px #FFF , 929px 957px #FFF , 472px 1324px #FFF , 1539px 1056px #FFF , 765px 1998px #FFF , 919px 753px #FFF , 333px 166px #FFF , 1032px 1295px #FFF , 26px 1044px #FFF , 1228px 232px #FFF , 1990px 1962px #FFF , 1371px 561px #FFF , 1129px 414px #FFF , 733px 1268px #FFF , 1181px 1932px #FFF , 1510px 300px #FFF , 610px 948px #FFF;
}

&::after {
    #stars;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1321px 299px #FFF , 490px 318px #FFF , 525px 575px #FFF , 1137px 1852px #FFF , 133px 1723px #FFF , 704px 386px #FFF , 895px 1633px #FFF , 262px 39px #FFF , 1082px 1653px #FFF , 553px 1424px #FFF , 380px 1602px #FFF , 1411px 117px #FFF , 719px 405px #FFF , 82px 1378px #FFF , 1136px 397px #FFF , 222px 1296px #FFF , 1516px 239px #FFF , 1942px 570px #FFF , 1500px 1670px #FFF , 215px 1477px #FFF , 1475px 289px #FFF , 621px 678px #FFF , 834px 1763px #FFF , 719px 43px #FFF , 335px 1192px #FFF , 1385px 868px #FFF , 728px 1179px #FFF , 87px 1794px #FFF , 1083px 435px #FFF , 1060px 145px #FFF , 1774px 1881px #FFF , 1831px 67px #FFF , 615px 1755px #FFF , 250px 1470px #FFF , 1215px 586px #FFF , 793px 1813px #FFF , 1067px 162px #FFF , 1643px 1761px #FFF , 486px 510px #FFF , 1897px 1518px #FFF , 1903px 1302px #FFF , 1897px 1167px #FFF , 545px 698px #FFF , 1277px 484px #FFF , 182px 242px #FFF , 899px 1924px #FFF , 636px 472px #FFF , 742px 248px #FFF , 598px 1125px #FFF , 1358px 1573px #FFF , 1695px 1887px #FFF , 465px 458px #FFF , 1006px 1920px #FFF , 980px 878px #FFF , 732px 368px #FFF , 141px 1916px #FFF , 1685px 1082px #FFF , 687px 370px #FFF , 1128px 1773px #FFF , 1245px 144px #FFF , 1142px 421px #FFF , 1681px 1431px #FFF , 924px 208px #FFF , 870px 1984px #FFF , 493px 533px #FFF , 1161px 1806px #FFF , 1732px 1947px #FFF , 606px 566px #FFF , 202px 1722px #FFF , 1412px 1911px #FFF , 1936px 1367px #FFF , 1604px 1083px #FFF , 1280px 1864px #FFF , 71px 1881px #FFF , 373px 1232px #FFF , 822px 1212px #FFF , 1125px 695px #FFF , 1627px 950px #FFF , 1997px 532px #FFF , 862px 754px #FFF , 660px 1134px #FFF , 946px 41px #FFF , 1733px 300px #FFF , 729px 1269px #FFF , 1445px 1399px #FFF , 1456px 989px #FFF , 261px 624px #FFF , 1681px 1790px #FFF , 115px 1310px #FFF , 1407px 1236px #FFF , 67px 834px #FFF , 347px 1379px #FFF , 525px 1245px #FFF , 239px 80px #FFF , 1754px 1944px #FFF , 70px 947px #FFF , 1872px 1375px #FFF , 256px 1505px #FFF , 1162px 1586px #FFF , 1962px 1785px #FFF , 862px 891px #FFF , 1190px 209px #FFF , 1792px 1877px #FFF , 1965px 1563px #FFF , 1924px 688px #FFF , 757px 443px #FFF , 784px 606px #FFF , 628px 454px #FFF , 835px 166px #FFF , 1389px 1018px #FFF , 317px 1945px #FFF , 1074px 312px #FFF , 1681px 1432px #FFF , 1907px 1435px #FFF , 1275px 1881px #FFF , 308px 956px #FFF , 493px 1769px #FFF , 1812px 1246px #FFF , 1343px 1510px #FFF , 1688px 1487px #FFF , 1597px 1623px #FFF , 47px 333px #FFF , 897px 1616px #FFF , 1158px 1247px #FFF , 772px 1179px #FFF , 541px 1611px #FFF , 1011px 1377px #FFF , 220px 363px #FFF , 217px 866px #FFF , 77px 1959px #FFF , 494px 139px #FFF , 1730px 1161px #FFF , 1991px 1849px #FFF , 993px 172px #FFF , 1344px 1140px #FFF , 818px 574px #FFF , 856px 1546px #FFF , 64px 436px #FFF , 1561px 1574px #FFF , 393px 292px #FFF , 965px 524px #FFF , 636px 1769px #FFF , 937px 910px #FFF , 1661px 1866px #FFF , 1181px 812px #FFF , 1374px 772px #FFF , 168px 732px #FFF , 98px 1713px #FFF , 59px 185px #FFF , 79px 257px #FFF , 1344px 1742px #FFF , 1976px 858px #FFF , 136px 841px #FFF , 1366px 1096px #FFF , 280px 1402px #FFF , 1147px 268px #FFF , 490px 640px #FFF , 1421px 588px #FFF , 1072px 784px #FFF , 1465px 447px #FFF , 471px 968px #FFF , 137px 349px #FFF , 900px 696px #FFF , 1927px 1004px #FFF , 1257px 186px #FFF , 765px 1748px #FFF , 1781px 1762px #FFF , 269px 1342px #FFF , 975px 1497px #FFF , 1138px 1085px #FFF , 1082px 1545px #FFF , 1260px 10px #FFF , 1725px 1386px #FFF , 1844px 1908px #FFF , 801px 78px #FFF , 884px 1051px #FFF , 502px 1771px #FFF , 774px 205px #FFF , 207px 1873px #FFF , 162px 1746px #FFF , 1442px 1423px #FFF , 1013px 395px #FFF , 796px 1843px #FFF , 1443px 257px #FFF , 835px 1232px #FFF , 732px 565px #FFF , 1300px 457px #FFF , 343px 1962px #FFF , 1822px 1634px #FFF , 929px 1087px #FFF , 545px 1405px #FFF , 160px 124px #FFF , 686px 1037px #FFF , 723px 856px #FFF , 979px 1411px #FFF , 1183px 1089px #FFF , 1472px 1725px #FFF , 1059px 105px #FFF , 1044px 592px #FFF , 207px 1530px #FFF;
  animation: animStar 100s linear infinite;
}
&::after {
    #stars2;
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1321px 299px #FFF , 490px 318px #FFF , 525px 575px #FFF , 1137px 1852px #FFF , 133px 1723px #FFF , 704px 386px #FFF , 895px 1633px #FFF , 262px 39px #FFF , 1082px 1653px #FFF , 553px 1424px #FFF , 380px 1602px #FFF , 1411px 117px #FFF , 719px 405px #FFF , 82px 1378px #FFF , 1136px 397px #FFF , 222px 1296px #FFF , 1516px 239px #FFF , 1942px 570px #FFF , 1500px 1670px #FFF , 215px 1477px #FFF , 1475px 289px #FFF , 621px 678px #FFF , 834px 1763px #FFF , 719px 43px #FFF , 335px 1192px #FFF , 1385px 868px #FFF , 728px 1179px #FFF , 87px 1794px #FFF , 1083px 435px #FFF , 1060px 145px #FFF , 1774px 1881px #FFF , 1831px 67px #FFF , 615px 1755px #FFF , 250px 1470px #FFF , 1215px 586px #FFF , 793px 1813px #FFF , 1067px 162px #FFF , 1643px 1761px #FFF , 486px 510px #FFF , 1897px 1518px #FFF , 1903px 1302px #FFF , 1897px 1167px #FFF , 545px 698px #FFF , 1277px 484px #FFF , 182px 242px #FFF , 899px 1924px #FFF , 636px 472px #FFF , 742px 248px #FFF , 598px 1125px #FFF , 1358px 1573px #FFF , 1695px 1887px #FFF , 465px 458px #FFF , 1006px 1920px #FFF , 980px 878px #FFF , 732px 368px #FFF , 141px 1916px #FFF , 1685px 1082px #FFF , 687px 370px #FFF , 1128px 1773px #FFF , 1245px 144px #FFF , 1142px 421px #FFF , 1681px 1431px #FFF , 924px 208px #FFF , 870px 1984px #FFF , 493px 533px #FFF , 1161px 1806px #FFF , 1732px 1947px #FFF , 606px 566px #FFF , 202px 1722px #FFF , 1412px 1911px #FFF , 1936px 1367px #FFF , 1604px 1083px #FFF , 1280px 1864px #FFF , 71px 1881px #FFF , 373px 1232px #FFF , 822px 1212px #FFF , 1125px 695px #FFF , 1627px 950px #FFF , 1997px 532px #FFF , 862px 754px #FFF , 660px 1134px #FFF , 946px 41px #FFF , 1733px 300px #FFF , 729px 1269px #FFF , 1445px 1399px #FFF , 1456px 989px #FFF , 261px 624px #FFF , 1681px 1790px #FFF , 115px 1310px #FFF , 1407px 1236px #FFF , 67px 834px #FFF , 347px 1379px #FFF , 525px 1245px #FFF , 239px 80px #FFF , 1754px 1944px #FFF , 70px 947px #FFF , 1872px 1375px #FFF , 256px 1505px #FFF , 1162px 1586px #FFF , 1962px 1785px #FFF , 862px 891px #FFF , 1190px 209px #FFF , 1792px 1877px #FFF , 1965px 1563px #FFF , 1924px 688px #FFF , 757px 443px #FFF , 784px 606px #FFF , 628px 454px #FFF , 835px 166px #FFF , 1389px 1018px #FFF , 317px 1945px #FFF , 1074px 312px #FFF , 1681px 1432px #FFF , 1907px 1435px #FFF , 1275px 1881px #FFF , 308px 956px #FFF , 493px 1769px #FFF , 1812px 1246px #FFF , 1343px 1510px #FFF , 1688px 1487px #FFF , 1597px 1623px #FFF , 47px 333px #FFF , 897px 1616px #FFF , 1158px 1247px #FFF , 772px 1179px #FFF , 541px 1611px #FFF , 1011px 1377px #FFF , 220px 363px #FFF , 217px 866px #FFF , 77px 1959px #FFF , 494px 139px #FFF , 1730px 1161px #FFF , 1991px 1849px #FFF , 993px 172px #FFF , 1344px 1140px #FFF , 818px 574px #FFF , 856px 1546px #FFF , 64px 436px #FFF , 1561px 1574px #FFF , 393px 292px #FFF , 965px 524px #FFF , 636px 1769px #FFF , 937px 910px #FFF , 1661px 1866px #FFF , 1181px 812px #FFF , 1374px 772px #FFF , 168px 732px #FFF , 98px 1713px #FFF , 59px 185px #FFF , 79px 257px #FFF , 1344px 1742px #FFF , 1976px 858px #FFF , 136px 841px #FFF , 1366px 1096px #FFF , 280px 1402px #FFF , 1147px 268px #FFF , 490px 640px #FFF , 1421px 588px #FFF , 1072px 784px #FFF , 1465px 447px #FFF , 471px 968px #FFF , 137px 349px #FFF , 900px 696px #FFF , 1927px 1004px #FFF , 1257px 186px #FFF , 765px 1748px #FFF , 1781px 1762px #FFF , 269px 1342px #FFF , 975px 1497px #FFF , 1138px 1085px #FFF , 1082px 1545px #FFF , 1260px 10px #FFF , 1725px 1386px #FFF , 1844px 1908px #FFF , 801px 78px #FFF , 884px 1051px #FFF , 502px 1771px #FFF , 774px 205px #FFF , 207px 1873px #FFF , 162px 1746px #FFF , 1442px 1423px #FFF , 1013px 395px #FFF , 796px 1843px #FFF , 1443px 257px #FFF , 835px 1232px #FFF , 732px 565px #FFF , 1300px 457px #FFF , 343px 1962px #FFF , 1822px 1634px #FFF , 929px 1087px #FFF , 545px 1405px #FFF , 160px 124px #FFF , 686px 1037px #FFF , 723px 856px #FFF , 979px 1411px #FFF , 1183px 1089px #FFF , 1472px 1725px #FFF , 1059px 105px #FFF , 1044px 592px #FFF , 207px 1530px #FFF;
}

&::after {
    #stars3;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1449px 1345px #FFF , 1907px 65px #FFF , 1556px 970px #FFF , 1548px 574px #FFF , 658px 1240px #FFF , 711px 1468px #FFF , 1911px 656px #FFF , 250px 1813px #FFF , 1323px 1619px #FFF , 1066px 1983px #FFF , 823px 1410px #FFF , 554px 409px #FFF , 1016px 989px #FFF , 554px 80px #FFF , 1638px 87px #FFF , 1982px 854px #FFF , 924px 1072px #FFF , 796px 1472px #FFF , 326px 106px #FFF , 391px 652px #FFF , 991px 1870px #FFF , 733px 894px #FFF , 1741px 1132px #FFF , 1726px 1884px #FFF , 1111px 330px #FFF , 500px 815px #FFF , 1285px 441px #FFF , 995px 1809px #FFF , 1738px 1816px #FFF , 84px 1987px #FFF , 1907px 1084px #FFF , 1227px 1326px #FFF , 188px 523px #FFF , 362px 1059px #FFF , 938px 1298px #FFF , 937px 1136px #FFF , 1243px 1179px #FFF , 1479px 1175px #FFF , 76px 114px #FFF , 354px 58px #FFF , 1859px 638px #FFF , 550px 1790px #FFF , 1014px 1985px #FFF , 856px 1670px #FFF , 1067px 167px #FFF , 1401px 1577px #FFF , 424px 506px #FFF , 225px 1098px #FFF , 563px 57px #FFF , 1402px 702px #FFF , 1650px 10px #FFF , 1685px 1425px #FFF , 942px 1136px #FFF , 1791px 160px #FFF , 346px 958px #FFF , 1160px 1030px #FFF , 951px 405px #FFF , 1937px 14px #FFF , 1698px 1951px #FFF , 668px 908px #FFF , 1075px 2px #FFF , 1609px 1913px #FFF , 520px 407px #FFF , 1047px 1810px #FFF , 655px 325px #FFF , 1049px 1208px #FFF , 374px 1049px #FFF , 423px 1524px #FFF , 164px 1525px #FFF , 71px 983px #FFF , 921px 655px #FFF , 1744px 233px #FFF , 676px 901px #FFF , 1225px 14px #FFF , 653px 520px #FFF , 57px 1454px #FFF , 1631px 91px #FFF , 126px 385px #FFF , 1398px 1051px #FFF , 461px 1814px #FFF , 1175px 1870px #FFF , 1498px 686px #FFF , 1375px 1775px #FFF , 1986px 514px #FFF , 1647px 698px #FFF , 957px 34px #FFF , 48px 351px #FFF , 1960px 526px #FFF , 569px 38px #FFF , 667px 994px #FFF , 705px 240px #FFF , 898px 420px #FFF , 579px 645px #FFF , 471px 1759px #FFF , 444px 1634px #FFF , 483px 1308px #FFF , 1782px 1263px #FFF , 83px 841px #FFF , 1399px 1680px #FFF , 874px 1675px #FFF;
  animation: animStar 150s linear infinite;
}
&::after {
    #stars3;
  content: " ";
  position: absolute;
  top: 400px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1449px 1345px #FFF , 1907px 65px #FFF , 1556px 970px #FFF , 1548px 574px #FFF , 658px 1240px #FFF , 711px 1468px #FFF , 1911px 656px #FFF , 250px 1813px #FFF , 1323px 1619px #FFF , 1066px 1983px #FFF , 823px 1410px #FFF , 554px 409px #FFF , 1016px 989px #FFF , 554px 80px #FFF , 1638px 87px #FFF , 1982px 854px #FFF , 924px 1072px #FFF , 796px 1472px #FFF , 326px 106px #FFF , 391px 652px #FFF , 991px 1870px #FFF , 733px 894px #FFF , 1741px 1132px #FFF , 1726px 1884px #FFF , 1111px 330px #FFF , 500px 815px #FFF , 1285px 441px #FFF , 995px 1809px #FFF , 1738px 1816px #FFF , 84px 1987px #FFF , 1907px 1084px #FFF , 1227px 1326px #FFF , 188px 523px #FFF , 362px 1059px #FFF , 938px 1298px #FFF , 937px 1136px #FFF , 1243px 1179px #FFF , 1479px 1175px #FFF , 76px 114px #FFF , 354px 58px #FFF , 1859px 638px #FFF , 550px 1790px #FFF , 1014px 1985px #FFF , 856px 1670px #FFF , 1067px 167px #FFF , 1401px 1577px #FFF , 424px 506px #FFF , 225px 1098px #FFF , 563px 57px #FFF , 1402px 702px #FFF , 1650px 10px #FFF , 1685px 1425px #FFF , 942px 1136px #FFF , 1791px 160px #FFF , 346px 958px #FFF , 1160px 1030px #FFF , 951px 405px #FFF , 1937px 14px #FFF , 1698px 1951px #FFF , 668px 908px #FFF , 1075px 2px #FFF , 1609px 1913px #FFF , 520px 407px #FFF , 1047px 1810px #FFF , 655px 325px #FFF , 1049px 1208px #FFF , 374px 1049px #FFF , 423px 1524px #FFF , 164px 1525px #FFF , 71px 983px #FFF , 921px 655px #FFF , 1744px 233px #FFF , 676px 901px #FFF , 1225px 14px #FFF , 653px 520px #FFF , 57px 1454px #FFF , 1631px 91px #FFF , 126px 385px #FFF , 1398px 1051px #FFF , 461px 1814px #FFF , 1175px 1870px #FFF , 1498px 686px #FFF , 1375px 1775px #FFF , 1986px 514px #FFF , 1647px 698px #FFF , 957px 34px #FFF , 48px 351px #FFF , 1960px 526px #FFF , 569px 38px #FFF , 667px 994px #FFF , 705px 240px #FFF , 898px 420px #FFF , 579px 645px #FFF , 471px 1759px #FFF , 444px 1634px #FFF , 483px 1308px #FFF , 1782px 1263px #FFF , 83px 841px #FFF , 1399px 1680px #FFF , 874px 1675px #FFF;
}



@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
  
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}


html {
  font-size: .9em;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {

  color: ${({ theme }) => theme.text1};
  background-color: black;
}

body {
  min-height: 100vh;
  background-position: 0 -30vh;
  background-repeat: no-repeat;
  background-image: ${({ theme }) =>
    `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
      1,
      theme.bg1
    )} 100%)`};
}
`