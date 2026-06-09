# Webhooks

> Payment events, payloads, and how to handle them securely.

Bleepay sends HTTP POST requests to your registered webhook endpoints when payment-related events occur. Use these to update your order state and fulfill orders.

## Endpoint requirements

* **URL**: The webhook URL you register for your business.
* **Method**: POST
* **Content-Type**: `application/json`
* **Signature**: HMAC-SHA256 in the `X-Platform-Signature` header. Verify this to ensure the request came from Bleepay.
* **Response**: Return `200 OK` quickly so Bleepay can consider the delivery successful. Process asynchronously if needed.

## Event types

| Event                | When it fires                                                                          |
| -------------------- | -------------------------------------------------------------------------------------- |
| `deposit.created`    | A deposit session has been created.                                                    |
| `deposit.pending`    | An on-chain transaction has been detected and is awaiting confirmations.               |
| `deposit.confirmed`  | The transaction has received the required block confirmations. Use this to fulfill.    |
| `deposit.expired`    | The deposit session expired without receiving funds (30-minute window).                |
| `deposit.underpaid`  | The customer sent less than the required amount.                                       |
| `deposit.overpaid`   | The customer sent more than the required amount.                                       |

Always check the `type` field and handle idempotency (e.g. by `order_id` or `tx_id`).

## Example payload

```json
{
    "id": "evt_abc123",
    "type": "deposit.confirmed",
    "data": {
        "sessionId": "dep_xyz789",
        "orderId": "ORDER-5678",
        "status": "CONFIRMED",
        "amount": "100.00",
        "currency": "EURC",
        "network": "polygon",
        "txHash": "0xTransactionHash",
        "depositAddress": "0xDepositAddress",
        "customerEmail": "customer@example.com",
        "customerReference": "ref_123",
        "metadata": {}
    }
}
```

## Best practices

1. **Verify signatures**: Always validate the `X-Platform-Signature` header using your webhook signing secret to ensure the payload originated from Bleepay.
2. **Idempotency**: Process each event by its `id` so duplicate deliveries don't double-fulfill.
3. **Async processing**: Acknowledge with 200 quickly; do heavy work (DB, external APIs) in a background job.
4. **Retries**: Bleepay retries failed deliveries up to 3 times at 30-second intervals. Your handler must remain idempotent.

## Setting up webhooks

Webhook endpoints are configured per business in the dashboard:

1. Register an endpoint URL.
2. Select which event types to subscribe to (e.g. `deposit.confirmed`, `deposit.expired`).
3. Store the signing secret returned at creation time — it is shown only once.
4. Use the secret to verify the `X-Platform-Signature` header on incoming requests.

## Next steps

* [E-Commerce overview](/e-commerce/overview) — role of webhooks in the merchant flow.
* [Integration overview](/web2-web3-payments/overview) — full parameter reference.
