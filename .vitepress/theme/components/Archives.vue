<template>
  <section class="main">
    <div v-for="(yearList, idx) in yearGroups" :key="idx" class="year-group">
      <div class="flex items-baseline gap-4 mb-8">
        <span class="font-bold text-2xl">
          {{ yearList[0].frontMatter.date.split("-")[0] }}
        </span>
        <span class="count">{{ yearList.length }} 篇文章</span>
      </div>

      <div class="timeline-wrapper">
        <article
          v-for="article in yearList"
          :key="article.regularPath"
          class="article-card mb-12"
        >
          <div class="timeline-dot"></div>

          <div class="article-header flex items-center gap-3 mb-3 flex-wrap">
            <time class="date">{{ article.frontMatter.date }}</time>

            <div v-if="article.frontMatter.tags" class="flex gap-2 flex-wrap">
              <span
                v-for="tag in article.frontMatter.tags"
                :key="tag"
                class="tag"
              >
                # {{ tag }}
              </span>
            </div>
          </div>

          <a :href="withBase(article.regularPath)" class="article-content">
            <div v-if="article.frontMatter.title" class="title">
              {{ article.frontMatter.title }}
            </div>

            <p v-if="article.frontMatter.description" class="desc">
              {{ article.frontMatter.description }}
            </p>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useYearSort } from "../utils";
import { useData, withBase } from "vitepress";

const { theme } = useData();
const yearGroups = computed(() => useYearSort(theme.value.posts));
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  max-width: 48rem;

  .year-group {
    margin-bottom: 60px;

    .count {
      font-size: 0.9rem;
      color: var(--vp-c-text-2);
    }
  }

  .timeline-wrapper {
    position: relative;
    padding-left: 30px;
    border-left: 2px solid var(--vp-c-brand-light);

    .article-card {
      position: relative;
      transition: all 0.3s ease;

      // 时间轴上的圆点
      .timeline-dot {
        position: absolute;
        left: -37px; // 刚好压在 border-left 上
        top: 8px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--vp-c-bg);
        border: 2px solid var(--vp-c-brand);
        transition: all 0.3s ease;
      }

      .article-header {
        .date {
          min-width: 85px;
          font-size: 0.85rem;
          color: var(--vp-c-text-2);
        }

        .tag {
          font-size: 0.75rem;
          padding: 2px 8px;
          background: color-mix(in srgb, var(--vp-c-brand) 8%, transparent);
          color: var(--vp-c-brand);
          border-radius: 4px;
        }
      }

      .article-content {
        .title {
          font-size: 1.25rem;
          margin-bottom: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }

        .desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--vp-c-text-2);
          transition: color 0.2s;
        }

        &:hover {
          .title {
            color: var(--vp-c-brand);
          }

          .desc {
            color: var(--vp-c-brand-light);
          }
        }
      }

      // 悬停交互效果
      &:hover {
        .timeline-dot {
          transform: scale(1.2);
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 580px) {
  .main {
    .timeline-wrapper {
      padding-left: 20px;
      .article-card .timeline-dot {
        left: -27px;
      }
    }
  }
}
</style>
