import React from 'react'

const Memo3 = ({attentdance}) => {
    console.log(attentdance);
    
  return (
    <div>
       {attentdance}
    </div>
  )
}

export default React.memo(Memo3)
