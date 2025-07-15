export interface IPublication {
  pmid: number
  pmcid?: string
  authorList: string[]
  year: number
  month: number
  day: number
  volume: string
  title: string
  abstract: string
  journal: string
  doi: string
  authors: string
}
