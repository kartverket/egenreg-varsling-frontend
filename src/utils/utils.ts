export const formatDate = (timestamp: string): string => {
  const dateObj = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat("no-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Oslo",
  }).format(dateObj);

  const dateAndTime = formattedDate.split(", ");
  return `${dateAndTime[0]} kl. ${dateAndTime[1].slice(0, 5)}`;
};

export const statusTranslation = {
  Processing: "Prosesseres",
  Delivered: "Levert",
  Failed: "Feilet",
  Cancelled: "Kansellert",
  Completed: "Fullført",
  Scheduled: "Planlagt",
  NotIdentified: "Ikke funnet i KRR",
};
