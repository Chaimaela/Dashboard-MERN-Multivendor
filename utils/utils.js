import io from 'socket.io-client'


export const overrideStyle = {
    display : 'flex',
    margin : '0 auto',
    height: '20px',
    justifyContent : 'center',
    alignItems : 'center',
    gap:'10px',
    padding:"5px"
  }

  export const socket = io('http://localhost:5000')