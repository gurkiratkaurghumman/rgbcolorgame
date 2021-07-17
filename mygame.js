var numCircles=6;
var colors=generateRandomColors(numCircles);
var circles = document.querySelectorAll(".circle");
var pickedColor= pickcolor();
var appearRGBheading=document.getElementById("rgbvalues");
appearRGBheading.textContent=pickedColor;
var messageDisplay=document.querySelector(".message");
var mainh1=document.querySelector("h1");
var resetButton=document.querySelector("#reset");
var easybutton=document.querySelector("#easybtn");
var hardbutton=document.querySelector("#hardbtn");
//const image = document.createElement('img');
//easybutton through which we can select the easy mode of the game having 3 circles
easybtn.addEventListener("click",function(){
  hardbutton.classList.remove("selected");
  easybutton.classList.add("selected");
  numCircles=3;
  //image.style.display="none";
  colors=generateRandomColors(numCircles);
  pickedColor=pickcolor();
  appearRGBheading.textContent=pickedColor;
  for (var i=0; i<circles.length; i++){
    if (colors[i]){
      circles[i].style.background=colors[i];
    }else {
      circles[i].style.display="none";

    }
  }
});

//hardbutton through which we can select the hard mode of the game having 6 circles
hardbtn.addEventListener("click",function(){
  easybutton.classList.remove("selected");
  hardbutton.classList.add("selected");
  numCircles=6;
  colors=generateRandomColors(numCircles);
  pickedColor=pickcolor();
  appearRGBheading.textContent=pickedColor;
  for (var i=0; i<circles.length; i++){
      circles[i].style.background=colors[i];
      circles[i].style.display="none";
    }
});
//reset button through which we can reset the game
resetButton.addEventListener("click",function(){
  colors=generateRandomColors(numCircles);
  pickedColor=pickcolor();
    //image.style.display="none";
  appearRGBheading.textContent=pickedColor;
  for (var i=0; i<circles.length; i++){
    circles[i].style.background=colors[i];
    messageDisplay.textContent="";
    this.textContent="NEW COLORS";
  }
  mainh1.style.background="#28b5b5";
});

//handles all stuff when circles are clicked
for (var i=0; i<circles.length; i++){
  circles[i].style.background=colors[i];
  circles[i].addEventListener("click", function(){
    var clickedColor=this.style.background;
    if(clickedColor === pickedColor){
      messageDisplay.textContent="Correct!!";

      changeSqsColor(pickedColor);
      mainh1.style.background=pickedColor;
      //image.src  = 'img.gif';
      document.querySelector('.heading');//.appendChild(image);
      //image.style.display="block";
      resetButton.textContent="PLAY AGAIN!";
      //add sound to success

      //let audio = new Audio('tom-1.mp3');
      //audio.play();
    }

    else{
      this.style.background="#232323";
      messageDisplay.textContent="Try Again!";
      //image.style.display="none";

      //add sound to failure
      //let audio = new Audio('tom-2.mp3');
      //audio.play();
    }
  });
}

//fuction change the color of all circles when the correct color is picked (when we win the game)
function changeSqsColor(correctColor){
  for(var i=0; i<circles.length; i++){
    circles[i].style.background=correctColor;
  }
}
//functin randomly pick one color from the rgb pair of colors ,from here we get our picked color
function pickcolor(){
  var randomOneColor=Math.floor(Math.random()*colors.length);
  return colors[randomOneColor];
}
//function generate random rgb values and this is called in generateRandomColors function to generate random color
function randomColor(){
  var r= Math.floor(Math.random() * 256);
  var g= Math.floor(Math.random() * 256);
  var b= Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
//function generate random colors of all the circles
function generateRandomColors(num){
  var arr=[];
  for (var i=0 ;  i< num ; i++){
    arr.push(randomColor());
  }
  return arr;
}
