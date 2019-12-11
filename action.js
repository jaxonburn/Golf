let golf;
let golfInfo;


function getCourse() {
    return new Promise((resolve, reject) => {
      const httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () => {
        if (
          httpRequest.readyState == XMLHttpRequest.DONE &&
          httpRequest.status == 200
        ) {
          golf = JSON.parse(httpRequest.responseText);
          resolve(golf);
        }
      };
      httpRequest.open(
        'get',
        'https://golf-courses-api.herokuapp.com/courses'
      );
      httpRequest.send();
    });
  }

getCourse().then(course => {
    
})




function selectCourse(value){
    let selectId = golf.courses[value].id;
    let selectImg = golf.courses[value].image;
    let selectName = golf.courses[value].name;
    getCourseInfo(selectId);
    setTimeout(function(){ printTees(selectName, selectImg)}, 400);
    
}

function printTees(Name, Img){
  console.log(golfInfo);
  let golfName = Name;
  let teeLength = golfInfo.data.holes[0].teeBoxes.length; 
  $(".golfname").html(Name)
  $(".select").html(`<img src="${Img}"><select class="tees" onchange="loadHoles(this.value, '${Name}')">
  <option>Select Difficulty</option>
  </select>`);
  for (i = 0; i < teeLength; i++){
    $(".tees").append(`
    <option value="${golfInfo.data.holes[0].teeBoxes[i].teeType}">${golfInfo.data.holes[0].teeBoxes[i].teeType}</option>
    `);
  }
  
}

function loadHoles(value, Name) {
  $(".pickcourse").fadeOut(200);
  let difficulty;
  let totalyards = 0;
  let totalpar = 0;
  let totalhcp = 0;
  let inyards = 0;
  let outyards = 0;
  let inpar = 0;
  let outpar = 0;
  let outhcp = 0;
  let inhcp = 0;
  let parcontain = $('#parcontain');
  let hcpcontain = $('#hcpcontain');

  setTimeout(function() {
    $("#head").show();
    $("#head").append(`<span>${Name}</span>`)
    $("#holecontain").css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
    $("#yardcontain").css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
    $("#addPlayer").css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
    hcpcontain.css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
    parcontain.css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
    document.getElementById("playerbutton").classList.add("addPlayer");
    document.getElementById("contain").style.justifyContent = "flex-start";
    for(let i = 0;i < golfInfo.data.holes.length; i++){
      $("#holecontain").append(`<div class="hole" id="hole${i}">${i + 1}</div>`)
      for(j = 0; j < golfInfo.data.holes[i].teeBoxes.length; j++){
        if(golfInfo.data.holes[i].teeBoxes[j].teeType === value){
          if(i < 9) {
            outyards += golfInfo.data.holes[i].teeBoxes[j].yards;
            outpar += golfInfo.data.holes[i].teeBoxes[j].par;
            outhcp += golfInfo.data.holes[i].teeBoxes[j].hcp;
          }
          if(i >= 9) {
            inyards += golfInfo.data.holes[i].teeBoxes[j].yards;
            inpar += golfInfo.data.holes[i].teeBoxes[j].par;
            inhcp += golfInfo.data.holes[i].teeBoxes[j].hcp;
          }
          totalhcp += golfInfo.data.holes[i].teeBoxes[j].hcp;
          totalpar += golfInfo.data.holes[i].teeBoxes[j].par;
          totalyards += golfInfo.data.holes[i].teeBoxes[j].yards
          $("#yardcontain").append(`<div class="hole" id="yard${i}">${golfInfo.data.holes[i].teeBoxes[j].yards}</div>`)
          parcontain.append(`<div class="hole" id="par${i}">${golfInfo.data.holes[i].teeBoxes[j].par}</div>`)
          hcpcontain.append(`<div class="hole" id="hcp${i}">${golfInfo.data.holes[i].teeBoxes[j].hcp}</div>`)
         
        }
    }  

  }    
  document.getElementById("par8").outerHTML += `<div class="in">${outpar}</div>`
  document.getElementById("par17").outerHTML +=  `<div id="parout" class="in">${inpar}</div>`
  document.getElementById("parout").outerHTML += `<div class="Total in">${totalpar}</div>`
      document.getElementById("hcp8").outerHTML += `<div class="in">${outhcp}</div>`
      document.getElementById("hcp17").outerHTML +=  `<div id="hcpout" class="in">${inhcp}</div>`
      document.getElementById("hcpout").outerHTML += `<div class="Total in">${totalhcp}</div>`
    document.getElementById("yard8").outerHTML += `<div id="yardin" class="in">${outyards}</div>`
    document.getElementById("yard17").outerHTML +=  `<div id="yardout" class="in">${inyards}</div>`
    document.getElementById("yardout").outerHTML += `<div id="totalyards" class="Total in">${totalyards}</div>`
    document.getElementById("hole8").outerHTML += `<div class="in">Out</div>`
    document.getElementById("hole17").outerHTML +=  `<div id="out" class="in">In</div>`
    document.getElementById("out").outerHTML += `<div class="Total in">Total</div>`
  }, 210)
  
}


