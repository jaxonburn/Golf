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
    setTimeout(function(){ printTees(selectName, selectImg)}, 200);
    
}

function printTees(Name, Img){
  console.log(golfInfo);
  let teeLength = golfInfo.data.holes[0].teeBoxes.length; 
  $(".golfname").html(Name)
  $(".select").html(`<img src="${Img}"></img><select class="tees" onchange="loadHoles(this.value)">
  <option value="">Select Difficulty</option>
  </select>`);
  for (i = 0; i < teeLength; i++){
    $(".tees").append(`
    <option value="${golfInfo.data.holes[0].teeBoxes[i].teeType}">${golfInfo.data.holes[0].teeBoxes[i].teeType}</option>
    `);
  }
  
}

function loadHoles(value) {
  golfInfo.data.holes.length += 1;
  $(".pickcourse").fadeOut();
  $("#head").append(`<span></span>`)
  $("#holecontain").css({"display": "flex", "text-align": "center", "justify-content": "space-evenly"});
  for(let i = 0;i < golfInfo.data.holes.length; i++){
    $("#holecontain").append(`<div class="hole" id="hole${i}">${i}</div>`)
  }
  
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
