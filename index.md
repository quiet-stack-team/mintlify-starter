# Bleepay Documentation

> Non-custodial payment orchestration connecting Web3 liquidity to traditional fiat rails. Pay with any token, receive fiat.

Pay with a **6-digit code**. No extensions. No wallet popups. Crypto in, fiat out.

## Why Bleepay?

Bleepay is a **non-custodial orchestration layer** that connects Web3 liquidity to traditional fiat rails. Users pay with **any token on any chain** via human-friendly **6-digit codes**; settlement is delivered as **fiat** to the merchant's bank account through regulated partners.

* **No browser extensions** — no popups, no connection friction
* **No custody** — private keys stay in the user's wallet; each transaction is authorized individually
* **Chain-agnostic** — one integration for merchants; Bleepay handles gas, routing, and DEX logic
* **Fiat out** — merchants receive funds to IBAN via SEPA/ELIXIR; no crypto accounting

## Contents

### Getting Started
- [Index](index)
- [Introduction](/getting-started/introduction) — What Bleepay is and why it exists
- [Core Concepts](/getting-started/core-concepts) — Vouchers, sessions, and settlement
- [Quickstart](/getting-started/quickstart) — Your first EURC payment via the API

### Web2/Web3 Payments
- [Integration Overview](/web2-web3-payments/overview) — Parameters, webhooks, and how Bleepay fits into your stack
- [Simple Payments](/web2-web3-payments/simple-payments) — SIMPLE vouchers for token transfers with built-in FX
- [Sessions](/web2-web3-payments/sessions) — Group multiple vouchers into a single session
- [Smart Contracts](/web2-web3-payments/smart-contracts) — CUSTOM vouchers for contract interactions

### E-Commerce
- [Overview](/e-commerce/overview) — Accept crypto at checkout, receive fiat
- [Benefits](/e-commerce/benefits) — Why merchants choose Bleepay
- [Checkout Flow](/e-commerce/checkout-flow) — Customer and merchant steps
- [Webhooks](/e-commerce/webhooks) — Event types, payloads, and verification

### Integrations
- [Overview](/integration/dapps) — How Bleepay integrates into dapps
- [Wallet Providers](/integration/wallet-providers) — Integrate Bleepay into a wallet
- [dApp Integration](/integration/developers) — Code-based wallet connections for dApps
- [Web3 Processing](/integration/processing) — Swaps, DeFi, and complex on-chain actions

### Architecture
- [System Overview](/architecture/system-overview) — The two products at a glance
- [Bleepay Widget](/architecture/bleepay-widget) — Crypto payment gateway
- [Bleepay Wallet](/architecture/bleepay-wallet) — Vouchers and the wallet app
- [Payment Flows](/architecture/payment-flows) — Deposit, voucher, FX, and fiat off-ramp
- [How Money Moves](/architecture/how-money-moves) — Fund flows by scenario
- [Custody Model](/architecture/custody-model) — Non-custodial across both products
- [Onboarding & KYC/KYB](/architecture/onboarding-kyc-kyb) — Identity verification for merchants
- [Security](/architecture/security) — Zero-trust and non-custodial model
- [Dependency Management](/architecture/dependencies) — Modular provider architecture
- [Fee Structure](/architecture/fees) — Cost layers and commercial terms

### Reference
- [Terminology](/reference/terminology) — Glossary of protocol terms
- [Protocol Flow](/reference/protocol-flow) — Voucher lifecycle from generation to settlement
- [Voucher Modes](/reference/voucher-modes) — Numeric vs alphanumeric voucher formats
