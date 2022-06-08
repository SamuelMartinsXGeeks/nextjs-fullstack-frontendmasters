import NextImage from "next/image";

import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
  Text,
  Flex,
} from "@chakra-ui/layout";

import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px">
        <Box width="90%" marginBottom="20px" paddingX="20px">
          <Flex flexDirection="row" gap="5px">
            <NextImage src="/logo.svg" height={32} width={32} />
            <Text fontSize={23}>Aero Music</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
