import { api } from "../../../lib/api.ts"
import { EformidlingRequestDTO } from "../../../types/types"

export const postOrderToEformidling = (body: EformidlingRequestDTO) => {
  return api.post("/eFormidling/send", body)
}
