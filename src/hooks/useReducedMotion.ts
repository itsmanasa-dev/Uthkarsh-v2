import { useReducer, useEffect } from 'react'

function getPrefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion(): boolean {
  const [reducedMotion, dispatch] = useReducer(
    (_state: boolean, action: boolean) => action,
    getPrefersReducedMotion(),
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => dispatch(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
