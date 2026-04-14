<template>
  <footer>
    Powered by
    <a href="https://github.com/clark-cui/" target="_blank" title="作者"
      >clark-cui</a
    >
    | Copyright © 2025-{{ date }} | MIT License |
    <a href="https://beian.miit.gov.cn/" target="_blank" title="工信部备案号"
      >苏ICP备2026019316号</a
    >
    |
    <a
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011502013821"
      target="_blank"
      title="公安备案号"
      >苏公网安备32011502013821号</a
    >
  </footer>
</template>

<script lang="ts" setup>
const date = new Date().getFullYear();
</script>

<style lang="scss" scoped>
footer {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
  padding: 0 20px;
  font-size: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}

a {
  color: var(--vp-c-brand);
  font-weight: bold;

  &:hover {
    text-decoration: none;
    color: var(--vp-c-hover);
  }
}
</style>
