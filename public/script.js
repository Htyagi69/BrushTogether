const socket= io();

function info(e){
  if(e) e.preventDefault();
  const name=document.getElementById('name').value;
  const email=document.getElementById('email').value;
  const room=document.getElementById('roomno').value;
   window.location.href=`/room.html?room=${room}&name=${name}&email=${email}`
} 

// socket.on()