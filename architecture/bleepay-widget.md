# Bleepay Widget — Crypto Payment Gateway

> An embeddable (or white-label) gateway a merchant configures once to accept crypto, settling in crypto or fiat.

The Widget is the merchant-facing product. A merchant integrates it in one of two ways:

- **Embedded Widget** — a drop-in component on a checkout/payment page (the customer-visible "pay with crypto" experience).
- **White-label** — the same capability integrated under the merchant's own brand.

From the customer's point of view it is a simple form: choose a currency, enter or confirm an amount, send funds. All blockchain complexity is handled by the system.

## What the merchant configures

A merchant sets up one or more Widgets from a dashboard and configures:

- a **mode**: `FIXED_AMOUNT` (merchant sets the price) or `CUSTOMER_AMOUNT` (amount set dynamically, e.g. a checkout total, within min/max limits);
- **min/max** deposit amounts;
- accepted **blockchain networks and currencies**;
- the **wallet address** where funds should be sent;
- optional **domain restrictions** (which websites may host the Widget);
- optional **success/cancel redirect URLs**;
- an optional **metadata schema** (e.g. order IDs).

A merchant may have **up to 10 Widgets**, each independent.

In every settlement option, funds land at the **merchant's own address or a partner's address** — Bleepay does not sit in the middle holding them (see [Custody model](/architecture/custody-model)).

## Next steps

* [Bleepay Wallet](/architecture/bleepay-wallet) — the voucher-based payment method.
* [Payment flows](/architecture/payment-flows) — end-to-end flow details.
* [Custody model](/architecture/custody-model) — how funds move.
