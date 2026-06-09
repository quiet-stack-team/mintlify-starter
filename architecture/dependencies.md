# Dependency Management

> Modular design to avoid vendor lock-in and ensure resilience.

To avoid vendor lock-in and improve resilience, Bleepay's architecture is **strictly modular**.

## Interchangeable off-ramps

The **fiat liquidation rail** is provider-agnostic. Bleepay can swap or add providers based on:

* Geographic coverage
* Fee structures
* Merchant-specific agreements
* Regulatory requirements

Merchants and partners are not tied to a single off-ramp provider.

## Pluggable bridging

**Stargate** is the current default for reliability and speed. The **bridging layer** is modular: alternative protocols can be plugged in to:

* Ensure continuous availability
* Mitigate third-party protocol risk
* Support different chains or cost/UX tradeoffs

This reduces dependence on a single bridge implementation.

## Multiple provider aggregation

Bleepay aggregates several providers for both FX and fiat off-ramp:

| Provider type | Role |
|---------------|------|
| **Fiat off-ramp partners** (e.g. Bridge.xyz) | Create and operate liquidation addresses, convert crypto→fiat, send fiat to bank accounts |
| **Crypto exchange / swap providers** | Provide quotes and execute crypto→crypto swaps for in-flight FX |
| **Blockchain networks** | The settlement layer for on-chain transfers |

## Benefits

* **Continuity**: If one provider or protocol has an outage or policy change, alternatives can be used.
* **Commercial flexibility**: Different partners and fee models can be supported per region or merchant.
* **Future-proofing**: New chains, bridges, or off-ramps can be integrated without redesigning the core orchestration.

## Next steps

* [Fees](/architecture/fees) — how network, routing, and liquidation costs are structured.
* [Payment flows](/architecture/payment-flows) — where off-ramp and swap fit.