function getCourseInfo(Id) {
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (
        httpRequest.readyState == XMLHttpRequest.DONE &&
        httpRequest.status == 200
      ) {
        golfInfo = JSON.parse(httpRequest.responseText);
        resolve(golfInfo);
      }
    };
    httpRequest.open(
      'get',
      `https://golf-courses-api.herokuapp.com/courses/${Id}`
    );
    httpRequest.send();
  });
}

getCourseInfo().then(course => {
  
})

let clicked = 0;
function addPlayer(){
  if(clicked > 4){
    return;
  }
  clicked++;

  
  $(`#player${clicked}`).css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
  for(i = 0; i < 18; i++){
    $(`#player${clicked}`).append(`<div class="p${clicked}" id="player${clicked}-${i}" contenteditable="true"></div>`)

    
  }
  document.getElementById(`player1`).addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      tallyScores("p1", this.id);
    }
  });
  document.getElementById(`player2`).addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      tallyScores("p2", this.id);
    }
  });
  document.getElementById(`player3`).addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      tallyScores("p3", this.id);
    }
  });
  document.getElementById(`player4`).addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
      tallyScores("p4", this.id);
    }
  });
  document.getElementById(`player${clicked}-8`).outerHTML += `<div class="in" id="playerout${clicked}">0</div>`
  document.getElementById(`player${clicked}-17`).outerHTML +=  `<div id="playerin${clicked}" class="in">0</div>`
  document.getElementById(`playerin${clicked}`).outerHTML += `<div class="Total in" id="playertotal${clicked}">0</div>`
  
}


