# Quickstart

> Get your first Bleepay payment flow running in minutes.

This guide walks through the payee (merchant/dApp) side of a Bleepay voucher payment. The payer uses a Bleepay-compatible wallet — you don't implement that side.

## Prerequisites

* A Bleepay account with API credentials
* A Bleepay-compatible wallet (e.g. Bleepay Wallet) for the payer
* cURL or any HTTP client

## Flow overview

```text
Payer (wallet)          Bleepay API            Payee (you)
     |                       |                     |
     | open context           |                     |
     |---------------------->|                     |
     |<-- context code -------|                     |
     |                       |                     |
     |   (share context code: QR, link, NFC, etc.) |
     |-------------------------------------------->|
     |                       |  sign-in (resource)  |
     |                       |<---------------------|
     |                       |  reserve-voucher     |
     |                       |<---------------------|
     |                       |-- voucher "482916" ->|
     |                       |                     |
     |                       |  redeem-voucher      |
     |                       |  (expectedPayment)   |
     |                       |<---------------------|
     |                       |                     |
     | resolve-voucher       |                     |
     | (sign & submit)       |                     |
     |---------------------->|                     |
```

Your responsibility is the **payee side** (right column). The payer side happens in their wallet.

## 1. Payer opens a context in their wallet

The payer uses a Bleepay-compatible wallet to authenticate and open a payment context. The wallet returns a **context code** — a short alphanumeric string the payer shares with you.

This step happens entirely inside the payer's wallet. You just need to provide a way for the payer to give you the context code (QR scan, text input, deeplink, etc.).

## 2. Authenticate as the payee

Use the context code to authenticate. This links your session to the payer's context.

```
POST /api/v1/auth/sign-in

{
    "type": "resource",
    "data": {
        "resource": "voucher::context::code::A1B2C3"
    }
}
```

**Response:** `{ "authorization": { "token": "<payee_token>" } }`

## 3. Reserve a voucher

Reserve a voucher within the payer's context. This generates a 6-digit voucher code.

```
POST /api/v1/vouchers/reserve-voucher
Authorization: Bearer <payee_token>

{
    "code": "A1B2C3"
}
```

**Response:**
```json
{
    "id": "vch_482916",
    "code": "482916",
    "status": "RESERVED",
    "expiresAt": "2026-06-09T12:02:00Z"
}
```

## 4. Redeem the voucher

Specify what you expect to receive — currency, amount, network, and destination address. The `expectedPayment` parameter tells Bleepay to create a **SIMPLE** voucher with automatic network selection.

```
POST /api/v1/vouchers/vch_482916/redeem-voucher
Authorization: Bearer <payee_token>

{
    "expectedPayment": {
        "network": "polygon",
        "currency": "EURC",
        "currencyAddress": "0x73b3db5a96a4b9d9bcfc22b8f1b3d85a5e5b5e5b",
        "amount": "100",
        "wallet": {
            "address": "0xYourWalletAddress"
        }
    }
}
```

**Response:**
```json
{
    "id": "vch_482916",
    "status": "REDEEMED",
    "type": "SIMPLE",
    "expectedPayment": {
        "network": "polygon",
        "currency": "EURC",
        "amount": "100",
        "wallet": { "address": "0xYourWalletAddress" }
    }
}
```

## 5. Payer signs and resolves

The payer reviews the transaction in their wallet, signs it, and the wallet submits the receipt. This happens on the payer's side — no action needed from you.

Poll the voucher to track its status until it reaches `RESOLVED`:

```
GET /api/v1/vouchers/vch_482916
Authorization: Bearer <payee_token>
```

The voucher moves through states: `RESERVED` → `REDEEMED` → `RESOLVED`. Poll every 2–5 seconds until the final state is reached. For production, register a webhook endpoint instead of polling.

## Complete payee-side example

```javascript
// 1. Authenticate with the context code the payer shared with you
const authRes = await fetch('/api/v1/auth/sign-in', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'resource',
    data: { resource: `voucher::context::code::${contextCode}` }
  })
});
const { authorization: { token } } = await authRes.json();

// 2. Reserve a voucher
const reserveRes = await fetch('/api/v1/vouchers/reserve-voucher', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ code: contextCode })
});
const voucher = await reserveRes.json();

// 3. Redeem with expected payment
await fetch(`/api/v1/vouchers/${voucher.id}/redeem-voucher`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    expectedPayment: {
      network: 'polygon',
      currency: 'EURC',
      currencyAddress: '0x73b3db5a96a4b9d9bcfc22b8f1b3d85a5e5b5e5b',
      amount: '100',
      wallet: { address: '0xYourWalletAddress' }
    }
  })
});

// 4. Poll until resolved
let status;
while (status !== 'RESOLVED') {
  const res = await fetch(`/api/v1/vouchers/${voucher.id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  status = data.status;
  if (status === 'RESOLVED') break;
  await new Promise(r => setTimeout(r, 3000));
}
```

## Next steps

* [Integration overview](/home/web2-web3-payments/overview) — full parameter reference and Web2 vs Web3 modes.
* [Simple Payments](/home/web2-web3-payments/simple-payments) — SIMPLE vouchers, FX, and negotiation.
* [Webhooks](/home/e-commerce/webhooks) — event-driven settlement tracking.
