# 9.6 返回码

可以通过返回的错误码来判断错误的原因

| 错误码 |              中文              |                          英文                           |
| :----: | :----------------------------: | :-----------------------------------------------------: |
| 100000 |          缺少必填参数          |              Missing required parameter(s)              |
| 100001 |          参数类型错误          |                 Wrong type of parameter                 |
| 100002 |          参数绑定失败          |                 Parameter binding error                 |
| 100003 |          参数校验错误          |               Parameter validation failed               |
| 100004 |           资源不存在           |                        Not found                        |
| 100005 |           消息不可读           |                 Message is not readable                 |
| 100006 |       不支持的 HTTP 方法       |                 Method is not supported                 |
| 100007 |        不支持的媒体类型        |               Media type is not supported               |
| 100008 |       不可接受的媒体类型       |              Media type is not acceptable               |
| 100009 |           请求被拒绝           |                   Request is rejected                   |
| 100010 |          访问令牌过期          |                 Access token is expired                 |
| 100011 |          刷新令牌过期          |                Refresh token is expired                 |
| 100012 |        不支持的授权类型        |               Grant type is not supported               |
| 100013 |            认证失败            |                  Authorization failed                   |
| 100014 |           消息不可写           |                 Message is not writable                 |
| 100015 |            请求超时            |                   Request is timeout                    |
| 100100 |           数据不存在           |                   Data is not existed                   |
| 100101 |           数据已存在           |                     Data is existed                     |
| 100102 |          创建数据失败          |                   Create data failed                    |
| 100103 |          更新数据失败          |                   Update data failed                    |
| 100104 |          删除数据失败          |                   Delete data failed                    |
| 100105 |          查询数据失败          |                    Query data failed                    |
| 120300 |            密钥错误            |                 access key login failed                 |
| 120301 |  密钥删除失败，需要停用后删除  |                delete access key failed                 |
| 120302 |        密钥达到数量上限        |     count of access key has reached the upper limit     |
| 120800 |       图像验证码验证失败       |                verify image code failed                 |
| 120801 |       短信验证码验证失败       |                verify email code failed                 |
| 120802 |         验证码验证失败         |                   verify code failed                    |
| 120900 |            注册失败            |                  user register failed                   |
| 120901 |      尝试注册次数达到上限      |              reached register retry times               |
| 120902 |       用户名或者密码错误       |                  password is not match                  |
| 120903 |      尝试登录次数达到上限      |                reached login retry times                |
| 120904 |           帐号不存在           |                     user not found                      |
| 120905 |           账号已停用           |                    user is disabled                     |
| 120908 |           邮箱已存在           |                      email existed                      |
| 120909 |          手机号已存在          |                     mobile existed                      |
| 120910 |         用户名格式错误         |               wrong format of login name                |
| 120911 |          密码更新失败          |                 update password failed                  |
| 120912 |       邮箱或者手机号为空       |                  empty email or mobile                  |
| 120913 |           密码不匹配           |                  password is not match                  |
| 120914 |           帐号已存在           |                      user existed                       |
| 121002 |          微信认证失败          |               wechat authorization failed               |
| 121003 |        缺少微信绑定令牌        |                wechat bind token missed                 |
| 121004 |   无手机号或邮箱无法解绑微信   |          wechat unbind without mobile or email          |
| 131000 |  同父分组下已有相同名称的分组  |         group name exist under the same parent          |
| 131001 |          父分组未找到          |                 group parent not found                  |
| 131002 |           分组未找到           |                     group not found                     |
| 131003 |       分组层级超过最大值       |              group level exceed max value               |
| 131004 |          子分组不为空          |                   sub group not empty                   |
| 131005 |        分组下设备不为空        |                 group device not empty                  |
| 131100 |           标签键为空           |                 attribute key is blank                  |
| 131101 |           标签值为空           |                attribute value is blank                 |
| 131102 |          标签键已存在          |                   attribute key exist                   |
| 131103 |      标签值类型格式不匹配      |         attribute value type format miss match          |
| 131104 |          标签键未找到          |                 attribute key not found                 |
| 131105 |       标签键或标签值为空       |             attribute key or value is blank             |
| 131106 |           标签值重复           |                 attribute key duplicate                 |
| 131107 |          标签格式错误          |              attribute key format illegal               |
| 131200 |          上传文件失败          |                   upload file failed                    |
| 131201 |          文件大小过大          |               size of file exceeds limit                |
| 131202 |         文件名称不合法         |                name of file is forbidden                |
| 131203 |         文件类型不合法         |                type of file is forbidden                |
| 131204 |          不允许空文件          |                empty file is not allowed                |
| 131205 |          导出文件失败          |                   export file failed                    |
| 131400 |     需要设置网关的网络类型     |                  need gateway net type                  |
| 131401 |          需要网络类型          |                      need net type                      |
| 131402 |           产品未找到           |                    product not found                    |
| 131403 |          产品下有设备          |                   product has devices                   |
| 131404 |      产品发布后不允许修改      |       product cannot be modified after published        |
| 131500 |        布尔值必须为 0/1        |                  bool key must be 0/1                   |
| 131501 |          属性值不合法          |                property value is illegal                |
| 131502 |          标识符已存在          |                   identifier existed                    |
| 131600 |            dk已存在            |                    device key exist                     |
| 131601 |           设备未找到           |                    device not found                     |
| 131602 |          设备有子设备          |                device has sub device(s)                 |
| 131603 |       设备数量超过最大值       |               device count exceeds limit                |
| 131604 |       设备影子版本不匹配       |             device shadow version not match             |
| 131605 | 设备未激活时不允许更新设备影子 | device shadow cannot be updated when device is inactive |
| 131606 |    不允许把自身设置为子设备    |         cannot add device itself as sub device          |
| 131700 |         主题名称不合法         |                   illegal topic name                    |
|   -1   |              错误              |                         Failed                          |