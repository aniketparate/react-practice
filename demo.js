import { useState } from "react";

// const Display = ({counter}) => {
//     return (
//         <div>{counter}</div>
//     )
// }

// const Display = ({counter}) => <div>{counter}</div>

// const Button = (props) => {
//     return (
//         <button onClick={props.onClick}>
//             {props.text}
//         </button>
//     )
// }

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const Button = ({ handleClick, text }) => (
//     <button onClick={handleClick}>
//         {text}
//     </button>
// )

// const History = (props) => {
//     if (props.allClicks.length === 0) {
//         return (
//             <div>
//                 the app is used by pressing the button
//             </div>
//         )
//     }
//     return (
//         <div>
//             button press history: {props.allClicks.join(' ')}
//         </div>
//     )
// }

// const App = () => {
//     // const [ counter, setCounter ] = useState(0)
//     const [ left, setLeft] = useState(0)
//     const [ right, setRight] = useState(0)
//     const [ allClicks, setAll] = useState([])

//     // const [ clicks, setClicks] = useState({
//     //     left: 0, right: 0
//     // })

//     const handleLeftClick = () => {
//         // const newClicks = {
//         //     // right: clicks.right,
//         //     ...clicks,
//         //     left: clicks.left + 1
//         // }
//         // setClicks(newClicks)

//         // setClicks({...clicks, left: clicks.left + 1})
//         setAll(allClicks.concat('L'))
//         setLeft(left + 1)
//     }

//     const handleRightClick = () => {
//         // const newClicks = {
//         //     // left: clicks.left,
//         //     ...clicks,
//         //     right: clicks.right + 1
//         // }
//         // setClicks(newClicks)
        
//         // setClicks({...clicks, right: clicks.right + 1})
//         setAll(allClicks.concat('R'))
//         setRight(right + 1)
//     }
    
//     // const handleClick = () => {
//     //     console.log('clicked')
//     // }
//     // const increaseByOne = () => setCounter(counter + 1)
//     // const decreaseByOne = () => setCounter(counter -1)
//     // const setToZero =() => setCounter(0)



//     // setTimeout(
//     //     () => setCounter(counter + 1),
//     //     1000
//     // )

//     // console.log('rendering... ', counter)

//     return (
//         <><div>
//             {/* <h1>Aniket Parate</h1> */}
//             <p>Hello I am a coder and a developer</p>
//             {/* <Display counter={counter}/>
//             <Button 
//                 onClick={increaseByOne}
//                 text='plus'
//             />
//             <Button 
//                 onClick={setToZero}
//                 text='zero'
//             />
//             <Button 
//                 onClick={decreaseByOne}
//                 text='minus'
//             /> */}
//             {left}
//             {/* <button onClick={handleLeftClick}>
//                 left
//             </button> */}
//             <Button handleClick={handleLeftClick} text='left'/>
//             {/* <button onClick={handleRightClick}>
//                 right
//             </button> */}
//             <Button handleClick={handleRightClick} text='right'/>
//             {right}
//             {/* <p>{allClicks.join(' ')}</p> */}
//             <History allClicks={allClicks}/>
//         </div></>
//     )
// }

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
    const[value, setValue] = useState(10)

    // const hello = (who) => {
    //     // const handler = () => {
    //     //     console.log('hello', who)
    //     // }
    //     () => {
    //         console.log('hello', who)
    //     }
    // }

    // const hello = (who) => () => [
    //     console.log('hello', who)
    // ]

    // const setToValue = (newValue) => () => {
    //     console.log('value now', newValue)
    //     setValue(newValue)
    // }

    const setToValue = (newValue) => {
        // console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            {value}
            {/* <button onClick={() => setToValue(1000)}>thousand</button>
            <button onClick={() => setToValue(0)}>zero</button>
            <button onClick={() => setToValue(value + 1)}>increment</button> */}
            <Button handleClick={() => setToValue(1000)} text="thousand" />
            <Button handleClick={() => setToValue(0)} text="reset" />
            <Button handleClick={() => setToValue(value + 1)} text="increment" />
        </div>
    )
}

export default App;