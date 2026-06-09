# Bleepay Wallet & Vouchers — A Native Payment Method

> A payer pays by entering a 6-digit code and confirming it in the non-custodial Bleepay Wallet app.

The voucher method lets a payment be initiated with a **6-digit code** instead of wallet addresses and network selection.

The payer's experience:

1. A **6-digit code** is generated (the voucher).
2. The payer **enters the code in the Widget** (or in a standalone integration).
3. Bleepay **generates the transaction(s) associated with the voucher**.
4. The payer **signs and sends** those transactions in the **Bleepay Wallet** app.

## The Bleepay Wallet

The Bleepay Wallet is a **mobile app (iOS / Android)** and is **non-custodial**: the user holds their own funds and keys. Bleepay's role is to **generate the transactions tied to a voucher** and present them in the app; the user then **signs and broadcasts them themselves**. Bleepay never holds the user's funds. This keeps the experience simple — a code and a tap — without Bleepay taking custody.

The wallet that generates voucher codes is currently the Bleepay Wallet; the design anticipates other wallets generating codes in future.

## Integration modes

- **Standalone** — integrated on its own as a payment method.
- **Inside the Widget** — surfaced as a payment option within the Widget, **enabled by default**.

## Voucher types: SIMPLE vs CUSTOM

The system supports two voucher types, chosen automatically from how the payee sets up the payment.

| | SIMPLE | CUSTOM |
|---|--------|--------|
| Represents | A plain token transfer (currency + amount + recipient) | Explicit, possibly multi-step transaction instructions |
| Network selection | Automatic | Specified by payee |
| Smart-contract calls | No | Yes |
| Supports FX | **Yes** | No |
| Typical use | "Send me 100 USDC" | Contract interaction, multi-step DeFi, conditional payments |

The general voucher lifecycle is **reserve → redeem → resolve**.

## Next steps

* [Payment flows](/architecture/payment-flows) — how vouchers move through the system.
* [Custody model](/architecture/custody-model) — non-custodial design.
* [Simple Payments](/web2-web3-payments/simple-payments) — using SIMPLE vouchers.
