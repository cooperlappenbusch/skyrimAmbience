document.getElementById("windSlider").value = "0";
document.getElementById("skyrimForestRainyNightSlider").value = "0";
document.getElementById("skyrimForestNightSlider").value = "0";
document.getElementById("windSlider").value = "0";
document.getElementById("skyrimRainThunderSlider").value = "0";
document.getElementById("riverwoodAmbienceSlider").value = "0";
document.getElementById("fireplaceSlider").value = "0";

document.getElementById("mainSkyrimSong").value = "30";
mainSongsList = {
    "skyrimCalmNight": ["skyrimSongs/Secunda.mp3", "skyrimSongs/The Gathering Storm.mp3", "skyrimSongs/Aurora.mp3", "skyrimSongs/Kyne's Peace.mp3",
        "skyrimSongs/Tundra.mp3", "skyrimSongs/Masser.mp3", "skyrimSongs/Sky Above, Voice Within.mp3", "skyrimSongs/Solitude.mp3", "skyrimSongs/Standing Stones.mp3",
        "skyrimSongs/Secunda.mp3", "skyrimSongs/Kyne's Peace.mp3", "skyrimSongs/Masser.mp3", "skyrimSongs/Aurora.mp3"],
    "skyrimTowns": ["skyrimSongs/Ancient Stones.mp3", "skyrimSongs/The Streets of Whiterun.mp3", "skyrimSongs/From Past to Present.mp3",
        "skyrimSongs/The City Gates.mp3", "skyrimSongs/Imperial Throne.mp3", "skyrimSongs/Imperial Throne.mp3", "skyrimSongs/The Streets of Whiterun.mp3",
        "skyrimSongs/Ancient Stones.mp3", "skyrimSongs/The City Gates.mp3", "skyrimSongs/From Past to Present.mp3", "skyrimSongs/Dragonsearch.mp3", "skyrimSongs/The Streets of Whiterun.mp3",
        "skyrimSongs/The City Gates.mp3", "skyrimSongs/Ancient Stones.mp3", , "skyrimSongs/From Past to Present.mp3"],
    "skyrimDungeons": ["skyrimSongs/Beneath the Ice.mp3", "skyrimSongs/Towers and Shadows.mp3", "skyrimSongs/Silent Footsteps.mp3", "skyrimSongs/Silence Unbroken.mp3",
        "skyrimSongs/Shadows and Echoes.mp3", "skyrimSongs/Shattered Shields.mp3", "skyrimSongs/Into Darkness.mp3", "skyrimSongs/Death in the Darkness.mp3"
        , "skyrimSongs/Beneath the Ice.mp3", "skyrimSongs/Silence Unbroken.mp3", "skyrimSongs/Silent Footsteps.mp3", "skyrimSongs/Shadows and Echoes.mp3",
        "skyrimSongs/Towers and Shadows.mp3", "skyrimSongs/Death in the Darkness.mp3", "skyrimSongs/Shattered Shields.mp3", "skyrimSongs/Beneath the Ice.mp3",
        "skyrimSongs/Silence Unbroken.mp3", "skyrimSongs/Silent Footsteps.mp3", "skyrimSongs/Into Darkness.mp3", "skyrimSongs/Shattered Shields.mp3",
        "skyrimSongs/Towers and Shadows.mp3", "skyrimSongs/Shadows and Echoes.mp3"],
    "skyrimInnWithFireplace": ["skyrimForestSounds/Peaceful Skyrim Inn - Atmosphere ASMR.mp3"]

}
currentMainMusicKey = "";
soundSourcesDictionary = {};

function setNewMainMusic(mainMusicName, textName, currentIndex) {
    document.getElementById("musicDropdown").textContent = textName;
    if ((mainMusicName != currentMainMusicKey) || (mainMusicName == currentMainMusicKey && currentIndex == 0)) {
        console.log("DELETE THAT BULLSHIT");
        console.log("DELETE THAT BULLSHIT");
        console.log("DELETE THAT BULLSHIT");
        console.log(soundSourcesDictionary);
        delete soundSourcesDictionary[currentMainMusicKey];
        var childDivs = document.getElementById('audioDiv').getElementsByTagName('audio');
        for (var i = 0; i < childDivs.length; i++) {
            var childDiv = childDivs[i];
            console.log(childDiv);
            if (childDiv.id == currentMainMusicKey) {
                childDiv.remove();
            }
        }
        console.log(soundSourcesDictionary);
        currentIndex = 0;
        currentMainMusicKey = mainMusicName;
    } else {
        currentMainMusicKey = mainMusicName;
    }
    var newAudio = new Audio(mainSongsList[currentMainMusicKey][currentIndex]);
    newAudio.addEventListener('ended', function () {
        /*console.log(soundSourcesDictionary);
        delete soundSourcesDictionary[mainMusicName];
        console.log(currentIndex);
        if (currentIndex + 1 == mainSongsList[mainMusicName].length) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        newAudio = new Audio(mainSongsList[mainMusicName][currentIndex]);
        newAudio.play();
        newAudio.id = mainMusicName;
        document.getElementById("audioDiv").appendChild(newAudio);
        soundSourcesDictionary[mainMusicName] = newAudio;*/
        if (currentIndex + 1 == mainSongsList[currentMainMusicKey].length) {
            setNewMainMusic(currentMainMusicKey, textName, 0);
        } else {
            setNewMainMusic(currentMainMusicKey, textName, currentIndex + 1);
        }
    }, false);
    newAudio.volume = document.getElementById("mainSkyrimSong").value / 100;
    var playPromise = newAudio.play();
    if (playPromise) {
        playPromise.then(() => {
            // Audio Loading Successful
            // Audio playback takes time
            setTimeout(() => {
                // Follow up operation
                console.log("done.");
            }, newAudio.duration * 1000); // audio.duration is the length of the audio in seconds.
        }).catch((e) => {
            // Audio loading failure
        });
    }
    newAudio.id = currentMainMusicKey;
    document.getElementById("audioDiv").appendChild(newAudio);
    soundSourcesDictionary[currentMainMusicKey] = newAudio;

}
// source: https://stackoverflow.com/a/11331200/4298200

