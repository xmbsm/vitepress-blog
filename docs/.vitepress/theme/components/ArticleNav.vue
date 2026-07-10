<template>
  <div class="article-nav" v-if="prevPost || nextPost">
    <div class="nav-row">
      <a v-if="prevPost" class="nav-card prev" :href="withBase(prevPost.relativePath || '')">
        <div class="nav-label">
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
          <span>上一篇</span>
        </div>
        <div class="nav-title">{{ prevPost.frontmatter?.title }}</div>
      </a>
      <div v-else class="nav-card prev empty"></div>

      <a v-if="nextPost" class="nav-card next" :href="withBase(nextPost.relativePath || '')">
        <div class="nav-label">
          <span>下一篇</span>
          <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </div>
        <div class="nav-title">{{ nextPost.frontmatter?.title }}</div>
      </a>
      <div v-else class="nav-card next empty"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as themeposts } from '../posts.data'

const { page } = useData()

function normalizePath(path: string): string {
  return path
    .replace(/^\//, '')
    .replace(/\.html$/, '.md')
}

const currentIndex = computed(() => {
  const currentPath = normalizePath(page.value.relativePath || '')
  return themeposts.findIndex((p: any) => {
    const postPath = normalizePath(p.relativePath || '')
    return postPath === currentPath
  })
})

const prevPost = computed(() => {
  const idx = currentIndex.value
  if (idx >= 0 && idx < themeposts.length - 1) {
    return themeposts[idx + 1]
  }
  return null
})

const nextPost = computed(() => {
  const idx = currentIndex.value
  if (idx > 0) {
    return themeposts[idx - 1]
  }
  return null
})
</script>

<style scoped>
.article-nav {
  margin: 32px 0;
}

.nav-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.nav-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-elv);
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.nav-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
}

.nav-card.prev {
  text-align: left;
}

.nav-card.next {
  text-align: right;
  align-items: flex-end;
}

.nav-card.empty {
  visibility: hidden;
}

.nav-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}

.nav-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.nav-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}



@media (max-width: 640px) {
  .nav-row {
    grid-template-columns: 1fr;
  }

  .nav-card.next {
    text-align: left;
    align-items: flex-start;
  }
}
</style>
