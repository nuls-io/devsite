# Interface interaction format and specification json-rpc

## Request Body

```json
{
  "cmd": "nuls_accounts",
  "params": ["param1", "param2"],
  "min_version": 1.0,
}
```

- Request parameters

| Parameters | Required | Type | Description|
| ----------- | ----- | ------ | -------------- |
| cmd | true | string | Execute Command |
Params | true | array | Command Parameter Table |
| min_version | false | float | compatible minimum version |

## Response Body

- success

```json
{
  "code":0,
  "msg": "Success",
  "result": {}
}
```

- Response parameters

| Parameters | Required | Type | Description|
| :----- | :--- | :----- | --------------------------------------- |
| code | ture | int | Request the desired state, returning 0 successfully.Otherwise return error code|
| msg | true | string | User-Friendly Request Execution Result Description |
| result | true | object | method return value |

## Error Code

### JSON RPC Standard errors

| Code      | Possible Return message | Description                                                  |
| --------- | ----------------------- | ------------------------------------------------------------ |
| 0         | Success                 | Operation success                                            |
| 1         | Parse error             | Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text. |
| 2         | Invalid Request         | The JSON sent is not a valid Request object.                 |
| 3         | Method not found        | The method does not exist / is not available.                |
| 4         | Invalid params          | Invalid method parameter(s).                                 |
| 5         | Internal error          | Internal JSON-RPC error.                                     |
| 6         | Unauthorized            | Should be used when some action is not authorized, e.g. sending from a locked account. |
| 7         | Action not allowed      | Should be used when some action is not allowed, e.g. preventing an action, while another depending action is processing on, like sending again when a confirmation popup is shown to the user (?). |
| 8         | Timeout                 | Should be used when an action timedout.                      |
| 9         | Conflict                | Should be used when an action conflicts with another (ongoing?) action. |
| 10        | Execution error         | Will contain a subset of custom errors in the data field. See below. |
| 11 to 100 | `Server error`          | Reserved for implementation-defined server-errors.           |

### Custom error fields

Custom error `10` can contain custom error(s) to further explain what went wrong.

```js
{
    code: 10,
    msg: 'Execution error',
}
```

