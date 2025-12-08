
# JavaScript API documentation for http://127.0.0.1:7860/
API Endpoints: 124

1. Install the JavaScript client [docs](https://www.gradio.app/guides/getting-started-with-the-js-client) if you don't already have it installed. 

```bash
npm i -D @gradio/client
```

2. Find the API endpoint below corresponding to your desired function in the app. Copy the code snippet, replacing the placeholder values with your own input data. 

### API Name: /cleanup_resources


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/cleanup_resources", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "value_3" Html component.


### API Name: /open_output_folder


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/open_output_folder", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "value_3" Html component.


### API Name: /_refresh_page
Description: 真实重启：启动新子进程并延迟退出旧进程，仍只返回提示让用户手动刷新。

```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_refresh_page", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "value_3" Html component.


### API Name: /update_style_info


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/update_style_info", { 		
			style_name: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

style_name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格名称 Radio component. 

Returns list of 6 elements:

[0]: - Type: string
- The output value that appears in the "风格封面图" Image component.

[1]: - Type: string
- The output value that appears in the "风格描述" Markdown component.

[2]: - Type: number
- The output value that appears in the "风格权重" Slider component.

[3]: - Type: number
- The output value that appears in the "执行步数（步数越高，效果越好，耗时更长）" Slider component.

[4]: - Type: number
- The output value that appears in the "CFG(不需调整，如果提示词相关性不高，可适当调大，如果模糊或过拟合，可适当调小)" Slider component.

[5]: - Type: string
- The output value that appears in the "触发词" Markdown component.


### API Name: /on_expand_basic


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_expand_basic", { 		
			prompt: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /on_expand_detail


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_expand_detail", { 		
			prompt: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /lambda


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda", { 		
			style_name: "无", 
								
			current_prompt: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

style_name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格名称 Radio component. 

current_prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /_save_prompt


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_save_prompt", { 		
			prompt: "Hello!!", 
								
			gallery_list: [], 
								
			sel_style: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

gallery_list:
- Type: any
- Default: []
- The input value that is provided in the 生成的图片集 Gallery component. null

sel_style:
- Type: string
- Default: "无"
- The input value that is provided in the 风格名称 Radio component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_32" Markdown component.


### API Name: /generate_image_multi


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/generate_image_multi", { 		
			prompt: "**（中景平视，经典三分法构图）** 在**晨光斜照的宁静客厅**里，**一位刚做完晨间瑜伽的年轻女性，正慵懒地倚靠在白色地毯上，伸手去拿身旁的冰美式**。她身着**浅灰色运动Bra和同色系高腰紧身短裤**，布料因微微汗湿而**更贴合身体**，清晰地勾勒出肩背、腰腹到臀腿的**流畅而健康的曲线**。**光影是画面灵魂**：柔和的晨光从左侧落地窗斜射而入，在她**紧实的腹部肌肉**上投下细腻的明暗分割，汗珠在锁骨和脊柱沟处**闪烁着细碎的金色光点**。焦点落在她**沉静享受的侧脸、微湿的碎发以及那几颗晶莹的汗珠**上，背景的绿植与书架适度虚化。整体散发出一种**私人、静谧且充满生命力的美感**。", 
								
			aspect: "竖屏 3:4", 
								
			res: "720", 
								
			selected_name: "z-image 氛围光影", 
								
			style_weight: 0.8, 
								
			steps: 8, 
								
			cfg: 1, 
								
			num_images_val: 1, 
						
	});

	console.log(result.data);
	
```

Accepts 8 parameters:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

aspect:
- Type: string
- Default: "竖屏 3:4"
- The input value that is provided in the 选择比例 Dropdown component. 

res:
- Type: string
- Default: "720"
- The input value that is provided in the 选择分辨率（4K将使用专用工作流） Radio component. 

selected_name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格名称 Radio component. 

style_weight:
- Type: number
- Default: 1
- The input value that is provided in the 风格权重 Slider component. 

steps:
- Type: number
- Default: 9
- The input value that is provided in the 执行步数（步数越高，效果越好，耗时更长） Slider component. 

cfg:
- Type: number
- Default: 1
- The input value that is provided in the CFG(不需调整，如果提示词相关性不高，可适当调大，如果模糊或过拟合，可适当调小) Slider component. 

num_images_val:
- Type: number
- Default: 1
- The input value that is provided in the 生成图片数量 Slider component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "value_38" Markdown component.

[1]: - Type: 
- The output value that appears in the "生成的图片集" Gallery component.


### API Name: /_update_preview


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_update_preview", { 		
			name: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 1 Dropdown component. 

Returns 1 element:

- Type: string
- The output value that appears in the "预览1" Image component.


### API Name: /_update_preview_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_update_preview_1", { 		
			name: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 2 Dropdown component. 

Returns 1 element:

- Type: string
- The output value that appears in the "预览2" Image component.


### API Name: /_update_preview_2


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_update_preview_2", { 		
			name: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 3 Dropdown component. 

Returns 1 element:

- Type: string
- The output value that appears in the "预览3" Image component.


### API Name: /_update_preview_3


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_update_preview_3", { 		
			name: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 4 Dropdown component. 

Returns 1 element:

- Type: string
- The output value that appears in the "预览4" Image component.


### API Name: /on_expand_basic_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_expand_basic_1", { 		
			prompt: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /on_expand_detail_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_expand_detail_1", { 		
			prompt: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /generate_image_multi_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/generate_image_multi_1", { 		
			prompt: "Hello!!", 
								
			aspect: "竖屏 3:4", 
								
			res: "720", 
								
			steps: 9, 
								
			cfg: 1, 
								
			num_images_val: 1, 
								
			n1: "无", 
								
			w1v: 1, 
								
			n2: "无", 
								
			w2v: 1, 
								
			n3: "无", 
								
			w3v: 1, 
								
			n4: "无", 
								
			w4v: 1, 
						
	});

	console.log(result.data);
	
