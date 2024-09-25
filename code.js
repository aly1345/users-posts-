let myaside = document.getElementsByTagName("aside")[0];
let mysection = document.getElementsByTagName("section")[0];
let myUsers = ["Ahmed","Asma","Osama","Ali","malak","Mohamed","yosef","Hassen","Alaa","Naser","Mahmode","Mostafa","Ragab"]
let numberofposts;
let numberofusers = 0;
let myresponse;
let zero = 0;
let userclick;


function pageposts(u,i,t,b){
    this.userid = u;
    this.id = i;
    this.title = t;
    this.body = b;
}

function getrequest(reqMethod, reqUrl){
    let myreq = new XMLHttpRequest();
    myreq.open(reqMethod,reqUrl);
    myreq.setRequestHeader("Accept","application/json");
    myreq.send();
    myreq.onreadystatechange = function (){
        if(myreq.readyState === 4){
            if(myreq.status <= 300){
                myresponse = JSON.parse(myreq.response);
                numberofposts = myresponse.length;
                for(let i=0; i < myresponse.length; i++){
                    if((myresponse[i].userId) > numberofusers){
                        numberofusers = myresponse[i].userId;
                        let mydiv = document.createElement("div");
                        mydiv.setAttribute("id",`user${myresponse[i].userId}`);
                        zero += 1;
                        mydiv.textContent = myUsers[zero];
                        myaside.append(mydiv);
                    }
                }
                let myuserinaside = document.querySelectorAll("aside div");
                myuserinaside.forEach(
                function(thatuser){
                    thatuser.onclick = function(){
                        mysection.innerHTML = "";
                        let arrypost = [];
                        userclick = thatuser.getAttribute("id").slice(4);
                        for(let i=0; i < myresponse.length; i++){
                            if(myresponse[i].userId == userclick){
                                arrypost.push([myresponse[i].userId, myresponse[i].id, myresponse[i].title, myresponse[i].body]);
                            }
                        }
                        for(let i=0; i < arrypost.length; i++){
                            let mydiv = document.createElement("div");
                            let myh3 = document.createElement("h3");
                            let myp = document.createElement("p");
                            mydiv.setAttribute("class","posts")
                            myh3.textContent = arrypost[i][2];
                            myp.textContent = arrypost[i][3];
                            mydiv.append(myh3);
                            mydiv.append(myp);
                            mysection.append(mydiv);
                        }
                    }
                })  
            }else{
                console.log("the request is faild");
            };
        };
    };
};
getrequest("get", "https://jsonplaceholder.typicode.com/posts");





