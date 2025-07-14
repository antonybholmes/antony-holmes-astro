//import SecondaryButtonLink from "../link/secondary-button-link"

import PubMedIcon from "@components/icons/pubmed"
import { BaseLink } from "@components/link/base-link"
import type { CollectionEntry } from "astro:content"
import { useState } from "react"

// `https://pubmed.ncbi.nlm.nih.gov/?term=${person.lastName}+${person.firstName}%5BAuthor%5D&sort=pubdate`

function getLink(person: CollectionEntry<"people">): string {
  const tokens = person.data.name.split(" ")
  const f = tokens[0]
  const l = tokens[tokens.length - 1]

  return `https://pubmed.ncbi.nlm.nih.gov/?term=(${l}+${f[0]}[Author])+AND+(Columbia+University[Affiliation])&sort=pubdate`
}

interface IPubMedLinkProps {
  person: CollectionEntry<"people">
}

export default function PubMedLink({ person }: IPubMedLinkProps) {
  const [_hover, _setHover] = useState(false)

  let url: string

  if (person.data.pubmed) {
    url = person.data.pubmed
  } else {
    url = getLink(person)
  }

  return (
    <BaseLink
      href={url}
      className="trans-300 flex flex-row items-center gap-x-3 opacity-80 transition-opacity hover:opacity-100"
      arial-label="View PubMed article"
    >
      <PubMedIcon className="w-40" />
    </BaseLink>
  )
}
