# Bleepay Technical Documentation

Dokumentacja techniczna projektu **Bleepay** zbudowana w [Mintlify](https://mintlify.com).

## Struktura

- **index.mdx** — strona główna
- **getting-started/** — wprowadzenie, quickstart, core concepts
- **integration/** — przegląd, SDK, workflow, webhooks
- **e-commerce/** — overview, checkout, benefits
- **web3/** — developers, wallet providers, dApps, processing
- **architecture/** — execution flow, off-ramp, security, dependencies, fees
- **reference/** — terminology, protocol flow, voucher modes
- **images/** — diagramy (PNG)
- **docs.json** — konfiguracja Mintlify (nawigacja, kolory, motyw)

## Uruchomienie lokalne

Wymagania: Node.js v20.17.0+

```bash
# Instalacja CLI Mintlify
npm i -g mint

# Uruchomienie podglądu
mint dev
```

Strona będzie dostępna pod adresem: **http://localhost:3000**

## Wdrożenie

1. Połącz repozytorium z [mintlify.com/start](https://mintlify.com/start).
2. Po wdrożeniu dokumentacja będzie dostępna pod adresem `*.mintlify.app`.
3. Opcjonalnie skonfiguruj [własną domenę](https://mintlify.com/customize/custom-domain).

## Źródła treści

Dokumentacja została przygotowana na podstawie:

- Technical Summary
- Bleepay for E-Commerce
- About Bleepay
- Bleepay for Web3 Developers
- Patent: Systems and Methods for Voucher-Based Authorization and Redemption of Digital Asset Payments
