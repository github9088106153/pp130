song="";
song1="";
leftWristX=0;leftWristY=0;
rightWristY=0;rightWristX=0;
scoreLeftWrist=0;scoreRightWrist=0;
songk="";
songj="";
function preload(){
    song=loadSound("song.mp3");
    song1=loadSound("song1.mp3");
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses );
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist= "+scoreLeftWrist);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX+ ", leftWristY = "+ leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX+ ", rightWristY = "+ rightWristY);
    }
}
function modelLoaded(){
    console.log("Posenet Initialized");
}

function draw(){
    image(video,0,0,600,500);
    fill("#ffffff");
    stroke("#ffffff");

songk= song.isPlaying();
console.log(songk);
songj= song1.isPlaying();
console.log(songj);

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(songk== false){
            song.play();
        }else{
            document.getElementById("song_id").innerHTML= "Song Name: KGF";
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song.stop();
        if(songj== false){
            song1.play();
        }else{
            document.getElementById("song_id").innerHTML= "Song Name: Unknown";
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}