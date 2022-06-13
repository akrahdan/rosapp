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



export const Map = () => {

    const [map, showMap] = React.useState<MapState>(initialState);

    const [ros, connect] = useRos('ws://localhost');
    
    React.useEffect(() => {
      if(ros) {
          getRoboState(ros)
      }
    }, [ros])

    const getRoboState = (ros: ROSLIB.Ros) => {
        const pose_subcriber = new ROSLIB.Topic({
            ros: ros,
            name: '/amcl_pose',
            messageType: 'geometry_msgs/PoseWithCovarianceStamped'
        });

        const velocity_subcriber = new ROSLIB.Topic({
            ros: ros,
            name: '/odom',
            messageType: 'nav_msgs/Odometry'
        });

        pose_subcriber.subscribe(message => {
            const mapState = {
                x: Number((message as any).pose.pose.position.x.toFixed(2)),
                y: Number((message as any).pose.pose.position.x.toFixed(2)),
                orientation: getOrientation(((message as any).pose.pose.orientation) as Quaternion),
                linear_velocity: 0,
                angular_velocity: 0
            }
            showMap(mapState)
        })

        

        velocity_subcriber.subscribe(message => {
            const newState = { ...map, 
              linear_velocity: Number((message as any).twist.twist.linear.x.toFixed(2)),
              angular_velocity: Number((message as any).twist.twist.angular.z.toFixed(2))
            }
           showMap(newState)
        })
    }

    const getOrientation = (quaternian: Quaternion) => {
        const q = new Three.Quaternion(
            quaternian.x,
            quaternian.y,
            quaternian.z,
            quaternian.w
        )
        const RPY = new Three.Euler().setFromQuaternion(q);
        return RPY["z"] * (180 / Math.PI);
    }

   


    console.log(map)
    return (
        <Box as="main" py="8" flex="1">
            <Container maxW="7xl">
                <Box bg={mode('white', 'gray.700')} p="6" rounded="lg" shadow="base">
                    <Box
                        border="3px dashed currentColor"
                        color={mode('gray.200', 'gray.600')}
                        h="96"
                        rounded="lg"
                    />
                </Box>
            </Container>
        </Box>
    );
}