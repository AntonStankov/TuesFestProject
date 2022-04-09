// let token = "";


function login() {
    let _text = document.getElementById("text").value;
    console.log(_text);
    let _text2 = document.getElementById("text2").value;
    console.log(_text2);

    fetch('http://localhost:8080/user/login', {
        method: 'post',
        body: JSON.stringify({
            username: _text,
            password: _text2
        }),
        headers: new Headers({'content-type': 'application/json',
                            'authorization': 'Bearer ',
                        }),
        }, console.log("login")
    )
    .then( async (response) => {

        // get json response here
        let data = await response.json();
        console.log(response.status)
        if(response.status === 200){
            console.log(data);
            // token = data['token'];
            sessionStorage.setItem('loginToken', data['token']);
            // console.log(token);
        }

    })
}





function register() {
    let _text = document.getElementById("text").value;
    console.log(_text);
    let _text2 = document.getElementById("text2").value;
    console.log(_text2);


    let _type = document.getElementById("type").value;

    fetch('http://localhost:8080/user/register', {
        method: 'post',
        body: JSON.stringify({
            username: _text,
            password: _text2,
            type: _type
        }),
        headers: new Headers({'content-type': 'application/json',
                            'authorization': 'Bearer ',
                        }),
        }, console.log("register")
    )
    .then( async (response) => {

// get json response here
let data = await response.json();
console.log(response.status)
if(response.status === 200){
    console.log(data);
}


})
}













function createApp() {
    let _text = document.getElementById("title").value;
    console.log(_text);
    let _text2 = document.getElementById("text").value;
    console.log(_text2);
    

    fetch('http://localhost:8080/apps/createApp', {
        method: 'post',
        body: JSON.stringify({
            title: _text,
            text: _text2
        }),
        headers: new Headers({'content-type': 'application/json',
                            'authorization': 'Bearer ' + sessionStorage.getItem('loginToken')
                        }),
        }, 
    )
    .then( async (response) => {

// get json response here
let data = await response.json();
console.log(response.status)
if(response.status === 200){
    console.log(data);
}


})
}





function getAllApps(){
    fetch('http://localhost:8080/apps/getAllApps', {
        method: 'get',
        headers: new Headers({'content-type': 'application/json',
                            'Authorization': 'Bearer ' + sessionStorage.getItem('loginToken'),
    

                        }),
        }, 
    )
    .then( async (response) => {

// get json response here
let data = await response.json();
console.log(response.status)
if(response.status === 200){
//    console.log(data);

    let jobApplicationElement = document.getElementById("job_applications");

    for(let i = 0; i < data.length; i++){
        const node = document.createElement("p");
        const node2 = document.createElement("p");
        const button1 = document.createElement("button");
        button1.setAttribute("id", data[i]["id"]);
        button1.setAttribute("onclick", "volunteer(this.id)");

        button1.appendChild(document.createTextNode("Apply for this Job App"));
        node.appendChild(document.createTextNode(data[i]["title"]));
        node2.appendChild(document.createTextNode(data[i]["text"]));

        jobApplicationElement.appendChild(node);
        jobApplicationElement.appendChild(node2);
        jobApplicationElement.appendChild(button1);

    }
}


})
}


function volunteer(_id){
        fetch('http://localhost:8080/apps/updateApp', {
            method: 'post',
            body: JSON.stringify({
                id: _id
            }),
            headers: new Headers({'content-type': 'application/json',
                                'authorization': 'Bearer ' + sessionStorage.getItem('loginToken')
                            }),
            },
        )
        .then( async (response) => {

    // get json response here
    let data = await response.json();
    console.log(response.status)
    if(response.status === 200){
        console.log(data);
    }


    })
}

