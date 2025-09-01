# Upgrade module design document


## I. Overall description

### 1.1 Module Overview

#### 1.1.1 Why should I have the "Protocol Upgrade" module?

	Different protocol versions support different transaction types and message types. In order to manage the version of the blockchain network, it is necessary to provide complete version management functions.

#### 1.1.2 What to do in the "Agreement Upgrade"

- Parse the version information in the block header for dynamic statistics, upgrade, and rollback
- Provide transaction support types, message types, and version information query services for other modules

#### 1.1.3 Positioning of the "Protocol Upgrade" in the system

Protocol upgrade is one of the underlying modules. The following sub-functions discuss module dependencies.

rely

* Block Management Module - Initialize Local Protocol Version Information

Be dependent

* All modules that care about message processing and transaction processing

### 1.2 Architecture

	Supplementary picture

## II, functional design

### 2.1 Functional Architecture

	Supplementary picture

### 2.2 Module Service

#### 2.2.1 Obtaining the current main network version information

* Interface Description

  According to the chain id query db to get the main network version information

* Request example

    ```
    {
      "cmd": "currentMainnetVersion",
      "minVersion":"1.1",
      "params": ["888"]
    }
    ```

* Request parameter description

| index | parameter | required | type    | description |
| ----- | --------- | -------- | ------- | :---------: |
| 0 | chainId | true | Long | Chain ID |

* Return example

    Failed

    ```
    {
        "version": 1.2,
        "code": 1,
        "msg": "error message",
        "result": {}
    }
    ```

    Success

    ```
    {
        "version": 1.2,
        "code": 0,
        "result": {
            "chainId": "888",
            "versionInfo": {
                "major": "1",
                "minor": "1",
                "percent": "80", / / fixed value
                "slice": "100", / / fixed value
                "waitCount": "240"//fixed value
            }
        }
    }
    ```

* Return field description
  
| parameter | type      | description                                |
| --------- | --------- | ------------------------------------------ |
| chainId | Integer | Chain ID |
Major | Integer | Major version number |
| minor | Integer | Minor version number|
| percent | Integer | Effective Ratio |
| slice | Integer | Minimum statistical fragment length |
| waitCount | Integer | Continuous Confirmation Times |

#### 2.2.2 Obtaining Current Local Version Information

* Interface Description

  According to the chain id query db to get local version information

* Request example

    ```
    {
      "cmd": "currentLocalVersion",
      "minVersion":"1.1",
      "params": ["888"]
    }
    ```

* Request parameter description

| index | parameter | required | type    | description |
| ----- | --------- | -------- | ------- | :---------: |
| 0 | chainId | true | Long | Chain ID |

* Return example 

    Failed

      ```
      {
          "version": 1.2,
          "code":1,
          "msg" :"xxxxxxxxxxxxxxxxxx",
          "result":{}
      }
      ```

    Success

    ```
    {
        "version": 1.2,
        "code": 0,
        "result": {
            "chainId": "888",
            "versionInfo": {
                "major": "1",
                "minor": "1",
                "percent": "80",
                "slice": "100",
                "waitCount": "240"
            }
        }
    }
    ```

* Return field description

    Reference 2.2.1

    #### 2.2.3 Get version statistics based on block height

    - Interface Description

      According to the chain id query db to get local version information

    - Request example

      ```
      {
        "cmd": "statisticsInfo",
        "minVersion":"1.1",
        "params": ["888", "888"]
      }
      ```

    - Request parameter description

    | index | parameter | required | type | description |
    | ----- | --------- | -------- | ---- | :---------: |
    | 0 | chainId | true | Long | Chain ID |
    | 1 | height | true | Long | Block Height |

    - Return to example 

      Failed

      ```
        {
            "version": 1.2,
            "code":1,
            "msg" :"xxxxxxxxxxxxxxxxxx",
            "result":{}
        }
      ```

      Success

      ```
      {
          "version": 1.2,
          "code": 0,
          "result": {
              "chainId": "888",
              "statisticsInfo": {
                  "major": "1",
                  "minor": "1",
                  "percent": "80",
                  "slice": "100",
                  "count": "240"
              }
          }
      }
      ```

    - Return field description

      Reference 2.2.1

### 2.3 Module internal function

#### 2.3.1 Module startup

* Function Description:

  Startup protocol upgrade module

* Process description

  Supplementary picture

  1.rpc service initialization

  2. Initialize the general database

  3. Load configuration information

  4. Initialize each chain database

  5. Wait for the dependency module to be ready
* Dependent service

  Tool module, kernel module

#### 2.3.2 Version Upgrade

* Function Description:

    Each time a block is saved or a block is rolled back, the version number in the block header is read, and the version ratio information is dynamically counted to determine whether to perform protocol upgrade.The major version number does not allow cross-version upgrades, and the minor version number allows cross-version upgrades

