document.querySelector(".j-btn-test").addEventListener("click", () => {
  Array.from(document.querySelector(".btn-icons").children).forEach((item) => {
    if (item.classList.contains("change")) {
      item.classList.remove("change");
    } else {
      item.classList.add("change");
    }
  });
});
