// function Playlist(id, name, url, thumbnail) {
//     this.id = id;
//     this.name = name;
//     this.url = url;
//     this.thumbnail = thumbnail;
// }

class Playlist {
    constructor(id, name, url, thumbnail) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.thumbnail = thumbnail;
    }
}

var playlist_obj = {
    my_playlist : [],
    addSong : function(id, song_name, url, thumbnail) {
        var obj = new Playlist(id, song_name, url, thumbnail);
        this.my_playlist.push(obj);
        console.log(this.my_playlist);
    },
    deleteSong : function() {

    },
    sortSong : function() {

    },
    searchSong : function() {

    }
}