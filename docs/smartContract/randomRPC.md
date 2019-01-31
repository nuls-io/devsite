
## Wallet adds a random seed RPC interface

### Get a random seed list based on the height interval

URL：/random/seeds/height

Method：GET

Prams:

| parameter   | type | Required | remark                                 |
| ----------- | ---- | -------- | -------------------------------------- |
| startHeight | Long | True     | Initial height of interval                           |
| endHeight   | Long | True     | Interval cutoff height, cannot exceed startHeight+1000 |

Returns:

| field   | type    | Remark   |
| ------- | ------- | -------- |
| success | boolean | Successful or not |
| data    | array   | The seed array |

Example：

Request:

```
curl -X GET "http://127.0.0.1:8001/api/random/seeds/height?startHeight=500&endHeight=510" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": [
    "8486473738212806059384942122915964966516544811115122625378589706648696927875",
    "5763677830362183770819418466587054532227472729077319516033962399030101482330",
    "-21576822359476915572374120992682286995340746526938743512234391635989859550499",
    "21657748356022199241379814087980601843534504184851063250908405386419429001546",
    "-31320197741848993348465901825403870475226356831977749494101003161293910010564",
    "16054257794265746474880657765642725318937086559191102027715411501558318980478",
    "39222628335763902261547055653161137231901517785016195993008289217415793052023",
    "28759812140738813907858073405869390691919557824743093132519210315994120629868",
    "26779511442264535228335930919961858598639368721086477781863239801135250744386",
    "-23481782415506504277094909296039579696138464413290902597168011374639343982630"
  ]
}
```

### Get random seed list according to height interval

URL：/random/seeds/count

Method：GET

Prams:

| parameter | type | Required | remark                    |
| --------- | ---- | -------- | ------------------------- |
| height    | Long | True     | Gets the maximum height of the seed list    |
| count     | Long | True     | Random seed count, no more than 128 |

Returns:

| field   | type    | Remark   |
| ------- | ------- | -------- |
| success | boolean | Successful or not |
| data    | array   | The seed array |

Example：

Request:

```
curl -X GET "http://127.0.0.1:8001/api/random/seeds/count?height=500&count=10" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": [
    "8486473738212806059384942122915964966516544811115122625378589706648696927875",
    "5763677830362183770819418466587054532227472729077319516033962399030101482330",
    "-21576822359476915572374120992682286995340746526938743512234391635989859550499",
    "21657748356022199241379814087980601843534504184851063250908405386419429001546",
    "-31320197741848993348465901825403870475226356831977749494101003161293910010564",
    "16054257794265746474880657765642725318937086559191102027715411501558318980478",
    "39222628335763902261547055653161137231901517785016195993008289217415793052023",
    "28759812140738813907858073405869390691919557824743093132519210315994120629868",
    "26779511442264535228335930919961858598639368721086477781863239801135250744386",
    "-23481782415506504277094909296039579696138464413290902597168011374639343982630"
  ]
}
```

### According to the algorithm, the list of random seeds obtained through height interval is calculated as a random seed, and the following is returned

URL：/random/seed/height

Method：GET

Prams:

| parameter   | type   | Required | remark                                       |
| ----------- | ------ | -------- | -------------------------------------------- |
| startHeight | Long   | True     | Initial height of interval                                 |
| endHeight   | Long   | True     | Interval cut-off height,endHeight-startHeight<=1000    |
| algorithm   | String | false    | The default is sha3 algorithm, supporting sha3, KECCAK, merkle algorithm |

Returns:

| field     | type    | Remark             |
| --------- | ------- | ------------------ |
| success   | boolean | Successful or not           |
| data      | Object  | The result object           |
| seed      | String  | Calculate the random seed result |
| algorithm | String  | Computational algorithm        |
| count     | int     | Number of original random seeds   |

Example：

Request:

```
curl -X GET "http://192.168.1.123:8001/api/random/seed/height?startHeight=600&endHeight=610&algorithm=sha3" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": {
    "seed": "49349273589710891971526183625401126395677304794754035539210022261211357904457",
    "algorithm": "sha3",
    "count": 10
  }
}
```

### According to the algorithm, the list of random seeds obtained by height and quantity is calculated as a random seed, and the following is returned

URL：/random/seed/count

Method：GET

Prams:

| parameter | type   | Required | remark                                       |
| --------- | ------ | -------- | -------------------------------------------- |
| height    | Long   | True     | Gets the maximum height of the seed list                       |
| count     | Long   | True     | Random seed count, no more than 128                   |
| algorithm | String | false    | The default is sha3 algorithm, supporting sha3, KECCAK, merkle algorithm |

Returns:

| field     | type    | Remark             |
| --------- | ------- | ------------------ |
| success   | boolean | Successful or not           |
| data      | Object  | The result object           |
| seed      | String  | Calculate the random seed result |
| algorithm | String  | Computational algorithm        |
| count     | int     | Number of original random seeds   |

Example：

Request:

```
curl -X GET "http://192.168.1.123:8001/api/random/seed/count?height=600&count=10&algorithm=merkle" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": {
    "seed": "49349273589710891971526183625401126395677304794754035539210022261211357904457",
    "algorithm": "merkle",
    "count": 10
  }
}
```

