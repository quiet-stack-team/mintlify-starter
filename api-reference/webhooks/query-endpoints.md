# Query Webhook Endpoints

> List all webhook endpoints for a business.

`GET /api/v1/businesses/:businessId/webhook-endpoints`

Returns a list of all webhook endpoints registered for the business.

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `businessId` | `string` | Yes | The business ID |

### Query

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `integer` | No | Number of items (default 100) |
| `offset` | `integer` | No | Pagination offset |
| `since` | `integer` | No | Unix timestamp (ms) — return items created after this time |
| `until` | `integer` | No | Unix timestamp (ms) — return items created before this time |

## Request example

```shell
curl --request GET 'https://payments.bleepay.com/api/v1/businesses/biz_abc/webhook-endpoints' \
  --header 'Authorization: Bearer <business_token>'
```

## Response

Returns an array of endpoint objects. See [Get Endpoint](/api-reference/webhooks/get-endpoint) for the object schema.

### Example response

```json
[
  {
    "id": "wh_abc123",
    "url": "https://example.com/webhooks/bleepay",
    "description": "Production webhook endpoint",
    "events": ["deposit.pending", "deposit.confirmed"],
    "enabled": true,
    "createdAt": "2026-06-09T12:00:00.000Z"
  }
]
```
