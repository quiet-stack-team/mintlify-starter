# Close Context

> Close an open payment context.

`POST /api/v1/vouchers/contexts/:contextId/context-close`

Closes a context, preventing any new vouchers from being reserved against it. Existing vouchers in the context are unaffected.

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `contextId` | `string` | Yes | The context ID to close |

### Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payeeId` | `string` or `null` | Yes | The payee ID (exactly 64 characters), or `null` if no payee was involved |

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/vouchers/contexts/ctx_a1b2c3d4e5f6/context-close' \
  --header 'Authorization: Bearer <payer_token>' \
  --header 'Content-Type: application/json' \
  --data '{ "payeeId": null }'
```

## Response

### Response schema

Returns the updated context object with status `CLOSED`.

### Example response

```json
{
  "id": "ctx_a1b2c3d4e5f6",
  "code": "A1B2C3",
  "status": "CLOSED",
  "format": "numeric",
  "payers": [
    {
      "address": "0x1234567890abcdef1234567890abcdef12345678"
    }
  ],
  "createdAt": "2026-06-09T12:00:00.000Z",
  "updatedAt": "2026-06-09T12:05:00.000Z"
}
```

### Error responses

| Status | Code | Description |
|--------|------|-------------|
| `400` | `already_closed` | The context is already closed |
| `401` | `unauthorized` | Missing or invalid bearer token |
| `404` | `not_found` | Context not found |
