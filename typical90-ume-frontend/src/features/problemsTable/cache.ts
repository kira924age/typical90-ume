const problemTableCache = { hasClicked: false }

/**
 * Sets the value of hasClicked.
 *
 * @param value - The boolean value to set.
 * @returns void
 */
const setHasClicked = (value: boolean): void => {
  problemTableCache.hasClicked = value
}

export { problemTableCache, setHasClicked }
