# How Money Moves

> Who holds funds at each step — Bleepay never does (only the fiat partner, and only briefly).

Where funds go and who holds them at each step, by scenario:

**A. Crypto in, same token out.** Customer sends token X on-chain → **merchant's own address**. Bleepay monitors, validates, notifies; it holds nothing.

**B. Crypto in, different crypto out (FX).** Payer sends token B → **swap/exchange service** converts → payee receives token A. Bleepay quotes and orchestrates.

**C. Crypto in, fiat out (off-ramp).** Payer sends crypto → (optional swap) → **liquidation address held by the fiat partner** → partner converts crypto→fiat → fiat to the payee's bank. The fiat partner holds and moves funds across the fiat leg; Bleepay arranges and orchestrates.

**D. Voucher payment.** The payer holds their own funds in the Bleepay Wallet app. Bleepay builds the voucher transaction; the **payer signs and sends it themselves**. Funds go from the payer to the payee; Bleepay never holds them.

## Summary

| Scenario | Who holds funds |
|----------|----------------|
| Same token | Merchant's own address |
| Crypto FX | Swap service (transiently) |
| Fiat off-ramp | Fiat partner's liquidation address (transiently) |
| Voucher | Payer holds own funds; signs and sends directly |

<img width="1500" height="723" alt="a" src="https://github.com/user-attachments/assets/88b9716d-bd77-4fbf-8a68-5a7aa2683dca" />
<img width="1500" height="630" alt="b" src="https://github.com/user-attachments/assets/5eead8a3-cd2f-4fb3-9faf-c7a6b075149a" />
<img width="1500" height="630" alt="c" src="https://github.com/user-attachments/assets/db38df34-0994-4008-9c91-28c0e34188a1" />
<img width="1500" height="723" alt="d" src="https://github.com/user-attachments/assets/a02308b8-44fa-46da-b65f-2adc9b497611" />

## Next steps

* [Custody model](/home/architecture/custody-model) — non-custodial across both products.
* [Security](/home/architecture/security) — zero-trust design.
