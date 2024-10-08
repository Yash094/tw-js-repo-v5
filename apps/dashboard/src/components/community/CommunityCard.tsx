import { Flex, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Card, Heading, Text } from "tw-components";

interface CommunityCardProps {
  image: string;
  link: string;
  title: string;
  description: string;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  image,
  link,
  title,
  description,
}) => {
  return (
    <Card
      w="full"
      mx={{
        base: "auto",
        md: "0",
      }}
      p={0}
      _hover={{
        opacity: 0.9,
      }}
    >
      <Flex
        flexDir="column"
        bg="transparent"
        borderRadius="xl"
        _hover={{ textDecor: "none" }}
        as={LinkBox}
      >
        <div className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-t-xl bg-[#181818]">
          <ChakraNextImage
            pointerEvents="none"
            alt={title}
            borderTopRadius="xl"
            boxSize="100%"
            objectFit="cover"
            src={image}
            width={90}
            height={90}
          />
        </div>

        <Flex
          w="full"
          p={4}
          gap={4}
          flexDir="column"
          as={LinkOverlay}
          href={link}
          my={2}
        >
          <Heading as="h3" size="title.sm">
            {title}
          </Heading>
          {description && <Text color="#949494">{description}</Text>}
        </Flex>
      </Flex>
    </Card>
  );
};