```

Accepts 14 parameters:

prompt:
- Type: string
- Required
- The input value that is provided in the 提示词 Textbox component. 

aspect:
- Type: string
- Default: "竖屏 3:4"
- The input value that is provided in the 选择比例 Dropdown component. 

res:
- Type: string
- Default: "720"
- The input value that is provided in the 选择分辨率（4K将使用专用工作流） Radio component. 

steps:
- Type: number
- Default: 9
- The input value that is provided in the 执行步数（步数越高，效果越好，耗时更长） Slider component. 

cfg:
- Type: number
- Default: 1
- The input value that is provided in the CFG(相关性调节) Slider component. 

num_images_val:
- Type: number
- Default: 1
- The input value that is provided in the 生成图片数量 Slider component. 

n1:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 1 Dropdown component. 

w1v:
- Type: number
- Default: 1
- The input value that is provided in the 权重1 Slider component. 

n2:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 2 Dropdown component. 

w2v:
- Type: number
- Default: 1
- The input value that is provided in the 权重2 Slider component. 

n3:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 3 Dropdown component. 

w3v:
- Type: number
- Default: 1
- The input value that is provided in the 权重3 Slider component. 

n4:
- Type: string
- Default: "无"
- The input value that is provided in the 风格 4 Dropdown component. 

w4v:
- Type: number
- Default: 1
- The input value that is provided in the 权重4 Slider component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "value_82" Markdown component.

[1]: - Type: 
- The output value that appears in the "生成的图片集" Gallery component.


### API Name: /on_style_change


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_style_change", { 		
			style_name: "无", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

style_name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格选择 Radio component. 

Returns list of 2 elements:

[0]: - Type: number
- The output value that appears in the "风格权重" Slider component.

[1]: - Type: string
- The output value that appears in the "触发词" Markdown component.


### API Name: /on_confirm_num_images


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_confirm_num_images", { 		
			n: 3, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

n:
- Type: any
- Default: 3
- The input value that is provided in the 生成图片数量（直接填写数字） Number component. 

Returns list of 100 elements:

[0]: - Type: string
- The output value that appears in the "提示词1" Textbox component.

[1]: - Type: string
- The output value that appears in the "提示词2" Textbox component.

[2]: - Type: string
- The output value that appears in the "提示词3" Textbox component.

[3]: - Type: string
- The output value that appears in the "提示词4" Textbox component.

[4]: - Type: string
- The output value that appears in the "提示词5" Textbox component.

[5]: - Type: string
- The output value that appears in the "提示词6" Textbox component.

[6]: - Type: string
- The output value that appears in the "提示词7" Textbox component.

[7]: - Type: string
- The output value that appears in the "提示词8" Textbox component.

[8]: - Type: string
- The output value that appears in the "提示词9" Textbox component.

[9]: - Type: string
- The output value that appears in the "提示词10" Textbox component.

[10]: - Type: string
- The output value that appears in the "提示词11" Textbox component.

[11]: - Type: string
- The output value that appears in the "提示词12" Textbox component.

[12]: - Type: string
- The output value that appears in the "提示词13" Textbox component.

[13]: - Type: string
- The output value that appears in the "提示词14" Textbox component.

[14]: - Type: string
- The output value that appears in the "提示词15" Textbox component.

[15]: - Type: string
- The output value that appears in the "提示词16" Textbox component.

[16]: - Type: string
- The output value that appears in the "提示词17" Textbox component.

[17]: - Type: string
- The output value that appears in the "提示词18" Textbox component.

[18]: - Type: string
- The output value that appears in the "提示词19" Textbox component.

[19]: - Type: string
- The output value that appears in the "提示词20" Textbox component.

[20]: - Type: string
- The output value that appears in the "提示词21" Textbox component.

[21]: - Type: string
- The output value that appears in the "提示词22" Textbox component.

[22]: - Type: string
- The output value that appears in the "提示词23" Textbox component.

[23]: - Type: string
- The output value that appears in the "提示词24" Textbox component.

[24]: - Type: string
- The output value that appears in the "提示词25" Textbox component.

[25]: - Type: string
- The output value that appears in the "提示词26" Textbox component.

[26]: - Type: string
- The output value that appears in the "提示词27" Textbox component.

[27]: - Type: string
- The output value that appears in the "提示词28" Textbox component.

[28]: - Type: string
- The output value that appears in the "提示词29" Textbox component.

[29]: - Type: string
- The output value that appears in the "提示词30" Textbox component.

[30]: - Type: string
- The output value that appears in the "提示词31" Textbox component.

[31]: - Type: string
- The output value that appears in the "提示词32" Textbox component.

[32]: - Type: string
- The output value that appears in the "提示词33" Textbox component.

[33]: - Type: string
- The output value that appears in the "提示词34" Textbox component.

[34]: - Type: string
- The output value that appears in the "提示词35" Textbox component.

[35]: - Type: string
- The output value that appears in the "提示词36" Textbox component.

[36]: - Type: string
- The output value that appears in the "提示词37" Textbox component.

[37]: - Type: string
- The output value that appears in the "提示词38" Textbox component.

[38]: - Type: string
- The output value that appears in the "提示词39" Textbox component.

[39]: - Type: string
- The output value that appears in the "提示词40" Textbox component.

[40]: - Type: string
- The output value that appears in the "提示词41" Textbox component.

[41]: - Type: string
- The output value that appears in the "提示词42" Textbox component.

[42]: - Type: string
- The output value that appears in the "提示词43" Textbox component.

[43]: - Type: string
- The output value that appears in the "提示词44" Textbox component.

[44]: - Type: string
- The output value that appears in the "提示词45" Textbox component.

[45]: - Type: string
- The output value that appears in the "提示词46" Textbox component.

[46]: - Type: string
- The output value that appears in the "提示词47" Textbox component.

[47]: - Type: string
- The output value that appears in the "提示词48" Textbox component.

[48]: - Type: string
- The output value that appears in the "提示词49" Textbox component.

[49]: - Type: string
- The output value that appears in the "提示词50" Textbox component.

[50]: - Type: string
- The output value that appears in the "提示词51" Textbox component.

[51]: - Type: string
- The output value that appears in the "提示词52" Textbox component.

[52]: - Type: string
- The output value that appears in the "提示词53" Textbox component.

[53]: - Type: string
- The output value that appears in the "提示词54" Textbox component.

[54]: - Type: string
- The output value that appears in the "提示词55" Textbox component.

[55]: - Type: string
- The output value that appears in the "提示词56" Textbox component.

[56]: - Type: string
- The output value that appears in the "提示词57" Textbox component.

[57]: - Type: string
- The output value that appears in the "提示词58" Textbox component.

[58]: - Type: string
- The output value that appears in the "提示词59" Textbox component.

[59]: - Type: string
- The output value that appears in the "提示词60" Textbox component.

[60]: - Type: string
- The output value that appears in the "提示词61" Textbox component.

[61]: - Type: string
- The output value that appears in the "提示词62" Textbox component.

[62]: - Type: string
- The output value that appears in the "提示词63" Textbox component.

[63]: - Type: string
- The output value that appears in the "提示词64" Textbox component.

[64]: - Type: string
- The output value that appears in the "提示词65" Textbox component.

[65]: - Type: string
- The output value that appears in the "提示词66" Textbox component.

[66]: - Type: string
- The output value that appears in the "提示词67" Textbox component.

[67]: - Type: string
- The output value that appears in the "提示词68" Textbox component.

[68]: - Type: string
- The output value that appears in the "提示词69" Textbox component.

[69]: - Type: string
- The output value that appears in the "提示词70" Textbox component.

[70]: - Type: string
- The output value that appears in the "提示词71" Textbox component.

[71]: - Type: string
- The output value that appears in the "提示词72" Textbox component.

[72]: - Type: string
- The output value that appears in the "提示词73" Textbox component.

[73]: - Type: string
- The output value that appears in the "提示词74" Textbox component.

[74]: - Type: string
- The output value that appears in the "提示词75" Textbox component.

[75]: - Type: string
- The output value that appears in the "提示词76" Textbox component.

[76]: - Type: string
- The output value that appears in the "提示词77" Textbox component.

[77]: - Type: string
- The output value that appears in the "提示词78" Textbox component.

[78]: - Type: string
- The output value that appears in the "提示词79" Textbox component.

[79]: - Type: string
- The output value that appears in the "提示词80" Textbox component.

[80]: - Type: string
- The output value that appears in the "提示词81" Textbox component.

[81]: - Type: string
- The output value that appears in the "提示词82" Textbox component.

[82]: - Type: string
- The output value that appears in the "提示词83" Textbox component.

[83]: - Type: string
- The output value that appears in the "提示词84" Textbox component.

[84]: - Type: string
- The output value that appears in the "提示词85" Textbox component.

[85]: - Type: string
- The output value that appears in the "提示词86" Textbox component.

[86]: - Type: string
- The output value that appears in the "提示词87" Textbox component.

[87]: - Type: string
- The output value that appears in the "提示词88" Textbox component.

[88]: - Type: string
- The output value that appears in the "提示词89" Textbox component.

[89]: - Type: string
- The output value that appears in the "提示词90" Textbox component.

[90]: - Type: string
- The output value that appears in the "提示词91" Textbox component.

[91]: - Type: string
- The output value that appears in the "提示词92" Textbox component.

[92]: - Type: string
- The output value that appears in the "提示词93" Textbox component.

[93]: - Type: string
- The output value that appears in the "提示词94" Textbox component.

[94]: - Type: string
- The output value that appears in the "提示词95" Textbox component.

[95]: - Type: string
- The output value that appears in the "提示词96" Textbox component.

[96]: - Type: string
- The output value that appears in the "提示词97" Textbox component.

[97]: - Type: string
- The output value that appears in the "提示词98" Textbox component.

[98]: - Type: string
- The output value that appears in the "提示词99" Textbox component.

[99]: - Type: string
- The output value that appears in the "提示词100" Textbox component.


### API Name: /_show_boxes


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_show_boxes", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 102 elements:

[0]: - Type: string
- The output value that appears in the "提示词1" Textbox component.

[1]: - Type: string
- The output value that appears in the "提示词2" Textbox component.

[2]: - Type: string
- The output value that appears in the "提示词3" Textbox component.

[3]: - Type: string
- The output value that appears in the "提示词4" Textbox component.

[4]: - Type: string
- The output value that appears in the "提示词5" Textbox component.

[5]: - Type: string
- The output value that appears in the "提示词6" Textbox component.

[6]: - Type: string
- The output value that appears in the "提示词7" Textbox component.

[7]: - Type: string
- The output value that appears in the "提示词8" Textbox component.

[8]: - Type: string
- The output value that appears in the "提示词9" Textbox component.

[9]: - Type: string
- The output value that appears in the "提示词10" Textbox component.

[10]: - Type: string
- The output value that appears in the "提示词11" Textbox component.

[11]: - Type: string
- The output value that appears in the "提示词12" Textbox component.

[12]: - Type: string
- The output value that appears in the "提示词13" Textbox component.

[13]: - Type: string
- The output value that appears in the "提示词14" Textbox component.

[14]: - Type: string
- The output value that appears in the "提示词15" Textbox component.

[15]: - Type: string
- The output value that appears in the "提示词16" Textbox component.

[16]: - Type: string
- The output value that appears in the "提示词17" Textbox component.

[17]: - Type: string
- The output value that appears in the "提示词18" Textbox component.

[18]: - Type: string
- The output value that appears in the "提示词19" Textbox component.

[19]: - Type: string
- The output value that appears in the "提示词20" Textbox component.

[20]: - Type: string
- The output value that appears in the "提示词21" Textbox component.

[21]: - Type: string
- The output value that appears in the "提示词22" Textbox component.

[22]: - Type: string
- The output value that appears in the "提示词23" Textbox component.

[23]: - Type: string
- The output value that appears in the "提示词24" Textbox component.

[24]: - Type: string
- The output value that appears in the "提示词25" Textbox component.

[25]: - Type: string
- The output value that appears in the "提示词26" Textbox component.

[26]: - Type: string
- The output value that appears in the "提示词27" Textbox component.

[27]: - Type: string
- The output value that appears in the "提示词28" Textbox component.

[28]: - Type: string
- The output value that appears in the "提示词29" Textbox component.

[29]: - Type: string
- The output value that appears in the "提示词30" Textbox component.

[30]: - Type: string
- The output value that appears in the "提示词31" Textbox component.

[31]: - Type: string
- The output value that appears in the "提示词32" Textbox component.

[32]: - Type: string
- The output value that appears in the "提示词33" Textbox component.

[33]: - Type: string
- The output value that appears in the "提示词34" Textbox component.

[34]: - Type: string
- The output value that appears in the "提示词35" Textbox component.

[35]: - Type: string
- The output value that appears in the "提示词36" Textbox component.

[36]: - Type: string
- The output value that appears in the "提示词37" Textbox component.

[37]: - Type: string
- The output value that appears in the "提示词38" Textbox component.

[38]: - Type: string
- The output value that appears in the "提示词39" Textbox component.

[39]: - Type: string
- The output value that appears in the "提示词40" Textbox component.

[40]: - Type: string
- The output value that appears in the "提示词41" Textbox component.

[41]: - Type: string
- The output value that appears in the "提示词42" Textbox component.

[42]: - Type: string
- The output value that appears in the "提示词43" Textbox component.

[43]: - Type: string
- The output value that appears in the "提示词44" Textbox component.

[44]: - Type: string
- The output value that appears in the "提示词45" Textbox component.

[45]: - Type: string
- The output value that appears in the "提示词46" Textbox component.

[46]: - Type: string
- The output value that appears in the "提示词47" Textbox component.

[47]: - Type: string
- The output value that appears in the "提示词48" Textbox component.

[48]: - Type: string
- The output value that appears in the "提示词49" Textbox component.

[49]: - Type: string
- The output value that appears in the "提示词50" Textbox component.

[50]: - Type: string
- The output value that appears in the "提示词51" Textbox component.

[51]: - Type: string
- The output value that appears in the "提示词52" Textbox component.

[52]: - Type: string
- The output value that appears in the "提示词53" Textbox component.

[53]: - Type: string
- The output value that appears in the "提示词54" Textbox component.

[54]: - Type: string
- The output value that appears in the "提示词55" Textbox component.

[55]: - Type: string
- The output value that appears in the "提示词56" Textbox component.

[56]: - Type: string
- The output value that appears in the "提示词57" Textbox component.

[57]: - Type: string
- The output value that appears in the "提示词58" Textbox component.

[58]: - Type: string
- The output value that appears in the "提示词59" Textbox component.

[59]: - Type: string
- The output value that appears in the "提示词60" Textbox component.

[60]: - Type: string
- The output value that appears in the "提示词61" Textbox component.

[61]: - Type: string
- The output value that appears in the "提示词62" Textbox component.

[62]: - Type: string
- The output value that appears in the "提示词63" Textbox component.

[63]: - Type: string
- The output value that appears in the "提示词64" Textbox component.

[64]: - Type: string
- The output value that appears in the "提示词65" Textbox component.

[65]: - Type: string
- The output value that appears in the "提示词66" Textbox component.

[66]: - Type: string
- The output value that appears in the "提示词67" Textbox component.

[67]: - Type: string
- The output value that appears in the "提示词68" Textbox component.

[68]: - Type: string
- The output value that appears in the "提示词69" Textbox component.

[69]: - Type: string
- The output value that appears in the "提示词70" Textbox component.

[70]: - Type: string
- The output value that appears in the "提示词71" Textbox component.

[71]: - Type: string
- The output value that appears in the "提示词72" Textbox component.

[72]: - Type: string
- The output value that appears in the "提示词73" Textbox component.

[73]: - Type: string
- The output value that appears in the "提示词74" Textbox component.

[74]: - Type: string
- The output value that appears in the "提示词75" Textbox component.

[75]: - Type: string
- The output value that appears in the "提示词76" Textbox component.

[76]: - Type: string
- The output value that appears in the "提示词77" Textbox component.

[77]: - Type: string
- The output value that appears in the "提示词78" Textbox component.

[78]: - Type: string
- The output value that appears in the "提示词79" Textbox component.

[79]: - Type: string
- The output value that appears in the "提示词80" Textbox component.

[80]: - Type: string
- The output value that appears in the "提示词81" Textbox component.

[81]: - Type: string
- The output value that appears in the "提示词82" Textbox component.

[82]: - Type: string
- The output value that appears in the "提示词83" Textbox component.

[83]: - Type: string
- The output value that appears in the "提示词84" Textbox component.

[84]: - Type: string
- The output value that appears in the "提示词85" Textbox component.

[85]: - Type: string
- The output value that appears in the "提示词86" Textbox component.

[86]: - Type: string
- The output value that appears in the "提示词87" Textbox component.

[87]: - Type: string
- The output value that appears in the "提示词88" Textbox component.

[88]: - Type: string
- The output value that appears in the "提示词89" Textbox component.

[89]: - Type: string
- The output value that appears in the "提示词90" Textbox component.

[90]: - Type: string
- The output value that appears in the "提示词91" Textbox component.

[91]: - Type: string
- The output value that appears in the "提示词92" Textbox component.

[92]: - Type: string
- The output value that appears in the "提示词93" Textbox component.

[93]: - Type: string
- The output value that appears in the "提示词94" Textbox component.

[94]: - Type: string
- The output value that appears in the "提示词95" Textbox component.

[95]: - Type: string
- The output value that appears in the "提示词96" Textbox component.

[96]: - Type: string
- The output value that appears in the "提示词97" Textbox component.

[97]: - Type: string
- The output value that appears in the "提示词98" Textbox component.

[98]: - Type: string
- The output value that appears in the "提示词99" Textbox component.

[99]: - Type: string
- The output value that appears in the "提示词100" Textbox component.

[100]: - Type: 
- The output value that appears in the "生成图片数量（直接填写数字）" Number component.

[101]: - Type: string
- The output value that appears in the "value_93" Markdown component.


### API Name: /_fill_boxes


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_fill_boxes", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 101 elements:

[0]: - Type: string
- The output value that appears in the "提示词1" Textbox component.

[1]: - Type: string
- The output value that appears in the "提示词2" Textbox component.

[2]: - Type: string
- The output value that appears in the "提示词3" Textbox component.

[3]: - Type: string
- The output value that appears in the "提示词4" Textbox component.

[4]: - Type: string
- The output value that appears in the "提示词5" Textbox component.

[5]: - Type: string
- The output value that appears in the "提示词6" Textbox component.

[6]: - Type: string
- The output value that appears in the "提示词7" Textbox component.

[7]: - Type: string
- The output value that appears in the "提示词8" Textbox component.

[8]: - Type: string
- The output value that appears in the "提示词9" Textbox component.

[9]: - Type: string
- The output value that appears in the "提示词10" Textbox component.

[10]: - Type: string
- The output value that appears in the "提示词11" Textbox component.

[11]: - Type: string
- The output value that appears in the "提示词12" Textbox component.

[12]: - Type: string
- The output value that appears in the "提示词13" Textbox component.

[13]: - Type: string
- The output value that appears in the "提示词14" Textbox component.

[14]: - Type: string
- The output value that appears in the "提示词15" Textbox component.

[15]: - Type: string
- The output value that appears in the "提示词16" Textbox component.

[16]: - Type: string
- The output value that appears in the "提示词17" Textbox component.

[17]: - Type: string
- The output value that appears in the "提示词18" Textbox component.

[18]: - Type: string
- The output value that appears in the "提示词19" Textbox component.

[19]: - Type: string
- The output value that appears in the "提示词20" Textbox component.

[20]: - Type: string
- The output value that appears in the "提示词21" Textbox component.

[21]: - Type: string
- The output value that appears in the "提示词22" Textbox component.

[22]: - Type: string
- The output value that appears in the "提示词23" Textbox component.

[23]: - Type: string
- The output value that appears in the "提示词24" Textbox component.

[24]: - Type: string
- The output value that appears in the "提示词25" Textbox component.

[25]: - Type: string
- The output value that appears in the "提示词26" Textbox component.

[26]: - Type: string
- The output value that appears in the "提示词27" Textbox component.

[27]: - Type: string
- The output value that appears in the "提示词28" Textbox component.

[28]: - Type: string
- The output value that appears in the "提示词29" Textbox component.

[29]: - Type: string
- The output value that appears in the "提示词30" Textbox component.

[30]: - Type: string
- The output value that appears in the "提示词31" Textbox component.

[31]: - Type: string
- The output value that appears in the "提示词32" Textbox component.

[32]: - Type: string
- The output value that appears in the "提示词33" Textbox component.

[33]: - Type: string
- The output value that appears in the "提示词34" Textbox component.

[34]: - Type: string
- The output value that appears in the "提示词35" Textbox component.

[35]: - Type: string
- The output value that appears in the "提示词36" Textbox component.

[36]: - Type: string
- The output value that appears in the "提示词37" Textbox component.

[37]: - Type: string
- The output value that appears in the "提示词38" Textbox component.

[38]: - Type: string
- The output value that appears in the "提示词39" Textbox component.

[39]: - Type: string
- The output value that appears in the "提示词40" Textbox component.

[40]: - Type: string
- The output value that appears in the "提示词41" Textbox component.

[41]: - Type: string
- The output value that appears in the "提示词42" Textbox component.

[42]: - Type: string
- The output value that appears in the "提示词43" Textbox component.

[43]: - Type: string
- The output value that appears in the "提示词44" Textbox component.

[44]: - Type: string
- The output value that appears in the "提示词45" Textbox component.

[45]: - Type: string
- The output value that appears in the "提示词46" Textbox component.

[46]: - Type: string
- The output value that appears in the "提示词47" Textbox component.

[47]: - Type: string
- The output value that appears in the "提示词48" Textbox component.

[48]: - Type: string
- The output value that appears in the "提示词49" Textbox component.

[49]: - Type: string
- The output value that appears in the "提示词50" Textbox component.

[50]: - Type: string
- The output value that appears in the "提示词51" Textbox component.

[51]: - Type: string
- The output value that appears in the "提示词52" Textbox component.

[52]: - Type: string
- The output value that appears in the "提示词53" Textbox component.

[53]: - Type: string
- The output value that appears in the "提示词54" Textbox component.

[54]: - Type: string
- The output value that appears in the "提示词55" Textbox component.

[55]: - Type: string
- The output value that appears in the "提示词56" Textbox component.

[56]: - Type: string
- The output value that appears in the "提示词57" Textbox component.

[57]: - Type: string
- The output value that appears in the "提示词58" Textbox component.

[58]: - Type: string
- The output value that appears in the "提示词59" Textbox component.

[59]: - Type: string
- The output value that appears in the "提示词60" Textbox component.

[60]: - Type: string
- The output value that appears in the "提示词61" Textbox component.

[61]: - Type: string
- The output value that appears in the "提示词62" Textbox component.

[62]: - Type: string
- The output value that appears in the "提示词63" Textbox component.

[63]: - Type: string
- The output value that appears in the "提示词64" Textbox component.

[64]: - Type: string
- The output value that appears in the "提示词65" Textbox component.

[65]: - Type: string
- The output value that appears in the "提示词66" Textbox component.

[66]: - Type: string
- The output value that appears in the "提示词67" Textbox component.

[67]: - Type: string
- The output value that appears in the "提示词68" Textbox component.

[68]: - Type: string
- The output value that appears in the "提示词69" Textbox component.

[69]: - Type: string
- The output value that appears in the "提示词70" Textbox component.

[70]: - Type: string
- The output value that appears in the "提示词71" Textbox component.

[71]: - Type: string
- The output value that appears in the "提示词72" Textbox component.

[72]: - Type: string
- The output value that appears in the "提示词73" Textbox component.

[73]: - Type: string
- The output value that appears in the "提示词74" Textbox component.

[74]: - Type: string
- The output value that appears in the "提示词75" Textbox component.

[75]: - Type: string
- The output value that appears in the "提示词76" Textbox component.

[76]: - Type: string
- The output value that appears in the "提示词77" Textbox component.

[77]: - Type: string
- The output value that appears in the "提示词78" Textbox component.

[78]: - Type: string
- The output value that appears in the "提示词79" Textbox component.

[79]: - Type: string
- The output value that appears in the "提示词80" Textbox component.

[80]: - Type: string
- The output value that appears in the "提示词81" Textbox component.

[81]: - Type: string
- The output value that appears in the "提示词82" Textbox component.

[82]: - Type: string
- The output value that appears in the "提示词83" Textbox component.

[83]: - Type: string
- The output value that appears in the "提示词84" Textbox component.

[84]: - Type: string
- The output value that appears in the "提示词85" Textbox component.

[85]: - Type: string
- The output value that appears in the "提示词86" Textbox component.

[86]: - Type: string
- The output value that appears in the "提示词87" Textbox component.

[87]: - Type: string
- The output value that appears in the "提示词88" Textbox component.

[88]: - Type: string
- The output value that appears in the "提示词89" Textbox component.

[89]: - Type: string
- The output value that appears in the "提示词90" Textbox component.

[90]: - Type: string
- The output value that appears in the "提示词91" Textbox component.

[91]: - Type: string
- The output value that appears in the "提示词92" Textbox component.

[92]: - Type: string
- The output value that appears in the "提示词93" Textbox component.

[93]: - Type: string
- The output value that appears in the "提示词94" Textbox component.

[94]: - Type: string
- The output value that appears in the "提示词95" Textbox component.

[95]: - Type: string
- The output value that appears in the "提示词96" Textbox component.

[96]: - Type: string
- The output value that appears in the "提示词97" Textbox component.

[97]: - Type: string
- The output value that appears in the "提示词98" Textbox component.

[98]: - Type: string
- The output value that appears in the "提示词99" Textbox component.

[99]: - Type: string
- The output value that appears in the "提示词100" Textbox component.

[100]: - Type: string
- The output value that appears in the "value_93" Markdown component.


### API Name: /generate_images_multi


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/generate_images_multi", { 		
			num_images_val: 3, 
								
			aspect: "竖屏 3:4", 
								
			res: "720", 
								
			steps: 9, 
								
			cfg: 1, 
								
			selected_name: "无", 
								
			style_weight: 1, 
								
			param_7: "Hello!!", 
								
			param_8: "Hello!!", 
								
			param_9: "Hello!!", 
								
			param_10: "Hello!!", 
								
			param_11: "Hello!!", 
								
			param_12: "Hello!!", 
								
			param_13: "Hello!!", 
								
			param_14: "Hello!!", 
								
			param_15: "Hello!!", 
								
			param_16: "Hello!!", 
								
			param_17: "Hello!!", 
								
			param_18: "Hello!!", 
								
			param_19: "Hello!!", 
								
			param_20: "Hello!!", 
								
			param_21: "Hello!!", 
								
			param_22: "Hello!!", 
								
			param_23: "Hello!!", 
								
			param_24: "Hello!!", 
								
			param_25: "Hello!!", 
								
			param_26: "Hello!!", 
								
			param_27: "Hello!!", 
								
			param_28: "Hello!!", 
								
			param_29: "Hello!!", 
								
			param_30: "Hello!!", 
								
			param_31: "Hello!!", 
								
			param_32: "Hello!!", 
								
			param_33: "Hello!!", 
								
			param_34: "Hello!!", 
								
			param_35: "Hello!!", 
								
			param_36: "Hello!!", 
								
			param_37: "Hello!!", 
								
			param_38: "Hello!!", 
								
			param_39: "Hello!!", 
								
			param_40: "Hello!!", 
								
			param_41: "Hello!!", 
								
			param_42: "Hello!!", 
								
			param_43: "Hello!!", 
								
			param_44: "Hello!!", 
								
			param_45: "Hello!!", 
								
			param_46: "Hello!!", 
								
			param_47: "Hello!!", 
								
			param_48: "Hello!!", 
								
			param_49: "Hello!!", 
								
			param_50: "Hello!!", 
								
			param_51: "Hello!!", 
								
			param_52: "Hello!!", 
								
			param_53: "Hello!!", 
								
			param_54: "Hello!!", 
								
			param_55: "Hello!!", 
								
			param_56: "Hello!!", 
								
			param_57: "Hello!!", 
								
			param_58: "Hello!!", 
								
			param_59: "Hello!!", 
								
			param_60: "Hello!!", 
								
			param_61: "Hello!!", 
								
			param_62: "Hello!!", 
								
			param_63: "Hello!!", 
								
			param_64: "Hello!!", 
								
			param_65: "Hello!!", 
								
			param_66: "Hello!!", 
								
			param_67: "Hello!!", 
								
			param_68: "Hello!!", 
								
			param_69: "Hello!!", 
								
			param_70: "Hello!!", 
								
			param_71: "Hello!!", 
								
			param_72: "Hello!!", 
								
			param_73: "Hello!!", 
								
			param_74: "Hello!!", 
								
			param_75: "Hello!!", 
								
			param_76: "Hello!!", 
								
			param_77: "Hello!!", 
								
			param_78: "Hello!!", 
								
			param_79: "Hello!!", 
								
			param_80: "Hello!!", 
								
			param_81: "Hello!!", 
								
			param_82: "Hello!!", 
								
			param_83: "Hello!!", 
								
			param_84: "Hello!!", 
								
			param_85: "Hello!!", 
								
			param_86: "Hello!!", 
								
			param_87: "Hello!!", 
								
			param_88: "Hello!!", 
								
			param_89: "Hello!!", 
								
			param_90: "Hello!!", 
								
			param_91: "Hello!!", 
								
			param_92: "Hello!!", 
								
			param_93: "Hello!!", 
								
			param_94: "Hello!!", 
								
			param_95: "Hello!!", 
								
			param_96: "Hello!!", 
								
			param_97: "Hello!!", 
								
			param_98: "Hello!!", 
								
			param_99: "Hello!!", 
								
			param_100: "Hello!!", 
								
			param_101: "Hello!!", 
								
			param_102: "Hello!!", 
								
			param_103: "Hello!!", 
								
			param_104: "Hello!!", 
								
			param_105: "Hello!!", 
								
			param_106: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 107 parameters:

num_images_val:
- Type: any
- Default: 3
- The input value that is provided in the 生成图片数量（直接填写数字） Number component. 

aspect:
- Type: string
- Default: "竖屏 3:4"
- The input value that is provided in the 选择比例 Dropdown component. 

res:
- Type: string
- Default: "720"
- The input value that is provided in the 选择分辨率（4K使用专用工作流，内部按1440 latent生成） Radio component. 

steps:
- Type: number
- Default: 9
- The input value that is provided in the 执行步数（步数越高，效果越好，耗时更长） Slider component. 

cfg:
- Type: number
- Default: 1
- The input value that is provided in the CFG(相关性调整) Slider component. 

selected_name:
- Type: string
- Default: "无"
- The input value that is provided in the 风格选择 Radio component. 

style_weight:
- Type: number
- Default: 1
- The input value that is provided in the 风格权重 Slider component. 

param_7:
- Type: string
- Required
- The input value that is provided in the 提示词1 Textbox component. 

param_8:
- Type: string
- Required
- The input value that is provided in the 提示词2 Textbox component. 

param_9:
- Type: string
- Required
- The input value that is provided in the 提示词3 Textbox component. 

param_10:
- Type: string
- Required
- The input value that is provided in the 提示词4 Textbox component. 

param_11:
- Type: string
- Required
- The input value that is provided in the 提示词5 Textbox component. 

param_12:
- Type: string
- Required
- The input value that is provided in the 提示词6 Textbox component. 

param_13:
- Type: string
- Required
- The input value that is provided in the 提示词7 Textbox component. 

param_14:
- Type: string
- Required
- The input value that is provided in the 提示词8 Textbox component. 

param_15:
- Type: string
- Required
- The input value that is provided in the 提示词9 Textbox component. 

param_16:
- Type: string
- Required
- The input value that is provided in the 提示词10 Textbox component. 

param_17:
- Type: string
- Required
- The input value that is provided in the 提示词11 Textbox component. 

param_18:
- Type: string
- Required
- The input value that is provided in the 提示词12 Textbox component. 

param_19:
- Type: string
- Required
- The input value that is provided in the 提示词13 Textbox component. 

param_20:
- Type: string
- Required
- The input value that is provided in the 提示词14 Textbox component. 

param_21:
- Type: string
- Required
- The input value that is provided in the 提示词15 Textbox component. 

param_22:
- Type: string
- Required
- The input value that is provided in the 提示词16 Textbox component. 

param_23:
- Type: string
- Required
- The input value that is provided in the 提示词17 Textbox component. 

param_24:
- Type: string
- Required
- The input value that is provided in the 提示词18 Textbox component. 

param_25:
- Type: string
- Required
- The input value that is provided in the 提示词19 Textbox component. 

param_26:
- Type: string
- Required
- The input value that is provided in the 提示词20 Textbox component. 

param_27:
- Type: string
- Required
- The input value that is provided in the 提示词21 Textbox component. 

param_28:
- Type: string
- Required
- The input value that is provided in the 提示词22 Textbox component. 

param_29:
- Type: string
- Required
- The input value that is provided in the 提示词23 Textbox component. 

param_30:
- Type: string
- Required
- The input value that is provided in the 提示词24 Textbox component. 

param_31:
- Type: string
- Required
- The input value that is provided in the 提示词25 Textbox component. 

param_32:
- Type: string
- Required
- The input value that is provided in the 提示词26 Textbox component. 

param_33:
- Type: string
- Required
- The input value that is provided in the 提示词27 Textbox component. 

param_34:
- Type: string
- Required
- The input value that is provided in the 提示词28 Textbox component. 

param_35:
- Type: string
- Required
- The input value that is provided in the 提示词29 Textbox component. 

param_36:
- Type: string
- Required
- The input value that is provided in the 提示词30 Textbox component. 

param_37:
- Type: string
- Required
- The input value that is provided in the 提示词31 Textbox component. 

param_38:
- Type: string
- Required
- The input value that is provided in the 提示词32 Textbox component. 

param_39:
- Type: string
- Required
- The input value that is provided in the 提示词33 Textbox component. 

param_40:
- Type: string
- Required
- The input value that is provided in the 提示词34 Textbox component. 

param_41:
- Type: string
- Required
- The input value that is provided in the 提示词35 Textbox component. 

param_42:
- Type: string
- Required
- The input value that is provided in the 提示词36 Textbox component. 

param_43:
- Type: string
- Required
- The input value that is provided in the 提示词37 Textbox component. 

param_44:
- Type: string
- Required
- The input value that is provided in the 提示词38 Textbox component. 

param_45:
- Type: string
- Required
- The input value that is provided in the 提示词39 Textbox component. 

param_46:
- Type: string
- Required
- The input value that is provided in the 提示词40 Textbox component. 

param_47:
- Type: string
- Required
- The input value that is provided in the 提示词41 Textbox component. 

param_48:
- Type: string
- Required
- The input value that is provided in the 提示词42 Textbox component. 

param_49:
- Type: string
- Required
- The input value that is provided in the 提示词43 Textbox component. 

param_50:
- Type: string
- Required
- The input value that is provided in the 提示词44 Textbox component. 

param_51:
- Type: string
- Required
- The input value that is provided in the 提示词45 Textbox component. 

param_52:
- Type: string
- Required
- The input value that is provided in the 提示词46 Textbox component. 

param_53:
- Type: string
- Required
- The input value that is provided in the 提示词47 Textbox component. 

param_54:
- Type: string
- Required
- The input value that is provided in the 提示词48 Textbox component. 

param_55:
- Type: string
- Required
- The input value that is provided in the 提示词49 Textbox component. 

param_56:
- Type: string
- Required
- The input value that is provided in the 提示词50 Textbox component. 

param_57:
- Type: string
- Required
- The input value that is provided in the 提示词51 Textbox component. 

param_58:
- Type: string
- Required
- The input value that is provided in the 提示词52 Textbox component. 

param_59:
- Type: string
- Required
- The input value that is provided in the 提示词53 Textbox component. 

param_60:
- Type: string
- Required
- The input value that is provided in the 提示词54 Textbox component. 

param_61:
- Type: string
- Required
- The input value that is provided in the 提示词55 Textbox component. 

param_62:
- Type: string
- Required
- The input value that is provided in the 提示词56 Textbox component. 

param_63:
- Type: string
- Required
- The input value that is provided in the 提示词57 Textbox component. 

param_64:
- Type: string
- Required
- The input value that is provided in the 提示词58 Textbox component. 

param_65:
- Type: string
- Required
- The input value that is provided in the 提示词59 Textbox component. 

param_66:
- Type: string
- Required
- The input value that is provided in the 提示词60 Textbox component. 

param_67:
- Type: string
- Required
- The input value that is provided in the 提示词61 Textbox component. 

param_68:
- Type: string
- Required
- The input value that is provided in the 提示词62 Textbox component. 

param_69:
- Type: string
- Required
- The input value that is provided in the 提示词63 Textbox component. 

param_70:
- Type: string
- Required
- The input value that is provided in the 提示词64 Textbox component. 

param_71:
- Type: string
- Required
- The input value that is provided in the 提示词65 Textbox component. 

param_72:
- Type: string
- Required
- The input value that is provided in the 提示词66 Textbox component. 

param_73:
- Type: string
- Required
- The input value that is provided in the 提示词67 Textbox component. 

param_74:
- Type: string
- Required
- The input value that is provided in the 提示词68 Textbox component. 

param_75:
- Type: string
- Required
- The input value that is provided in the 提示词69 Textbox component. 

param_76:
- Type: string
- Required
- The input value that is provided in the 提示词70 Textbox component. 

param_77:
- Type: string
- Required
- The input value that is provided in the 提示词71 Textbox component. 

param_78:
- Type: string
- Required
- The input value that is provided in the 提示词72 Textbox component. 

param_79:
- Type: string
- Required
- The input value that is provided in the 提示词73 Textbox component. 

param_80:
- Type: string
- Required
- The input value that is provided in the 提示词74 Textbox component. 

param_81:
- Type: string
- Required
- The input value that is provided in the 提示词75 Textbox component. 

param_82:
- Type: string
- Required
- The input value that is provided in the 提示词76 Textbox component. 

param_83:
- Type: string
- Required
- The input value that is provided in the 提示词77 Textbox component. 

param_84:
- Type: string
- Required
- The input value that is provided in the 提示词78 Textbox component. 

param_85:
- Type: string
- Required
- The input value that is provided in the 提示词79 Textbox component. 

param_86:
- Type: string
- Required
- The input value that is provided in the 提示词80 Textbox component. 

param_87:
- Type: string
- Required
- The input value that is provided in the 提示词81 Textbox component. 

param_88:
- Type: string
- Required
- The input value that is provided in the 提示词82 Textbox component. 

param_89:
- Type: string
- Required
- The input value that is provided in the 提示词83 Textbox component. 

param_90:
- Type: string
- Required
- The input value that is provided in the 提示词84 Textbox component. 

param_91:
- Type: string
- Required
- The input value that is provided in the 提示词85 Textbox component. 

param_92:
- Type: string
- Required
- The input value that is provided in the 提示词86 Textbox component. 

param_93:
- Type: string
- Required
- The input value that is provided in the 提示词87 Textbox component. 

param_94:
- Type: string
- Required
- The input value that is provided in the 提示词88 Textbox component. 

param_95:
- Type: string
- Required
- The input value that is provided in the 提示词89 Textbox component. 

param_96:
- Type: string
- Required
- The input value that is provided in the 提示词90 Textbox component. 

param_97:
- Type: string
- Required
- The input value that is provided in the 提示词91 Textbox component. 

param_98:
- Type: string
- Required
- The input value that is provided in the 提示词92 Textbox component. 

param_99:
- Type: string
- Required
- The input value that is provided in the 提示词93 Textbox component. 

param_100:
- Type: string
- Required
- The input value that is provided in the 提示词94 Textbox component. 

param_101:
- Type: string
- Required
- The input value that is provided in the 提示词95 Textbox component. 

param_102:
- Type: string
- Required
- The input value that is provided in the 提示词96 Textbox component. 

param_103:
- Type: string
- Required
- The input value that is provided in the 提示词97 Textbox component. 

param_104:
- Type: string
- Required
- The input value that is provided in the 提示词98 Textbox component. 

param_105:
- Type: string
- Required
- The input value that is provided in the 提示词99 Textbox component. 

param_106:
- Type: string
- Required
- The input value that is provided in the 提示词100 Textbox component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "value_208" Markdown component.

[1]: - Type: 
- The output value that appears in the "生成的图片集" Gallery component.


### API Name: /analyze_image


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/analyze_image", { 
					img_path: exampleImage, 
								
			level: "基本分析", 
								
			custom: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

img_path:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 参考图片 Image component. For input, either path or url must be provided. For output, path is always provided.

level:
- Type: string
- Default: "基本分析"
- The input value that is provided in the 分析详细程度 Radio component. 

custom:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "图片分析结果（自然语言，可编辑）" Textbox component.


### API Name: /lambda_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_1", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_2


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_2", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_3


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_3", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_4


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_4", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_5


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_5", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_6


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_6", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_7


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_7", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_8


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_8", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_9


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_9", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_10


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_10", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_11


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_11", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_12


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_12", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_13


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_13", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_14


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_14", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_15


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_15", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_16


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_16", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_17


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_17", { 		
			t: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

t:
- Type: string
- Required
- The input value that is provided in the 自定义分析内容（可选） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "自定义分析内容（可选）" Textbox component.


### API Name: /lambda_18


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_18", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "相似度列表(逗号/空格/换行)" Textbox component.


### API Name: /lambda_19


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_19", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "相似度列表(逗号/空格/换行)" Textbox component.


### API Name: /lambda_20


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_20", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "相似度列表(逗号/空格/换行)" Textbox component.


### API Name: /lambda_21


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_21", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "相似度列表(逗号/空格/换行)" Textbox component.


### API Name: /_dedup_sort


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_dedup_sort", { 		
			txt: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

txt:
- Type: string
- Required
- The input value that is provided in the 相似度列表(逗号/空格/换行) Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "相似度列表(逗号/空格/换行)" Textbox component.


### API Name: /_build_range


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_build_range", { 		
			s: 0.3, 
								
			e: 0.9, 
								
			n: 3, 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

s:
- Type: number
- Default: 0.3
- The input value that is provided in the 范围起始 Number component. 

e:
- Type: number
- Default: 0.9
- The input value that is provided in the 范围结束 Number component. 

n:
- Type: number
- Default: 3
- The input value that is provided in the 数量 Number component. 

Returns 1 element:

- Type: string
- The output value that appears in the "相似度列表(逗号/空格/换行)" Textbox component.


### API Name: /_preview_plan


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_preview_plan", { 		
			default_sim: 0.7, 
								
			txt: "Hello!!", 
								
			use_list: false, 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

default_sim:
- Type: number
- Default: 0.7
- The input value that is provided in the 默认相似度(0~1) Slider component. 

txt:
- Type: string
- Required
- The input value that is provided in the 相似度列表(逗号/空格/换行) Textbox component. 

use_list:
- Type: boolean
- Default: False
- The input value that is provided in the 使用相似度列表（不勾选则用上面的默认相似度） Checkbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_254" Markdown component.


### API Name: /_preview_plan_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_preview_plan_1", { 		
			default_sim: 0.7, 
								
			txt: "Hello!!", 
								
			use_list: false, 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

default_sim:
- Type: number
- Default: 0.7
- The input value that is provided in the 默认相似度(0~1) Slider component. 

txt:
- Type: string
- Required
- The input value that is provided in the 相似度列表(逗号/空格/换行) Textbox component. 

use_list:
- Type: boolean
- Default: False
- The input value that is provided in the 使用相似度列表（不勾选则用上面的默认相似度） Checkbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_254" Markdown component.


### API Name: /_preview_plan_2


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_preview_plan_2", { 		
			default_sim: 0.7, 
								
			txt: "Hello!!", 
								
			use_list: false, 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

default_sim:
- Type: number
- Default: 0.7
- The input value that is provided in the 默认相似度(0~1) Slider component. 

txt:
- Type: string
- Required
- The input value that is provided in the 相似度列表(逗号/空格/换行) Textbox component. 

use_list:
- Type: boolean
- Default: False
- The input value that is provided in the 使用相似度列表（不勾选则用上面的默认相似度） Checkbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_254" Markdown component.


### API Name: /_dispatch_generate


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_dispatch_generate", { 		
			prompt_text: "Hello!!", 
						
					img_path: exampleImage, 
								
			steps: 8, 
								
			default_sim: 0.7, 
								
			list_text: "Hello!!", 
								
			use_list: false, 
						
	});

	console.log(result.data);
	
```

