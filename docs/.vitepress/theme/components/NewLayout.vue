<template>
    <!-- 对页面布局做统筹管理 -->
    <Layout :class="{ home: frontmatter?.index }">
        <template #not-found>
            <!-- 页面不存在 -->
                <div class="page404">
                    <PageASide type="page404" />
                    
                </div>
        </template>
        <template #layout-top>
            <ClientOnly><!-- 在布局下方添加 -->
                
                <div class="snow" v-if="theme.website?.showSnow&&isDark">
                    <div v-for="index in 80" :key="index" class="dot"></div>
                </div>
                <Lantern/>
            </ClientOnly>
        </template>
        <template #nav-bar-content-after>
            <!-- 在导航 social后添加 -->
        </template>
        <template #nav-screen-content-after>

        </template>
        <template #nav-bar-content-before>

            <!-- 在导航搜索框💰添加 -->
            <ClientOnly>
                <div v-if="!isPause" class="" style="padding-left: 32px;position: relative;height:40px;margin-right:0px;">
                    <Player />
                </div>
            </ClientOnly>

        </template>
        <template #nav-bar-title-after>
            <!-- 在标题后添加 -->
        </template>
        <template #sidebar-nav-before>
            <PageNavi />
           
                <div class="fireworkwrap">
                    <Firework></Firework>
                </div>
        </template>
        <template #doc-top>
            <ClientOnly>
                <!-- <PageSlider v-if="frontmatter?.index" :key="md5(page.relativePath)"></PageSlider> -->
            </ClientOnly>
        </template>
        <template #doc-before>
                <Home v-if="frontmatter?.index" />
                <ArticleBread v-if="(frontmatter?.post)" :article="page" />
                <ArticleMetadata v-if="(frontmatter?.post)" type="single" :article="page" :key="md5(page.relativePath)" />
        </template>
        <template #aside-bottom>
            <ClientOnly>
                
                <!-- <ArticleLink v-if="(frontmatter?.post)" :key="md5(page.relativePath)" /> -->
                <PageASide v-if="(frontmatter.index)" />
            </ClientOnly>
                <PageGZH />
                <!-- <Links v-if="(frontmatter.index)" /> -->
            
        </template>
        <template #doc-footer-before>
           
                <ArticleCC v-if="(frontmatter?.post)" />
                <ArticleRelate v-if="(frontmatter?.post)" :key="md5(page.relativePath)" />
  
        </template>
        <template #doc-bottom>
            <Copyright />
        </template>
        <!-- 返回顶部按钮 -->
        <ClientOnly>
            <div class="back-to-top" @click="backToTop">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 15l-6-6-6 6"/>
                </svg>
            </div>
        </ClientOnly>
    </Layout>
</template>
<script lang="ts" setup>
import { computed, toRefs,onMounted,ref, onUnmounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { usePlayerStore } from '../../store/player';
import md5 from 'blueimp-md5';
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import Player from './Player.vue';

const { isPause } = toRefs(usePlayerStore());
const { page, theme, frontmatter, isDark } = useData();
const { Layout } = DefaultTheme;

// 返回顶部按钮
const showBackToTop = ref(false);

// 监听滚动事件
function handleScroll() {
    showBackToTop.value = window.scrollY > 300;
}

// 返回顶部方法
function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 组件挂载时添加滚动事件监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 组件卸载时移除滚动事件监听
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>

.snowbanner {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    pointer-events: none;

    .img {
        width: 88%;
        height: fit-content;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%);
    }
}

.snow {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99999;
    pointer-events: none;

    .img {
        width: 88%;
        height: fit-content;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%);
    }
}

.page404 {
    width: 224px;
    margin: 50px auto;
}

/* 返回顶部按钮样式 */
.back-to-top {
    position: fixed !important;
    bottom: 30px !important;
    right: 30px !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    background-color: var(--vp-c-brand) !important;
    color: white !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 9999 !important;
    box-shadow: var(--vp-shadow-2) !important;
    transition: all 0.3s ease !important;
    opacity: 0.9 !important;
    pointer-events: auto !important;
}

.back-to-top:hover {
    background-color: var(--vp-c-brand) !important;
    transform: translateY(-3px) !important;
    opacity: 1 !important;
}

.back-to-top svg {
    width: 20px !important;
    height: 20px !important;
    fill: white !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .back-to-top {
        bottom: 20px !important;
        right: 20px !important;
        width: 40px !important;
        height: 40px !important;
    }
    
    .back-to-top svg {
        width: 18px !important;
        height: 18px !important;
    }
}
</style>

