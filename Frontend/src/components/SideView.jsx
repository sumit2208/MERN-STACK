import React from 'react'
import { useReducer } from 'react'

function reducer(state, action) {


    switch (action.type) {
        case 'ince':
            return { age: state.age + 1 }
        case 'dec':
            return { age: state.age - 1 }
    }

}

const SideView = () => {
    const [state, dispatch] = useReducer(reducer, { age: 42 })
    return (
        <div>
            SideView

            <button onClick={() => dispatch({ type: 'ince' })}>ince age</button>
            <button onClick={()=>dispatch({type:'dec'})}>dec age</button>

            <p>{state.age}</p>

        </div>
    )
}

export default SideView