Accepts 6 parameters:

prompt_text:
- Type: string
- Required
- The input value that is provided in the 图片分析结果（自然语言，可编辑） Textbox component. 

img_path:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 参考图片 Image component. For input, either path or url must be provided. For output, path is always provided.

steps:
- Type: number
- Default: 8
- The input value that is provided in the 执行步数 Slider component. 

default_sim:
- Type: number
- Default: 0.7
- The input value that is provided in the 默认相似度(0~1) Slider component. 

list_text:
- Type: string
- Required
- The input value that is provided in the 相似度列表(逗号/空格/换行) Textbox component. 

use_list:
- Type: boolean
- Default: False
- The input value that is provided in the 使用相似度列表（不勾选则用上面的默认相似度） Checkbox component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "value_279" Markdown component.

[1]: - Type: 
- The output value that appears in the "生成的图片集" Gallery component.


### API Name: /_run


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const response_1 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_1.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_run", { 
					img_val: exampleImage, 
						
					control_img_val: exampleImage, 
								
			control_strength_val: 0.8, 
								
			prompt_val: "", 
								
			scale_val: 1, 
								
			preprocessor_label: "姿态控图", 
						
	});

	console.log(result.data);
	
```

Accepts 6 parameters:

img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 输入图片 Image component. For input, either path or url must be provided. For output, path is always provided.

control_img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 控图预处理图片 Image component. For input, either path or url must be provided. For output, path is always provided.

control_strength_val:
- Type: number
- Default: 0.8
- The input value that is provided in the 控制强度 Slider component. 

prompt_val:
- Type: string
- Default: ""
- The input value that is provided in the 提示词 Textbox component. 

scale_val:
- Type: number
- Default: 1
- The input value that is provided in the 宽高倍数(0.1~4) Slider component. 

preprocessor_label:
- Type: string
- Default: "姿态控图"
- The input value that is provided in the 控图方式 Radio component. 

Returns 1 element:

- Type: string
- The output value that appears in the "结果" Image component.


### API Name: /_preproc_run


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_preproc_run", { 
					control_img_val: exampleImage, 
								
			bg_remove_val: false, 
								
			preprocessor_label: "姿态控图", 
								
			resolution_val: "512", 
						
	});

	console.log(result.data);
	
```

