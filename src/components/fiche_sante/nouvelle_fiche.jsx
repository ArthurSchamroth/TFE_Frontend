import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import Navbar from '../navbar/navbar';
import "./fiche_sante.css";
import {API} from '../../api-service';
import Footer from '../footer/footer';

function Nouvelle_Fiche_Sante(){
    
    const [token, setToken, deleteToken] = useCookies([('mr-token')]);
    const [adresse_mail, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    const [listingFiches, setListingFiches] = useState([]);
    const [listingFiche_id, setListingFiche_id ] = useState([])
    const [age, setAge] = useState('');
    const [type_kine, setType_besoin] = useState('');
    const [adresse, setAdresse] = useState('');
    const [description_probleme, setDetail_prob] = useState('');

    useEffect(()=>{
        API.gettingDataFromToken({'token': token['mr-token']})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                console.log(resp)
                setEmail(resp['email']);
                setUser(resp['id']);
                setPrenom(resp['prenom']);
                setNom(resp['nom']);
                setUsername(resp['username']);
            })
        
    }, []);

    useEffect(()=>{
        const liste = []
        const liste_id = []
        API.gettingEveryFiche()
        .then(function(resp){
            return resp.json()
        }).then(function(resp){
            for(const i of resp){
                liste.push(i)
                liste_id.push(i['user'])
            }
            setListingFiches(liste)
            setListingFiche_id(liste_id)
        })
    }, [])

    useEffect(()=>{
        if(listingFiche_id.includes(user)){
            API.gettingDataFromFiche({'username': username})
            .then(function(resp){
                return resp.json()
            }).then(function(resp){
                setAge(resp['naissance'])
                setType_besoin(resp['type_besoin'])
                setAdresse(resp['adresse'])
                setDetail_prob(resp['description_prob'])
            })
        }
    }, [])
    

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const envoyer_fiche = () => {
        print(user, nom, prenom, age, adresse_mail, type_kine, description_probleme, adresse)
        // API.creatingFiche({user, nom, prenom, age, adresse_mail, type_kine, description_probleme, adresse})
    }

    const modifier_fiche = () => {
        API.updatingFiche({user, nom, prenom, age, adresse_mail, type_kine, description_probleme, adresse})
    }
    return(
        <>
            <Navbar/>
            <>
                <p id='message_accueil'>
                    S'il s'agit de votre premier accès à votre fiche santé, vous êtes censé envoyer celle-ci une fois les informations complétées.<br/>
                    Vous aurez encore la possibilité de modifier ces informations.
                </p>  
                <div className='formulaireFicheContainer'>
                <label htmlFor='nom'>Nom</label>
                <input className='not_modifiable_input' type="text" name='nom' disabled value=''/>
                <label htmlFor='prenom'>Prénom</label>
                <input className='not_modifiable_input' type="text" name='prenom' disabled value={prenom}/>
                <label htmlFor='adresse_mail'>Email</label>
                <input className='not_modifiable_input' type="text" name='adresse_mail' disabled value={adresse_mail}/>
                <label htmlFor='naissance'>Date de naissance</label>
                <input type="date" name='naissance' value='' max={date} min='1910-12-31'
                onChange={evt=>setAge(evt.target.value)}/>
                <label htmlFor='type_kine'>Type besoin</label><br/>
                <select name="type_kine" id="typeKine"onChange={evt=>setType_besoin(evt.target.value)}>
                    <option value=''>Type de kiné.</option>
                    <option value="K">Kinésithérapie</option>
                    <option value="OS">Osthéopatie</option>
                    <option value="KR">Kinésithérapie Respiratoire</option>
                    <option value="P">Pédiatrie</option>
                </select><br/>
                <label htmlFor='adresse'>Adresse</label>
                <input  type="text" name='adresse' value=''
                onChange={(evt=>setAdresse(evt.target.value))}/>
                <label htmlFor='description_prob'>Détail problème</label>
                <input type="text" name='description_prob' value={description_probleme}
                onChange={evt=>setDetail_prob(evt.target.value)}/>
                
                
                {!listingFiche_id.includes(user) ? 
                <button className='validation_fiche_button' onClick={envoyer_fiche}>Envoyer Fiche</button>:
                <button className='validation_fiche_button' onClick={modifier_fiche}>Modifier</button>
                }
                </div>
        </>    
        </>
    )
}

export default Nouvelle_Fiche_Sante;