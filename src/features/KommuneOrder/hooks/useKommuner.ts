import { useQuery } from "@tanstack/react-query"

type Kommune = { [K in "kommunenavn" | "kommunenavnNorsk" | "kommunenummer"]: string }


const useKommuner = () => {
  const query = useQuery<Kommune[]>({
    queryKey: ["kommuner"],
    queryFn: () =>
      fetch("https://api.kartverket.no/kommuneinfo/v1/kommuner").then(res => res.json()),
  })

  return query
}

export default useKommuner