Accepts 4 parameters:

control_img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 控图预处理图片 Image component. For input, either path or url must be provided. For output, path is always provided.

bg_remove_val:
- Type: boolean
- Default: False
- The input value that is provided in the 是否背景移除 Checkbox component. 

preprocessor_label:
- Type: string
- Default: "姿态控图"
- The input value that is provided in the 控图方式 Radio component. 

resolution_val:
- Type: string
- Default: "512"
- The input value that is provided in the 生成分辨率(越高细节越丰富) Radio component. 

Returns 1 element:

- Type: string
- The output value that appears in the "输入图片" Image component.


### API Name: /_reverse_prompt


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const response_1 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_1.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_reverse_prompt", { 
					img_val: exampleImage, 
						
					control_img_val: exampleImage, 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 输入图片 Image component. For input, either path or url must be provided. For output, path is always provided.

control_img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 控图预处理图片 Image component. For input, either path or url must be provided. For output, path is always provided.

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /_reverse_prompt_1


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const response_1 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_1.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_reverse_prompt_1", { 
					img_val: exampleImage, 
						
					control_img_val: exampleImage, 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 输入图片 Image component. For input, either path or url must be provided. For output, path is always provided.

control_img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 控图预处理图片 Image component. For input, either path or url must be provided. For output, path is always provided.

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /_reverse_prompt_2


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const response_1 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_1.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_reverse_prompt_2", { 
					img_val: exampleImage, 
						
					control_img_val: exampleImage, 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 输入图片 Image component. For input, either path or url must be provided. For output, path is always provided.

