const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
});

app.use(cors({
    origin: '*',
    preflightContinue: true,
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/dist/index.html');
});

app.use(express.static('front/dist'));


let sessionNotes = []

function setNote(newNote) {
    sessionNotes = sessionNotes.filter((note) => {
        return note.user.name !== newNote.user.name
    })
    sessionNotes.push(newNote)
}

io.on('connection', (socket) => {
    console.log('Connection');

    io.emit('system_message', 'connection');
    io.emit('scrum_get_notes', sessionNotes);

    socket.on('chat_message', msg => {
        io.emit('chat_message', msg);
    });

    socket.on('scrum_remove_notes', () => {
        sessionNotes = [];
        io.emit('scrum_get_notes', sessionNotes);
        io.emit('scrum_remove_notes');
    });

    if (sessionNotes > 0) {
        console.log('emit scrum_get_notes', sessionNotes);
        io.emit('scrum_get_notes', sessionNotes);
    }

    socket.on('scrum_add_note', newNoteJson => {
        setNote(newNoteJson);
        console.log('emit scrum_get_notes', sessionNotes);
        io.emit('scrum_get_notes', sessionNotes);
    });

    socket.on('scrum_reveal_notes', (revealed) => {
        console.log('scrum_reveal_notes', revealed);
        io.emit('scrum_reveal_notes', revealed);
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('Disconnection');
        io.emit('system_message', 'disconnect');
    });
});

app.set("port", process.env.PORT || 3000);

http.listen(app.get("port"), () => {
    console.log(`server on port ${app.get("port")}`);
});
