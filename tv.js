Status = "";
object = [];
function preload() {
    img = loadImage("tv.jpg");
}
function setup() {
    canvas = createCanvas(640, 500);
    canvas.center();
    modal = ml5.objectDetector("cocossd", loadmodal);
}
function loadmodal() {
    console.log("modal loaded");
    document.getElementById("status").innerHTML = "Status : Dectecting Object";
    Status = true;
    modal.detect(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        object = result;
    }
}
function draw() {
    image(img, 0, 0, 640, 500);
    if (Status != "") {
        modal.detect(img, gotResult);
        for (var i = 0; i < object.length; i++) {
            document.getElementById("item").innerHTML = "There are 1 big object in the image from which cocossd modal has detected " + object.length + " object";
            x = object[i].x;
            y = object[i].y;
            width = object[i].width;
            height = object[i].height;
            label = object[i].label;
            console.log("x " + x);
            console.log("y " + y);
            console.log("width " + width);
            console.log("height " + height);
            console.log("label " + label);
            confidence = floor(object[i].confidence * 100) + "%";
            stroke("red");
            rect(x, y, width, height);
            text(label + " " + confidence, x, y);
            console.log("detedt");
        }
    }
}
function back() {
    window.location = "index.html";
}