control_img_val:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 控图预处理图片 Image component. For input, either path or url must be provided. For output, path is always provided.

Returns 1 element:

- Type: string
- The output value that appears in the "提示词" Textbox component.


### API Name: /_run_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_run_1", { 		
			data: {"background":handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),"layers":[],"composite":None}, 
								
			scale_choice: "原图长边", 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

data:
- Type: any
- Required
- The input value that is provided in the 上传图片并选择移除的区域 Imageeditor component. null

scale_choice:
- Type: string
- Default: "原图长边"
- The input value that is provided in the 缩放长边长度 Radio component. 

Returns 1 element:

- Type: string
- The output value that appears in the "结果" Image component.


### API Name: /_apply_slider


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_apply_slider", { 		
			height_val: 400, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

height_val:
- Type: number
- Default: 400
- The input value that is provided in the 调整显示高度 Slider component. 

Returns 1 element:

- Type: 
- The output value that appears in the "上传图片并选择移除的区域" Imageeditor component.


### API Name: /_on_img_upload


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_on_img_upload", { 		
			data: {"background":handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),"layers":[],"composite":None}, 
								
			current_slider: 400, 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

data:
- Type: any
- Required
- The input value that is provided in the 上传图片并选择移除的区域 Imageeditor component. null

current_slider:
- Type: number
- Default: 400
- The input value that is provided in the 调整显示高度 Slider component. 

