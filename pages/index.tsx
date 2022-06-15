import { Box, Flex, Text } from "@chakra-ui/layout";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { Image } from "@chakra-ui/react";

const Home = ({ artists }) => (
  <GradientLayout
    color="red"
    title="Samuel"
    subtitle="Is nice"
    description="Programmer incarnate"
    image="https://img.fruugo.com/product/1/78/141073781_max.jpg"
    roundImage="true"
  >
    <Box color="white" paddingX="40px">
      <Box marginBottom="40px">
        <Text fontSize="2xl" fontWeight="bold">
          Top Artists this month
        </Text>
        <Text fontSize="md">only visible to you</Text>
      </Box>
      <Flex>
        {artists.map((artist) => (
          <Box paddingX="10px" width="20%">
            <Box
              bgGradient="linear(to top, gray.900 ,rgba(0,0,0,0))"
              borderRadius="4px"
              padding="15px"
              width="100%"
            >
              <Image
                src="https://placekitten.com/300/300"
                borderRadius="100%"
              />
              <Box marginTop="10px">
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  </GradientLayout>
);

// Runs server-side at runtime when this homepage is requested
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
