window.addEventListener("load", initEvents);

var audio;
var range;
var togglePlay;
var togglePlayFlag = true;
var currentPlay = 0;
var intr;
function initEvents() {
    audio = document.querySelector('#audio');
    range = document.querySelector("input[type='range']");
    range.addEventListener('change', seekSong);
    togglePlay = document.querySelector('#toggle-play');
    document.querySelector('#stopSong').addEventListener('click', stopSong);
    document.getElementById('forward').addEventListener('click', changeSong);
    document.querySelector("#backward").addEventListener('click', changeSong);
    loadAllSongs();
}
function updateSongStatus(i) {
    currentPlay = i;
}
function disableBtn(btn) {
    btn.setAttribute("disabled", true);
}
function enableBtn(btn) {
    btn.disabled = false;
}
function updateButtons() {
    var backward = document.querySelector("#backward")
    var forward = document.querySelector("#forward")
    enableBtn(backward);
    enableBtn(forward);
    if (currentPlay == 0) {
        disableBtn(backward);
    }
    else
        if (currentPlay == songs.length - 1) {
            disableBtn(forward);
        }
}
function loadAllSongs() {
    var ul = document.querySelector("#all_songs");
    songs.forEach(function (obj) {
        var li = document.createElement("li");
        var h5 = document.createElement('h5');
        var img = document.createElement("img");
        var add_btn = document.createElement("button");
        var play_btn = document.createElement("button");
        add_btn.className = 'btn btn-primary playlist_btn';
        play_btn.className = 'btn btn-primary play_btn';
        h5.innerHTML = obj.song_name;
        img.src = obj.song_thumbnail;
        add_btn.innerHTML = '<i class="fas fa-plus">';
        play_btn.innerHTML = '<i class="fas fa-play">';
        play_btn.setAttribute('title', obj.song_id);
        add_btn.setAttribute('title', obj.song_id);
        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(play_btn);
        li.appendChild(add_btn);

        ul.appendChild(li);

        play_btn.addEventListener("click", playOnClick);
        add_btn.addEventListener('click', add_to_playlist);
    });
}
function giveTimeString(seconds){
    seconds = parseInt(seconds);
    var mins = seconds/60;
    var secondsLeft = seconds%60;
    console.log("time of the song is", mins, ":", secondsLeft);
    return "00:00";

}
function updateTotalTimeOnUi(){
    document.querySelector("#total_time").value = giveTimeString(audio.duration);
}

function playOnClick() {
    clearInterval(intr);         
    var song_id = this.title;

    for (var i = 0; i < songs.length; i++) {
        if (song_id == songs[i].song_id) {
            var song = songs[i];
            break
        }
    }
    intr = setInterval(function() {
        range.value = (audio.currentTime / audio.duration) * 100;
        console.log("Playing",song_id);
    }, 1000);
    updateSongStatus(i);
    updateButtons();
    playAndChangeButton(song);
   // updateTotalTimeOnUi()
}

function playAndChangeButton(song) {
    audio.src = song.song_url;
    audio.play();
    audio.addEventListener('play', updateTotalTimeOnUi);
    togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
    togglePlay.addEventListener('click', togglePlayState);
    togglePlayFlag = false;
}

function togglePlayState() {
    if (togglePlayFlag) {
        audio.play();
        togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
        togglePlayFlag = false;
    }
    else {
        audio.pause();
        togglePlay.innerHTML = '<i class="fas fa-play"></i>';
        togglePlayFlag = true;
    }
}

function stopSong() {
    audio.currentTime = 0;
    audio.pause();
}
function playByNumber() {
    playAndChangeButton(songs[currentPlay]);
}
function changeSong() {
    if (this.id == "forward") {
        updateSongStatus(currentPlay + 1);
    }
    if (this.id == "backward") {
        updateSongStatus(currentPlay - 1);
    }
    playByNumber();
    updateButtons();
}

function add_to_playlist() {
    var song_id = this.title;
    for(var i = 0; i < songs.length; i++) {
        if (song_id == songs[i].song_id) {
            var song_obj = songs[i];
            break
        }
    }
    playlist_obj.addSong(song_obj.song_id, song_obj.song_name,
                         song_obj.song_url, song_obj.song_thumbnail);
    showPlaylist();
}

function showPlaylist() {
    var playList = document.querySelector("#playlist");
    playList.innerHTML='';
    playlist_obj.my_playlist.forEach(
        function(song){
            var li = document.createElement('li');
            var div = document.createElement('div');
            var img = document.createElement('img');
            img.className = "col col_1";
            var h5 = document.createElement('h5');
            h5.className = "col col_2";
            var button = document.createElement('button');
            button.className = "col col_3";
            var i = document.createElement('i');
            i.className = "fas fa-trash";
            button.appendChild(i);
            h5.innerText = song.name;
            img.src = song.thumbnail;
            div.className = 'row';
            div.append(img, h5, button);
            li.appendChild(div);
            console.log("appending li", li)
            playList.appendChild(li);
        }
    )
}

function seekSong() {
    console.log(this.value);
    audio.currentTime = this.value / 100 * audio.duration;
    // console.log(audio.currentTime);
}