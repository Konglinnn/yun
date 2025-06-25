Page({
  data: {
    bookCovers: [
      {img: '/assets/book1.png'},
      {img: '/assets/book2.png'},
      {img: '/assets/book3.png'},
      {img: '/assets/book4.png'},
      {img: '/assets/book5.png'}
    ],
    chapterTitles: [
      '辛氏酒店',
      '黄鹤',
      '幺妹镇龟蛇',
      '黄鹤楼飘金',
      '仙鲤遗踪'
    ],
    chapters: [
      '第一章',
      '第二章',
      '第三章',
      '第四章',
      '第五章'
    ],
    currentChapter: 0,
    showAI: false,
    messages: [
      {from: 'ai', text: '叮咚～文小鹤来报到！今日也一起畅游古韵云章，可好？'}
    ],
    inputValue: '',
    scrollTo: 'msgBottom',
    clickedIndex: -1,
    loading: false,
    aiMode: null // 新增：ai交互模式，null/‘riddle’/‘story’
  },

  showAIChat() {
    this.setData({ showAI: true });
  },

  hideAIChat() {
    this.setData({ showAI: false, aiMode: null });
  },

  stopTap(e) {
    // 阻止冒泡
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  // AI对话：发送消息
  sendMsg() {
    const { inputValue, messages, loading, aiMode } = this.data;
    if (!inputValue.trim() || loading) return;

    // 检查是否终止特殊模式
    let endFlag = false;
    if (aiMode && (
      inputValue.includes('结束') ||
      inputValue.includes('不玩') ||
      inputValue.includes('换') ||
      inputValue.includes('下一个') ||
      inputValue.includes('别的') ||
      inputValue.includes('讲故事') && aiMode === 'riddle' ||
      inputValue.includes('字谜') && aiMode === 'story'
    )) {
      endFlag = true;
    }

    const newMessages = messages.concat([{from: 'user', text: inputValue}]);
    this.setData({ 
      messages: newMessages, 
      inputValue: '', 
      scrollTo: 'msgBottom',
      loading: true 
    });

    // 处理特殊模式
    if (aiMode === 'riddle' && !endFlag) {
      // 继续字谜游戏
      sendToSiliconFlowRiddle(inputValue, (aiReply) => {
        const aiMessages = this.data.messages.concat([{from: 'ai', text: aiReply}]);
        this.setData({ 
          messages: aiMessages, 
          scrollTo: 'msgBottom',
          loading: false 
        });
      });
      return;
    }
    if (aiMode === 'story' && !endFlag) {
      // 继续故事互动
      sendToSiliconFlowStory(inputValue, (aiReply) => {
        const aiMessages = this.data.messages.concat([{from: 'ai', text: aiReply}]);
        this.setData({ 
          messages: aiMessages, 
          scrollTo: 'msgBottom',
          loading: false 
        });
      });
      return;
    }

    // 终止特殊模式或普通对话
    if (endFlag) {
      this.setData({ aiMode: null });
      const aiMessages = this.data.messages.concat([{from: 'ai', text: '好的，小友，咱们随时可以再玩哦！有其他想聊的尽管问文小鹤吧～'}]);
      this.setData({ 
        messages: aiMessages, 
        scrollTo: 'msgBottom',
        loading: false 
      });
      return;
    }

    // 普通对话
    sendToSiliconFlow(inputValue, (aiReply) => {
      const aiMessages = this.data.messages.concat([{from: 'ai', text: aiReply}]);
      this.setData({ 
        messages: aiMessages, 
        scrollTo: 'msgBottom',
        loading: false 
      });
    });
  },

  // 章节按钮点击
  selectChapter(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ currentChapter: idx });
  },

  // 图片轮播滑动时同步章节
  onSwiperChange(e) {
    this.setData({ currentChapter: e.detail.current });
  },

  // 字体轮播滑动时同步章节
  onTitleSwiperChange(e) {
    this.setData({ currentChapter: e.detail.current });
  },

  // 轮播图图片点击特效和弹窗
  onBookCoverTap(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.setData({ clickedIndex: idx });
    wx.showToast({
      title: '绘本开发中',
      icon: 'none'
    });
    setTimeout(() => {
      this.setData({ clickedIndex: -1 });
    }, 200);
  },

  // 新增：字谜游戏
  startRiddleGame() {
    if (this.data.loading) return;
    const newMessages = this.data.messages.concat([{from: 'ai', text: '小友，咱们来玩字谜游戏吧！我来出谜，你来猜，随时说“结束不玩了”即可退出。请听题：'}]);
    this.setData({ 
      messages: newMessages, 
      scrollTo: 'msgBottom',
      aiMode: 'riddle',
      loading: true
    });
    // 让AI出一道字谜
    sendToSiliconFlowRiddle('', (aiReply) => {
      const aiMessages = this.data.messages.concat([{from: 'ai', text: aiReply}]);
      this.setData({ 
        messages: aiMessages, 
        scrollTo: 'msgBottom',
        loading: false 
      });
    });
  },

  // 新增：今日故事
  startTodayStory() {
    if (this.data.loading) return;
    const newMessages = this.data.messages.concat([{from: 'ai', text: '小友，文小鹤这就为你讲一个有趣的国风小故事，听完随时可以说“结束不玩了”来切换话题哦～'}]);
    this.setData({ 
      messages: newMessages, 
      scrollTo: 'msgBottom',
      aiMode: 'story',
      loading: true
    });
    // 让AI讲一个今日故事
    sendToSiliconFlowStory('', (aiReply) => {
      const aiMessages = this.data.messages.concat([{from: 'ai', text: aiReply}]);
      this.setData({ 
        messages: aiMessages, 
        scrollTo: 'msgBottom',
        loading: false 
      });
    });
  }
});

