import { forwardRef, useImperativeHandle, useRef } from "react";

// import a createPortal from react-dom
import {createPortal} from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref) {
    
    // creating a dialog name ref, with the help of that we didn't depend on dialog inbuilt feature like showModal(), open also....
    const dialog = useRef(); 
    

    const userLost = remainingTime <= 0;

    // converted times from milliseconds to seconds 
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    
    // create a score variable in which user score will be calculated  
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100); 


    // with the help of useImperativeHandle we can call a function inside a forward ref component
    useImperativeHandle(ref, () => {
        return{
            // create our own open function, with the help of that we didn't depend on inbuilt dialog function
            open(){
            dialog.current.showModal();
            }
        }
    })
    

    // with the help of that createPortal this jsx code passed in first argument are placed specially inside a dom, without using the portal this will placed inside nested the so many div id's 
    return createPortal(

        // with the help of this dialog the inbuilt dialog will appear according to the condition
        <dialog ref={dialog} className="result-modal">

            {/* when user lost show in the dialog box */}
            {userLost && <h2> You lost </h2>}


            {/* when use didn't lost then show the score */}
            {!userLost && <h2> Your Score: {score}</h2>}


            {/* show the exact time of the user to complete his task */}
            <p>
                The target time was <strong>{targetTime} seconds. </strong>
            </p>

            <p>
                You stopped the timer with <strong> {formattedRemainingTime} seconds left. </strong>
            </p>

            {/* when user click on close button then dialog box will closed */}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,

        //  this modal id will create in index.html file 
        document.getElementById('modal')
    );
})

export default ResultModal;