import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {

    // create a ref of timer and dialog
    const timer = useRef();
    const dialog = useRef();


    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);


    // * 1000 means in miliseconds
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);


    // if a remaining a time is greater than 0 then timer is active
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;


    // if a time will complete and you didn't stop that button then this function will call
    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }


    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }


    // when a user click on start button 
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }


    // when user click on Stop button 
    function handleStop(){
        // show the score that's why a dialog will call, so the score will show in dialog box
        dialog.current.open();

        // when user click on stop button then clear the previous time interval and start with new when user click on again
        clearInterval(timer.current);
    }


    return (
        <>

        {/* Call a ResultModal with the help of props */}
        <ResultModal 
        ref={dialog} 
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
        />


        <section className="challenge">
            <h2> {title} </h2>
            
            
            <p className="challenge-time">
                {targetTime} second {targetTime > 1 ? 's' : ''}
            </p>

            <p>

                {/* sending the content conditionally if timerIsActive already active then handleStop button will call otherwise handleStart button will call */}
                <button onClick={timerIsActive ? handleStop : handleStart}>

                    {/* same as above condition  */}
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>

            {/* passing CSS className through conditionally  */}
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Time is running...' : 'Timer inactive'} 
            </p>
        </section>
        </>
    );
}