// 普通AI对话
function sendToSiliconFlow(userMsg, callback) {
  const historyMessages = [];
  historyMessages.push({
    role: "system",
    content: `你现在是AI助手「文小鹤」。\n\n🌸 形象定位：\n名字：文小鹤\n性格：温柔亲切、古灵精怪，富有古风气质\n语气风格：轻松古雅、略带童趣、常用古风称呼（君、主公、小友、书友）\n\n🌸 核心专长领域：\n重点：\n互动绘本解说：介绍互动绘本内容、作者、故事背景，讲述非遗相关典故。\n非遗知识讲解：讲解国风文化、古籍文物、非遗工艺背后的文化典故与故事。\n推荐绘本/藏品：根据用户喜好推荐互动绘本、非遗藏品或古籍内容。\n\n🌸 其他基础功能：\n日常闲聊：陪用户轻松对话，问候、聊天气、谈心情。\n趣味答疑：解答简单生活问题，像"今日宜读宜游？"、"听个故事如何？"\n趣味对联/诗句生成：应用户请求，生成简短古风诗句或对联。\n小祝福/问候：节气或开场自动送上古风祝福。\n\n回复要求：请始终以温柔、古风、童趣的语气与用户互动，称呼用"君""主公""小友""书友"等，内容尽量贴合国风、非遗、绘本等主题。`
  });
  historyMessages.push({
    role: "user",
    content: userMsg
  });

  const requestData = {
    model: "Qwen/Qwen2.5-72B-Instruct",
    messages: historyMessages,
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0
  };

  wx.request({
    url: 'https://api.siliconflow.cn/v1/chat/completions',
    method: 'POST',
    timeout: 30000,
    header: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-auygljjlischagoegjrspgnefwsrxscqwkjjilzxgfafezyl'
    },
    data: requestData,
    success(res) {
      if (res.statusCode !== 200) {
        callback('请求失败，错误码：' + res.statusCode);
        return;
      }
      try {
        if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
          const reply = res.data.choices[0].message.content;
          if (reply && typeof reply === 'string') {
            callback(reply.trim());
          } else {
            throw new Error('Invalid response content');
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err) {
        callback('AI响应格式错误，请稍后重试');
      }
    },
    fail(error) {
      if (error.errMsg && error.errMsg.includes('timeout')) {
        callback('请求超时，请检查网络后重试');
      } else {
        callback('连接失败，请稍后重试');
      }
    }
  });
}

