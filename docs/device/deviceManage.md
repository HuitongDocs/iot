# 5.1 设备管理
![avatar](./images/deviceManage.jpg)
* 设备管理页面头部有选择产品的选择框和三个显示设备状态的值：设备总数，激活总数，在线总数。
 * 产品选择框为空时，在设备列表页会显示所有的设备。选择了产品后，会显示所选产品下的设备。
 
## 5.1.1 设备列表
![avatar](./images/deviceList.jpg)

### 新增设备
![avatar](./images/deviceCreate.jpg)
* 点击新增按钮，弹出新增设备对话框。新增设备必须要选择设备所属产品，名称为可选参数，当名称未填写时，系统会自动生成一个名字。

### 批量添加设备
![avatar](./images/addInBulk.jpg)
* 点击批量添加按钮，弹出批量添加对话框。批量添加设备需要选择设备所属产品和添加数量（1 - 1000）。

### 搜索设备
![avatar](./images/deviceSearch.jpg)
* 设备搜索支持两种：设备名称或DeviceKey搜索和设备标签搜索，选择搜索方式后，输入搜索内容，点击搜索即可。

### 刷新
* 点击刷新后会重新拉取下设备列表内容。

### 设备查看
* 点击操作下的查看按钮，会跳转到设备详情页，[点击](/device/deviceDetail.html#_5-2-1-设备信息页, "设备信息页")查看具体内容。

### 设备删除
![avatar](./images/deviceDelete.jpg)
* 点击操作下的删除按钮，会弹出删除确认框，点击确认即可删除。

### 设备启动/停用/批量删除
![avatar](./images/deviceEnable.jpg)
* 勾选所需启动/停用/删除的设备，点击左下角的启动设备，停用设备或删除设备即可批量启动/停用/删除设备。

## 5.1.2 批次记录
![avatar](./images/deviceRecord.jpg)
* 批次记录会显示每次添加设备的记录

### 查看批次记录
![avatar](./images/recordInfo.jpg)
* 点击操作下的查看，会弹出改批次的详细内容：ProductKey，DeviceKey等信息，点击下载CSV会下载详细内容的CSV文件
