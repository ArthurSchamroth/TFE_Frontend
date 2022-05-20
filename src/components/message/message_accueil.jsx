import React, {useState, useEffect} from 'react';
import Navbar from '../navbar/navbar';
import Select from 'react-select';
import './message_accueil.css';
import {API} from '../../api-service';

function MessageAccueil(props){
    const [auteur, setAuteur] = useState('');
    const [destinataire, setDestinataire] = useState('');
    const [contenuMessage, setContenuMessage] = useState('');
    const [destPossibles, setDestPossibles] = useState([]);
    const [destPossibleValues, setDestPossiblesValues] = useState([]);
    const [isCommentaireVide, setIsCommentaireVide] = useState(false);

    useEffect(()=>{
        const liste = []
        const liste_value = []
        API.gettingEveryFiche()
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                for(const i of resp){
                    const username = i['prenom']+i['nom']
                    liste.push(username)
                    if(username != "ArthurSchamroth" || username != "ThomasPenning"){
                        liste_value.push({value: username, label: username})
                    }
                }
                setDestPossibles(liste)
                setDestPossiblesValues(liste_value)
            })
    }, [])

    const envoyerMessage = destinataire => {
        if(contenuMessage.length < 10){
            setIsCommentaireVide(true);
        }else{
            if(props.username != "ThomasPenning"){
                var user = props.fiche
                var destinataire = 'ThomasPenning'
                var today = new Date();
                var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
                var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
                API.sendingMessage({
                    'user': user, 'date': date,'heure': time,  
                    'contenu': contenuMessage, 'dest': destinataire
                })
            }
            else{   
                var user = props.fiche
                var today = new Date();
                var date = today.getFullYear()  + "-" + today.getMonth() + "-" + today.getDate()
                var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
                API.sendingMessage({
                    'user': user, 'date': date,'heure': time,  
                    'contenu': contenuMessage, 'dest': destinataire
                })
            }
            alert("Message envoyé !")
            window.location.href = "/messagerie"
        }
    }

    return(
        <>
            <Navbar/>
            <div className='App'>
                <h1>{props.username}, Vous pouvez ici envoyer vos messages.</h1>
                <div className="messageContainer">
                    {props.username == "ArthurSchamroth" || props.username == "ThomasPenning"? 
                        <>  
                            <label htmlFor="destinataire">Destinataire :</label><br/>
                            {destPossibleValues != [] ? 
                                <>
                                    <select name="destinataire" id="destinataire" onChange={evt => setDestinataire(evt.target.value)}>
                                        {destPossibleValues.map(dest => {
                                            return(
                                                <>
                                                {dest.label == "ArthurSchamroth" || dest.label == "ThomasPenning" ? 
                                                null :
                                                <option value={dest.value}>{dest.label}</option>}
                                                </>
                                            )
                                        })}
                                    </select><br/>
                                </>
                                : null
                            }
                        </>: 
                        <>
                            <label htmlFor="destinaire">Destinataire :</label>
                            <input disabled type="text" id="destinaire" value="Monsieur Penning" onChange={null}/>
                        </>
                    }

                    <label htmlFor="contenuMessage">Contenu :</label>
                    <textarea name="contenuMessage" id="contenuMessage" cols="30" rows="5" onChange={evt => setContenuMessage(evt.target.value)}
                    placeholder="Contenu de votre message"></textarea>
                    

                    <label htmlFor="auteur">Auteur</label>
                    <input id="auteur" type="text" disabled value={props.username}
                    onChange={evt=>setAuteur(evt.target.value)}/><br/>

                    {isCommentaireVide? 
                        <p style={{color:'red', fontWeight:'bold'}}>Veuillez écrire un message complet avant de l'envoyer</p> : null
                    }

                    <button className='btn_co_re' onClick={() => envoyerMessage(destinataire)}>Envoyer Message</button>
                </div>
                
            </div>
            
        </>
    )
}

export default MessageAccueil;