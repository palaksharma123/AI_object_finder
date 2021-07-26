status="";
object=[];
var synth = window.speechSynthesis;

function preload(){
}
function setup(){
    canvas=createCanvas(250,250);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(250,250);
    video.hide();
}
function draw(){
image(video,0,0,250,250);

if(status!=""){
    objectDetector.detect(video,gotResults);

    for(i=0; i<object.length; i++){

        fill('#ff0000');
        stroke('#ff0000');

        percent=floor(object[i].confidence*100);

        text(object[i].label+" "+percent+"%",  object[i].x,  object[i].y);
        noFill();
        rect(object[i].x,object[i].y,object[i].width,object[i].height);

        if(object[i].label==objectName){
        
            video.webcamLiveView.stop();
            objectDetector.detect(gotResults);
            document.getElementById("status").innerHTML="Found your object!";
            var utterThis = new SpeechSynthesisUtterance("found your object");



        }
    }
}
}
function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoded);
document.getElementById("status").innerHTML="Status : Detecting objects";
objectName=document.getElementById("object_name").value;
}
function modelLoded(){
    console.log("modelLoded!");
    status=true;
}


function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}