* Process description

    Each 100 blocks is a statistical interval, and the distribution ratio of the version number in the head of the block is counted and saved to the database (key=height, value=version information, consecutive confirmation times, etc.)

    - When the version ratio is greater than a certain threshold (must be greater than 50%), the version number in the statistical interval can be determined. When the maximum version number in consecutive 260 statistical intervals remains continuous, the main network performs protocol upgrade.

    - If no version number is greater than the threshold, the current effective version number is used as the version number of the current interval.

    - If there is a statistical interval version number fluctuation in the middle, restart statistics

    Simulate several scenarios:

    waitCount (continuous confirmation times)

    1. ##### Normal upgrade (no fluctuations in midway statistics)

       The starting block height is 1000, the protocol version number = 1.0

       Block statistics in the height range of 1001-1100, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       Block statistics in the height range of 1101-1200, accounting for 80% of the block protocol version number = 1.1, waitCount=2

       。

       。

       。

       Block statistics in the height range of 27001-27100, accounting for 80% of the block protocol version number = 1.1, waitCount=260

       The new agreement will take effect from Block 27101

    2. ##### Normal upgrade (there is fluctuation in the middle of the statistics)

       The starting block height is 1000, the protocol version number = 1.0

       Block statistics in the height range of 1001-1100, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       Block statistics in the height range of 1101-1200, accounting for 80% of the block protocol version number = 1.1, waitCount=2

       Block statistics in the height range of 1201-1300, accounting for 80% of the block protocol version number = 1.0, waitCount=0

       Block statistics in the height range of 1301-1400, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       。

       。

       。

       Block statistics in the height range of 27301-27400, accounting for 80% of the block protocol version number = 1.1, waitCount=260

       The new agreement will take effect from the 27401 block

    3. ##### Abnormal upgrade (first rollback, no fluctuations in the middle of the statistics)

       Main chain

       The starting block height is 1000, the protocol version number = 1.0

       Block statistics in the height range of 1001-1100, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       Block statistics in the height range of 1101-1200, accounting for 80% of the block protocol version number = 1.1, waitCount=2

       。

       。

       。

       Block statistics in the height range of 27001-27100, accounting for 80% of the block protocol version number = 1.1, waitCount=260

       The new agreement will take effect from Block 27101

       Bifurcation chain

       The starting block height is 1000, the protocol version number is 1.0, and the fork height is 1211.

       Block statistics in the height range of 1001-1100, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       Block statistics in the height range of 1101-1200, accounting for 80% of the block protocol version number = 1.1, waitCount=2

       Block statistics in the height range of 1201-1300, accounting for 80% of the block protocol version number = 1.0, waitCount=0

       Block statistics in the height range of 1301-1400, accounting for 80% of the block protocol version number = 1.0, waitCount=0

       Bifurcation chain switching first step

       	Roll back to the fork point

       	Block statistics in the height range of 1001-1100, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       	Block statistics in the height range of 1101-1200, accounting for 80% of the block protocol version number = 1.1, waitCount=2

       	Block statistics in the height range of 1201-1211, the number of blocks is less than 100, not counting

       	Add a new block

       	Block statistics in the height range of 1001-1100, accounting for 80% of the block protocol version number = 1.1, waitCount=1

       	Block statistics in the height range of 1101-1200, accounting for 80% of the block protocol version number = 1.1, waitCount=2

       	Block statistics in the height range of 1201-1300, accounting for 80% of the block protocol version number = 1.1, waitCount=3

       	。

       	。

       	。

       	Block statistics in the height range of 27001-27100, accounting for 80% of the block protocol version number = 1.1, waitCount=260

       	The new agreement will take effect from Block 27101

    4. ##### Abnormal upgrade (first rollback, fluctuations in the middle of the statistics)

       Similar to the third case

* Dependent service

  Database tool for tool modules

#### 2.3.3 Delayed upgrade

- Function Description:

  In order to deal with the bug that the new protocol was found during the upgrade process.

- Process description

  	Assume that the current version number is 1.0, and the version number to be upgraded is 1.1, but a bug was found during the 1.1 version upgrade.

  	The protocol upgrade process is reset by lowering the proportion of the new protocol 1.1, so that the main network version is kept in the old version 1.0, and after the new protocol 1.1 bug is fixed, the upgrade process is restarted.

- Dependent service

  Database tool for tool modules

#### 2.3.4 Version Information Push

- Function Description:

  When the last block of each statistical interval is received, the protocol version information currently validated by each module is actively notified, mainly to notify the transaction management module of the valid transaction type and a valid transaction validator, and notify the network module of valid message types and messages. processor.

- Process description

  

- Dependent service

  Database tool for tool modules

## III. Description of the event

### 3.1 Published events

#### 3.1.1 Protocol Upgrade

Description: The protocol version is upgraded and the event is released.

 event_topic : "versionUpadte",

```
data:{
    chainId
    major
    minor
    height
}
```

### 3.2 Subscribe to events

	slightly

## IV. Agreement

### 4.1 Network Communication Protocol

	slightly

### 4.2 Message Protocol

	slightly

## 五, module configuration

```
[
  {
    "name": "supportTxTypes",
    "remark": "Supported transaction types",
    "readOnly": "true",
    "value": "1,2,3,4,5"
  },
  {
    "name": "supportMessageTypes",
    "remark": "Supported message types",
    "readOnly": "true",
    "value": "1,2,3,4,5"
  }
]
```

## Six, Java-specific design

- BlockHeader object added field
> | `field name` | `field type` | `description` |
> | ------------------- | ---------- | ---------- |
> | blockMajor | byte | Block major version number |
> | blockMinor | byte | Block minor version number |
> | mainnetMajor | byte | main network version number |
> | mainnetMinor | byte | main network version number |

- BlockChainVersion object design
> | `field name` | `field type` | `description` |
> | ------------------- | ---------- | ---------- |
> | major | byte | major version number |
> | minor | byte | minor version number|

## VII, supplementary content

1. Is the message of different protocol versions processed by the network module or by the registration module of each message?
2. Is the transaction of different protocol versions handled by the transaction module or by the registration module of each transaction?
3. Is the message type, transaction type, transaction processor supported by the protocol initialized by the configuration file, or is it registered by each module?
4. Is the version allowed to roll back? It is not allowed to roll back from version 1.1 to 1.0-------------------
5. Does not support pow
