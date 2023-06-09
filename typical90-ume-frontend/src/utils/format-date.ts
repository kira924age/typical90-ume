/**
 * Formats a UNIX timestamp in seconds into a full date string.
 * @param dateSecond - The UNIX timestamp in seconds.
 * @returns The formatted full date string in the format 'YYYY-MM-DD HH:mm:ss'.
 */
export const formatFullDate = (dateSecond: number): string => {
  const date = new Date(dateSecond * 1000)
  const yyyy = String(date.getFullYear())
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const sec = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`
}
