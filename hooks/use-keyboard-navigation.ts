import { useEffect } from 'react'

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      // Tab navigation enhancement
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation')
      }

      // Escape key to close modals/dialogs
      if (event.key === 'Escape') {
        const closeButton = document.querySelector('[aria-label*="Close"]') as HTMLElement
        closeButton?.click()
      }

      // Arrow key navigation for radio groups
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const radioGroup = document.activeElement?.closest('[role="radiogroup"]')
        if (radioGroup) {
          event.preventDefault()
          const radios = Array.from(
            radioGroup.querySelectorAll('input[type="radio"]')
          ) as HTMLInputElement[]
          const currentIndex = radios.findIndex((r) => r === document.activeElement)
          const nextIndex =
            event.key === 'ArrowDown'
              ? (currentIndex + 1) % radios.length
              : (currentIndex - 1 + radios.length) % radios.length
          radios[nextIndex]?.focus()
          radios[nextIndex]?.click()
        }
      }
    }

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
}

// Add this to your global styles
export const keyboardNavigationStyles = `
  body.keyboard-navigation *:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  body:not(.keyboard-navigation) *:focus {
    outline: none;
  }
`