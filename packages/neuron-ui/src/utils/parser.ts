export const prompt = (search: string) => {
  const query = new URLSearchParams(search)
  const params: { [index: string]: string | null } = {}
  const keys = [...query.keys()]
  keys.forEach((key: string) => {
    params[key] = query.get(key)
  })
  return params
}
export const queryParsers = { prompt }

export default { queryParsers }
