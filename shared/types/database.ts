/**
 * @param {string} id user's id
 */
export interface FullUser extends User {
	id: string
}
/**
 * @param {string[]} songs user's created songs
 * @param {Playlist} playlists user's created playlists
 */
export interface User {
	/** user's songs */
	songIds: string[]
	/** user's playlists */
	playlistIds: string[]
}

/**
 * @param {string} id Songs item id
 * @param {number} createdAt Timestamp at which song item was created
 * @param {number} updatedAt Timestamp at which song item was updated
 * @param {string} userId Creator's id
 * @param {Song} song Song object
 */
export interface SongItem {
	/** Song item id */
	id: string
	/** Timestamp at which song item was created */
	createdAt: number
	/** Timestamp at which song item was updated */
	updatedAt: number
	/** Creator's id */
	userId: string
	/** Song object */
	song: FullSong
}

/**
 * @param {string} id iTunes song identifier
 */
export interface FullSong extends Song {
	/** iTunes song identifier */
	id: string
}
/**
 * @param {string} name Song's name
 * @param {string} artist Artist name
 * @param {string} album Album name
 * @param {string} releaseDate Song release date. Format: YYYY-MM-DD
 * @param {string[]} genres Song's genres
 * @param {boolean} isExplicit Song's explicitness
 * @param {string} lyrics String containing lyrics in SRT format
 * @param {string} youtubeUrl Song's YouTube URL
 * @param {number} lyricOffset Offset of synchronised lyrics
 * @param {number} trimStart Song start trim
 * @param {number} trimEnd Song end trim
 */
export interface Song {
	name: string
	artist: string
	album: string
	/** Song release date. Format: YYYY-MM-DD */
	releaseDate: string
	genres: string[]
	isExplicit: boolean
	/** String containing lyrics in SRT format */
	lyrics?: string
	/** Song's YouTube URL */
	youtubeUrl: string
	/** Offset of synchronised lyrics */
	lyricOffset: number
	/** Song start trim */
	trimStart: number
	/** Song end trim */
	trimEnd: number
}

/**
 * @param {string} name Playlist name
 * @param {number} createdAt Timestamp at which playlist was created
 * @param {number} updatedAt Timestamp at which playlist was updated
 * @param {string} userId Creator's id
 * @param {string[]} songIds Song ids added to the playlist
 */
export interface Playlist {
	name: string
	/** Timestamp at which playlist was created */
	createdAt: number
	/** Timestamp at which playlist was updated */
	updatedAt: number
	/** Creator's id */
	userId: string
	/** Song ids added to the playlist */
	songIds: string[]
}
