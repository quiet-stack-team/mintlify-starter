# Cancel Deposit Session

> Cancel a deposit session before funds are sent.

`POST /api/v1/widgets/deposit-sessions/:sessionId/cancel-session`

Cancels a deposit session. Only sessions in `CREATED` or `PENDING` status can be cancelled. Cancelled sessions move to `EXPIRED` status.

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sessionId` | `string` | Yes | The deposit session ID to cancel |

### Body

No body parameters required.

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/widgets/deposit-sessions/dep_a1b2c3d4e5f6/cancel-session' \
  --header 'X-Client-Secret: dep_secret_xyz...' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

## Response

### Response schema

| Field | Type | Description |
|-------|------|-------------|
| `status` | `string` | Result status |
| `error` | `string` | Error message if cancellation failed |

### Example response

```json
{
  "status": "cancelled"
}
```

### Error responses

| Status | Code | Description |
|--------|------|-------------|
| `400` | `cannot_cancel` | Session is already confirmed or expired |
| `401` | `unauthorized` | Missing or invalid authentication |
| `404` | `not_found` | Session not found |
