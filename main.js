StatuS = "";
object = [];
song = "";
finger = "";

function preload() {
    song = loadSound("old_phone.mp3")
}

function setup() {
    canvas = createCanvas(650, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(650,450);
    video.hide();
}

function start() {
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    Objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    finger = document.getElementById("finger").value
}

function modelLoaded() {
    console.log("ML");
    Objectdetector.detect(video, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result;
        StatuS = true;

    }
}

function draw() {
    image(video, 0, 0, 650, 650)
    if (StatuS) {
        Objectdetector.detect(video, gotResult)
        document.getElementById("status").innerHTML = "Status: Objects Detected";

        document.getElementById("status").style.backgroundColor = "green";
        r=random(255)
        g=random(255)
        b=random(255)

        for (i = 0; i < object.length; i++) {
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%", object[i].x+10, object[i].y+10);
            noFill();
            stroke("blue");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if (object[i].label==finger) {
                song.play();
            }
        }
    }
}