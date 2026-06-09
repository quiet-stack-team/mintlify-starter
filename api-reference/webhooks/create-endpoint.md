# Create Webhook Endpoint

> Register a webhook endpoint to receive payment event notifications.

`POST /api/v1/businesses/:businessId/webhook-endpoints/create-endpoint`

Webhooks are dispatched as signed HTTP POST requests with HMAC-SHA256 signatures. You can subscribe to specific event types and register multiple endpoints per business.

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `businessId` | `string` | Yes | The business ID |

### Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | HTTPS URL to deliver events to |
| `description` | `string` | No | Human-readable description of this endpoint |
| `events` | `array` | Yes | List of event types to subscribe to |

**Supported event types:**
- `deposit.created` — Deposit session created
- `deposit.pending` — On-chain payment detected
- `deposit.confirmed` — Payment confirmed after block confirmations
- `deposit.expired` — Session expired without payment
- `deposit.failed` — Deposit failed
- `deposit.underpaid` — Payment received below the expected amount
- `deposit.overpaid` — Payment received above the expected amount

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/businesses/biz_abc/webhook-endpoints/create-endpoint' \
  --header 'Authorization: Bearer <business_token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "url": "https://example.com/webhooks/bleepay",
    "description": "Production webhook endpoint",
    "events": ["deposit.pending", "deposit.confirmed", "deposit.expired"]
  }'
```

## Response

### Response schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Endpoint identifier |
| `url` | `string` | Delivery URL |
| `events` | `array` | Subscribed event types |
| `enabled` | `boolean` | Whether the endpoint is active |
| `signingSecret` | `string` | Secret for verifying webhook signatures — **shown only once** |

### Example response

```json
{
  "id": "wh_abc123",
  "url": "https://example.com/webhooks/bleepay",
  "description": "Production webhook endpoint",
  "events": ["deposit.pending", "deposit.confirmed", "deposit.expired"],
  "enabled": true,
  "signingSecret": "whsec_abc123def456..."
}
```

> **Warning:** The `signingSecret` is shown only once at creation time. Store it securely — you'll need it to verify webhook payload signatures.
