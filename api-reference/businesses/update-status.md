# Update Business Status

> Change the status of a business.

`POST /api/v1/businesses/:businessId/update-status`

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `businessId` | `string` | Yes | The business ID |

### Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | `enum` | Yes | New business status |

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/businesses/biz_abc123/update-status' \
  --header 'Authorization: Bearer <business_token>' \
  --header 'Content-Type: application/json' \
  --data '{ "status": "INACTIVE" }'
```

## Response

Returns HTTP 200 with an empty body.
