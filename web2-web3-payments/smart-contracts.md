# Smart Contracts

> Using a CUSTOM voucher to interact with smart contracts — for staking, DeFi, and complex on-chain actions.

CUSTOM vouchers give you **full control** over transaction details. Instead of a simple "send me X of token Y," you specify explicit transaction instructions — networks, payments, and extras. This enables smart contract interactions like staking, swapping through a specific DEX, NFT minting, and multi-step DeFi operations.

CUSTOM vouchers do **not** support FX. They are for scenarios where you define exactly what on-chain actions must occur.

## Flow

1. **Payer** opens their wallet, authenticates, and opens a context — shares the context code with you.
2. **You authenticate** using the context code.
3. **You reserve** a voucher using the context code.
4. **You redeem** with explicit `networks`, `payments`, and `extras` — the system detects these and creates a **CUSTOM** voucher.
5. **Payer** reviews the transaction in their wallet, signs, and submits the receipt.

## Example: Staking contract call

A dApp wants the payer to stake tokens into a staking contract.

The payer has already opened their wallet and shared a context code with you.

### 1. Authenticate and reserve

```
POST /api/v1/auth/sign-in

{
    "type": "resource",
    "data": {
        "resource": "voucher::context::code::A1B2C3"
    }
}
```

```
POST /api/v1/vouchers/reserve-voucher
Authorization: Bearer <payee_token>

{
    "code": "A1B2C3"
}
```

Response: `{ "id": "vch_591234", "code": "591234", "status": "RESERVED" }`

### 2. Encode the contract call

Given a staking contract with this interface:

```solidity
interface IStaking {
    function stake(uint256 amount) external;
}
```

Use the ABI to encode the function calldata:

```javascript
import { encodeFunctionData } from 'viem';

const stakingAbi = [
  {
    name: 'stake',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
];

const stakeData = encodeFunctionData({
  abi: stakingAbi,
  functionName: 'stake',
  args: [1000000000000000000n], // 1 token (18 decimals)
});
// → 0xa694fc3a0000000000000000000000000000000000000000000000000de0b6b3a7640000
```

### 3. Redeem with CUSTOM configuration

```
POST /api/v1/vouchers/vch_591234/redeem-voucher
Authorization: Bearer <payee_token>

{
    "networks": [
        {
            "network": "ethereum",
            "type": "evm",
            "chainId": "1"
        }
    ],
    "payments": [
        {
            "type": "send_transaction",
            "input": {
                "from": "{payer}",
                "to": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
                "value": "0",
                "data": "0xa694fc3a0000000000000000000000000000000000000000000000000de0b6b3a7640000"
            }
        }
    ],
    "extras": []
}
```

The system detects `networks`, `payments`, and `extras` were provided (and no `expectedPayment`), so it automatically creates a **CUSTOM** voucher. The `{payer}` placeholder is substituted by the payer's wallet at resolution time.

### 4. Payer resolves

The payer reviews the staking transaction in their wallet, signs it, and the wallet submits the receipt. Poll until `RESOLVED`:

```
GET /api/v1/vouchers/vch_591234
Authorization: Bearer <payee_token>
```

### Diagram

```text
Payer (wallet)          Bleepay              Payee (you / dApp)
     |                     |                     |
     | open context        |                     |
     |-------------------->|                     |
     |<-- code "A1B2C3" ---|                     |
     |                     |                     |
     |   (share context code)                    |
     |------------------------------------------>|
     |                     |  sign-in            |
     |                     |<---------------------|
     |                     |  reserve-voucher    |
     |                     |<---------------------|
     |                     |-- code "591234" --->|
     |                     |                     |
     |                     |  redeem-voucher     |
     |                     |  (networks, payments,|
     |                     |   extras)           |
     |                     |<---------------------|
     |                     |                     |
     |                     |  type = CUSTOM      |
     |                     |                     |
     | resolve-voucher     |                     |
     | (signs staking tx)  |                     |
     |-------------------->|                     |
     |                     |                     |
     | staking contract called on-chain          |
```

## When to use CUSTOM

* Smart contract interactions (staking, lending, governance)
* Multi-step transactions (approve + transfer, batch calls)
* Custom on-chain logic that can't be expressed as a simple transfer
* dApp flows requiring explicit network and calldata control

## Limitations

* **No FX**: CUSTOM vouchers do not support automatic currency conversion.
* **No automatic network selection**: You must specify the blockchain network explicitly.
* **No expectedPayment**: CUSTOM vouchers use `payments` and `extras` instead of `expectedPayment`.

## Next steps

* [Simple Payments](/web2-web3-payments/simple-payments) — SIMPLE vouchers for straightforward transfers.
* [Sessions](/web2-web3-payments/sessions) — group vouchers in a session.
* [Web3 processing](/integration/processing) — swaps, DeFi, and complex on-chain actions.
