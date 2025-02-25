import { Flex, Text } from "@kvib/react";

type DetailRowProps = {
  label: string;
  value: string;
  boldLabel?: boolean;
};

const DetailRow = ({ label, value, boldLabel = true }: DetailRowProps) => {
  return (
    <Flex flexDirection="row" gap={4}>
      <Text as={boldLabel ? "b" : undefined} w="40ch">
        {label}:
      </Text>
      <Text w="96">{value}</Text>
    </Flex>
  );
};

export default DetailRow;
