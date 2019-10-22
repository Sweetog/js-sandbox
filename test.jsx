import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [trackMe, setTrackMe] = useState('INIT');

    useEffect(() => {
        console.log('trackMe change', trackMe);
    },[trackMe]);
    
    const handleOnChange = (e) => {
        setTrackMe(e.target.value);
    };

    const startEvent = () => {
        var trackMeVar = trackMe;
        setTimeout(() => {
            console.log('event complete, callback called');
            console.log('value of trackMe: ', trackMe); //always INIT even though state is changing
            console.log('value of trackMeVar: ', trackMeVar); //always INIT even though state is changing
        }, 1000);
    };

    function init() {
        console.log('init');
        $('#myBtn').click(function (e) {
            e.preventDefault();
            setTimeout(startEvent, 1000);
        });
    }

    window.onload = init;

    return (
        <div>
            <input className="form-control" type="text" name="trackme"
                onChange={e => handleOnChange(e)} value={trackMe} />
            <button type="button" id="myBtn">Start Event</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
