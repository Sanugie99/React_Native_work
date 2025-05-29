import { useContext } from "react";
import {View, Text, Button, ScrollView} from 'react-native'
import { CartContext } from "./CartContext";

const CartScreen = () => {
    const {cart, dispatch} = useContext(CartContext);

    const addItem = () => {
        const newItem = {id : Date.now().toString() ,name: 'New Item'};
        dispatch({type: 'ADD_ITEM', payload: newItem});
    }

    const removeItem = (id) => {
        dispatch({type:'REMOVE_ITEM',payload : {id}});
    }


    return(
        <View style={{flex:1, padding : 20}}>
            <Button title="Add Item" onPress={addItem} />
            <ScrollView style={{marginTop: 20}}>
                {cart.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            flexDirection : 'row',
                            alignItems: 'center',
                            justifyContent : 'space-between',
                            margin : 5,
                            padding : 10,
                            borderWidth : 1,
                            borderColor : '#ccc',
                            borderRadius : 5,
                        }}
                    >
                        <Text>{item.name}</Text>
                        <Button title="Remove" style={{marginTop:20}} onPress={() => removeItem(item.id)} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default CartScreen;