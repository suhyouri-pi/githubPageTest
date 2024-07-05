const items = document.querySelectorAll(".item");
const content = document.getElementById("content");

items.forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.getAttribute("data-page");

    fetch(page)
      .then((response) => response.text())
      .then((html) => {
        content.innerHTML = html;
      })
      .catch((error) => {
        console.error("페이지를 불러오는 중 오류가 발생하였습니다.", error);
      });
  });
});
