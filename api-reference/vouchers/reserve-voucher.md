# Reserve Voucher

> Reserve a voucher within a payment context — returns a 6-digit voucher code.

`POST /api/v1/vouchers/reserve-voucher`

The payee reserves a voucher using the context code the payer shared with them. The response includes a 6-digit voucher code and a voucher ID. The voucher starts in `RESERVED` status.

This endpoint accepts both resource-based tokens (from context code authentication) and registered user tokens.

## Parameters

### Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | `string` | Yes | The context code shared by the payer. 6 characters. |

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/vouchers/reserve-voucher' \
  --header 'Authorization: Bearer <payee_token>' \
  --header 'Content-Type: application/json' \
  --data '{ "code": "A1B2C3" }'
```

## Response

### Response schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique voucher identifier |
| `code` | `string` | 6-digit voucher code |
| `status` | `string` | Voucher status — `RESERVED` |
| `expiresAt` | `string` | ISO 8601 expiry timestamp |

### Example response

```json
{
  "id": "vch_482916",
  "code": "482916",
  "status": "RESERVED",
  "expiresAt": "2026-06-09T12:02:00.000Z"
}
```

### Error responses

| Status | Code | Description |
|--------|------|-------------|
| `400` | `invalid_code` | The context code is invalid or expired |
| `401` | `unauthorized` | Missing or invalid bearer token |
| `404` | `not_found` | Context not found |
