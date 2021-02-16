
import newComerNoticePhraseList from './newComerNoticePhrase.js'
import leftNoticePhraseList from './leftNoticePhrase.js'

const app = new Vue({
    el: '#app',
    data: {
        myName: '',
        textInput: '',
        chats: [],
        newComerNoticePhrase: newComerNoticePhraseList,
        leftNoticePhrase: leftNoticePhraseList
    },
    methods: {
        sendMessage() {
            if (!this.textInput.match || !this.textInput.match(/\S/g)) {
                return
            }
            socket.emit('chat message', { type:'message', text:this.textInput, name:this.myName } );
            this.textInput = '';
        },
        addLeftOrRight: function(mine) {
            return mine ? "-right" : "-left";
        },
        changeButtonColor: function(textInput) {
            if (!this.textInput.match || !this.textInput.match(/\S/g)) {
                return "disable";
            }
            return textInput === "" ? "disable" : "able";
        },
        keyEnterShift(e) {
            e.preventDefault();
            console.log(this.textInput);
            if (!this.textInput.match || !this.textInput.match(/\S/g)) {
                return
            }
            this.sendMessage();
        },
        checkLogin() {

            const storage = sessionStorage;

            this.myName = storage.getItem('name');

            // ログイン画面を経由していない場合はログイン画面にリダイレクトさせる。
            if (!this.myName) {
                location.href = '/login.html';
            }

            // SessionStorageの役目は果たした為、KV削除
            storage.clear();

            socket.emit('new comer', this.myName);
        }
    },
    mounted() {

        // 初アクセスユーザーの処理
        this.checkLogin();

        // 新規ユーザーがアクセスした場合
        socket.on('new comer', (newComerName) => {
            if (newComerName) {
                this.chats.push({ type:'newcomer', text:this.newComerNoticePhrase.list[Math.floor(Math.random() * this.newComerNoticePhrase.list.length)], name:newComerName});
            }
        });

        // ユーザーの接続が切れた場合
        socket.on('left', (leftName) => {
            if (leftName) {
                this.chats.push({ type:'left', text:this.leftNoticePhrase.list[Math.floor(Math.random() * this.leftNoticePhrase.list.length)], name:leftName});
            }
        });

        socket.on('chat message', (chat) => {
            chat.name === this.myName ? chat.mine = true : chat.mine = false;
            this.chats.push(chat);
        });
    }
});