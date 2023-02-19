export function getRedirectFromQuery(redirect: string | string[] | undefined) {
  const queryRedirect = (() => {
    if (Array.isArray(redirect)) return redirect[0]
    return redirect
  })()

  if (queryRedirect === undefined) return null

  return queryRedirect
}
