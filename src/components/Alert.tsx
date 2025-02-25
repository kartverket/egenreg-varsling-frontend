import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@kvib/react";
import { ComponentProps } from "react";

type AlertStatus = "error" | "warning" | "success" | "info";

type CustomAlertProps = {
  title: string;
  description: string;
  status?: AlertStatus;
} & ComponentProps<typeof Alert>;

export const CustomAlert = ({
  title,
  description,
  status,
  ...rest
}: CustomAlertProps) => {
  return (
    <Alert status={status} {...rest}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
    </Alert>
  );
};