Returns list of 3 elements:

[0]: - Type: 
- The output value that appears in the "上传图片并选择移除的区域" Imageeditor component.

[1]: - Type: string
- The output value that appears in the "value_324" Markdown component.

[2]: - Type: number
- The output value that appears in the "调整显示高度" Slider component.


### API Name: /_run_2


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_run_2", { 		
			data: {"background":handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),"layers":[],"composite":None}, 
								
			scale_choice: "原图长边", 
								
			prompt: "", 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

data:
- Type: any
- Required
- The input value that is provided in the 上传图片并选择重绘的区域 Imageeditor component. null

scale_choice:
- Type: string
- Default: "原图长边"
- The input value that is provided in the 缩放长边长度 Radio component. 

prompt:
- Type: string
- Default: ""
- The input value that is provided in the 提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "结果" Image component.


### API Name: /_apply_slider_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_apply_slider_1", { 		
			height_val: 400, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

height_val:
- Type: number
- Default: 400
- The input value that is provided in the 调整显示高度 Slider component. 

Returns 1 element:

- Type: 
- The output value that appears in the "上传图片并选择重绘的区域" Imageeditor component.


### API Name: /_on_upload


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_on_upload", { 		
			data: {"background":handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),"layers":[],"composite":None}, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

data:
- Type: any
- Required
- The input value that is provided in the 上传图片并选择重绘的区域 Imageeditor component. null

Returns list of 3 elements:

[0]: - Type: 
- The output value that appears in the "上传图片并选择重绘的区域" Imageeditor component.

[1]: - Type: string
- The output value that appears in the "value_338" Markdown component.

[2]: - Type: number
- The output value that appears in the "调整显示高度" Slider component.


### API Name: /_toggle


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_toggle", { 		
			p: "", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

p:
- Type: string
- Default: ""
- The input value that is provided in the 提示词 Textbox component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "提示词" Textbox component.

[1]: - Type: string
- The output value that appears in the "value_341" Markdown component.


### API Name: /_run_3


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_run_3", { 
					img_a_data: exampleImage, 
								
			img_b_data: {"background":handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),"layers":[],"composite":None}, 
								
			invert: false, 
								
			threshold: 8, 
						
	});

	console.log(result.data);
	
```

Accepts 4 parameters:

img_a_data:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 迁移图 Image component. For input, either path or url must be provided. For output, path is always provided.

img_b_data:
- Type: any
- Required
- The input value that is provided in the 原图(蒙版绘制) Imageeditor component. null

invert:
- Type: boolean
- Default: False
- The input value that is provided in the 蒙版反选 Checkbox component. 

threshold:
- Type: number
- Default: 8
- The input value that is provided in the 蒙版阈值(>阈值视为前景) Slider component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "生成结果" Image component.

[1]: - Type: string
- The output value that appears in the "value_368" Markdown component.


### API Name: /_auto_resize


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_auto_resize", { 
					img_a_data: exampleImage, 
								
			img_b_data: {"background":handle_file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'),"layers":[],"composite":None}, 
								
			custom_h: 400, 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

img_a_data:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 迁移图 Image component. For input, either path or url must be provided. For output, path is always provided.

img_b_data:
- Type: any
- Required
- The input value that is provided in the 原图(蒙版绘制) Imageeditor component. null

custom_h:
- Type: number
- Default: 400
- The input value that is provided in the 原图B显示高度 Slider component. 

Returns 1 element:

- Type: 
- The output value that appears in the "原图(蒙版绘制)" Imageeditor component.


### API Name: /lambda_22


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_22", { 		
			h: 400, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

h:
- Type: number
- Default: 400
- The input value that is provided in the 原图B显示高度 Slider component. 

Returns 1 element:

- Type: 
- The output value that appears in the "原图(蒙版绘制)" Imageeditor component.


### API Name: /_run_4


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_run_4", { 
					img: exampleImage, 
								
			p: "", 
								
			ls_choice: "原图长边", 
								
			l: 0, 
								
			t: 0, 
								
			r: 0, 
								
			b: 0, 
								
			ex: 20, 
						
	});

	console.log(result.data);
	
```

Accepts 8 parameters:

img:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 原图 Image component. For input, either path or url must be provided. For output, path is always provided.

p:
- Type: string
- Default: ""
- The input value that is provided in the 提示词(建议使用英文) Textbox component. 

ls_choice:
- Type: string
- Default: "原图长边"
- The input value that is provided in the 缩放长边长度 Radio component. 

l:
- Type: number
- Default: 0
- The input value that is provided in the 左 Slider component. 

t:
- Type: number
- Default: 0
- The input value that is provided in the 上 Slider component. 

r:
- Type: number
- Default: 0
- The input value that is provided in the 右 Slider component. 

b:
- Type: number
- Default: 0
- The input value that is provided in the 下 Slider component. 

ex:
- Type: number
- Default: 20
- The input value that is provided in the 扩展半径区域 Slider component. 

Returns 1 element:

- Type: string
- The output value that appears in the "结果" Image component.


### API Name: /_show_size


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_show_size", { 
					img: exampleImage, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

img:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 原图 Image component. For input, either path or url must be provided. For output, path is always provided.

Returns 1 element:

- Type: string
- The output value that appears in the "value_374" Markdown component.


### API Name: /_toggle_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_toggle_1", { 		
			p: "", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

p:
- Type: string
- Default: ""
- The input value that is provided in the 提示词(建议使用英文) Textbox component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "提示词(建议使用英文)" Textbox component.

[1]: - Type: string
- The output value that appears in the "value_392" Markdown component.


### API Name: /files_to_images


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("");
	const exampleFile = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/files_to_images", { 
					files: exampleFile, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

files:
- Type: any
- Required
- The input value that is provided in the 上传一张或多张图片，支持批量放大（多选） File component. null

Returns 1 element:

- Type: 
- The output value that appears in the "上传预览" Gallery component.


### API Name: /open_seedvr2_folder


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/open_seedvr2_folder", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "value_417" Html component.


### API Name: /seedvr2_upscale_batch


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("");
	const exampleFile = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/seedvr2_upscale_batch", { 
					files: exampleFile, 
								
			quality: "清晰", 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

files:
- Type: any
- Required
- The input value that is provided in the 上传一张或多张图片，支持批量放大（多选） File component. null

quality:
- Type: string
- Default: "清晰"
- The input value that is provided in the 清晰度 Radio component. 

Returns list of 2 elements:

[0]: - Type: 
- The output value that appears in the "生成的图片" Gallery component.

[1]: - Type: string
- The output value that appears in the "value_417" Html component.


### API Name: /flashvsr_upscale


```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/flashvsr_upscale", { 
					image: exampleImage, 
								
			quality_label: "标清", 
								
			low_vram: false, 
						
	});

	console.log(result.data);
	
```

Accepts 3 parameters:

image:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 上传图片 Image component. For input, either path or url must be provided. For output, path is always provided.

quality_label:
- Type: string
- Default: "标清"
- The input value that is provided in the 放大倍率 Radio component. 

low_vram:
- Type: boolean
- Default: False
- The input value that is provided in the 低显存模式 Checkbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "结果" Image component.


### API Name: /portrait_upscale
Description: 调用 flux-人像修复放大 工作流 参数: ref_img: 上传的原图 (numpy array) strength: 修复强度 (0-1) -> 写入节点 257 的 denoise 流程: 1. 读取 JSON 2. 覆盖节点 257 的 denoise 3. 保存 ref-image.png 供节点 233 使用 4. 启动队列返回新图片

