Status = "";
object = [];
function preload(){
    img = loadImage("orange.jpg");
}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.position(500, 200);
    modal = ml5.objectDetector("cocossd", loadmodal);
}
function loadmodal(){
    console.log("modal loaded");
    document.getElementById("status").innerHTML = "Status : Dectecting Object";
    Status = true;
    modal.detect(img, gotResult);
}
function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        object = result;
    }
}
function draw(){
    image(img, 0, 0, 300, 300);
    if (Status != ""){
        for (var i = 0; i < object.length; i++) {
            document.getElementById("item").innerHTML = "There are 1 big object in the image from which cocossd modal has detected " + object.length + " object";
            x = object[i].x;
            y = object[i].y;
            width = object[i].width;
            height = object[i].height;
            label = object[i].label;
            confidence = floor(object[i].confidence*100) + "%";
            stroke("red");
            noFill();
            rect(x, y, width, height);
            text(label + " " + confidence, x, y);
        }
    }
}
function back(){
    window.location = "index.html";
}