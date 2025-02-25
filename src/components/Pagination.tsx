import { Button, HStack, Text } from "@kvib/react";
import { ComponentProps } from "react";

type PaginationProps = {
  current: number;
  total: number;
  onShowMore: () => void;
  isFetching: boolean;
  isDisabled: boolean;
} & ComponentProps<typeof HStack>;

export const Pagination = ({
  current,
  total,
  onShowMore,
  isFetching,
  isDisabled,
}: PaginationProps) => {
  return (
    <HStack>
      <Button
        isLoading={isFetching}
        onClick={onShowMore}
        isDisabled={isDisabled}
        variant="tertiary"
        rightIcon="arrow_downward"
      >
        Last flere aktive ordrer
      </Button>
      {!isFetching && (
        <Text color="gray.500" marginLeft="auto">
          {current} av {total} ordrer er vist
        </Text>
      )}
    </HStack>
  );
};
