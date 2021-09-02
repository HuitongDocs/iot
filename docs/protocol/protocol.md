# 接入协议

云雀物联网平台——现代商业物联网云端操作系统

## 接入协议

* MQTT，优先实现
* HTTP
* CoAP

## MQTT

* 支持 MQTT 3.1/3.1.1，使用 MQTT 3.1 时， clientId 的长度不能大于 23 个字符
* 支持 MQTT 的 PUBLISH、SUBSCRIBE、PING、PONG、CONNECT、DISCONNECT、UNSUBSCRIBE 等报文
* 支持 cleanSession 且每次连接都会清空会话，即 cleanSession 始终为 true
* 不支持 will、retain message
* 支持 Qos 0/1，不支持 Qos2
* 消息的 Qos 设置以 publish 为准，不支持客户端 subscribe 设置的 Qos
* KeepAlive 时间可设置为 30-1200s, 推荐为 200s

### 设备动态注册

连接使用的参数:

```shell script
clientId={productKey}.{deviceKey}
username={productKey}.{deviceKey}?authMode=DYNAMIC
password={productSecret}
```

产品要开启动态注册，如果成功，云平台将在主题 `/sys/{productKey}/{deviceKey}/ext/passwordAck   ` 下发以下数据 

```json
{
    "productKey" : "xxx",
    "deviceKey" : "xxx",
    "deviceSecret" : "xxx"
}
```

设备在获得密钥后，断开mqtt连接，再使用密钥重新连接

### 设备身份认证

连接使用的参数:

```text
clientId={productKey}.{deviceKey}
username={productKey}.{deviceKey}
password={deviceSecret}
```

### 使用的主题

|  主题 |  权限 |  说明  |
|---|---|---|
| /sys/{productKey}/{deviceKey}/thing/model/get	                    | 发布 | 	请求获取物模型定义 JSON 描述 |
| /sys/{productKey}/{deviceKey}/thing/model/getAck   	            | 订阅 | 	返回物模型定义 JSON 描述 |
| /sys/{productKey}/{deviceKey}/thing/property/post	                | 发布 | 	上报属性 |
| /sys/{productKey}/{deviceKey}/thing/property/postAck   	        | 订阅 | 	云平台对设备属性的响应 |
| /sys/{productKey}/{deviceKey}/thing/property/post/history	        | 发布 | 	单个上报历史属性(断网缓存数据) |
| /sys/{productKey}/{deviceKey}/thing/property/post/history/batch	| 发布 | 	批量上报历史属性(断网缓存数据) |
| /sys/{productKey}/{deviceKey}/thing/property/set	                | 订阅 | 	云平台设置属性 |
| /sys/{productKey}/{deviceKey}/thing/property/setAck   	        | 发布 | 	设备端对设置属性的响应 |
| /sys/{productKey}/{deviceKey}/thing/property/reset                | 发布 | 	请求重置属性 |
| /sys/{productKey}/{deviceKey}/thing/property/resetAck    	        | 订阅 | 	云平台返回需要重置的属性值 |
| /sys/{productKey}/{deviceKey}/thing/property/desired/get	        | 发布 | 	获取期望属性 |
| /sys/{productKey}/{deviceKey}/thing/property/desired/getAck   	| 订阅 | 	云平台返回期望属性 |
| /sys/{productKey}/{deviceKey}/thing/property/desired/delete	    | 发布 | 	删除期望属性 |
| /sys/{productKey}/{deviceKey}/thing/property/desired/deleteAck   	| 订阅 | 	云平台返回删除结果 |
| /sys/{productKey}/{deviceKey}/thing/event/post	                | 发布 | 	上报事件 |
| /sys/{productKey}/{deviceKey}/thing/event/postAck   	            | 订阅 | 	云平台对上报事件的响应 |
| /sys/{productKey}/{deviceKey}/thing/command/call	                | 订阅 | 	云平台下发命令 |
| /sys/{productKey}/{deviceKey}/thing/command/callAck    	        | 发布 | 	设备端对云平台下发命令的响应 |
| /sys/{productKey}/{deviceKey}/ext/rtc                             | 发布 | 	请求同步时间 |
| /sys/{productKey}/{deviceKey}/ext/rtcAck           	            | 订阅 | 	云平台对设备下发时间 |
| /sys/{productKey}/{deviceKey}/ext/password    	                | 发布 | 	请求下发登录密钥 |
| /sys/{productKey}/{deviceKey}/ext/passwordAck      	            | 订阅 | 	云平台对设备下发登录密钥 |


### 子设备接入涉及的主题
|  主题 |  权限 |  说明  |
|---|---|---|
| /sys/{productKey}/{deviceKey}/subdev/login	                    | 发布 | 	子设备登录 |
| /sys/{productKey}/{deviceKey}/subdev/loginAck	                    | 订阅 | 	子设备登录响应 |
| /sys/{productKey}/{deviceKey}/subdev/logout	                    | 发布 | 	子设备登出 |
| /sys/{productKey}/{deviceKey}/subdev/logoutAck	                | 订阅 | 	子设备登出响应 |

