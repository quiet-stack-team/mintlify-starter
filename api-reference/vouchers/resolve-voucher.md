# Resolve Voucher

> Finalize a voucher by submitting signed transaction receipts.

`POST /api/v1/vouchers/:voucherId/resolve-voucher`

After the payer reviews and signs the transaction in their wallet, the wallet submits the signed receipts via this endpoint. This completes the voucher lifecycle — the status moves to `RESOLVED`.

This endpoint requires authentication as a registered user (the payer).

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `voucherId` | `string` | Yes | The voucher ID to resolve |

### Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `receipts` | `array` | Yes | 1–5 signed transaction receipts |

**Receipt object:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `paymentId` | `string` | Yes | The ID of the payment this receipt corresponds to |

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/vouchers/vch_482916/resolve-voucher' \
  --header 'Authorization: Bearer <payer_token>' \
  --header 'Content-Type: application/json' \
  --data '{
    "receipts": [
      { "paymentId": "pay_a1b2c3d4e5f6" }
    ]
  }'
```

## Response

### Response schema

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Voucher identifier |
| `status` | `string` | Voucher status — `RESOLVED` |

### Example response

```json
{
  "id": "vch_482916",
  "status": "RESOLVED"
}
```

### Error responses

| Status | Code | Description |
|--------|------|-------------|
| `400` | `not_redeemed` | The voucher must be redeemed before resolving |
| `400` | `already_resolved` | The voucher has already been resolved |
| `400` | `validation_failed` | Invalid or missing receipt data |
| `401` | `unauthorized` | Missing or invalid bearer token |
| `404` | `not_found` | Voucher not found |
