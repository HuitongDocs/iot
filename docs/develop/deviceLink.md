# 9.2 设备连接

## 基于 MQTT-TCP 协议建立连接

MQTT协议（Message Queuing Telemetry Transport），叫做遥信消息队列传输。MQTT 是一个基于 TCP 的发布订阅协议，对于有限的内存设备和网络带宽很低的网络不可靠的通信 MQTT 是比较理想的选择，非常适合物联网通信。

## MQTT连接注意事项

- 支持最高协议版本 MQTT3.1，不支持 MQTT5.0；
- 不支持 will、retain 消息；
- 不支持 QoS2；
- 支持 clean session；
- 支持基于 TCP 创建连接；
- 同一注册凭证（`ProductKey`，`DeviceKey`，`DeviceSecret`）同时只能有一个设备在线，其它会被踢下线；
- 支持 TLSV1.2 版本的协议来建立安全连接，安全级别高；
- MQTT client 不能跨 Topic 订阅或发布消息，只能在自己的所属 Topic 上订阅或发布消息；

## 具体流程：

MQTT-TCP 连接需要先了解[设备注册](/develop/deviceRegistration.html)中提到的静态注册和动态注册，获取 `ClientID`，`UserName`，`Password`。

1. MQTT-TCP 如需使用 TLS 加密传输，需要[下载CA证书](/certificate)；

2. MQTT连接
   
   
   
   |      **参数**       |               **详解**          |
   | :---------------: | :----------------------: |
   |                连接域名                 | mqtt-cn-bj1.iot.larkea.com（公有云），私有云请联系慧通公司定制 |
   |                 端口号                  |                   1883` 或 `8883(使用 TLS)                   |
   | 可变报头（variable header）：Keep Alive | Connect指令中需包含 Keep Alive（保活时间）。<br/>取值范围为30至1200秒。如取值不在此区间，平台拒绝连接。建议取值300秒以上，如网络不稳定，设置高一些。<br/>**当出现连接出错时，需要仔细检查该参数。** |
   |        MQTT 的 Connect 报文参数         | 参考[设备注册](/develop/deviceRegistration.html)，以静态注册为例：<br/>Client ID：{ProductKey}.{DeviceKey}<br/>User Name：{ProductKey}.{DeviceKey}<br/>Password：{DeviceSecret} |
   
3. 连接成功后需要定期发送心跳包保活，设备端在保活时间间隔内，至少需要发送一次报文（心跳包或数据包），如果物联网平台在该间隔内无法收到任何报文，物联网平台会断开连接，设备端需要进行重连。

### 消息上行及下行

设备连接成功后即可订阅或发布消息，物联网平台支持

* 具体请参考[接入协议](/protocol/protocol.html)，可以自定义 Topic
* 也可基于[物模型](/develop/ObjectModel.html)进行开发，使用系统 Topic