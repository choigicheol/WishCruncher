function makeFooter() {
  const footer = document.querySelector("#footer");
  footer.innerHTML = `
      <a href="https://github.com/choigicheol" target="_blank">
        <div class="github_Link">
          <img src="../Images/github_Icon.svg" />
          <span>Choi Gi Cheol</span>
        </div>
      </a>`;
}

makeFooter();
