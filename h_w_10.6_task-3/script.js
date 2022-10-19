let url = `wss://echo-ws-service.herokuapp.com`;

let socket = new WebSocket(url);

socket.onopen = () => {
  showMessage("Соединение установлено");
};

// отправка сообщения из формы
document.forms.publish.onsubmit = function () {
  let outgoingMessage = this.message.value;
  this.message.value = "";
  socket.send(outgoingMessage);
  return false;
};

// прослушка входящих сообщений
socket.onmessage = function (event) {
  let incomingMessage = event.data;
  showMessage(incomingMessage);
};

socket.onclose = (event) => console.log(`Closed ${event.code}`);

// отображение информации в div#messages
function showMessage(message) {
  let messageElem = document.createElement("div");
  messageElem.classList.add("msg-box");
  messageElem.textContent = message;
  document.getElementById("messages").append(messageElem);
}

// Geolocation............

document.querySelector(".geo").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(locationSucces, locationError);
  } else {
    writeOutput("Местоположение не определено!");
  }

  function locationSucces(data) {
    let link = `https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`;
    writeOutput(
      `<a href="${link}" target="_blank" style="text-decoration: none; color: rgba(255, 255, 255, .7);">Вы находитесь здесь >></a>`
    );
  }

  function locationError() {
    writeOutput("Произошла ошибка!");
  }

  function writeOutput(message) {
    let output = document.getElementById("messages");
    output.innerHTML += `<p>${message}</p>`;
  }
});
