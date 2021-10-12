
const socket = io();

const form = document.getElementById('sendForm');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.message-container');


var audio = new Audio('assests/sounds/message.mp3');

const appendMessage = (message, position) => {

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');
    messageWrapper.classList.add(position);
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    if(position != 'center'){
        messageElement.classList.add('message');
    }
    messageWrapper.append(messageElement);
    messageContainer.append(messageWrapper);

    if(position == 'left' || position == 'center'){
        audio.play();
    }
    

}


const userName = prompt("Enter your good name to join");
socket.emit('new-user-joined',  userName);


socket.on('userJoined', (name, id) => {
    appendMessage(`${name} joined the chat`, 'center');
});

socket.on('receive', data => {
    appendMessage(`${data.name}: ${data.message}`,'left')
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

socket.on('left', userName =>{
    appendMessage(`${userName} left the chat`, 'center');
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

form.addEventListener('submit', (e) => {

    if(messageInp.value != ''){
    e.preventDefault();
    const message = messageInp.value;
    appendMessage(`${message}`, 'right');
    messageInp.value = '';
    socket.emit('send', message);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    }

})

