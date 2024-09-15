let songs = [
	{artistName: "Queen",
	songName: "Bohemian Rhapsody - Sample",
	url: "https://upload.wikimedia.org/wikipedia/en/f/fb/QueenBohemianRhapsody_Opera.ogg"},
	{artistName: "Queen",
	 songName: 'We Will Rock You - Sample',
	 url: "https://upload.wikimedia.org/wikipedia/en/b/bc/Wewillrockyou.ogg"},
	{artistName: "Queen",
	 songName: "Don't Stop Me Know - Sample",
	 url: "https://upload.wikimedia.org/wikipedia/en/d/db/Queen_-_Don%27t_Stop_Me_Now.ogg"},
	{artistName: "Queen",
	 songName: "I Want To Break Free - Sample",
	 url: "https://upload.wikimedia.org/wikipedia/en/7/75/Queen_I_want_to_break_free.ogg"},
	{artistName: "Queen",
	 songName: "Another One Bites The Dust - Sample",
	 url: "https://upload.wikimedia.org/wikipedia/en/3/39/Another-one-bites-the-dust--forward.ogg"},
	{artistName: "Queen",
	 songName: "We Are The Champions - Sample",
	 url: "https://upload.wikimedia.org/wikipedia/en/1/1c/Wearethechampions.ogg"},
	{artistName: "Queen",
	 songName: "Crazy Little Thing Called Love - Sample",
	 url: "https://upload.wikimedia.org/wikipedia/en/0/06/Queen_-_Crazy_Little_Thing_Called_Love.ogg"}
]

let audio = new Audio(songs[0].url);
let previousButton = document.querySelector('.previous')
let playButton = document.querySelector('.play')
let pauseButton = document.querySelector('.pause')
let nextButton = document.querySelector('.next')
let firstG = document.querySelector(".first-g")
let secondG = document.querySelector(".second-g")
let artist = document.querySelector(".artist")
let song = document.querySelector(".song")
let popUp = document.querySelector('.alert')
let musicLogo = `<i class="fas fa-music"></i>`

let currentSongIndex = 0

const spin = () => {
 firstG.classList.add('spin')
 secondG.classList.add('spin')
}

playButton.addEventListener('click', function(){
	audio.play()
	artist.innerText = currentSong().artistName
	song.innerHTML = currentSong().songName + musicLogo
	spin()
  audio.loop='true'
})

pauseButton.addEventListener('click', function(){
	audio.pause()
	firstG.classList.remove('spin')
	secondG.classList.remove('spin')
})

const currentSong = (index) => {
if(index === undefined){
	return songs[currentSongIndex]
} else if (index < songs.length ){
	artist.innerText = songs[index].artistName
	song.innerHTML = songs[index].songName + musicLogo
 }
}

const nextSong = ()=> {
	newSongIndex = currentSongIndex + 1
	currentSong(newSongIndex)
	if(newSongIndex < songs.length){
		audio.pause()
		audio = new Audio(songs[newSongIndex].url)
		audio.play()
		audio.loop='true'
		return currentSongIndex = newSongIndex
	} else {
		popUp.classList.add('pop-up')
		popUp.innerText = "This the last song."
			setTimeout(() => {
			popUp.classList.remove('pop-up')
		}, 1000)
		return currentSongIndex
	}

}

const previousSong= () => {
	newSongIndex = currentSongIndex - 1
	if(newSongIndex < 0 ){
		popUp.classList.add('pop-up')
		popUp.innerText = 'This is the first song.'
		setTimeout(() => {
			popUp.classList.remove('pop-up')
		}, 1000)
		return currentSongIndex
	} else {
		audio.pause()
		currentSong(newSongIndex)
		audio = new Audio(songs[newSongIndex].url)
		audio.play()
		audio.loop='true'
		return currentSongIndex = newSongIndex
	}
}

nextButton.addEventListener('click', function(){
 nextSong()
 spin()
})

previousButton.addEventListener('click', function(){
	previousSong()
	spin()
})

