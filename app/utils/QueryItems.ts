export abstract class QueryItems {
  public static parse(query: string): any {
    const items: string[] = query.split('&')
    const queryItems = {}
    items.forEach((i) => {
      const [key, value] = i.split('=')
      queryItems[decodeURIComponent(key)] = decodeURIComponent(value)
    })
    return queryItems
  }
}
