import { useEffect, useState } from "react";
import ROSLIB from "roslib";
import { serverConfig } from "../config/serverConfig";


export const useRos = (url: string): [InstanceType<typeof ROSLIB.Ros> | undefined, () => void ] => {
    const [ros, setRos] = useState<ROSLIB.Ros>();
    // const [connected, setConnected] = useState(false)

    useEffect(() => {
        connect();
    }, [url]);

    const connect = async () => {
        const ros = new ROSLIB.Ros({
        });;

        ros.on('connection', () => {
            console.log('connected')
            // setConnected(true)
            setRos(ros)
        })

        ros.on('close', (event) => {
            console.log('closed')
            // setConnected(false)
            setTimeout(() => {
                try {
                    ros.connect(`ws://${serverConfig.SERVER_IP}:${serverConfig.PORT}`)
                } catch (error) {
                    console.log(error)
                }
            }, 3000)

        });
        try {
            ros.connect('ws://10.140.138.232:9090')
        } catch (error) {
            console.log(error)
        }


        setRos(ros)
    }

    return [ros, connect];
}

export default useRos;