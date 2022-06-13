import { Box, Divider, Flex, Spacer, Stack } from '@chakra-ui/react'
import * as React from 'react'
import {
  FaRegBell,
  FaRegChartBar,
  FaRegHeart,

  FaRegPaperPlane,
  FaRegQuestionCircle,
  FaUser,
} from 'react-icons/fa'
import {
  AiFillSetting
} from 'react-icons/ai'
import { Logo } from './Logo'
import { NavLink } from './NavLink'
import { SearchField } from './SearchField'
import { UserProfile } from './UserProfile'

import useRos from '../hooks/useRos';

export const App: React.FC = () => {

  // const [ros, connected, connect] = useRos('ws://localhost');

  // console.log(ros)
  // if (!connected) {
  //  return null;
  // }
  return (
    <Flex
      height="100vh"
      width={{ base: 'full', sm: 'xs' }}
      direction="column"
      borderRightWidth="1px"
      bg="blue.600"
      color="white"
      px={6}
      py={8}
    >
      <Box mb={8}>
        <Logo iconColor="blue.600" />
      </Box>
      <SearchField mb={6} />
      <Stack spacing={6}>
        <Stack>
          <NavLink label="Teleoperation" icon={FaUser} isActive />
  
          <NavLink label="Map" icon={FaRegPaperPlane} />
          <NavLink label="Statistics" icon={FaRegChartBar} />
        </Stack>
        <Divider />
        <Stack>
          <NavLink label="Settings" icon={AiFillSetting} />
          <NavLink label="Help Center" icon={FaRegQuestionCircle} />
        </Stack>
      </Stack>
      <Spacer />
      <UserProfile
        name="Cindy Winston"
        image="https://images.unsplash.com/photo-1521296797187-726205347ca9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjR8fGxhZHklMjBzbWlsaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        email="cindy@example.com"
      />
    </Flex>
  )
}
