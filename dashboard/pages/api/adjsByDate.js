// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import adjsData from "../../adjsData.json"
import parseDate from "../../utils"


export default function ajustmentsAPI(req, res) {
  adjsData.map((adj) => {
    parseDate(adj.TRANSACTION_DATE)
  })
  res.status(200).json(adjsData)
}
