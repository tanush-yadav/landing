import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '-50px',
    triggerOnce = true,
    delay = 0
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip if already animated and triggerOnce is true
    if (hasAnimated && triggerOnce) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true)
                if (triggerOnce) {
                  setHasAnimated(true)
                }
              }, delay)
            } else {
              setIsVisible(true)
              if (triggerOnce) {
                setHasAnimated(true)
              }
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated])

  return { ref, isVisible }
}

// Staggered animation hook for multiple elements
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  baseDelay: number = 50,
  options: UseScrollAnimationOptions = {}
) {
  const refs = useRef<(T | null)[]>(Array(itemCount).fill(null))
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(itemCount).fill(false)
  )

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    refs.current.forEach((element, index) => {
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * baseDelay)
            } else if (!options.triggerOnce) {
              setVisibleItems((prev) => {
                const newState = [...prev]
                newState[index] = false
                return newState
              })
            }
          })
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '-50px'
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer, index) => {
        const element = refs.current[index]
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemCount, baseDelay, options])

  const setRef = (index: number) => (element: T | null) => {
    refs.current[index] = element
  }

  return { setRef, visibleItems }
}