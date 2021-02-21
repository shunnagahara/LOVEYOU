
const storage = sessionStorage;

window.addEventListener('DOMContentLoaded',function(){
    document.getElementById('Login-Btn').disabled = true;

    // 名前入力時の挙動
    document.getElementById('Name-Input').addEventListener('keyup',function(){
        if (this.value.length < 1) {
            document.getElementById('Login-Btn').disabled = true;
        } else {
            document.getElementById('Login-Btn').disabled = false;
        }
    },false);

    // 名前入力時の挙動
    document.getElementById('Name-Input').addEventListener('change',function(){
        if (this.value.length < 1) {
            document.getElementById('Login-Btn').disabled = true;
        }
    },false);

    // バリデーションエラーチェック
    isValidationError();

},false);

// ログインボタン押下時の挙動
document.getElementById("Login-Btn").onclick = function() {
    storage.setItem('name', document.getElementById("Name-Input").value);
};

function isValidationError() {
    var isError = [];

    if (storage.getItem('login-error')) isError = storage.getItem('login-error');

    if (isError.includes('sameName')) {
        document.getElementsByClassName("error-box")[0].style.display = "block";
    }

    storage.clear();
}