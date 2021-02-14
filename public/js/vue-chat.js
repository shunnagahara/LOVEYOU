const app = new Vue({
    el: '#app',
    data: {
        textInput: '',
        chats: [],
    },
    methods: {
        sendMessage() {
            socket.emit('chat message', { type:'message', text:this.textInput, name:"shun" } );
            this.textInput = '';
        },
        addLeftOrRight: function(name) {
            if (name === "shun") {
                return "-right";
            }
            return "-left";
        }
    },
    mounted() {

        socket.emit('new comer', 'shuntest');

        socket.on('new comer', (cht) => {
            this.chats.push({ type:'notice', text:"shunkunn", name:"" });
        });

        socket.on('chat message', (cht) => {
            this.chats.push(cht);
        });


    }
});