### 设备影子

设备影子可以理解为是设备在云端的属性缓存。设备上报其属性值到设备影子中，应用服务可以通过设备影子直接获取设备的最后一次更新的属性值，而无需每次访问设备。

设备影子作用:

- 云端应用可以直接获取设备的属性而无需关心设备是否在线；
- 云端应用可以随时下发控制指令给设备，而无需关心设备是否在线。当设备在线时，平台会将设置值推送给设备；如果设备不在线，设备上线的第一时间从云端主动获取设置的属性值。

设备影子的格式:

```json
{
    "state": {
        "reported": {
            "humidity": 56.1,
            "temperature": 27.0
        },
        "desired": {
            "humidity": 70.0
        }
    },
    "metadata": {
        "reported": {
            "humidity": {
                "ts": 1558222636000
            },
            "temperature": {
                "ts": 1558222636000
            }
        },
        "desired": {
            "humidity": {
                "ts": 1558222636000
            }
        }
    },
    "ts": 1558222636000,
    "version": 15
}
```

设备影子的组成：

- state 设备的属性值
    - reported 记录设备上报的属性值。具体包含哪些值，由设备自行决定。如果设备不上报，则 reported 部分为空。
    - desired 云端应用设置设备期望值。
- metadata 元数据中包含的属性字段和 state 中是一致的，记录的是各个属性更新的时间。
    - ts 属性的更新时间，为 Unix 毫秒时间戳。
- ts 设备影子最新更新的时间。
- version 设备影子的版本号，设备影子的更新需要遵循一定的规则

## 慧通标准数据格式

### 属性上报

设备端上报属性到云平台

1. 设备向 Topic `/sys/{productKey}/{deviceKey}/thing/property/post` 发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "properties" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    },
  "ts": "1578551281345"
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| properties | Object | 是 | 上报服务器的属性数据 |
| ts | Long | 否| 设备发送数据的毫秒时间戳, 如果没有上报这个字段，将会以服务器时间代替 |

2. 云平台响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/property/postAck`  发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "code": 0,
   "message": "ok",
   "success": true
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 | 上报消息的 id |
| code | Integer | 是| 返回码 |
| message | String | 是| 返回消息 |
| success | Bool | 是| 操作是否完成，非业务完成逻辑 |


3. 若设备支持断网存储，则在断网后缓存数据，当网络恢复后上报历史数据

注：威纶通网关的断网缓存数据依旧使用原主题，非数组方式进行上报

3.1 设备向 Topic `/sys/{productKey}/{deviceKey}/thing/property/post/history` 发送消息，消息格式为:

```json

{
"properties" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    },
"ts": "1578551281345"
}
``` 

3.2 设备向 Topic `/sys/{productKey}/{deviceKey}/thing/property/post/history/batch` 批量发送一条或若干条消息，消息格式为:

```json
[
    {
    "properties" : {   
            "temperature" : 24.1,
            "usedTime": 50.5
        },
    "ts": "1578551281345"
    },
    {
    "properties" : {   
            "temperature" : 24.1,
            "usedTime": 50.5
        },
    "ts": "1578551281346"
    }
]
``` 
平台收到历史数据后，不进行Ack回复


### 属性设置

设置设备属性

1. 调用云平台接口 [POST /api/things/devices/properties](http://lark.test.pivaiot.com/api/doc.html#/%E5%85%A8%E9%83%A8%E6%8E%A5%E5%8F%A3/%E7%89%A9%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/updateDevicePropertiesUsingPOST) 或者 [POST /api/messages/publish](http://lark.test.pivaiot.com/api/doc.html#/%E5%85%A8%E9%83%A8%E6%8E%A5%E5%8F%A3/%E6%B6%88%E6%81%AF%E9%80%9A%E4%BF%A1/publishMqttMessageUsingPOST)
2. 云平台向 Topic `/sys/{productKey}/{deviceKey}/thing/property/set` 发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "properties" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1) |
| properties | Object | 是 | 属性数据 |

3. 设备响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/property/setAck`  发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "code": 0,
   "message": "ok",
   "success": true
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 | 上报消息的 id |
| code | Integer | 是| 返回码 |
| message | String | 是| 返回消息 |
| success | Bool | 是| 操作是否完成，非业务完成逻辑 |

### 调用设备命令

通过云平台接口调用设备命令

1. 访问云平台调用设备命令接口

2. 云平台接口向 Topic `/sys/{productKey}/{deviceKey}/thing/command` 发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "identifier" : "cmd1", 
   "inputParams" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| identifier | String | 是 | 命令的标识符 |
