# Discard Voucher

> Discard an unused voucher — releases it from the reserved state.

`POST /api/v1/vouchers/:voucherId/discard-voucher`

Discards a voucher that is no longer needed. The voucher must be in `RESERVED` or `REDEEMED` status. Once discarded, the voucher cannot be used.

This endpoint accepts both resource-based and registered user tokens.

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `voucherId` | `string` | Yes | The voucher ID to discard |

### Body

No body parameters required.

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/vouchers/vch_482916/discard-voucher' \
  --header 'Authorization: Bearer <payee_token>' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

## Response

### Response schema

Returns the updated voucher object with a discarded status.

### Error responses

| Status | Code | Description |
|--------|------|-------------|
| `400` | `already_resolved` | A resolved voucher cannot be discarded |
| `401` | `unauthorized` | Missing or invalid bearer token |
| `404` | `not_found` | Voucher not found |