function tallyScores(player, id){
  switch(player) {
    case "p1":
      player = 1;
      break;
    case "p2":
      player = 2;
      break;
    case "p3":
      player = 3;
      break;
    case "p4":
      player = 4;
      
  } 
    let player1out = 0;
    let somenum;
    let player1total = 0;
    let player2total = 0;
    let player3total = 0;
    let player4total = 0;
    for(let i = 0; i < 18; i++){
      somenum = document.getElementById(`player${player}-${i}`).innerText
      somenum = Number(somenum)
      if(somenum == ""){
        
      }
      else if(Number.isNaN(somenum)){
        document.getElementById(`player${player}-${i}`).innerText = "";
        return
      }
      else if(player == 1){
        player1total += parseFloat(somenum);
        document.getElementById(`playertotal1`).innerHTML =  player1total;
        playerout1();
      }else if(player == 2){
        player2total += parseFloat(somenum);
        document.getElementById(`playertotal2`).innerHTML =  player2total;
        playerout2();
      }else if(player == 3){
        player3total += parseFloat(somenum);
        document.getElementById(`playertotal3`).innerHTML =  player3total;
        playerout3();
      }else if(player == 4){
        player4total += parseFloat(somenum);
        document.getElementById(`playertotal4`).innerHTML =  player4total;
        playerout4();
      }


    }
}
function playerout1(){
  let player1out = 0;
  let player1in = 0;
  for(let i = 0; i < 9; i++){
    somenum1 = document.getElementById(`player1-${i}`).innerText
    somenum1 = Number(somenum1);
    if(somenum1 == ""){

    }else if(Number.isNaN(somenum1)){
     
    }
    else{
      player1out += parseFloat(somenum1);
      document.getElementById("playerout1").outerHTML = `<div class="in" id="playerout1">${player1out}</div>`
    }
  }
  for(let i = 10; i <= 17; i++){
    somenum1 = document.getElementById(`player1-${i}`).innerText
    somenum1 = Number(somenum1);
    if(somenum1 == ""){

    }else if(Number.isNaN(somenum1)){
     
    }else{
      player1in += parseFloat(somenum1);
      document.getElementById("playerin1").outerHTML = `<div class="in" id="playerin1">${player1in}</div>`
    }
  }
}
function playerout2(){
  let player2out = 0;
  let player2in = 0;
  for(let i = 0; i <= 8; i++){
    somenum2 = document.getElementById(`player2-${i}`).innerText
    somenum2 = Number(somenum2);
    if(somenum2 == ""){

    }else if(Number.isNaN(somenum2)){
     
    }else{
      player2out += parseFloat(somenum2);
      document.getElementById("playerout2").outerHTML = `<div class="in" id="playerout2">${player2out}</div>`
    }
  }
  for(let i = 9; i <= 17; i++){
    somenum2 = document.getElementById(`player2-${i}`).innerText
    somenum2 = Number(somenum2);
    if(somenum2 == ""){

    }else if(Number.isNaN(somenum2)){
     
    }else{
      player2in += parseFloat(somenum2);
      document.getElementById("playerin2").outerHTML = `<div class="in" id="playerin2">${player2in}</div>`
    }
  }
}
function playerout3(){
  let player3out = 0;
  let player3in = 0;
  for(let i = 0; i < 9; i++){
    somenum3 = document.getElementById(`player3-${i}`).innerText
    somenum3 = Number(somenum3);
    if(somenum3 == ""){

    }else if(Number.isNaN(somenum3)){
     
    }else{
      player3out += parseFloat(somenum3);
      document.getElementById("playerout3").outerHTML = `<div class="in" id="playerout3">${player3out}</div>`
    }
  }
  for(let i = 9; i <= 17; i++){
    somenum3 = document.getElementById(`player3-${i}`).innerText
    somenum3 = Number(somenum3);
    if(somenum3 == ""){

    }else if(Number.isNaN(somenum3)){
     
    }else{
      player3in += parseFloat(somenum3);
      document.getElementById("playerin3").outerHTML = `<div class="in" id="playerin3">${player3in}</div>`
    }
  }
}
function playerout4(){
  let player4out = 0;
  let player4in = 0;
  for(let i = 0; i < 9; i++){
    somenum4 = document.getElementById(`player4-${i}`).innerText
    somenum4 = Number(somenum4);
    if(somenum4 == ""){

    }else if(Number.isNaN(somenum4)){
     
    }else{
      player4out += parseFloat(somenum4);
      document.getElementById("playerout4").outerHTML = `<div class="in" id="playerout4">${player4out}</div>`
    }
  }
  for(let i = 9; i <= 17; i++){
    somenum4 = document.getElementById(`player4-${i}`).innerText
    somenum4 = Number(somenum4);
    if(somenum4 == ""){

    }else if(Number.isNaN(somenum4)){
     
    }else{
      player1in += parseFloat(somenum4);
      document.getElementById("playerin4").outerHTML = `<div class="in" id="playerin4">${player4in}</div>`
    }
  }
}

function checkNames() {
  let player1 = document.getElementById('player1name').innerText;
  let player2 = document.getElementById('player2name').innerText;
  let player3 = document.getElementById('player3name').innerText;
  let player4 = document.getElementById('player4name').innerText;
  for(i = 1;i <= 4; i++){
    if(`player${i}` == player2 || player3 || player4 ){
      document.getElementById(`player${i}`).innerText = "";
    }
  }
}