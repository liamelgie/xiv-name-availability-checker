import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'cross-fetch'

export type WorldAvailability = {
  available: boolean
}

interface DataCenter {
  [key: string]: {
    [key: string]: boolean
  }
}

interface Result {
  Avatar: string,
  FeastMatches: number,
  ID: string,
  Lang: string,
  Name: string,
  Rank?: null,
  RankIcon?: null,
  Server: string
}

interface Pagination {
  Page: number,
  PageNext?: null,
  PagePrev?: null,
  PageTotal: number,
  Results: number,
  ResultsPerPage: number,
  ResultsTotal: number
}

type CharacterLookupResponse = {
  Pagination: Pagination,
  Results: Result[]
}

export default async (req: NextApiRequest, res: NextApiResponse<WorldAvailability>) => {
  const { world, name } = req.query
  const apiRes = await fetch(`https://xivapi.com/character/search?name=${name}&server=${world}`)
  if (!apiRes.ok) return res.status(503)

  const data = await apiRes.json() as CharacterLookupResponse
  return res.status(200).json({ available: data.Pagination.ResultsTotal === 0 })
}