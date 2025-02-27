import { Button, Flex } from "@kvib/react"
import { useState } from "react"
import { Notification } from "../api/types.ts"
import { getRecipients } from "../utils.ts"

type DownloadRecipientsProps = {
  notifications: Notification[]
}
export const DownloadRecipients = ({ notifications }: DownloadRecipientsProps) => {
  const [isDownloaded, setIsDownloaded] = useState(false)
  const successfulRecipients = getRecipients(notifications)

  // Don't render the button if there are no successful recipients
  if (successfulRecipients.length === 0) {
    return null
  }

  const handleDownload = () => {
    const fnrAsCsvContent = successfulRecipients.join("\n")
    const blob = new Blob([fnrAsCsvContent], { type: "text/csv" })

    const csvURL = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = csvURL
    link.download = "personnummer.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsDownloaded(true)
  }

  return (
    <Flex align="vertical" justifyContent="right">
      <Button
        variant="secondary"
        disabled={isDownloaded}
        onClick={handleDownload}
        leftIcon={isDownloaded ? "check" : "download"}
      >
        {isDownloaded ? "Lastet ned" : "Last ned mottakere (Levert)"}
      </Button>
    </Flex>
  )
}
