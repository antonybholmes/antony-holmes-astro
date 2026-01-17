---
description: 'How to create unique ids for databases, UI components and anything else your heart desires.'
type: post
status: added
title: 'Unique IDs'
sections:
  - ['Engineering']
authors:
  - 'Antony Holmes'
added: '2025-12-20'
heroAlt: "Hey look, it's some janky code with Bokeh to make this post seem more exciting."
tags:
  - 'Tutorials'
---

Creating some databases recently, I started thinking more about primary keys and alternatives to simple numerical integer keys. I wanted to expose database records to a front end UI with a unique id so it was easy to track records. In public facing data, it often desirable to attach unique ids to objects/records that aren't guessable, so that nefarious actors cannot try to abuse data. For example in a transaction system, if I find out a transaction record has the id 1000, I might reasonably guess the next entry is 1001 and so I might be able to get access to data that I shouldn't, e.g. transactions unrelated to my account. Ideally we want ids that are unrelated to each other and hard to guess. The other problem is replication and sharding. Sometimes as a database gets very large, it becomes desirable to split it into smaller chunks to make admin easier. This presents a problem because using an auto incrementing numerical key as an index, ids can be repeated across chunks and extra work is required to keep track of the all the separate ids. If only there was a way to overcome these problems...

## Universal truths

Enter Universally Unique Identifiers (UUIDs), a specification for generating 128-bit numbers that can act as globally unique identifiers with negligible collision probability so that we can effectively generate an infinite number of ids without having to worry about them repeating.

UUIDs are commonly represented as 36 character strings, e.g. <strong>f81d4fae-7dec-11d0-a765-00a0c91e6ba6</strong> and can be used in place of numerical primary keys. Strings of course take up more space in the database, so there may be a space concern, but if you are using PostgreSQL, it has built in support for storing UUIDs as numbers and can seamlessly map between the string and numerical representations for you.

If you've encountered UUIDs, they were probably the v4 variants, which do what they say on the tin: create totally random ids. Totally random is a useful proptry, but we often want to keep ids ordered in a database. Is there some way to get the random properties of a UUID with the orderability of integer primary keys? Good news, there is! UUID v7 embeds a Unix Epoch timestamp in the first 48 bits with the remaining bits being random. This means that keys can be ordered sequentially, but are still unpredicable. Hurrah!

Here's a simple example to illustrate how to create UUIDs using JS:

```typescript
import { v4, v7 } from 'uuid'

const uuidv4 = v4()
const uuidv7 = v7() // each call generates a new id
```

## Size isn't everything

So all is well with the world? Not quite. It probably didn't escape your attention that UUIDs are rather long and unwieldy (<strong>f81d4fae-7dec-11d0-a765-00a0c91e6bf6</strong>) and if you are dealing with lots of them, they will rapidly pollute your debugger or front end. Also, UUIDS are often overkill because the scale of the data doesn't really require records to be globally unique, just some kind of good enough uniqueness would be sufficient.

Viola [Nano Ids](https://github.com/ai/nanoid). A simplier faster, alternative that can generate random ids from an alphabet (commonly letters and numbers).

Here is an example using the Node <code>nanoid</code> package to generate 12 character random ids.

```typescript
import { customAlphabet } from 'nanoid'

const NANOID12 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12)

// NANOID12 is now a function that will generate a
// random 12 char id each time it is called.
const id1 = NANOID12()
const id2 = NANOID12() // this will be different to id1
```

This still gives 36^12 = 4.7383813e+18 random combinations, which is likely more than enough for a lot of projects.

_What kind's of ids do you commonly generate? Are Nano ids something you've thought about using? If not, why not?_
