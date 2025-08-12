import React, { useState } from 'react'

const Memo1 = ({name}) => {
    console.log(name);

    // const [count,setcounter] = useState(0)

    // setTimeout(()=>{
    //   setcounter(count+1)
    // },1000)
    
  return (
    <div>


      {/* <p>counter:-{count}</p> */}
     

      {name}

    </div>
  )
}

export default React.memo(Memo1)