```javascript
import { Client } from "@gradio/client";
	
	const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
	const exampleImage = await response_0.blob();
						
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/portrait_upscale", { 
					ref_img: exampleImage, 
								
			strength: 0.35, 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

ref_img:
- Type: Blob | File | Buffer
- Required
- The input value that is provided in the 上传人像原图 Image component. For input, either path or url must be provided. For output, path is always provided.

strength:
- Type: number
- Default: 0.35
- The input value that is provided in the 修复强度 (denoise)，越小越像原图，越大修复力越强 Slider component. 

Returns 1 element:

- Type: string
- The output value that appears in the "结果" Image component.


### API Name: /lambda_23


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_23", { 		
			subject: "Hello!!", 
								
			style: "通用", 
								
			quality: "高质量", 
								
			mood: "唯美", 
								
			detail: "中等", 
						
	});

	console.log(result.data);
	
```

Accepts 5 parameters:

subject:
- Type: string
- Required
- The input value that is provided in the 请输入中文或英文关键词 Textbox component. 

style:
- Type: string
- Default: "通用"
- The input value that is provided in the 图像风格 Radio component. 

quality:
- Type: string
- Default: "高质量"
- The input value that is provided in the 画质/细节 Radio component. 

mood:
- Type: string
- Default: "唯美"
- The input value that is provided in the 氛围/情绪 Radio component. 

detail:
- Type: string
- Default: "中等"
- The input value that is provided in the 详细度 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "中文提示词" Textbox component.

[1]: - Type: string
- The output value that appears in the "英文提示词" Textbox component.


### API Name: /clear_all


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/clear_all", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 7 elements:

[0]: - Type: string
- The output value that appears in the "请输入中文或英文关键词" Textbox component.

[1]: - Type: string
- The output value that appears in the "图像风格" Radio component.

[2]: - Type: string
- The output value that appears in the "画质/细节" Radio component.

[3]: - Type: string
- The output value that appears in the "氛围/情绪" Radio component.

[4]: - Type: string
- The output value that appears in the "详细度" Radio component.

[5]: - Type: string
- The output value that appears in the "中文提示词" Textbox component.

[6]: - Type: string
- The output value that appears in the "英文提示词" Textbox component.


### API Name: /on_submit


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_submit", { 		
			subject: "Hello!!", 
								
			style: "人像写真", 
								
			clothes: "无", 
								
			hair: "无", 
								
			expression: "无", 
								
			pose: "无", 
								
			background: "无", 
								
			accessory: ["无"], 
								
			age: "无", 
								
			gender: "无", 
								
			makeup: "无", 
								
			skin: "无", 
								
			angle: "平视", 
								
			quality: "高质量", 
								
			mood: "唯美", 
								
			detail: "基础", 
						
	});

	console.log(result.data);
	
```

Accepts 16 parameters:

subject:
- Type: string
- Required
- The input value that is provided in the 请输入人像描述关键词 Textbox component. 

style:
- Type: string
- Default: "人像写真"
- The input value that is provided in the 人像风格（必选） Radio component. 

clothes:
- Type: string
- Default: "无"
- The input value that is provided in the 服饰（单选，可无） Dropdown component. 

hair:
- Type: string
- Default: "无"
- The input value that is provided in the 发型（单选，可无） Dropdown component. 

expression:
- Type: string
- Default: "无"
- The input value that is provided in the 表情（单选，可无） Dropdown component. 

pose:
- Type: string
- Default: "无"
- The input value that is provided in the 姿态/动作（单选，可无） Dropdown component. 

background:
- Type: string
- Default: "无"
- The input value that is provided in the 背景（单选，可无） Dropdown component. 

accessory:
- Type: any
- Default: ["无"]
- The input value that is provided in the 配饰（多选，可无） Dropdown component. 

age:
- Type: string
- Default: "无"
- The input value that is provided in the 年龄（单选，可无） Dropdown component. 

gender:
- Type: string
- Default: "无"
- The input value that is provided in the 性别（单选，可无） Dropdown component. 

makeup:
- Type: string
- Default: "无"
- The input value that is provided in the 妆容（单选，可无） Dropdown component. 

skin:
- Type: string
- Default: "无"
- The input value that is provided in the 肤色（单选，可无） Dropdown component. 

angle:
- Type: string
- Required
- The input value that is provided in the 视角（单选） Radio component. 

quality:
- Type: string
- Default: "高质量"
- The input value that is provided in the 画质/细节 Radio component. 

mood:
- Type: string
- Default: "唯美"
- The input value that is provided in the 氛围/情绪 Radio component. 

detail:
- Type: string
- Default: "基础"
- The input value that is provided in the 详细度 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "中文提示词" Textbox component.

[1]: - Type: string
- The output value that appears in the "英文提示词" Textbox component.


### API Name: /clear_all_1


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/clear_all_1", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 18 elements:

[0]: - Type: string
- The output value that appears in the "请输入人像描述关键词" Textbox component.

[1]: - Type: string
- The output value that appears in the "人像风格（必选）" Radio component.

[2]: - Type: string
- The output value that appears in the "服饰（单选，可无）" Dropdown component.

[3]: - Type: string
- The output value that appears in the "发型（单选，可无）" Dropdown component.

[4]: - Type: string
- The output value that appears in the "表情（单选，可无）" Dropdown component.

[5]: - Type: string
- The output value that appears in the "姿态/动作（单选，可无）" Dropdown component.

[6]: - Type: string
- The output value that appears in the "背景（单选，可无）" Dropdown component.

[7]: - Type: 
- The output value that appears in the "配饰（多选，可无）" Dropdown component.

[8]: - Type: string
- The output value that appears in the "年龄（单选，可无）" Dropdown component.

[9]: - Type: string
- The output value that appears in the "性别（单选，可无）" Dropdown component.

[10]: - Type: string
- The output value that appears in the "妆容（单选，可无）" Dropdown component.

[11]: - Type: string
- The output value that appears in the "肤色（单选，可无）" Dropdown component.

[12]: - Type: string
- The output value that appears in the "视角（单选）" Radio component.

[13]: - Type: string
- The output value that appears in the "画质/细节" Radio component.

[14]: - Type: string
- The output value that appears in the "氛围/情绪" Radio component.

[15]: - Type: string
- The output value that appears in the "详细度" Radio component.

[16]: - Type: string
- The output value that appears in the "中文提示词" Textbox component.

[17]: - Type: string
- The output value that appears in the "英文提示词" Textbox component.


### API Name: /lambda_24


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_24", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "自定义值（如：多个人名或职业，逗号、空格或换行分隔）" Textbox component.


### API Name: /lambda_25


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_25", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "自定义值（如：多个人名或职业，逗号、空格或换行分隔）" Textbox component.


### API Name: /lambda_26


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_26", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "自定义值（如：多个人名或职业，逗号、空格或换行分隔）" Textbox component.


### API Name: /lambda_27


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_27", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "自定义值（如：多个人名或职业，逗号、空格或换行分隔）" Textbox component.


### API Name: /lambda_28


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_28", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "自定义值（如：多个人名或职业，逗号、空格或换行分隔）" Textbox component.


### API Name: /lambda_29


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_29", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_30


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_30", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_31


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_31", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_32


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_32", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_33


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_33", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_34


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_34", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_35


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_35", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_36


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_36", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_37


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_37", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_38


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_38", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "固定值（每个提示词都会出现）" Textbox component.


### API Name: /lambda_39


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_39", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_40


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_40", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_41


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_41", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_42


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_42", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_43


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_43", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_44


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_44", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_45


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_45", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_46


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_46", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_47


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_47", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_48


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_48", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_49


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_49", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_50


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_50", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_51


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_51", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /lambda_52


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/lambda_52", { 		
			x: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

x:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "随机值（如：职业、服装、颜色等）" Textbox component.


### API Name: /generate_custom_prompts


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/generate_custom_prompts", { 		
			custom_values: "Hello!!", 
								
			fixed: "Hello!!", 
								
			random: "Hello!!", 
								
			count: 3, 
						
	});

	console.log(result.data);
	
```

Accepts 4 parameters:

custom_values:
- Type: string
- Required
- The input value that is provided in the 自定义值（如：多个人名或职业，逗号、空格或换行分隔） Textbox component. 

fixed:
- Type: string
- Required
- The input value that is provided in the 固定值（每个提示词都会出现） Textbox component. 

random:
- Type: string
- Required
- The input value that is provided in the 随机值（如：职业、服装、颜色等） Textbox component. 

count:
- Type: any
- Default: 3
- The input value that is provided in the 生成数量 Number component. 

Returns 1 element:

- Type: string
- The output value that appears in the "生成的提示词" Textbox component.


### API Name: /_push_and_notify


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_push_and_notify", { 		
			text: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

text:
- Type: string
- Required
- The input value that is provided in the 生成的提示词 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_565" Markdown component.


### API Name: /on_disabled_gallery_select


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_disabled_gallery_select", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: number
- The output value that appears in the "DISABLED_SELECTED_ID" Number component.


### API Name: /on_gallery_select


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_gallery_select", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 14 elements:

[0]: - Type: number
- The output value that appears in the "ID" Number component.

[1]: - Type: string
- The output value that appears in the "名称" Textbox component.

[2]: - Type: string
- The output value that appears in the "模型名称" Textbox component.

[3]: - Type: string
- The output value that appears in the "描述" Textbox component.

[4]: - Type: string
- The output value that appears in the "关键词" Textbox component.

[5]: - Type: string
- The output value that appears in the "图片文件" Textbox component.

[6]: - Type: number
- The output value that appears in the "权重" Slider component.

[7]: - Type: number
- The output value that appears in the "步数" Slider component.

[8]: - Type: string
- The output value that appears in the "风格" Textbox component.

[9]: - Type: string
- The output value that appears in the "示例提示词" Textbox component.

[10]: - Type: string
- The output value that appears in the "背景" Textbox component.

[11]: - Type: string
- The output value that appears in the "构图" Textbox component.

[12]: - Type: number
- The output value that appears in the "CFG(LoRA没有特殊要求，默认不调整)" Slider component.

[13]: - Type: string
- The output value that appears in the "value_589" Html component.


### API Name: /on_add_click


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_add_click", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 15 elements:

[0]: - Type: number
- The output value that appears in the "ID" Number component.

[1]: - Type: string
- The output value that appears in the "名称" Textbox component.

[2]: - Type: string
- The output value that appears in the "模型名称" Textbox component.

