# 8.1 接入协议

* MQTT，优先实现
* HTTP
* CoAP

## 8.1.1 MQTT

* 兼容3.1.1和3.1版本协议
* 支持 MQTT 的 PUBLISH、SUBSCRIBE、PING、PONG、CONNECT、DISCONNECT、UNSUBSCRIBE 等报文。
* 支持 cleanSession。
* 不支持 will、retain handlerMsg。
* 不支持 Qos2。

### 设备动态注册

连接使用的参数:

``` script
clientId={productKey}.{deviceKey}?authType=register
username={productKey}.{deviceKey}
password={productSecret}
```

产品定义的要开启动态注册，如果成功，云平台将在主题 `/sys/{productKey}/{deviceKey}/thing/registerAck   ` 下发以下数据 

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
| /sys/{productKey}/{deviceKey}/thing/registerAck    	            | 订阅 | 	云平台对设备下发登录密钥 |


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

## 8.1.2 Hui Link JSON 数据格式

### 属性上报

设备端上报属性到云平台

1. 设备向 Topic `/sys/{productKey}/{deviceKey}/thing/property/post` 发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "properties" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    },
  "ts": "1578551281345"
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| properties | Object | 是 | 上报服务器的属性数据 |
| ts | Long | 否| 设备发送数据的毫秒时间戳, 如果没有上报这个字段，将会以服务器时间代替 |

2. 云平台响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/property/postAck`  发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "code": 0,
   "message": "ok",
   "success": true
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 | 上报消息的 id |
| code | Integer | 是| 返回码 |
| message | String | 是| 返回消息 |
| success | Bool | 是| 操作是否完成，非业务完成逻辑 |

### 属性设置

设置设备属性

1. 调用云平台接口 [POST /api/things/devices/properties](http://lark.test.pivaiot.com/api/doc.html#/%E5%85%A8%E9%83%A8%E6%8E%A5%E5%8F%A3/%E7%89%A9%E6%A8%A1%E5%9E%8B%E7%AE%A1%E7%90%86/updateDevicePropertiesUsingPOST) 或者 [POST /api/messages/publish](http://lark.test.pivaiot.com/api/doc.html#/%E5%85%A8%E9%83%A8%E6%8E%A5%E5%8F%A3/%E6%B6%88%E6%81%AF%E9%80%9A%E4%BF%A1/publishMqttMessageUsingPOST)
2. 云平台向 Topic `/sys/{productKey}/{deviceKey}/thing/property/set` 发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "properties" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1) |
| properties | Object | 是 | 属性数据 |

3. 设备响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/property/setAck`  发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "code": 0,
   "message": "ok",
   "success": true
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 | 上报消息的 id |
| code | Integer | 是| 返回码 |
| message | String | 是| 返回消息 |
| success | Bool | 是| 操作是否完成，非业务完成逻辑 |

### 调用设备命令

通过云平台接口调用设备命令

1. 访问云平台调用设备命令接口

2. 云平台接口向 Topic `/sys/{productKey}/{deviceKey}/thing/command` 发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "identifier" : "cmd1", 
   "inputParams" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| identifier | String | 是 | 命令的标识符 |
| inputParams | Object | 否| 命令的输入参数 |

2. 设备执行命令并响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/commandAck`  发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "identifier" : "cmd1", 
   "outParams" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| identifier | String | 是 | 命令的标识符 |
| outParams | Object | 否| 命令的返回输出参数 |

### 上报事件

1. 设备向 Topic `/sys/{productKey}/{deviceKey}/thing/event/post` 发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "identifier" : "event1", 
   "outParams" : {   
        "temperature" : 24.1,
        "usedTime": 50.5
    }
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 |  消息 id, 取值范围 0~(2^31-1), 如果没有消息 id，服务器也不会回复消息 id |
| identifier | String | 是 | 事件的标识符 |
| outParams | Object | 否 | 事件的输出参数 |

2. 云端响应，并向 Topic `/sys/{productKey}/{deviceKey}/thing/event/postAck`  发送一条消息，消息格式为:

```json
{
   "messageId" : "101",  
   "code": 0,
   "message": "ok",
   "success": true
}
```

|  字段 |  类型 | 是否必须 |  说明  |
|---|---|---|---|
| messageId | Integer | 否 | 上报消息的 id |
| code | Integer | 是| 返回码 |
| message | String | 是| 返回消息 |
| success | Bool | 是| 操作是否完成，非业务完成逻辑 |
