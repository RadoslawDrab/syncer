import { User } from './database'

/**
 * @param {Status} status Response status
 * @param {Data} data Data returned in body
 */
export interface ResponseBody<Data> {
	/** Response status */
	status: Status
	/** Data returned in body */
	data: Data
}

/**
 * @param {number} code HTTP response status code
 * @param {string} message Response message
 */
export interface Status {
	/** HTTP Response status code */
	code: number
	message: string
}
export interface RequestBody {
	user: Partial<{
		displayName: string
		email: string
	}>
	userData: Partial<User>
}
