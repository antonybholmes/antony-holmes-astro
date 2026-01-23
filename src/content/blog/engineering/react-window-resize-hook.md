---
title: 'React Window Resize Hook'
description: 'Monitoring when a window resizes'
type: post
status: added

sections:
  - ['Engineering']
authors:
  - 'Antony Holmes'
added: '2026-01-22'
tags:
  - 'Typescript'
  - 'React'
  - 'Tutorials'
  - 'Web'
---

When developing websites, it's often the case that you'll be doing some kind of responsive design and your site will reflow its layout to match the page size. Normally you'll be using CSS media breakpoints, but if you're working with React, sometimes your component will need to get the page size and you can't get this from CSS. So how can we do this? JS offers event listeners for listening to various actions happening in the window. Let's tap into that and while we're at it encapsulate a window size listener into a reusable React hook. A React hook is a function that lets a stateless React component remember state and react to changes.

Here is a simple implementation you can reuse.

```typescript
// A simple structure to store width/height
export interface IDim {
  w: number
  h: number
}

// A default for the window dimension
export const NO_DIM: IDim = { w: -1, h: -1 }

export function useWindowSize(): IDim {
  const [windowSize, setWindowSize] = useState<IDim>(NO_DIM)

  useEffect(() => {
    const handleResize = () => {
      // Set window width/height to state

      setWindowSize({
        w: window.innerWidth ?? 0,
        h: window.innerHeight ?? 0,
      })
    }

    // Add an listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}

...

// Let's use it
const size = useWindowSize()
```

<code>window.addEventListener('resize', handleResize)</code> attaches a function to monitor when the window resizes. The <code>handleResize</code> function stores the window dimensions in a React state variable <code>windowSize</code> which is returned by the hook function. Thus when we use <code>size</code> in our code, it is now reactive and when the window resizes, it will your React code to update and you can update your UI accordingly.

I hope you find this useful.
