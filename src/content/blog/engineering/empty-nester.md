---
description: "Or why you shouldn't nest your React components."
type: post
draft: true
title: 'Empty Nester'
sections:
  - ['Engineering']
authors:
  - 'Antony Holmes'
added: '2026-01-16'
heroAlt: "Look, it's some janky code with Bokeh to make this post seem more exciting."
tags:
  - 'React'
  - 'Tutorials'
---

I'm a fan of React for web dev, this site wouldn't exist without it, but it does have a number of pitfalls that can catch you out if you aren't aware of them. One such issue is avoiding nested components. When writing JS, it's a common pattern to nest helper functions inside a main function, perhaps so it has access to the same data as the parent without having to pass it through props. For example:

```typescript
function Outer() {
  function helper(x) {
    return x * 2
  }

  return (<div>{helper(5)}</div>)
}
```

This is very common pattern and will work just fine in a React component because there is no need for memory, lifecycle, or identity tracking. The function is not compared across renders and it is essentially fungible so recreating it is harmless.

This might lead you to conclude that you could do the same thing with React components because it reduces the complexity of your codebase because a React component looks like just another function, but it isn't. A React component is a function plus:

- State
- Effects
- Refs
- Context
- Lifestyle semantics

For every render React asks "Is this the same component as last time, or a new one?" so it can maintain state by keeping components alive rather than trashing them and replacing them with new instances. This requires React to use function identity. Consider a simple <code>Parent</code> component that has a helper <code>Child</code> component within it:

```typescript
function Parent() {
  function Child() {
    return <div>Child</div>
  }

  return <Child />
}
```

Each render will do a check thus:

```typescript
Render 1: Child === Child -> true
Render 2: Child === Child -> false (new function)
```

So React thinks: "Oh, this is a different component than before, let's re-render it."

Result:

- Child is unmounted
- Child is mounted again
- All child state is lost
- useEffect cleanup + re-run happens
- Performance nosedives, lots of potential flickering and sluggish brower behaviour.

This is one of those insidious React gotchas that you can quite easily get away without noticing it causing a performance issue. I noticed it myself when I accidently nested a component that contained an input field and there was very weird behaviour when trying to type in it. Text kept disappearing and I could see the component visibly flicker with each keystroke, which is what eventually led me to tracking down the bug. Had it not been an input, it likely would have gone unnoticed.

So in the words of Sheriff [Buford T. Justice](https://en.wikipedia.org/wiki/Smokey_and_the_Bandit), if you find yourself contemplating nesting a React component, "Oh, you can THINK about it... but don't do it!"

_Have you ever nested React components? Did you find it caused bottlenecks?_
