import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import firebase from '../database/Firebase';
import { ListItem, Avatar } from 'react-native-elements'
import { log } from 'react-native-reanimated';


const UserList = (props) => {
    
    const [users, setUsers] = useState();
    
    useEffect(() => {
        //llamara a la ejecucion de firebase
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            //onSnapshot devuelvue un query de la db
            //pero es una respuesta que debe ser interpretada
            
            //guardado e impresion de los usuarios creados
            const users = [];
            
            querySnapshot.docs.forEach(doc => {
                //apuntamos a los documentos de la db

                const {name,email,phone} = doc.data();
                //extraccion de datos.


                users.push({
                    id:doc.id,
                    name,
                    email,
                    phone
                    //dentro recibimos el archivo del doc
                });
                //con el push enviamos toda la informacion
                //creada en al coleccion.
            });

            setUsers(users);
        })
    }, []);

    return (
        <ScrollView>
            <Button title='CREATE USERS' onPress={
                () => {props.navigation.navigate('CreateUsers')}
            }/>

            {
                users.map()
            }
        </ScrollView>
    );
}

//creacion de la vista de lista de usuarios

export default UserList;
