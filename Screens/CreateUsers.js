import React, { useState }  from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { log } from 'react-native-reanimated';

//importacion de la base de datos
import firebase from '../database/Firebase';


//creacion de la vista de lista de usuarios
const CreateUsers = (props) => {

    //creacion del estado
    const [state, setState] = useState({
        name:"",
        email:"",
        phone:""
    });


    const handleChangeText = (name, value) => {
        setState({...state, [name] : value});
        //desglosamos el state para mantener al inicio el estado actual
                
    }

    const CreateNewUser = async () => {
        //agregando un usuario
        if (state.name === '') {
            alert('Please provide a name');
        } else {
            try {
                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
    
                props.navigation.navigate('UserList');
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
       <ScrollView style= {Styles.container}>

           <View style = {Styles.InputGroup}>
                <TextInput placeholder= "Name User" 
                onChangeText = { (value) =>  handleChangeText('name', value) }/>
           </View>

           <View style = {Styles.InputGroup}>
                <TextInput placeholder= "Email User"
                onChangeText = { (value) =>  handleChangeText('email', value)}/>
           </View>
           <View style = {Styles.InputGroup}>
                <TextInput placeholder= "Phone User"
                onChangeText = { (value) =>  handleChangeText('phone', value)}/>
           </View>
           <View>
                <Button title="Save User" onPress = {() => CreateNewUser()}></Button>
           </View>

       </ScrollView>
    );
    //onChangeText recibe un texto y lo guarda por consola
}

const Styles = StyleSheet.create({
    //creacion de espaciado
    container: {
        flex: 1, 
        padding: 35,
    },

    //creacion de estilos
    InputGroup:{
        flex:1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    }
});


export default CreateUsers;