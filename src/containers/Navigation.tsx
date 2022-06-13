import { Box, Container, useColorModeValue as mode, useEventListenerMap } from '@chakra-ui/react'
import * as React from 'react'
import ROSLIB, { Message, Quaternion } from 'roslib';
import * as Three from 'three';
import useRos from '../hooks/useRos';
import { MapContent } from './MapContent';

interface MapState {
    x: number;
    y: number
    orientation: number
    linear_velocity: number
    angular_velocity: number

}

const initialState = {
    x: 0,
    y: 0,
    orientation: 0,
    linear_velocity: 0,
    angular_velocity: 0
}



export const Navigation = () => {



    const [ros, connect] = useRos('ws://localhost');
    
    React.useEffect(() => {
      if(ros) {
          
          viewMap(ros)
      }
    }, [ros])



    const viewMap = (ros: ROSLIB.Ros) => {
        const viewer =  new window.ROS2D.Viewer({
            divID: 'nav_id',
            width: 800,
            height: 380
        })

        const navClient = new window.NAV2D.OccupancyGridClientNav({
            ros,
            rootObject: viewer.scene,
            viewer,
            serverName: "/move_base",
            withOrientation: true
        })
    }

   
    return (
        <Box as="main" py="8" flex="1">
            <Container maxW="7xl">
                <Box bg={mode('white', 'gray.700')} p="6" rounded="lg" shadow="base">
                    <Box
                      id='nav_id'
                        border="3px dashed currentColor"
                        color={mode('gray.200', 'gray.600')}
                        h="96"
                        rounded="lg"
                    >
                        {/* <div id="nav_id">Viewer</div> */}
                    </Box>
                </Box>
                
            </Container>
        </Box>
    );
}