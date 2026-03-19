// 返回顶部按钮
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded, creating back to top button');
    // 创建返回顶部按钮
    const backToTopBtn = document.createElement('div');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '30px';
    backToTopBtn.style.right = '30px';
    backToTopBtn.style.width = '48px';
    backToTopBtn.style.height = '48px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = '#f0f0f0';
    backToTopBtn.style.color = 'black';
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.alignItems = 'center';
    backToTopBtn.style.justifyContent = 'center';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.zIndex = '999999';
    backToTopBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    backToTopBtn.style.fontSize = '24px';
    backToTopBtn.style.fontWeight = 'bold';
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.pointerEvents = 'auto';
    backToTopBtn.style.transform = 'translateY(0)';
    
    console.log('Back to top button created:', backToTopBtn);
    
    // 添加点击事件
    backToTopBtn.addEventListener('click', () => {
        console.log('Back to top button clicked');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 添加到页面
    document.body.appendChild(backToTopBtn);
    console.log('Back to top button added to body');
});