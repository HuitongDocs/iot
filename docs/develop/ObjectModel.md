# 9.3 物模型

## 物模型的定义

物模型是对产品的抽象，通过物模型可以完整的表述产品所具有的功能，包括属性、命令和事件。属性可读可写，也就是说属性值可以上报，也可以下行修改；命令是由云应用下发控制指令到设备，设备可以有返回值；事件是突发或者非常规情况，只有上报，可以带参数，不能修改。

物模型是通过JSON文件表述的，完整地表述了现实中的一个实际产品，比如智能空调，属性就包括温度、湿度的上报和对温度、湿度的修改；命令比如温度调低5°，设备可以返回调用成功过与否；事件是只读的，比如压缩机故障等异常信息。

通过物模型，设备和应用程序之间的上行和下行交互会有统一的数据规范。其中命令还支持同步和异步两种方式，支持输入输出参数，方便应用服务实时控制设备并返回结果。

| **功能** |                           **描述**                           |
| :------: | :----------------------------------------------------------: |
|   属性   | 一般是指设备运行时的状态，比如环境的温度和湿度，属性可读可写； |
|   命令   | 命令是指对设备的下行控制并完成某个动作，分为同步和异步。命令不同于属性的设置，命令通常是一次性操作，比如旋转摄像头30°、调低温度等； |
|   事件   | 事件是指需要即时被外部知晓的信息，可以包含多个输出参数。事件不同于属性上报，属性上报通常是普通信息的，而事件通常是突发性的告警或通知信息，比如故障告警、阈值超限等； |

## 物模型的功能定义

### 定义属性

定义属性的名称、类型等，类似于基于对象编程中的成员变量，具有可读（GET）和可写（SET）的权限。

### 操作步骤

1. 点击<新增>后，选择<属性>标签；
2. 输入相应的属性内容：
   
    * 标识符（必填）：类似于变量名，JSON文件中唯一标识该功能的标识符。支持大小写字母、数字和下划线`_`、不超过32个字符，必须以字母或`_`开头。
    * 名称（必填）：属性的名称，名称在同一产品下须唯一，如温度。名称支持中文、字母、数字、下划线的组合，长度为1-32位且不能为空。
    * 数据类型（必填）：
    
         * 整型：int
         * 长整型：long
         * 单精度浮点型：float
         * 双精度浮点型：double
         * 布尔型：bool
         * 枚举型：enum
         * 字符串：string
         * 时间型：date，格式为 int 类型的 UTC 时间戳，单位：毫秒
    * 取值范围（必填）：当数据类型为 int、long、float、double 时，需要填写取值范围，表示数据允许的范围。
    * 步长（必填）：当数据类型为 int、long、float、double 时，需要填写取值范围，表征属性变化的步进长度。
    * 单位：该属性的单位，比如摄氏度，无特殊字符限制。
    * 布尔类型（必填）：当数据类型为 bool 类型时，填写 0 和 1 分别代表的内容。
    * 枚举项（必填）：当数据类型为 enum 时，分别填写枚举值和对应的描述，如果有多个枚举值还可以添加枚举项。
    * 字符串（必填）：当数据类型为 string 时，需要填写字符串的长度，长度为 1-2048。
    * 时间型（必填）：当数据类型为 date 时，需要填写时间的格式，可以是时间戳，也可以是年月日。
    * 读写类型（必填）：
        * 只读：该属性仅支持数据上报，不支持下行修改。
        * 读写：该属性既可以上报获取，也可以下行修改设置。
    * 描述（选填）：对属性的描述，无特殊符号限制。
    

