<template>
    <div 
        id="back-to-top" 
        class="back-to-top" 
        @click="backToTop"
        v-show="isVisible"
    >
        ↑
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0

const handleScroll = () => {
    // 向下滚动一屏后再显示按钮
    isVisible.value = window.scrollY > screenHeight
}

function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
    position: fixed !important;
    bottom: 30px !important;
    right: 30px !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    background-color: #f0f0f0 !important;
    color: black !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 999999 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.3s ease !important;
    opacity: 0.9 !important;
    pointer-events: auto !important;
    transform: translateY(0) !important;
    font-size: 24px !important;
    font-weight: bold !important;
}

.back-to-top:hover {
    background-color: #e0e0e0 !important;
    transform: translateY(-3px) !important;
    opacity: 1 !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .back-to-top {
        bottom: 20px !important;
        right: 20px !important;
        width: 40px !important;
        height: 40px !important;
    }
}
</style>