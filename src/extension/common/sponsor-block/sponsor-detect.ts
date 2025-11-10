import type { BigModelResponse, DetectResult } from "./types";

export const bigModelDetect = async (token: string, subtitle: string): Promise<DetectResult[]> => {
  const url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
  const body = {
    "max_tokens": 1024,
    "messages": [
      {
        "content": "你是一个广告识别高手。",
        "role": "system"
      },
      {
        "content": `下面这段文本是一个视频的字幕数据，其中可能有部分广告，请尝试帮我找出广告的开始时间与结束时间。\n请简要的按如下格式给出：\nstart,end,desc\n每行一个，其中desc为简要描述，不超5个字，形如：xxx赞助，xxx广告。如果没有广告，则输出内容为空。\n${subtitle}`,
        "role": "user"
      }
    ],
    "model": "glm-4.5-flash",
    "stream": false,
    "temperature": 0.6
  }
  const options: RequestInit = {
    body: JSON.stringify(body),
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    method: 'POST'
  };

  const response = await fetch(url, options);
  if (response.status !== 200) {
    const errorDdata: BigModelResponse = await response.json();
    throw new Error(`BigModel API error: ${errorDdata.error?.code} - ${errorDdata.error?.message}`);
  }
  const data: BigModelResponse = await response.json();
  const text = data.choices.map(e => e.message.content).join('');
  const result: DetectResult[] = []
  text.split('\n').forEach((line) => {
    if (line.trim() !== '') {
      const [start, end, desc] = line.split(',');
      result.push({
        desc: desc,
        end: parseInt(end),
        start: parseInt(start)
      });
    }
  })
  return result;
}