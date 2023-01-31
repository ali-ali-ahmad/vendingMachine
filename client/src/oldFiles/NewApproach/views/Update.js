import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import PlayerForm from '../components/PlayerForm';
import DeleteButton from '../components/DeleteButton';
import { Link } from 'react-router-dom';
    
const Update = (props) => {
    const { id } = useParams();
    const [player, setPlayer] = useState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/players/' + id)
            .then(res => {
                setPlayer(res.data);
                setLoaded(true);
            })
    }, [id]);
    
    const updatePlayer = player => {
        axios.put('http://localhost:8000/api/players/' + id, player)
            .then(res=>{navigate("/")})
            .catch(err=>{
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }
    
    return (
        <>
            <div>
                <Link to={'/'}>back</Link>
                <h1>Update a Player</h1>
                {loaded && (
                    <>
                        <PlayerForm
                            onSubmitProp={updatePlayer}
                            initialName={player.name}
                            initialPosition={player.position}
                            errorsGen={errors}
                        />
                        <DeleteButton playerId={player._id} successCallback={() => navigate("/")} />
                    </>
                )}
            </div>
        </>
    )
}
    
export default Update;

