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
    setTimeout(function(){ printTees(selectName, selectImg)}, 220);
    
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
  clicked++;
  $(`#player${clicked}`).css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
  for(i = 0; i < 18; i++){
    $(`#player${clicked}`).append(`<div class="hole ${i}" id="player${clicked}-${i}" contenteditable="true"></div>`)
    document.getElementById(`player${clicked}-${i}`).addEventListener("input", function(){
      let total = 0;
      let num;
      for(i = 0; i < 18; i++){
        num = document.getElementById(`player${clicked}-${i}`).innerHTML;
        if(num == null){
          console.log("hmm")
        }else{
          total += parseInt(num);
        }
        
        
        
       
  
      }
     console.log(total);
    }, false)
  }
  document.getElementById(`player${clicked}-8`).outerHTML += `<div class="in"></div>`
  document.getElementById(`player${clicked}-17`).outerHTML +=  `<div id="playerout${clicked}" class="in"></div>`
  document.getElementById(`playerout${clicked}`).outerHTML += `<div class="Total in"></div>`
}

