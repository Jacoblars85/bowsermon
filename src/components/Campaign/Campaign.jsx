import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import background from '../../il_570xN.720708044_8vd9.webp';
import './Campaign.css';
import { useDispatch, useSelector } from 'react-redux';
import EastIcon from '@mui/icons-material/East';


function Campaign() {
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
        <div className="campaign"
            style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `auto`,
                backgroundColor: `#408AF7`,
                height: `100vh`,
                width: `100%`,
                backgroundPosition: `center`,
                backgroundAttachment: `fixed`
            }}
        >

            <Nav />

            <div className='warning'>
                {starter.length === 0 ? "Must Have a Starter to Play Level 1" : ""}
            </div>

            <div className='levelOne'>
                <button onClick={() => goToTheBattle(1)} disabled={starter.length === 0 ? true : false}>1</button>
            </div>

            <div className='levelTwo'>
                <button onClick={() => goToTheBattle(2)} disabled={starter.length === 0 ? true : user.level_1_completed ? false : true}>2</button>
            </div>

            <div className='levelThree'>
                <button onClick={() => goToTheBattle(3)} disabled={starter.length === 0 ? true : user.level_2_completed ? false : true}>3</button>
            </div>

            <div className='levelFour'>
                <button onClick={() => goToTheBattle(4)} disabled={starter.length === 0 ? true : user.level_3_completed ? false : true}>4</button>
            </div>

            <div className='levelFive'>
                <button onClick={() => goToTheBattle(5)} disabled={starter.length === 0 ? true : user.level_4_completed ? false : true}>5</button>
            </div>

            <div className='levelSix'>
                <button onClick={() => goToTheBattle(6)} disabled={starter.length === 0 ? true : user.level_5_completed ? false : true}>6</button>
            </div>

            <div className='levelSeven'>
                <button onClick={() => goToTheBattle(7)} disabled={starter.length === 0 ? true : user.level_6_completed ? false : true}>7</button>
            </div>

            <div className='levelEight'>
                <button onClick={() => goToTheBattle(8)} disabled={starter.length === 0 ? true : user.level_7_completed ? false : true}>8</button>
            </div>

            <div className='levelNine'>
                <button onClick={() => goToTheBattle(9)} disabled={starter.length === 0 ? true : user.level_8_completed ? false : true}>9</button>
            </div>

            <div className='levelTen'>
                <button onClick={() => goToTheBattle(10)} disabled={starter.length === 0 ? true : user.level_9_completed ? false : true}>10</button>
            </div>

                <BackButton />

            <div className='secretButton'>
                {user.level_10_completed ? <button onClick={() => history.push(`/secretCampaign`)}><EastIcon fontSize='large' /> </button> : ""}
            </div>

        </div>
    );
}

export default Campaign;