# 9.1 设备注册

设备注册是指设备第一次接入网络完成设备的激活。设备激活是一个设备根据其唯一的设备凭证（`ProductKey`，`DeviceKey`，`DeviceSecret`）完成设备连接到平台的认证过程。

设备注册有两种方式：

* 静态注册（一机一密）：每台设备都有其唯一的凭证（`ProductKey`，`DeviceKey`，`DeviceSecret`）;
* 动态注册（一型一密）：设备使用产品的公共凭证（`ProductKey`，`DeviceKey`）首次连接实现预认证，连接成功后平台对设备上报的设备序列号进行认证，认证通过后下发设备密码给设备，设备再通过设备密码完成注册，具体参考[接入协议](/protocol/protocol.html);

## 静态注册

静态注册也叫做一机一密，用户通过物联网平台操作界面，预先生成设备凭证（`ProductKey`，`DeviceKey`，`DeviceSecret`）。 当设备被首次使用时，通过预置的凭证接入物联网平台，完成激活认证。

### 操作步骤：

1. 参考[平台注册](/login/register.html)、[用户登录](/login/login.html)、[产品管理](/product/create.html)、[设备管理](/device/deviceManage.html)，创建可供连接的设备。

2. 参考[设备详情](/device/deviceDetail.html)，获取 ProductKey、DeviceKey、DeviceSecret：

   ```
   ProductKey：2kPSyDNQWuwdE4aRl1bSzv
   DeviceKey：7FGs4DpttRXJNbWHCQ5W5P
   DeviceSecret：EtSeNkW3nzF8AjqU2yPA
   ```
   
3. 设备注册的核心是生成 MQTT Broker 认证需要的三要素：`ClientID`，`UserName`，`Password`。

   * 获取到设备的注册凭证即是上文获取到的 ProductKey、DeviceKey、DeviceSecret；
   * 通过以下规则生成 MQTTBroker 认证的三要素；
   
   
    | **MQTT认证三要素** |                         **生成规则**                         |
    | :----------------: | :----------------------------------------------------------: |
    |     Client ID      | {ProductKey}.{DeviceKey}，例子：2kPSyDNQWuwdE4aRl1bSzv.7FGs4DpttRXJNbWHCQ5W5P |
    |     User Name      | {ProductKey}.{DeviceKey}，例子：2kPSyDNQWuwdE4aRl1bSzv.7FGs4DpttRXJNbWHCQ5W5P |
    |      Password      |          {DeviceSecret}，例子：EtSeNkW3nzF8AjqU2yPA          |

