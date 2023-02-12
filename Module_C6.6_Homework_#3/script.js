const wsUri = "wss://echo.websocket.events/.ws";
const inpMessNode = document.querySelector('.j-inp-mess');
const btnSendNode = document.querySelector('.j-btn-send');
const btnGeoNode = document.querySelector('.j-btn-geo');
const boxChatNode = document.querySelector('.j-box-chat');

let websocket;

websocket = new WebSocket(wsUri);


function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    boxChatNode.appendChild(pre);
    boxChatNode.scrollTop = boxChatNode.scrollHeight;
}


btnSendNode.addEventListener('click', () => {
    const message = inpMessNode.value;
    if (message != '') {
        writeToScreen('<span class="send-user">' + message +'</span>');
        websocket.send(message);
        inpMessNode.value = ''; 
    } 
});


websocket.onmessage = function(evt) {
    if (evt.data !== 'echo.websocket.events sponsored by Lob.com') {
        writeToScreen('<span class="send-server">' + evt.data +'</span>');
    }
};


websocket.onclose = function(e) {
    writeToScreen(`<span class="send-server" style="color: red;">Соединение прервано.<br>Обновите страницу.</span>`);
}


websocket.onerror = function(evt) {
    writeToScreen('<span class="send-server" style="color: red;">ERROR: </span> ' + evt.data);
  };


btnGeoNode.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            writeToScreen(`<a class="send-user" href = https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude} id="map-link" target="_blank">Геолокация</a>`)
        }, () => {
           
            writeToScreen(`<span class="send-server" style="color: red;">Разрешите доступ о Вашем местоположении</span>`);
        });
    } else {
        writeToScreen(`<span class="send-server" style="color: red;">Ваше местоположение недоступно</span>`);   
    }
    
});