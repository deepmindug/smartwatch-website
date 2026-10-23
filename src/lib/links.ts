/** True for absolute http(s) URLs, which open in a new tab. */
export function isExternal(to: string): boolean {
  return /^https?:\/\//i.test(to)
}

/** True for mailto:, tel: and in-page hash links, which render as plain anchors. */
export function isPlainAnchor(to: string): boolean {
  return /^(mailto:|tel:|#)/i.test(to)
}
