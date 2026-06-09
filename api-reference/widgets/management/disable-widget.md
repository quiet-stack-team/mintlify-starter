# Disable Widget

> Deactivate a widget — stops accepting new deposit sessions.

`POST /api/v1/businesses/:businessId/widgets/:widgetId/disable-widget`

Existing deposit sessions are unaffected. New sessions cannot be created while the widget is disabled.

## Parameters

### Path

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `businessId` | `string` | Yes | The business ID |
| `widgetId` | `string` | Yes | The widget ID |

## Request example

```shell
curl --request POST 'https://payments.bleepay.com/api/v1/businesses/biz_abc123/widgets/wdgt_abc/disable-widget' \
  --header 'Authorization: Bearer <business_token>' \
  --header 'Content-Type: application/json' \
  --data '{}'
```

## Response

Returns HTTP 200 with an empty body.
