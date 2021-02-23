
import newComerNoticePhraseList from './newComerNoticePhrase.js'
import leftNoticePhraseList from './leftNoticePhrase.js'

const loveInterval = 3000;
const storage = sessionStorage;

const app = new Vue({
    el: '#app',
    data: {
        myName: '',
        textInput: '',
        chats: [],
        newComerNoticePhrase: newComerNoticePhraseList,
        leftNoticePhrase: leftNoticePhraseList,
        isShow:false
    },
    methods: {
        sendMessage() {
            if (!this.textInput.match || !this.textInput.match(/\S/g)) {
                return
            }
            socket.emit('chat message', { type:'message', text:this.textInput, name:this.myName} );
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

            this.myName = storage.getItem('name');

            // ログイン画面を経由していない場合はログイン画面にリダイレクトさせる。
            if (!this.myName) {
                location.href = '/login.html';
            }

            // ログイン名が被っていないかチェック
            socket.emit('check same name', this.myName);

            socket.emit('new comer', this.myName);

            this.isShow = true;
        },
        confession: function(){

            let myName = storage.getItem('name');

            // SessionStorageの役目は果たした為、KV削除
            storage.clear();

            setInterval(function(){

                var randomNumber = Math.random();

                if (randomNumber > 0.1) {
                    socket.emit('love confession', { type:'message', text:this.textInput, name:myName} );
                }
            }, loveInterval);
        },
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

        // チャットメッセージのやりとり
        socket.on('chat message', (chat) => {
            chat.name === this.myName ? chat.mine = true : chat.mine = false;
            this.chats.push(chat);
        });

        // 告白メッセージ
        socket.on('love confession', (chat) => {
            chat.name === this.myName ? chat.mine = true : chat.mine = false;
            this.chats.push(chat);
        });

        // 同名チェック
        socket.on('check same name', (existSameName) => {
            if (existSameName) {
                storage.setItem('login-error', ['sameName']);
                location.href = '/login.html';
            }
        });

        // 告白
        this.confession();
    }
});