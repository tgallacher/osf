
/**
 * The number of starred repos above which pagination
 * will kick in. This is to combat the GitHub API rate limit:
 * currently 60 requests / hour.
 *
 * Requests will follow N+1 pattern, where N = number of starred
 * repos for a given account.
 *
 * @type {Number}
 */
export const QUEUE_MIN_THRESHOLD = 14;
