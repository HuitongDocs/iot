## python-mqtt-client

用 python 模拟 mqtt 客户端，与指定的 larkea 连接，并推送数据到 larkea

* config.json 是配置文件，可配置 larkea 的地址，端口号，连接的设备证书以及推送的数据

* "mqtt" 是 larkea 的地址，端口号和保活时间

* "devices" 是设备的 ProductKey，DeviceKey 和 DeviceSecret

* "data" 是想要推送到 larkea 的数据，这里是温度（需要提前到 larkea 定义功能）

注：mqtt.py 是不加密，需用 1883 端口，mqtt-with-TLS.py 是加密，需用 8883 端口
 