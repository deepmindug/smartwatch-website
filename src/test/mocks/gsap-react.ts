import { useEffect, type DependencyList } from 'react'

type Callback = (context: unknown, contextSafe: <T>(fn: T) => T) => void | (() => void)
type Config = DependencyList | { dependencies?: DependencyList; scope?: unknown }

function depsOf(config?: Config): DependencyList {
  if (!config) return []
  if (Array.isArray(config)) return config
  return (config as { dependencies?: DependencyList }).dependencies ?? []
}

/** Runs the callback once after mount (and on dependency change), like the real hook. */
export function useGSAP(callback?: Callback, config?: Config) {
  const deps = depsOf(config)
  // oxlint-disable-next-line react-hooks/exhaustive-deps -- mirrors the real hook's dynamic deps
  useEffect(() => {
    const cleanup = callback?.({ revert() {} }, (fn) => fn)
    return typeof cleanup === 'function' ? cleanup : undefined
  }, deps)
  return { context: { revert() {} }, contextSafe: <T,>(fn: T) => fn }
}
