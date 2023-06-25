<template>
  <div class="about-section">
    <p>
      Typical90 Ume は
      <a href="https://twitter.com/e869120" target="_blank" rel="noopener noreferrer">@E869120氏</a>
      が作成した
      <a href="https://atcoder.jp/contests/typical90" target="_blank" rel="noopener noreferrer"
        >競プロ典型90問</a
      >
      の正答状況を確認することを目的としたサイトです。
    </p>
  </div>

  <h2>Links</h2>
  <div class="link-section">
    <ul>
      <li>
        <a href="https://kenkoooo.com/atcoder#/table/" target="_blank" rel="noopener noreferrer"
          >AtCoder Problems</a
        >
      </li>
      <ul>
        <li>提出データは AtCoder Problems の API を利用して取得しています。</li>
      </ul>
      <li>
        <a
          href="https://github.com/kira924age/typical90-ume"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >
      </li>
      <ul>
        <li>
          GitHubリポジトリです。バグの報告や改善案などは GitHub の issues や Pull Request
          でお願いします。
        </li>
      </ul>
      <li>
        <a href="https://twitter.com/kira924age" target="_blank" rel="noopener noreferrer"
          >Twitter</a
        >
      </li>
      <ul>
        <li>
          作者のTwitterアカウントです。バグの報告等を GitHub
          上で行うのが面倒な場合はこちらにお願いします。
        </li>
      </ul>
    </ul>
  </div>
</template>

<style scoped lang="scss">
li {
  list-style-position: inside;
}
ul ul li {
  padding-left: 18px;
}

.about-section {
  padding-bottom: 24px;
}

.link-section {
  padding-top: 12px;
}
</style>