$(document).ready(function () {
    $("#exampleModalCenter").modal('show');
});
function startMusic() {
    currentMainMusicKey = "skyrimCalmNight";
    setNewMainMusic(currentMainMusicKey, 'Skyrim Calm Night', 0);
    console.log("inbetween");
    createNewAudioSource('skyrimForestSounds/forestNightAmbience.mp3', "skyrimForestNight");
    console.log("inbetween");
    createNewAudioSource('skyrimForestSounds/skyrimRainThunder.mp3', "skyrimRainThunder");
    console.log("inbetween");
    createNewAudioSource('skyrimForestSounds/highWinds.mp3', "wind");
    console.log("inbetween");
    createNewAudioSource('skyrimForestSounds/fireplaceAmbience.mp3', "fireplace");
    console.log("inbetween");



    /*if (typeof forestNightAmbience.loop == 'boolean') {
        forestNightAmbience.loop = true;
    }
    else {
        forestNightAmbience.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    forestNightAmbience.play();*/
    //console.log("DEEEEEZ NUTSSSS");
    //var forestNightAmbience = new Sound('skyrimForestSounds/forestNightAmbience.mp3', 100, true);
    //forestNightAmbience.start();
}


function createNewAudioSource(filePath, name) {
    var newAudio = new Audio(filePath);
    if (typeof newAudio.loop == 'boolean') {
        newAudio.loop = true;
    }
    else {
        newAudio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    console.log(name);
    console.log(currentMainMusicKey);
    if (name == currentMainMusicKey) {
        newAudio.volume = document.getElementById("mainSkyrimSong").value / 100;
    } else {
        console.log(name + "Slider");
        newAudio.volume = document.getElementById(name + "Slider").value / 100;
    }
    console.log("Before audio play");
    newAudio.play();
    console.log("After audio play");
    newAudio.id = name;
    document.getElementById("audioDiv").appendChild(newAudio);
    soundSourcesDictionary[name] = newAudio;

}

function changeMusicVolume(id) {
    console.log(soundSourcesDictionary);
    var sliderName = id.replace("Slider", "");
    console.log(sliderName);
    console.log(id);
    if (id == "SKYRIMSONG") {
        console.log(document.getElementById("mainSkyrimSong"));
        console.log(document.getElementById("mainSkyrimSong").value / 100);
        soundSourcesDictionary[currentMainMusicKey].volume = document.getElementById("mainSkyrimSong").value / 100;
    } else {
        console.log(document.getElementById(id).value / 100);
        soundSourcesDictionary[sliderName].volume = document.getElementById(id).value / 100;
    }
}

//var forestNightSound = new Sound("skyrimForestSounds/forestNightAmbience.mp3", 100, true);
//forestNightSound.play();
//forestNightSound.init(100, true);

// Mute a singular HTML5 element
var currentlyMuted = false
function muteMe(elem) {
    elem.muted = true;
    elem.pause();
}

function unmuteMe(elem) {
    elem.muted = false;
    elem.play();
}

// Try to mute all video and audio elements on the page
function mutePage() {
    if (currentlyMuted) {
        for (var key in soundSourcesDictionary) {
            console.log(key);
            document.getElementById("audioDiv").appendChild(soundSourcesDictionary[key]);
            soundSourcesDictionary[key].play();
        }
        currentlyMuted = false;
        document.getElementById("muteButton").innerText = "Mute";
        document.getElementById("muteButton").classList.add("blue-gradient");
        document.getElementById("muteButton").classList.remove("peach-gradient");
    } else {
        document.getElementById("audioDiv").innerHTML = "";
        currentlyMuted = true;
        document.getElementById("muteButton").innerText = "Unmute";
        document.getElementById("muteButton").classList.add("peach-gradient");
        document.getElementById("muteButton").classList.remove("blue-gradient");
    }

}



jQuery(function () {

    // Youtube player
    window.videoPlayer;

    window.onYouTubeIframeAPIReady = function () {
        var videoPlayerId = $('#videoPlayer').attr('data-videoid');
        window.videoPlayer = new YT.Player('videoPlayer', {
            height: '1080',
            width: '1920',
            videoId: videoPlayerId,
            playerVars: {
                'controls': 0,
                'autoplay': 1,
                'mute': 1,
                'loop': 1,
                'showinfo': 0,
                'modestbranding': 1
            },
            events: {
                'onReady': onVideoPlayerReady,
                'onStateChange': onVideoPlayerReady
            }
        });
    }

    function onVideoPlayerReady(event) {
        videoPlayer.playVideo();
    }
});