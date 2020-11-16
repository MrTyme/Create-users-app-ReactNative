import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator, Alert} from 'react-native';
import firebase from '../database/Firebase';

const UserDetails = (props) => {

    //constante inicial
    const initialState = {
        id:'',
        name:'',
        email:'',
        phone:''
    }

    //creacion del state
    const [user, setUser] = useState(initialState);

    //creacion de loader
    const [Loading, setLoading] = useState(true);


    //consulta a firebase para obtencion del usuario
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        //la base de datos busca un documento
        //por ende es asincrono

        const doc = await dbRef.get();
        const user = doc.data();
        //interpretacion de los datos
        setUser({
            ...user,
            id: doc.id,
            //desglose y uso del id
        });

        setLoading(false);
    }

    //obtencion del usuario por id
    useEffect(() => {
        getUserById(props.route.params.usersId);
        //ruta del id
    }, []);
    //como el useEffect recibe el arreglo creado
    //debe escribirce como parametro, para que pueda ser alterado

    const handleChangeText = (name, value) => {
        setUser({...user, [name] : value});
        //escojemos el setUser para modificar los datos
        //del usuario que se escoja.       
    }


    //eliminacion de usuarios.
    const deleteUser = async ()=> {
        const dbRef = firebase.db.collection('users').doc(props.route.params.usersId);
        await dbRef.delete();
        props.navigation.navigate('UserList');
    }

    //actualizacion de usuario
    const UpdateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        //en este caso se puede hacer desde el props o desde el user.id

        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        });

        setUser(initialState);
        props.navigation.navigate('UserList');
    }


    //confirmacion de eliminacion
    const openConfirmationAlert = () => {
        Alert.alert('Remove the User', 'Are you sure?', [
            {text: 'Yes', onPress: () => deleteUser()},
            {text: 'no', onPress: () => console.log(false)}
        ]);
    }


    if(Loading){
        return(
            <View>
                <ActivityIndicator size="large" color = "#9e9e9e"/>
            </View>
            //es una condicion que si, esta cargando la app
            //retorna esta vista
            //caso contrario, muestra todo por pantalla
        )
    }


    return (
        <ScrollView style= {Styles.container}>

           <View style = {Styles.InputGroup}>
                <TextInput 
                placeholder= "Name User" 
                value = {user.name}
                onChangeText = { (value) =>  handleChangeText('name', value) }/>
           </View>

           <View style = {Styles.InputGroup}>
                <TextInput 
                placeholder= "Email User"
                value = {user.email}
                onChangeText = { (value) =>  handleChangeText('email', value)}/>
           </View>
           <View style = {Styles.InputGroup}>
                <TextInput 
                placeholder= "Phone User"
                value = {user.phone}
                onChangeText = { (value) =>  handleChangeText('phone', value)}/>
           </View>

           <View>
                <Button 
                    color= '#19AC52'
                    title="Update User" 
                    onPress = {() => UpdateUser()}/>
            </View>
           <View>
                <Button 
                    color= '#E37399'
                    title="Delete User" 
                    onPress = {() => openConfirmationAlert()}/>
           </View>

       </ScrollView>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },

    InputGroup: {
        flex:1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    }
});
//creacion de la vista de lista de usuarios

export default UserDetails;