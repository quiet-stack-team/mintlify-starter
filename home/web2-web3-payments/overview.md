# Integration Overview

> How Bleepay fits into your stack and what you need to integrate.

Bleepay is built as a **drop-in** payment layer. The full Web3 stack — gas management, cross-chain routing, DEX interactions — is abstracted into a standard API workflow. For developers, integrating Bleepay is comparable to integrating Stripe or PayPal.

Bleepay allows a merchant to receive **crypto (Web3)** or **fiat (Web2)**. You do not need to specify which operation mode to use — the system automatically determines it based on the receiving currency. If the expected payment currency is a stablecoin like EURC or USDC, Bleepay handles the crypto settlement. If the expected currency is a fiat currency like EUR or USD, Bleepay routes through a fiat off-ramp partner to deliver funds to the merchant's bank account.

## What you need to provide

Integration is driven by **standard financial metadata**. Your engineering team does **not** need to:

* Write or deploy smart contracts
* Run or manage blockchain nodes
* Handle gas, RPC, or wallet connections on the frontend

### Parameters

| Parameter                  | Web3 (Crypto) | Web2 (Fiat) | Purpose                                              |
| -------------------------- | :-----------: | :---------: | ---------------------------------------------------- |
| `amount`                   | Required      | Required    | Transaction amount in the settlement currency.       |
| `currency`                 | Required      | Required    | Settlement currency (e.g. EURC, USDC for Web3; EUR, USD for Web2). |
| `currencyAddress`          | Required      | —           | Contract address of the settlement token on-chain.   |
| `network`                  | Required      | —           | Blockchain network for settlement (e.g. polygon, ethereum). |
| `wallet.address`           | Required      | —           | Payee's wallet address where crypto funds will be sent. |

| `order_id`                 | Required      | Required    | Your internal order or payment reference (idempotency, reconciliation). |

### Webhooks

Businesses can register webhook endpoints to receive payment lifecycle events. Each webhook endpoint is configured with:

* A **URL** to deliver events to
* A list of **event types** to subscribe to (e.g. `deposit.confirmed`, `deposit.expired`)
* A **signing secret** for HMAC-SHA256 payload verification

Webhooks are dispatched as signed HTTP POST requests. The signature is included in the `X-Platform-Signature` header. Failed deliveries are retried up to 3 times with 30-second intervals.

## How it works on your side

1. **Payer opens a context** — The payer authenticates and opens a payment context. This generates a context code that links the payer's identity to the payment session.
2. **Payee reserves a voucher** — The payee (merchant) authenticates using the context code and reserves a voucher, receiving a 6-digit code. This creates a secure, short-lived link between the payer's assets and the payment intent.
3. **Payee redeems the voucher** — The payee submits `expectedPayment` — what currency, how much, and where to send it. This sets the terms of the payment.
4. **Transaction is built** — Bleepay constructs the transaction calldata based on the expected payment. For SIMPLE vouchers, the network is determined automatically from the currency. For fiat payouts, Bleepay routes through a liquidation partner.
5. **Payer resolves** — The payer reviews the transaction in their wallet, signs it, and submits the receipt via `resolve-voucher`. The wallet broadcasts the transaction to the network.
6. **Wait for settlement** — On-chain payments settle once confirmed by the network. Fiat payouts settle when the liquidation partner completes the bank transfer. Poll the voucher status or listen for webhooks to track progress.

## Environments

| Environment    | Use case                                        |
| -------------- | ----------------------------------------------- |
| **Sandbox**    | Testing; no real funds or bank transfers.       |
| **Production** | Live payments; real crypto and fiat settlement. |

## Next steps

* [Simple Payments](/home/web2-web3-payments/simple-payments) — create a single EURC payment with SIMPLE voucher.
* [Sessions](/home/web2-web3-payments/sessions) — group multiple vouchers in a session.
* [Smart Contracts](/home/web2-web3-payments/smart-contracts) — interact with contracts via CUSTOM vouchers.
* [Webhooks](/home/e-commerce/webhooks) — event types, payloads, and verification.
