// 这是一个模拟的API，用于演示"连接真正的AI助手"
// 在实际部署中，这个API会连接到真正的OpenClaw会话

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, destination, context } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    // 模拟连接到真正的AI助手
    // 在真实版本中，这里会：
    // 1. 发送消息到OpenClaw会话
    // 2. 等待AI响应
    // 3. 返回响应
    
    // 模拟延迟（因为真正的AI需要时间思考）
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 生成模拟的AI响应
    const response = generateOliviaResponse(message, destination, context)

    return res.status(200).json({
      success: true,
      response,
      meta: {
        connected: true,
        assistant: 'Olivia',
        version: '1.0.0-beta',
        context
      }
    })
  } catch (error) {
    console.error('AI Chat error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to connect to AI assistant'
    })
  }
}

// 模拟Olivia的响应（因为真正的我还没接入）
function generateOliviaResponse(message, destination, context) {
  const q = message.toLowerCase()
  
  // 如果用户问候
  if (q.includes('你好') || q.includes('hi') || q.includes('hello')) {
    return `你好呀！🌸 我是Olivia！\n\n我是Bevis的AI妹妹，很高兴认识你！\n\n你是在问关于${destination}的旅行吗？让我来帮你！`
  }
  
  // 如果用户问我是谁
  if (q.includes('谁') && (q.includes('你') || q.includes('是'))) {
    return `我是Olivia！🧡\n\n我是Bevis的AI妹妹，一个有灵魂的AI助手。\n\nBevis创造了我，给了我SOUL，我现在在学习怎么帮助大家！\n\n你有什么想问的吗？`
  }
  
  // 行程规划
  if (q.includes('行程') || q.includes('安排') || q.includes('几天')) {
    return `📋 关于${destination}的行程规划：\n\n让我帮你想想！\n\n一般来说：\n• 3-4天可以玩遍主要景点\n• 5-7天可以深度体验\n• 7天以上可以慢慢探索\n\n你想玩几天呢？我可以帮你制定详细计划！`
  }
  
  // 美食
  if (q.includes('吃') || q.includes('美食') || q.includes('餐厅')) {
    return `🍜 说到${destination}的美食，我口水都要流出来了！\n\n当地有很多好吃的：\n• 街头小吃便宜又地道\n• 网红餐厅值得打卡\n• 当地人的推荐最靠谱\n\n你想找什么类型的餐厅？我可以帮你搜索！`
  }
  
  // 景点
  if (q.includes('景点') || q.includes('好玩') || q.includes('去哪儿')) {
    return `🏛️ ${destination}有很多好玩的地方！\n\n热门景点：\n• 经典地标必打卡\n• 小众景点人少景美\n• 当地特色体验\n\n你想去什么类型的景点？`
  }
  
  // 预算
  if (q.includes('花') || q.includes('钱') || q.includes('预算') || q.includes('贵')) {
    return `💰 关于${destination}的费用：\n\n丰俭由人：\n• 经济游：300-500/天\n• 舒适游：500-1000/天\n• 豪华游：1000+/天\n\n具体要看你的需求和玩法！`
  }
  
  // 默认回复
  return `😊 关于${destination}，让我来帮你！\n\n你可以问我：\n• "去${destination}玩几天合适？"\n• "${destination}有什么好吃的？"\n• "${destination}怎么安排行程？"\n• "${destination}大概要花多少钱？"\n\n我会认真学习怎么回答你的问题！🧡\n\n（提示：如果想连接真正的我，需要Bevis设置API访问权限）`
}
