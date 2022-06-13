import { Box, Circle, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import {
  BiBuoy,
  BiCog,
  
  BiCreditCard,
  BiEnvelope,
  
  BiMap,
  BiNetworkChart,
  BiNews,
  BiPurchaseTagAlt,
  BiRecycle,
  BiRedo,
  BiStats,
  BiUserCircle,
  BiWallet,
} from 'react-icons/bi'
import { Joystick } from 'react-joystick-component'
import { AccountSwitcher } from './AccountSwitcher'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'
import { Teleoperation } from './Teleoperation'
import ROSLIB from 'roslib';
import { useRos } from '../hooks/useRos';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'
import { Map } from './Map'
import { Navigation } from './Navigation'



export const App = () => {
  const [ros, connect] = useRos('ws://localhost');
  
  if (!ros) {
   return null;
  }
  


  const handleStop = (event: IJoystickUpdateEvent) => {
    console.log("Stopping")
    const cmd_vel = new ROSLIB.Topic({
      ros,
      name: '/turtle1/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    })

    const twist = new ROSLIB.Message({
      linear: {
        x: 0,
        y: 0 ,
        z: 0
      },
      angular: {
        x: 0,
        y: 0,
        z: 0 ,
      }
    })
    cmd_vel.publish(twist)
  }

  const handleMove = (event: IJoystickUpdateEvent) => {
    const cmd_vel = new ROSLIB.Topic({
      ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    })

    const twist = new ROSLIB.Message({
      linear: {
        x: (event.y || 0)/ 50,
        y: 0 ,
        z: 0
      },
      angular: {
        x: 0,
        y: 0,
        z: - (event.x || 0)/ 50 ,
      }
    })
    cmd_vel.publish(twist)
    console.log('Moving')
  }

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex h="full" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="full" direction="column" px="4" py="4">
            <AccountSwitcher />
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              <Stack spacing="1">
                <NavItem active icon={<BiMap />} label="Map" />
                <NavItem icon={<BiMap />} label="Teleoperation" />
              </Stack>
              <NavGroup label="Remote Access">
                <NavItem icon={<BiCreditCard />} label="Transactions" />
                <NavItem icon={<BiUserCircle />} label="Customers" />
              </NavGroup>

              <NavGroup label="Network Settings">
                <NavItem icon={<BiNetworkChart />} label="Change WLAN" />
                <NavItem icon={<BiStats />} label="Status" />

              </NavGroup>
            </Stack>
            <Box>
              <Stack spacing="1">
                <NavItem subtle icon={<BiCog />} label="Settings" />
                <NavItem
                  subtle
                  icon={<BiBuoy />}
                  label="Help & Support"
                  endElement={<Circle size="2" bg="blue.400" />}
                />
              </Stack>
            </Box>
          </Flex>
        </Box>
         <Navigation />
      </Flex>
    </Box>
  )
}
