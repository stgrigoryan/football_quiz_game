const clickedImage = document.getElementsByTagName('img');

for(let i = 0; i < clickedImage.length; i++) {

    clickedImage[i].addEventListener('click', function(){
        const index = this.getAttribute('src').lastIndexOf('/');
        const path = this.getAttribute('src').substring(index+1);
        const xhr = new XMLHttpRequest();
        let counter = 0;
        xhr.onload = function () {
            const response = JSON.parse (this.response);
            const {username, content, queueNumber} = response;
            if (content === "Answer is not correct") {
                document.getElementById('welcome').innerHTML = `Hello ${username}`; 
                document.getElementById('content').innerHTML = `${content}`;
            } else {
                ++counter;
                document.getElementById('welcome').innerHTML = `Hello ${username}`; 
                document.getElementById('content').innerHTML = `${content}`;
                let image = clickedImage.item(0);
                const images = document.getElementsByClassName('card-img-top');
                for (let i = 0; i < clickedImage.length; i++ ) {
                    clickedImage.item(i).setAttribute('src', `/images/${queueNumber}/${response.images[i]}`);
                }
            }
        }; 
        xhr.open('POST', '/user/questions', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        const obj = {};
        obj.path = path;
        const json = JSON.stringify(obj);
        xhr.send(json);
        return false;

    }, true);
}
