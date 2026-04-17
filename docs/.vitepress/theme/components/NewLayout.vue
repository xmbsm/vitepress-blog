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
        <template #nav-bar-title>
            <!-- 使用index.md的title字段作为logo旁的文字 -->
            <span v-if="frontmatter?.index">{{ frontmatter?.title }}</span>
            <span v-else>{{ site?.title }}</span>
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
                <!-- <PageASide v-if="(frontmatter.index)" /> -->
            </ClientOnly>
                <!-- <PageGZH /> -->
                <!-- <Links v-if="(frontmatter.index)" /> -->
            
        </template>
        <template #doc-footer-before>
           
                <ArticleCC v-if="(frontmatter?.post)" />
                <ArticleRelate v-if="(frontmatter?.post)" :key="md5(page.relativePath)" />
  
        </template>
        <template #doc-bottom>
            <Copyright />
        </template>
        
    </Layout>

    <!-- 返回顶部按钮 -->
    <div 
        id="back-to-top" 
        :style="backToTopStyle"
        @click="scrollToTop"
    >
        <div class="arrow"></div>
    </div>
</template>
<script lang="ts" setup>
import { computed, toRefs,onMounted,ref, onUnmounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { usePlayerStore } from '../../store/player';
import md5 from 'blueimp-md5';
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import Player from './Player.vue';
import BackToTop from './BackToTop.vue';

const { isPause } = toRefs(usePlayerStore());
const { page, theme, frontmatter, isDark, site } = useData();
const { Layout } = DefaultTheme;

// 滚动状态
const isScrolled = ref(false);

// 滚动事件处理
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
    isScrolled.value = window.scrollY > 500;
}

// 返回顶部方法
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // 滚动状态会通过handleScroll函数自动更新
}

// 响应式样式
const backToTopStyle = computed(() => ({
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: '999999',
    boxShadow: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    opacity: isScrolled.value ? '1' : '0',
    pointerEvents: isScrolled.value ? 'auto' : 'none',
    transform: isScrolled.value ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.3s ease'
}));
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

.arrow {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid black;
    transition: all 0.3s ease;
}

#back-to-top:hover {
    background-color: #000000 !important;
    transition: all 0.3s ease;
}

#back-to-top:hover .arrow {
    border-bottom: 9px solid white;
    transition: all 0.3s ease;
}

</style>