[3]: - Type: string
- The output value that appears in the "描述" Textbox component.

[4]: - Type: string
- The output value that appears in the "关键词" Textbox component.

[5]: - Type: string
- The output value that appears in the "图片文件" Textbox component.

[6]: - Type: number
- The output value that appears in the "权重" Slider component.

[7]: - Type: number
- The output value that appears in the "步数" Slider component.

[8]: - Type: string
- The output value that appears in the "风格" Textbox component.

[9]: - Type: string
- The output value that appears in the "示例提示词" Textbox component.

[10]: - Type: string
- The output value that appears in the "背景" Textbox component.

[11]: - Type: string
- The output value that appears in the "构图" Textbox component.

[12]: - Type: number
- The output value that appears in the "CFG(LoRA没有特殊要求，默认不调整)" Slider component.

[13]: - Type: string
- The output value that appears in the "value_589" Html component.

[14]: - Type: string
- The output value that appears in the "状态" Textbox component.


### API Name: /on_delete_request


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_delete_request", { 		
			current_id: 3, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

current_id:
- Type: number
- Required
- The input value that is provided in the ID Number component. 

Returns list of 3 elements:

[0]: - Type: number
- The output value that appears in the "PENDING_DELETE" Number component.

[1]: - Type: string
- The output value that appears in the "状态" Textbox component.

[2]: - Type: string
- The output value that appears in the "value_589" Html component.


### API Name: /on_cancel_delete


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_cancel_delete", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 3 elements:

[0]: - Type: number
- The output value that appears in the "PENDING_DELETE" Number component.

[1]: - Type: string
- The output value that appears in the "状态" Textbox component.

[2]: - Type: string
- The output value that appears in the "value_589" Html component.


### API Name: /on_confirm_delete


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_confirm_delete", { 		
			pending_id: 3, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

pending_id:
- Type: number
- Required
- The input value that is provided in the PENDING_DELETE Number component. 

Returns list of 4 elements:

[0]: - Type: number
- The output value that appears in the "PENDING_DELETE" Number component.

[1]: - Type: string
- The output value that appears in the "状态" Textbox component.

[2]: - Type: string
- The output value that appears in the "value_589" Html component.

[3]: - Type: 
- The output value that appears in the "Lora 图片库" Gallery component.


### API Name: /save_detail


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/save_detail", { 		
			id_val: 3, 
								
			name_val: "Hello!!", 
								
			path_val: "Hello!!", 
								
			desc_val: "Hello!!", 
								
			keywords_val: "Hello!!", 
								
			img_val: "Hello!!", 
								
			strength_val: 1, 
								
			steps_val: 8, 
								
			style_val: "Hello!!", 
								
			ex_prompt_val: "Hello!!", 
								
			bg_val: "Hello!!", 
								
			comp_val: "Hello!!", 
								
			cfg_val: 1, 
						
	});

	console.log(result.data);
	
```

Accepts 13 parameters:

id_val:
- Type: number
- Required
- The input value that is provided in the ID Number component. 

name_val:
- Type: string
- Required
- The input value that is provided in the 名称 Textbox component. 

path_val:
- Type: string
- Required
- The input value that is provided in the 模型名称 Textbox component. 

desc_val:
- Type: string
- Required
- The input value that is provided in the 描述 Textbox component. 

keywords_val:
- Type: string
- Required
- The input value that is provided in the 关键词 Textbox component. 

img_val:
- Type: string
- Required
- The input value that is provided in the 图片文件 Textbox component. 

strength_val:
- Type: number
- Default: 1
- The input value that is provided in the 权重 Slider component. 

steps_val:
- Type: number
- Default: 8
- The input value that is provided in the 步数 Slider component. 

style_val:
- Type: string
- Required
- The input value that is provided in the 风格 Textbox component. 

ex_prompt_val:
- Type: string
- Required
- The input value that is provided in the 示例提示词 Textbox component. 

bg_val:
- Type: string
- Required
- The input value that is provided in the 背景 Textbox component. 

comp_val:
- Type: string
- Required
- The input value that is provided in the 构图 Textbox component. 

cfg_val:
- Type: number
- Default: 1
- The input value that is provided in the CFG(LoRA没有特殊要求，默认不调整) Slider component. 

Returns list of 4 elements:

[0]: - Type: number
- The output value that appears in the "ID" Number component.

[1]: - Type: 
- The output value that appears in the "Lora 图片库" Gallery component.

[2]: - Type: string
- The output value that appears in the "value_589" Html component.

[3]: - Type: string
- The output value that appears in the "状态" Textbox component.


### API Name: /on_disable_model


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_disable_model", { 		
			current_id: 3, 
								
			current_name: "Hello!!", 
								
			current_path: "Hello!!", 
								
			current_desc: "Hello!!", 
								
			current_keywords: "Hello!!", 
								
			current_img: "Hello!!", 
								
			current_strength: 1, 
								
			current_steps: 8, 
								
			current_style: "Hello!!", 
								
			current_ex_prompt: "Hello!!", 
								
			current_bg: "Hello!!", 
								
			current_comp: "Hello!!", 
						
	});

	console.log(result.data);
	
```

Accepts 12 parameters:

current_id:
- Type: number
- Required
- The input value that is provided in the ID Number component. 

current_name:
- Type: string
- Required
- The input value that is provided in the 名称 Textbox component. 

current_path:
- Type: string
- Required
- The input value that is provided in the 模型名称 Textbox component. 

current_desc:
- Type: string
- Required
- The input value that is provided in the 描述 Textbox component. 

current_keywords:
- Type: string
- Required
- The input value that is provided in the 关键词 Textbox component. 

current_img:
- Type: string
- Required
- The input value that is provided in the 图片文件 Textbox component. 

current_strength:
- Type: number
- Default: 1
- The input value that is provided in the 权重 Slider component. 

current_steps:
- Type: number
- Default: 8
- The input value that is provided in the 步数 Slider component. 

current_style:
- Type: string
- Required
- The input value that is provided in the 风格 Textbox component. 

current_ex_prompt:
- Type: string
- Required
- The input value that is provided in the 示例提示词 Textbox component. 

current_bg:
- Type: string
- Required
- The input value that is provided in the 背景 Textbox component. 

current_comp:
- Type: string
- Required
- The input value that is provided in the 构图 Textbox component. 

Returns list of 16 elements:

[0]: - Type: number
- The output value that appears in the "ID" Number component.

[1]: - Type: string
- The output value that appears in the "名称" Textbox component.

[2]: - Type: string
- The output value that appears in the "模型名称" Textbox component.

[3]: - Type: string
- The output value that appears in the "描述" Textbox component.

[4]: - Type: string
- The output value that appears in the "关键词" Textbox component.

[5]: - Type: string
- The output value that appears in the "图片文件" Textbox component.

[6]: - Type: number
- The output value that appears in the "权重" Slider component.

[7]: - Type: number
- The output value that appears in the "步数" Slider component.

[8]: - Type: string
- The output value that appears in the "风格" Textbox component.

[9]: - Type: string
- The output value that appears in the "示例提示词" Textbox component.

[10]: - Type: string
- The output value that appears in the "背景" Textbox component.

[11]: - Type: string
- The output value that appears in the "构图" Textbox component.

[12]: - Type: string
- The output value that appears in the "状态" Textbox component.

[13]: - Type: 
- The output value that appears in the "Lora 图片库" Gallery component.

[14]: - Type: 
- The output value that appears in the "禁用模型" Gallery component.

[15]: - Type: string
- The output value that appears in the "value_589" Html component.


### API Name: /open_loras_dir


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/open_loras_dir", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "状态" Textbox component.


### API Name: /open_image_dir


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/open_image_dir", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns 1 element:

- Type: string
- The output value that appears in the "状态" Textbox component.


### API Name: /refresh


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/refresh", { 
	});

	console.log(result.data);
	
```

Accepts 0 parameters:



Returns list of 2 elements:

[0]: - Type: 
- The output value that appears in the "Lora 图片库" Gallery component.

[1]: - Type: 
- The output value that appears in the "禁用模型" Gallery component.


### API Name: /on_enable_disabled


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/on_enable_disabled", { 		
			disabled_id: 3, 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

disabled_id:
- Type: number
- Required
- The input value that is provided in the DISABLED_SELECTED_ID Number component. 

Returns list of 5 elements:

[0]: - Type: number
- The output value that appears in the "DISABLED_SELECTED_ID" Number component.

[1]: - Type: 
- The output value that appears in the "Lora 图片库" Gallery component.

[2]: - Type: 
- The output value that appears in the "禁用模型" Gallery component.

[3]: - Type: string
- The output value that appears in the "状态" Textbox component.

[4]: - Type: string
- The output value that appears in the "value_589" Html component.


### API Name: /set_provider


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/set_provider", { 		
			p_label: "本地服务", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

p_label:
- Type: string
- Default: "本地服务"
- The input value that is provided in the 当前翻译服务 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "value_624" Markdown component.

[1]: - Type: string
- The output value that appears in the "当前翻译服务" Radio component.


### API Name: /save_baidu_config


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/save_baidu_config", { 		
			appid: "12345", 
								
			key: "54321", 
						
	});

	console.log(result.data);
	
```

Accepts 2 parameters:

appid:
- Type: string
- Default: "12345"
- The input value that is provided in the 百度 AppID Textbox component. 

key:
- Type: string
- Default: "54321"
- The input value that is provided in the 百度密钥 Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_630" Markdown component.


### API Name: /set_llm_provider


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/set_llm_provider", { 		
			p_label: "本地模型", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

p_label:
- Type: string
- Default: "本地模型"
- The input value that is provided in the 当前大模型服务 Radio component. 

Returns list of 2 elements:

[0]: - Type: string
- The output value that appears in the "value_637" Markdown component.

[1]: - Type: string
- The output value that appears in the "当前大模型服务" Radio component.


### API Name: /save_zhipu_config


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/save_zhipu_config", { 		
			key: "", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

key:
- Type: string
- Default: ""
- The input value that is provided in the ZHIPU_API_KEY Textbox component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_642" Markdown component.


### API Name: /_apply_model_choice


```javascript
import { Client } from "@gradio/client";
	
	const client = await Client.connect("http://127.0.0.1:7860/");
	const result = await client.predict("/_apply_model_choice", { 		
			choice: "完整模型：效果更佳", 
						
	});

	console.log(result.data);
	
```

Accepts 1 parameter:

choice:
- Type: string
- Default: "完整模型：效果更佳"
- The input value that is provided in the  Radio component. 

Returns 1 element:

- Type: string
- The output value that appears in the "value_651" Markdown component.
