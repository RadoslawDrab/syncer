/**
 * @param {string} id user's identifier
 * @param {string} name user's name
 * @param {SongItem} songs user's created songs
 * @param {Playlist} playlists user's created playlists
 */
export interface User {
	id: string
	name: string
	/** user's songs */
	songs: SongItem[]
	/** user's playlists */
	playlists: Playlist[]
}

/**
 * @param {string} id Song item identifier
 * @param {number} createAt Timestamp at which song item was created
 * @param {string} userId Creator's id
 * @param {number} lyricOffset Offset of synchronised lyrics
 * @param {number} trimStart Song start trim
 * @param {number} trimEnd Song end trim
 * @param {Song} song Song object
 */
export interface SongItem {
	id: string
	/** Timestamp at which song item was created */
	createAt: number
	/** Creator's id */
	userId: string
	/** Offset of synchronised lyrics */
	lyricOffset: number
	/** Song start trim */
	trimStart: number
	/** Song end trim */
	trimEnd: number
	/** Song object */
	song: Song
}

/**
 * @param {string} id Song identifier
 * @param {string} name Song's name
 * @param {string} artist Artist name
 * @param {string} album Album name
 * @param {string} releaseDate Song release date. Format: YYYY-MM-DD
 * @param {string} genre Song's genre
 * @param {boolean} isExplicit Song's explicitness
 * @param {string} lyrics String containing lyrics in SRT format
 */
export interface Song {
	id: string
	name: string
	artist: string
	album: string
	/** Song release date. Format: YYYY-MM-DD */
	releaseDate: string
	genre: string
	isExplicit: boolean
	/** String containing lyrics in SRT format */
	lyrics: string
}

/**
 * @param {string} id Playlist identifier
 * @param {string} name Playlist name
 * @param {number} createAt Timestamp at which playlist was created
 * @param {string} userId Creator's id
 * @param {string[]} songIds Song ids added to the playlist
 */
export interface Playlist {
	id: string
	name: string
	/** Timestamp at which playlist was created */
	createdAt: number
	/** Creator's id */
	userId: string
	/** Song ids added to the playlist */
	songIds: string[]
}
