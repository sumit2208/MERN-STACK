import React, { useMemo } from 'react'

const Memo2 = ({marks,subject}) => {
  console.log(marks);
  const percentage = useMemo(()=>{
    console.log("useMemo inside"); 
    return ((marks*100)/100)
  },[])
  
  return (
    <div>
      <p>Marks:{marks}</p>
      <p>percentage:{percentage}%</p>
      <p>subject:{subject}</p>
    </div>
  )
}

export default React.memo(Memo2)
