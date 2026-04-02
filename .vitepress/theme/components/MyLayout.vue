<template>
  <Layout>
    <template #doc-before>
      <Title />
    </template>
    <template #doc-after>
      <div>
        <button @click="goBack">cd ..</button>
      </div>
    </template>
  </Layout>
  <CopyWright />
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import CopyWright from "./CopyWright.vue";
import Title from "./Title.vue";

const { Layout } = DefaultTheme;

function goBack(): void {
  history.back();
}
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--vp-c-color-d);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
}
</style>
