import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 369
}

// Constants related to PulseChain and RPC Providers
export const PULSECHAIN_RPC = {
  MAINNET: 'https://rpc.pulsechain.com',
  BACKUP: 'https://rpc-pulsechain.g4mm4.io',
}

export const DEFAULT_RPC = PULSECHAIN_RPC.MAINNET // Default RPC endpoint to use

// Example contract addresses and other constants
export const FACTORY_ADDRESS = '0x556F4C3aAa6c6b76e1BBa0409D99D4a483b29997'
export const INIT_CODE_HASH = '0x67cb47473e9a281a69a651a1182bf0249f7335213e4efd0514b014638ca5a774'
export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// Common constants for internal use
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

// Trade-related constants and enums
export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

// Solidity types and maxima
export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
