let btnSignUp = document.getElementById('signup');

btnSignUp.onclick = function () {
    window.location.assign('/register');
};

const btnLogin = document.getElementById('login');

btnLogin.onclick = function (){
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const xhr = new XMLHttpRequest();
        xhr.onload = function () { 
            let token = JSON.parse(this.response).token;
            localStorage.setItem('token', token);
            let tokeno = localStorage.getItem('token');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/user/play', true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + tokeno);
            xhr.send();
        };
        xhr.open('POST', '/login', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        const obj = {
            username : username,
            password: password
        };
        const json = JSON.stringify(obj);
        xhr.send(json);
        return false;

};