<template>
  <!-- 文章列表内容 -->
  <div class="articlelist" :class="{ grid: listview === 'grid', list: listview === 'list' }">
    <div class="acontent">
      <div class="main">
        <div class="cover">
          <a :href="withBase(article.relativePath)" class="a">
            <img class="img bgimg" :src="article.frontmatter?.cover" /></a>
        </div>
        <div class="msg">
          <div class="title"><a :href="withBase(article.relativePath)" class="a">
              <!-- 标签部分，暂时隐藏 -->
              <!-- <span class="cats" v-if="article.frontmatter?.categories">
                <span class="cat" v-for="item in article.frontmatter.categories.slice(0, 2)">{{ item }}</span>
                <span class="cat" v-if="article.frontmatter.categories.length > 2">...</span>
              </span> -->
              {{ article.frontmatter.title }}</a>
          </div>
          <div class="desc" v-html="article.frontmatter?.description"></div>
          <div class="meta">
            <ClientOnly>
              <ArticleMetadata :article="article" />
            </ClientOnly>
          </div>
          <div class="actions">
            <a :href="article.frontmatter?.externalLink || article.frontmatter?.github || article.frontmatter?.view || withBase(article.relativePath)" target="_blank" rel="noopener noreferrer" class="btn btn-external">
              {{ article.frontmatter?.externalLinkText || article.frontmatter?.githubText || article.frontmatter?.viewText || '外链' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { useData, withBase } from 'vitepress'
import { useStorage } from '@vueuse/core'
const { theme, frontmatter } = useData();
const listview = useStorage('listview', 'grid')
import type { Post } from '../types'
// 定义文章属性
const props = defineProps<{
  article?: Post
}>();
</script>

<style scoped>
.articlelist {
  width: 100%;
  box-sizing: border-box;
}

.articlelist.list {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;

  .acontent {
    width: 100%;
    box-sizing: border-box;
  }

  .main {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;

    .cover {
      width: 30%;
      max-width: 220px;
      display: flex;
      overflow: hidden;
      position: relative;
      margin-right: 20px;
      border-radius: 8px;
      border: 1px solid var(--vp-c-gray-3);
      overflow: hidden;
      box-shadow: rgba(61, 72, 83, 0.36) 0px 0px 1px, rgba(61, 72, 83, 0.06) 0px 2px 6px;
      box-sizing: border-box;

      .img {
        transition-timing-function: cubic-bezier(.4, 0, 1, 1);
        transition-duration: .3s;
        object-fit: cover;
        width: 100%;
        height: auto;
        box-sizing: border-box;
      }

      .img:hover {
        transform: scaleX(1.05) scaleY(1.05)
      }
    }

    .msg {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;

      .title {
        margin: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        box-sizing: border-box;

        .cats {
          .cat {
            background-color: var(--vp-c-brand);
            color: #ffffff;
            font-size: 12px;
            padding: 2px 5px;
            margin-right: 5px;
            border-radius: 2px;
          }
        }
      }

      .desc {
        color: var(--vp-c-text-1);
        font-size: 13px;
        margin-top: 10px;
        opacity: .6;
        font-weight: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
      }
    }
  }
}

.articlelist.grid {
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  border-radius: 8px;
  border: .5px solid var(--vp-c-gray-soft);
  background: var(--vp-c-bg-elv);
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .3s;
  transition-property: box-shadow;
  overflow: hidden;
  box-shadow: var(--vp-shadow-1);
  width: 100%;
  box-sizing: border-box;

  .cover {
    /* height: 12rem; */
    padding-top: 66%;
    width: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;

    .img {
      transition-timing-function: cubic-bezier(.4, 0, 1, 1);
      transition-duration: .3s;
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
    }

    .img:hover {
      transform: scaleX(1.05) scaleY(1.05)
    }
  }

  .msg {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    width: 100%;
    margin-top: 1.25rem;
    box-sizing: border-box;

    .title {
      margin: 0;
      font-size: 1rem;
      line-height: 1.5rem;
      height: 1.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-font-smoothing: antialiased;
      font-weight: 500;
      box-sizing: border-box;

      .cats {
        .cat {
          background-color: var(--vp-c-brand);
          color: #ffffff;
          font-size: 12px;
          padding: 2px 5px;
          margin-right: 5px;
          border-radius: 2px;
        }
      }
    }

    .desc {
      display: none;
    }
  }
}

.articlelist.grid:hover {
  box-shadow: var(--vp-shadow-3);
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .3s;
  transition-property: box-shadow;
  background-color: var(--vp-c-bg-elv);
  overflow: hidden;
}

/* 按钮样式 */
.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.btn-detail {
  background-color: var(--vp-c-brand);
  color: #ffffff;
}

.btn-detail:hover {
  background-color: var(--vp-c-brand);
  opacity: 0.8;
  transform: translateY(-1px);
}

.btn-external {
  background-color: transparent;
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-gray-3);
}

.btn-external:hover {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: translateY(-1px);
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .articlelist {
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .articlelist.list {
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .articlelist.list .main {
    display: flex !important;
    flex-direction: row !important;
    margin-top: 10px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .articlelist.list .cover {
    width: 30% !important;
    max-width: 150px !important;
    display: flex !important;
    overflow: hidden !important;
    position: relative !important;
    margin-right: 12px !important;
    border-radius: 6px !important;
    border: 1px solid var(--vp-c-gray-3) !important;
    overflow: hidden !important;
    box-shadow: rgba(61, 72, 83, 0.36) 0px 0px 1px, rgba(61, 72, 83, 0.06) 0px 2px 6px !important;
    box-sizing: border-box !important;
  }
  
  .articlelist.list .msg {
    flex: 1 !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
  
  .actions {
    margin-top: 8px;
    box-sizing: border-box !important;
  }
  
  .btn {
    padding: 3px 10px;
    font-size: 11px;
    box-sizing: border-box !important;
  }
  
  .articlelist.list .title {
    font-size: 0.9rem;
    line-height: 1.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-font-smoothing: antialiased;
    font-weight: 500;
    box-sizing: border-box !important;
  }
  
  .articlelist.list .desc {
    color: var(--vp-c-text-1);
    font-size: 12px;
    margin-top: 8px;
    opacity: .6;
    font-weight: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box !important;
  }
  
  .articlelist.grid .title {
    font-size: 0.9rem;
    line-height: 1.3rem;
    height: 1.3rem;
    box-sizing: border-box !important;
  }
  
  /* 确保移动端图片正确显示 */
  .articlelist.list .cover .img {
    transition-timing-function: cubic-bezier(.4, 0, 1, 1) !important;
    transition-duration: .3s !important;
    object-fit: cover !important;
    width: 100% !important;
    height: auto !important;
    box-sizing: border-box !important;
  }
  
  .articlelist.list .cover .img:hover {
    transform: scaleX(1.05) scaleY(1.05) !important;
  }
  
  /* 确保移动端grid布局正确 */
  .articlelist.grid {
    width: 100% !important;
    box-sizing: border-box !important;
  }
}
</style>