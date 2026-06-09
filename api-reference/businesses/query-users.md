# Query Business Users

> List all users with access to a business.

`GET /api/v1/businesses/:businessId/users`

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `businessId` | `string` | Yes | The business ID |

This endpoint has no query parameters.

## Request example

```shell
curl --request GET 'https://payments.bleepay.com/api/v1/businesses/biz_abc123/users' \
  --header 'Authorization: Bearer <business_token>'
```

## Response

Returns an array of business user objects.

**Business user object:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Membership identifier |
| `userId` | `string` | User identifier |
| `role` | `string` | User's role in the business |
| `status` | `string` | Membership status |
| `createdAt` | `string` | ISO 8601 timestamp |

### Example response

```json
[
  {
    "id": "bu_xyz",
    "userId": "usr_abc123",
    "role": "ADMIN",
    "status": "ACTIVE",
    "createdAt": "2026-06-09T12:00:00.000Z"
  }
]
```
