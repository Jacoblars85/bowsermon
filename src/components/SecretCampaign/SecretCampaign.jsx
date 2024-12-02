import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import background from '../../wariolandMap.jpeg';
// import './Campaign.css';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';



function SecretCampaign() {
    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.userReducer);
    const starter = useSelector((store) => store.character.starter);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_CHARACTERS' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_IVENTORY' });
    }, []);

    const goToTheBattle = (params) => {
        dispatch({
            type: 'SAGA_FETCH_LEVEL_ENEMY',
            payload: params
        });
        setTimeout(() => {
            history.push(`/battle/${params}`)
        }, 450);
    };


    return (
        <div className="secretCampaign"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `35%`,
                backgroundColor: `#6B96E6`,
                height: `100vh`,
                width: `100vw`,
                backgroundPosition: `center`,
                backgroundAttachment: `fixed`
            }}
        >

            <Nav />

            <div className='warning'>
                {starter.length === 0 ? "Must Have a Starter to Play Level 1" : ""}
            </div>

            <div className='secretLevelOne'>
                <button onClick={() => goToTheBattle(11)} disabled={starter.length === 0 ? true : false}>1</button>
            </div>

            <div className='secretLevelTwo'>
                <button onClick={() => goToTheBattle(12)} disabled={starter.length === 0 ? true : user.level_11_completed ? false : true}>2</button>
            </div>

       
            <div className='backButton'>
                <button onClick={() => history.push(`/campaign`)}> <KeyboardBackspaceIcon fontSize='large'/></button>
            </div>

        </div>
    );
}

export default SecretCampaign;