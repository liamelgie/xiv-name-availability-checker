import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'cross-fetch'

export interface DataCenterAvailability {
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

const DATA_CENTERS = ['Chaos', 'Light', 'Materia', 'Aether', 'Crystal', 'Primal', 'Elemental', 'Gaia', 'Mana', 'Meteor']

export default async (req: NextApiRequest, res: NextApiResponse<DataCenterAvailability>) => {
  if (!req.query.param || !req.query.param[0] || !req.query.param[1] || !DATA_CENTERS.includes(req.query.param[0])) return res.status(503)

  const dc: string = req.query.param[0] as string
  const name: string = req.query.param[1] as string
  const apiRes = await fetch(`https://xivapi.com/character/search?name=${name}&server=_dc_${dc}`)
  if (!apiRes.ok) return res.status(503)
  const data = await apiRes.json() as CharacterLookupResponse
  const dataCenterResults: DataCenterAvailability = { [dc as string]: {} }
  for (const result of data.Results) {
    if (result.Name.toLowerCase() === name.toLowerCase().replace('+',' ')) {
      dataCenterResults[dc as string][result.Server] = true
    }
  }
  return res.status(200).json(dataCenterResults)
}