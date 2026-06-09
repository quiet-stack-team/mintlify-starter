# Update Business User Status

> Change a user's membership status in a business.

`POST /api/v1/businesses/:businessId/users/:businessUserId/update-status`

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `businessId` | `string` | Yes | The business ID |
| `businessUserId` | `string` | Yes | The business user membership ID |

### Body

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | `enum` | Yes | New membership status |

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/businesses/biz_abc123/users/bu_xyz/update-status' \
  --header 'Authorization: Bearer <business_token>' \
  --header 'Content-Type: application/json' \
  --data '{ "status": "INACTIVE" }'
```

## Response

Returns HTTP 200 with an empty body.
