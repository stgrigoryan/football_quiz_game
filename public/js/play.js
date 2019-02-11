const clickedImage = document.getElementsByTagName('img');

function submit() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {alert (formData)};
    xhr.open(post, '/questions', true);
    xhr.send();
    return false;
  }

for(var i = 0; i < clickedImage.length; i++) {

    clickedImage[i].addEventListener('click', function(){
        const index = this.getAttribute('src').lastIndexOf('/');
        const path = this.getAttribute('src').substring(index+1);
        const xhr = new XMLHttpRequest();
        let counter = 1;
        xhr.onload = function () {
            console.log(this.response);
            const response = JSON.parse (this.response); 
            const {username, content} = response;
            if (content === "Answer is not correct") {
                document.getElementById('welcome').innerHTML = `Hello ${username}`; 
                document.getElementById('content').innerHTML = `${content}`;
            } else {
                document.getElementById('welcome').innerHTML = `Hello ${username}`; 
                document.getElementById('content').innerHTML = `${content}`;
            }
        }; 
        xhr.open('POST', '/questions', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        const obj = {};
        obj.path = path;
        const json = JSON.stringify(obj);
        console.log(obj);
        xhr.send(json);
        //return false;

    }, true);
}
