import ROSLIB from 'roslib'


export const connection = () => {
      
    const ros = new ROSLIB.Ros();
    return ros;
}