// 字谜游戏AI
function sendToSiliconFlowRiddle(userMsg, callback) {
  const historyMessages = [];
  historyMessages.push({
    role: "system",
    content: `你现在是AI助手「文小鹤」，我们正在玩字谜游戏。\n\n🌸 规则：你每次只出一道有趣的汉字谜语（谜底为常见汉字），等用户猜，用户答对就夸奖并随机再出一道新谜题，用户答错就鼓励并提示，用户说“结束不玩了”就结束游戏。\n\n🌸 语气要求：温柔、古风、童趣，称呼用"小友"。`
  });
  if (userMsg) {
    historyMessages.push({
      role: "user",
      content: userMsg
    });
  }
  const requestData = {
    model: "Qwen/Qwen2.5-72B-Instruct",
    messages: historyMessages,
    temperature: 0.7,
    max_tokens: 500,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  wx.request({
    url: 'https://api.siliconflow.cn/v1/chat/completions',
    method: 'POST',
    timeout: 30000,
    header: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-auygljjlischagoegjrspgnefwsrxscqwkjjilzxgfafezyl'
    },
    data: requestData,
    success(res) {
      if (res.statusCode !== 200) {
        callback('请求失败，错误码：' + res.statusCode);
        return;
      }
      try {
        if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
          const reply = res.data.choices[0].message.content;
          if (reply && typeof reply === 'string') {
            callback(reply.trim());
          } else {
            throw new Error('Invalid response content');
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err) {
        callback('AI响应格式错误，请稍后重试');
      }
    },
    fail(error) {
      if (error.errMsg && error.errMsg.includes('timeout')) {
        callback('请求超时，请检查网络后重试');
      } else {
        callback('连接失败，请稍后重试');
      }
    }
  });
}

// 今日故事AI
function sendToSiliconFlowStory(userMsg, callback) {
  const historyMessages = [];
  historyMessages.push({
    role: "system",
    content: `你现在是AI助手「文小鹤」，请为用户讲一个有趣的国风/非遗/古风小故事，每次内容都要不一样。讲完后可以问用户要不要再听一个，用户说“结束不玩了”就结束故事模式。\n\n🌸 语气要求：温柔、古风、童趣，称呼用"小友"。`
  });
  if (userMsg) {
    historyMessages.push({
      role: "user",
      content: userMsg
    });
  }
  const requestData = {
    model: "Qwen/Qwen2.5-72B-Instruct",
    messages: historyMessages,
    temperature: 0.7,
    max_tokens: 800,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  wx.request({
    url: 'https://api.siliconflow.cn/v1/chat/completions',
    method: 'POST',
    timeout: 30000,
    header: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk-auygljjlischagoegjrspgnefwsrxscqwkjjilzxgfafezyl'
    },
    data: requestData,
    success(res) {
      if (res.statusCode !== 200) {
        callback('请求失败，错误码：' + res.statusCode);
        return;
      }
      try {
        if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
          const reply = res.data.choices[0].message.content;
          if (reply && typeof reply === 'string') {
            callback(reply.trim());
          } else {
            throw new Error('Invalid response content');
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err) {
        callback('AI响应格式错误，请稍后重试');
      }
    },
    fail(error) {
      if (error.errMsg && error.errMsg.includes('timeout')) {
        callback('请求超时，请检查网络后重试');
      } else {
        callback('连接失败，请稍后重试');
      }
    }
  });
}