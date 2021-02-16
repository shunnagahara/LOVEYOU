
const storage = sessionStorage;

// 名前入力時の挙動
window.addEventListener('DOMContentLoaded',function(){
    document.getElementById('Login-Btn').disabled = true;

    document.getElementById('Name-Input').addEventListener('keyup',function(){
        if (this.value.length < 1) {
            document.getElementById('Login-Btn').disabled = true;
        } else {
            document.getElementById('Login-Btn').disabled = false;
        }
    },false);

    document.getElementById('Name-Input').addEventListener('change',function(){
        if (this.value.length < 1) {
            document.getElementById('Login-Btn').disabled = true;
        }
    },false);
},false);

// ログインボタン押下時の挙動
document.getElementById("Login-Btn").onclick = function() {
    storage.setItem('name', document.getElementById("Name-Input").value);
};