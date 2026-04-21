<template>
    <!-- 存档页面。按年、月进行显示 -->
    <div class="wrap">
        <!-- {{ gooddata }} -->
        <div class="archives">
            <div class="archive" v-for="(item, name) in data">
                <div class="year"><a :href="withBase(`/?year=${name.toString()}`)" @click="closeDropdown"> {{ name.toString() }}</a></div>
                <div class="months">
                    <span class="month" v-for="(cell, key) in item">
                        <a class="a" :href="withBase(`/?year=${name.toString()}&month=${key.toString()}`)" @click="closeDropdown"> {{
                            key.toString() }}<strong class="VPBadge tip strong mini">{{ item[key].length }}</strong></a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { initArchives } from '../functions'
import { data as themeposts } from '../posts.data'
const data = computed(() => initArchives(themeposts))

// 关闭下拉菜单的函数
function closeDropdown(event: Event) {
  // 查找当前点击元素的父级，找到对应的触发按钮
  let element = event.target as HTMLElement
  // 向上查找，直到找到包含标签、品牌或存档的容器
  while (element && !element.classList.contains('wrap')) {
    element = element.parentElement as HTMLElement
  }
  
  // 根据当前组件类型，关闭对应的下拉菜单
  if (element) {
    if (element.querySelector('.tags')) {
      // 这是标签组件，关闭标签下拉菜单
      const tagsButton = document.querySelector('.tags.a')
      if (tagsButton) {
        tagsButton.click()
      }
    } else if (element.querySelector('.brands')) {
      // 这是品牌组件，关闭品牌下拉菜单
      const brandsButton = document.querySelector('.brands.a')
      if (brandsButton) {
        brandsButton.click()
      }
    } else if (element.querySelector('.archives')) {
      // 这是存档组件，关闭存档下拉菜单
      const archivesButton = document.querySelector('.archives.a')
      if (archivesButton) {
        archivesButton.click()
      }
    }
  }
  // 不阻止默认事件，让页面正常导航
}
</script>

<style scoped>
.wrap {
    min-width: 300px;
    min-height: 100px;
    max-height: 40vh;
    max-width: 40vw;
    overflow-y: auto;
    padding: 20px;
}

.archives {
    display: flex;
    flex-direction: column;
    line-height: 24px;
}

.year {
    padding: 14px 0 8px 0;
    font-size: 15px;
    font-weight: 500;
    font-family: var(--date-font-family);
}

.month {
    margin: 5px;
    padding: 0 8px;
    display: inline-block;
    background-color: rgba(123, 123, 123, .05);
    color: var(--vp-c-text-1);
    font-size: 12px;
    border-radius: 2px;
    line-height: 24px;

    .a {
        color: var(--vp-c-text-1);
        font-weight: 500;
        text-decoration: none;
    }

    .a:hover {
        color: var(--vp-c-brand);
    }
}
</style>