| inputParams | Object | 否| 命令的输入参数 |

2. 设备执行命令并响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/commandAck`  发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "identifier" : "cmd1", 
   "outParams" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| identifier | String | 是 | 命令的标识符 |
| outParams | Object | 否| 命令的返回输出参数 |

### 上报事件

1. 设备向 Topic `/sys/{productKey}/{deviceKey}/thing/event/post` 发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "identifier" : "event1", 
   "outParams" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| identifier | String | 是 | 事件的标识符 |
| outParams | Object | 否 | 事件的输出参数 |

2. 云端响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/event/postAck`  发送一条消息，消息格式为:

```json
{
   "msgId" : "101",  
   "code": 0,
   "message": "ok",
   "success": true
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| msgId | Integer | 否 | 上报消息的 id |
| code | Integer | 是| 返回码 |
| message | String | 是| 返回消息 |
| success | Bool | 是| 操作是否完成，非业务完成逻辑 |

## 设备上传文件

设备上传文件是给设备端提供的一个通过 HTTP 上传较大文件的通道，因为 MQTT 对消息大小(不能超过 8KB)有一定的限制，所以可以使用该通道上传文件，比如视频文件、历史消息数据、离线数据等。

### 上传文件流程

1. 获取上传文件目标 URL
2. 设备根据返回的 URL 上传文件

### 接口说明

接口地址

```
GET /api/devices/files/url
```

请求参数

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| deviceKey | String | 是 | 设备标识 |
| fileName | String | 是| 文件名 |
| productKey | String | 是| 产品标识 |
| sign | String | 是| hmac-sha256 签名 |

签名算法

[Python实现参考](https://git.huitong-tech.com/nest/lark/snippets/3)

1. 按照字典序构造被签名的字符串

signData=deviceKey=5qyiB3heq5&fileName=gost-linux-amd64-2.11.1.gz&productKey=40LEdDkkoS

2. 使用设备的密钥作为 hmac-sha256 的 key，例如 deviceSecret 为 rTZit6WdZU8AWxOtUkwK, hmac-sha256 函数为 hmacSha256(key, signData)

sign = hmacSha256('rTZit6WdZU8AWxOtUkwK', signData)

3. 示例中的数据通过计算可以得到签名

sign = '48d6466ba97852bdaef806703b6fce5f305a96e4d83d85528b944d08ac3ca447'


响应参数

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| url | String | 是 | 上传链接，有效期为2分钟，过期需要重新获取 |


请求示例

```
curl 'https://larkea.staging.pivaiot.com/api/devices/files/url?deviceKey=5qyiB3heq5&fileName=gost-linux-amd64-2.11.1.gz&productKey=40LEdDkkoS&sign=48d6466ba97852bdaef806703b6fce5f305a96e4d83d85528b944d08ac3ca447' \
  -H 'Content-Type: application/x-www-form-urlencoded'
```

响应示例
```
{
  "success": true,
  "code": 1,
  "message": "Success",
  "data": {
    "url": "http://192.168.53.206:9000/iot-device-files/40LEdDkkoS/5qyiB3heq5/gost-linux-amd64-2.11.1.gz?response-content-type=application%2Fjson&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20210624%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210624T103753Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&X-Amz-Signature=7993c9fdaef5b89394a8ae9c2e48216a0de8736ba9d859fb5d6d14461ba9719e"
  }
}
```

## 数据桥接服务

数据桥接服务为 IoT 平台和自定义开发的服务之间提供标准的数据交互通道，方便自定义业务的开发，目前支持的协议为：

* MQTT
* MQTT over WebSocket

MQTT 数据桥接服务是一个标准的 MQTT Broker，租户使用密钥连接 MQTT 桥接服务之后，可以订阅租户的所有设备发送消息和控制设备的消息

### 连接流程

* clientId 始终为 reserved，并且需要必要的数据校验字段作为参数：nonce，timestamp，例如 reserved?nonce=456&timestamp=1625845512921
* userName 为 accessKey，如果没有 accessKey，请在后台添加，每个账户最多可以添加 5 个密钥
* password 为签名 sign

签名算法：

[Python实现参考](https://git.huitong-tech.com/nest/lark/snippets/4)

1. 按照字典序构造被签名的字符串

signData=accessKey=5qyiB3heq5&nonce=456&timestamp=1625845512921

2. 使用密钥 accessSecret 作为 hmac-sha256 的 key，例如 accessSecret 为 rTZit6WdZU8AWxOtUkwK, hmac-sha256 函数为 hmacSha256(key, signData)

sign = hmacSha256('rTZit6WdZU8AWxOtUkwK', signData)

3. 示例中的数据通过计算可以得到签名

sign = '4d67766c3043d79c68910db80c3152e3d875f83a118d3fa3b63779339a9289b1'
