<template>
  <div class="about-page">
    <div class="about-content">
      <div class="about-avatar">
        <img src="/avatar.png" alt="Clark Cui" />
      </div>
      <h1 class="about-name">Hoshino Hikari</h1>
      <p class="about-bio">FrontEnd Developer</p>
      <div class="about-desc">
        <p>
          I'm a Frontend Engineer with nearly 2 years of experience, building
          scalable applications with
          <a
            class="highlight-link"
            href="https://vuejs.org/"
            target="_blank"
            rel="noopener"
            >Vue.js</a
          >
          and
          <a
            class="highlight-link"
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener"
            >TypeScript</a
          >.
        </p>
        <p>
          Since graduating in 2024, I've been working on
          <span class="highlight">ToB systems</span>, taking part in projects
          from <span class="highlight">0 to 1</span> and designing
          <span class="highlight">frontend architecture</span> along the way. I
          also responsible for
          <span class="highlight">Java backend development</span>.
        </p>
        <p>
          I'm a big fan of <span class="highlight">ACG</span> — you might have
          noticed my avatar, it's pretty cute, right? It was designed by
          <a
            class="highlight-link"
            href="https://www.pixiv.net/users/34876898"
            target="_blank"
            rel="noopener"
            >Myon</a
          >. As you probably guessed, besides programming, I also enjoy
          <span class="highlight">Anime</span> and
          <span class="highlight">GalGame</span> (yes, I'm still single 😄), and
          I spend some time learning <span class="highlight">Japanese</span>.
        </p>
        <p>
          Currently based in <span class="highlight">Nanjing</span>, but I love
          traveling. I've been to <span class="highlight">Singapore</span>,
          <span class="highlight">Hong Kong</span>, and
          <span class="highlight">Japan</span>. My favorite place is
          <span class="highlight">Kyoto</span> — compared to overly
          commercialized city streets, I prefer places with a more authentic and
          traditional atmosphere.
        </p>

        <p style="font-style: italic">
          *This page is based on
          <a
            class="highlight-link"
            href="https://github.com/clark-cui/vitepress-blog-zaun"
            target="_blank"
            rel="noopener"
            >clark-cui</a
          >. Huge thanks to
          <a
            class="highlight-link"
            href="https://github.com/clark-cui"
            target="_blank"
            rel="noopener"
            >Clark Cui</a
          >
          for the elegant template. Content on this page is translated by AI.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--vp-nav-height, 64px) - 80px);
  padding: 40px 24px 56px;
}

.about-content {
  max-width: 580px;
  width: 100%;
  text-align: center;
}

.about-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.about-avatar img {
  width: 135px;
  height: 135px;
  border-radius: 50%;
  border: 5px solid var(--vp-avator-border);
}

@keyframes avator-transform {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.about-avatar img:hover {
  animation: 5s linear 0s infinite avator-transform;
}

.about-name {
  font-size: 2.2em;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
  line-height: 1.2;
}

.about-bio {
  font-size: 1.1em;
  color: var(--vp-c-text-2);
  margin: 0 0 28px;
  font-weight: 500;
}

.about-desc {
  text-align: left;
  font-size: 0.95em;
  color: var(--vp-c-text-2);
  line-height: 1.9;
}

.about-desc p {
  margin: 0 0 16px;
}

.about-desc p:last-child {
  margin-bottom: 0;
}

.highlight {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand-light);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.highlight-link {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  transition: color 0.2s;
}

.highlight-link:hover {
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .about-name {
    font-size: 1.8em;
  }
  .about-page {
    padding: 32px 20px;
    padding-bottom: 80px;
  }
}
</style>
