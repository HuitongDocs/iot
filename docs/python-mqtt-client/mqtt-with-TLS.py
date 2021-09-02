import paho.mqtt.client as mqtt
import logging
import argparse
import json
import socket
import time
import ssl

connected = False

# read config
parser = argparse.ArgumentParser()
parser.add_argument('-c', '--config', help='配置文件路径',
                    type=str, default='config.json')
args = parser.parse_args()

config = None
with open(args.config, 'r') as f:
    config = json.load(f, encoding='utf-8')
    logging.info(config)

if config is None:
    logging.info("No config content found")
    exit(1)

# Parsing ip
ip_list = []
ais = socket.getaddrinfo(config['mqtt']['Broker_Address'], 0, 0, 0, 0,)
for result in ais:
    ip_list.append(result[-1][0])
    ip_list = list(set(ip_list))
    host = ''.join(ip_list)
    print("连接的 larkea 是", config['mqtt']['Broker_Address'])
    print("larkea 的 ip 地址是", host)
    print("连接的端口号是", config['mqtt']['port'])


def on_connect(client, userdata, flags, rc):
    print("link successful")
    print("connect ok: %s" % rc)
    if rc != 0:
        print("connect failed with code: %s" % rc)
        return


def on_disconnect(client, userdata, rc):
    print("try to disconnect")


def on_message(client, userdata, message):
    print("Received message '" + str(message.payload) + "' on topic '"
          + message.topic + "' with QoS " + str(message.qos))


def send_message():
    while True:
        mqttc.publish("/sys/%s/%s/thing/property/post" % (config['devices']['pk'], config['devices']['dk']), json.dumps(config['data']))
        print(json.dumps(config['data']))
        time.sleep(10)


if __name__ == '__main__':

    # Connect to mqtt broker
    mqttc = mqtt.Client(client_id="%s.%s" % (config['devices']['pk'], config['devices']['dk']))
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    context.check_hostname = False
    mqttc.tls_set_context(context)
    mqttc.on_connect = on_connect
    mqttc.on_disconnect = on_disconnect
    mqttc.username_pw_set(username="%s.%s" % (config['devices']['pk'], config['devices']['dk']),
                          password=config['devices']['password'])
    mqttc.connect(host=host, port=config['mqtt']['port'], keepalive=config['mqtt']['keepalive'])
    send_message()
    mqttc.loop_forever()
