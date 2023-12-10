/**
 * @param {string} id user's id
 */
export interface FullUser extends User {
	id: string
}

/**
 */
export interface User {}

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
	song: Song
}

/**
 * @param {string} id iTunes song identifier
 * @param {string} name Song's name
 * @param {string} artist Artist name
 * @param {string} album Album name
 * @param {string} releaseDate Song release date. Format: YYYY-MM-DD
 * @param {string[]} genres Song's genres
 * @param {boolean} isExplicit Song's explicitness
 * @param {string} lyrics String containing lyrics in SRT format
 * @param {string} artworkUrl Song's artwork URL
 * @param {string} youtubeUrl Song's YouTube URL
 * @param {number} lyricsOffset Offset of synchronised lyrics
 * @param {number} trimStart Song start trim
 * @param {number} trimEnd Song end trim
 * @param {number} time Song's time
 * @param {number} trackCount Song's album track count
 * @param {number} trackNumber Song's track number
 */
export interface Song {
	/** iTunes song identifier */
	itunesId: string
	name: string
	artist: string
	album: string
	/** Song release date. Format: YYYY-MM-DD */
	releaseDate: string
	genres: string[]
	isExplicit: boolean
	/** Song's time */
	time: number
	/** Song's album track count */
	trackCount: number
	/** Song's track number */
	trackNumber: number
	/** String containing lyrics in SRT format */
	lyrics?: string
	/** Song's YouTube URL */
	youtubeUrl: string
	/** Song's artwork URL */
	artworkUrl: string
	/** Offset of synchronised lyrics */
	lyricOffset: number
	/** Song start trim */
	trimStart: number
	/** Song end trim */
	trimEnd: number
}

/**
 * @param {string} id Playlist id
 * @param {string} name Playlist name
 * @param {number} createdAt Timestamp at which playlist was created
 * @param {number} updatedAt Timestamp at which playlist was updated
 * @param {string} userId Creator's id
 * @param {string[]} songIds Song ids added to the playlist
 */
export interface Playlist {
	id: string
	/** Playlist name */
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
