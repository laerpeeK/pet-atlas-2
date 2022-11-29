class LocalCache {
  setLocalCache(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getLocalCache(key: string): unknown {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteLocalCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearAllCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
