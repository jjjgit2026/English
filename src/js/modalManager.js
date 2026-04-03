// 模态框管理模块
export function loadModals() {
  console.log('[模态框管理] 开始加载模态框');
  
  // 检查模态框是否已存在
  if (!document.getElementById('userModal') || !document.getElementById('bookModal')) {
    // 动态加载模态框HTML
    fetch('../html/modal-templates.html')
      .then(response => response.text())
      .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        console.log('[模态框管理] 模态框加载完成');
      })
      .catch(error => {
        console.error('[模态框管理] 加载模态框失败:', error);
      });
  } else {
    console.log('[模态框管理] 模态框已存在，跳过加载');
  }
}
