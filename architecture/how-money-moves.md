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

```mermaid
flowchart TD
    subgraph A[A. Same token]
      P1[Customer] --> M1[(Merchant's own address)]
    end
    subgraph B[B. Crypto FX]
      P2[Payer token B] --> SW{{Swap service}} --> PA[(Payee token A)]
    end
    subgraph C[C. Fiat off-ramp]
      P3[Payer crypto] --> SW2{{Swap?}} --> LQ[(Liquidation addr<br/>= partner)] --> BANK[(Payee bank)]
    end
    subgraph D[D. Voucher]
      U[Payer signs & sends<br/>own funds] --> SET[(Payee)]
    end
```

## Next steps

* [Custody model](/architecture/custody-model) — non-custodial across both products.
* [Security](/architecture/security) — zero-trust design.
