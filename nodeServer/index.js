//Node server which will handle socket io connections.

//here we will use socket.io which we have installed and here we are using port 8000, we can use any port we want Basically we are running a socket.io server joki ek instance h ek http ka.

//Now jo ye server h socket.io, ye listen karega incoming events ko.

const io =require('socket.io')(8000)

const users={ }; // for all those users who are connected.

//important: jese hi connection aye is socket main, to ek arrow function ko run krdo.

//ye io.on ek instance h socket.io ka, joki bhaut are connections ko listen krega.
//socket.on ka mtlb ye h ki jab bhi ek particular connection ke sath kuch hoga, to us connection ke sath kya hona chaiye, vo socket.on handle krta h.
// i am saying ki ek socket.on agar user join event bejrha h to kya krna chaiye. 
   //hum users ko ek socket.id key dedenge and usko name ke equal krdenge.
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name); //jo log already chat main h unko btadega ki new user ne join kia.
    });

    //
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})