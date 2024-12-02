import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HomeButton() {
    const history = useHistory()
    const user = useSelector((store) => store.user.userReducer);

    const goToHome = () => {

        history.push(`/home`)
    };

    return (
        <div>
            <p onClick={goToHome}>Home</p>
        </div>
    );
}

export default HomeButton;