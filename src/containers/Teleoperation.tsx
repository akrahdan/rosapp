import { Box, Circle, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { Joystick } from 'react-joystick-component'
import { AccountSwitcher } from './AccountSwitcher'
import { NavGroup } from './NavGroup'
import { NavItem } from './NavItem'
import ROSLIB from 'roslib';
import { useRos } from '../hooks/useRos';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick'


export const Teleoperation = () => {
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
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: 0,
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
                x: (event.y || 0) / 50,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: - (event.x || 0) / 50,
            }
        })
        cmd_vel.publish(twist)
        console.log('Moving')
    }

    return (
        <Box bg={mode('white', 'gray.800')} flex="1" p="6">
            <Box
                w="full"
                h="full"
                rounded="lg"
                border="3px dashed currentColor"
                color={mode('gray.200', 'gray.700')}
            >
                <Joystick size={200} baseColor='#EEE' stickColor='#BBB' move={handleMove} stop={handleStop} />
            </Box>

        </Box>
    );
}