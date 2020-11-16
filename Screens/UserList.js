import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import firebase from '../database/Firebase';
import { ListItem, Avatar } from 'react-native-elements';

const UserList = (props) => {
    
    const [users, setUsers] = useState([]);
    //el useState debe guardar el array de la db
    
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
            <Button title='CREATE USERS' 
            onPress={() => {props.navigation.navigate('CreateUsers')}
            }/>

            {
                users.map(
                    users => {
                        return (
                            <ListItem key={users.id}
                                buttomDivider
                                onPress = {
                                    () => {
                                        props.navigation.navigate('UserDetails', 
                                        { 
                                            usersId: users.id
                                        });
                                    }
                                }
                            >
                                <ListItem.Chevron/>
                                
                                <Avatar 
                                    source = {{uri : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                                    rounded
                                />

                                <ListItem.Content>
                                    <ListItem.Title>
                                        {users.name}
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        {users.email}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        )
                    }
                )
            }
            
        </ScrollView>
    );
}

//creacion de vista de la lista de usuarios

export default UserList;
