// import React, { Component } from 'react'
// import { TextInput, FlatList, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Text, ScrollView, Alert } from 'react-native'
// import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
// import NumberFormat from 'react-number-format';
// import { Input, Item, Label } from 'native-base';

// import { Button } from 'react-native-elements'
// import orderCard from '../../../Api/CartApi/orderCard'
// import createOrder from './../../../Api/CartApi/createOrder'
// import saveCart from '../../../Api/CartApi/saveCart';

// class CheckOrder extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//             phoneNumber: '',
//             address: '',
//             phoneNumberValidate: false,
//             price: 0,
//             count: 0,
//             discount: 0,
//             data: []
//         }
//     }

//     componentWillMount() {
//         console.log(this.props.navigation.getParam('data'))
//         console.log('DATA')
//         this.setState({
//             data: this.props.navigation.getParam('data'),
//             price: this.props.navigation.getParam('price'),
//             count: this.props.navigation.getParam('quantity')
//         }, () => {
//             // console.log(this.props.navigation.getParam('data'))
//             //console.log(this.props.navigation.getParam('price'))
//             //console.log(this.props.navigation.getParam('quantity'))
//             //console.log(this.state)
//         })

//     }
//     componentDidMount() {
//         //console.log('cart check')
//         //console.log(this.state.data)
//     }

//     componentDidUpdate(prevPros, preState) {
//         //console.log('did update');
//         //console.log(this.props, this.state);
//     }

//     validatePhoneNumber(phoneNumber) {
//         const val = /(09|01[2|6|8|9])+([0-9]{8})\b/
//         //console.log('validate phone number: ',phoneNumber,val.test(phoneNumber))
//         return val.test(phoneNumber)
//     }

//     _onChangeName(text) {
//         this.setState({ name: text.nativeEvent.text || '' });
//     }

//     _onChangePhoneNumber(text) {
//         this.setState({
//             phoneNumber: text.nativeEvent.text || ''
//         }, () => {
//             this.setState({
//                 phoneNumberValidate: this.validatePhoneNumber(this.state.phoneNumber)
//             })
//         });
//     }

//     _onChangeAddress(text) {
//         this.setState({ address: text.nativeEvent.text || '' });
//     }

//     sendData = () => {
//         console.log('begin')
//         const orderViewModel = {
//             CustomerName: this.state.name,
//             CustomerAddress: this.state.address,
//             CustomerEmail: '',
//             CustomerMobile: this.state.phoneNumber,
//             CustomerMessage: '',
//             PaymentMethod: 'CASH',
//             BankCode: null,
//             Status: false,
//             //   'card': this.state.data
//         };
       
//         console.log('infoset')
//          console.log(this.state.data[0].Quantity)
//         let listcart= this.state.data?this.state.data.map(x=> {
//             let obj = {x}
//             obj.Content=''
//             obj.Quantity = obj.Quantity || 1
//             return obj
//         }):[]
//       //  console.log(orderViewModel)
//       console.log('afterConvert')
//         console.log(listcart[0].Quantity)

//         let component = this

//         createOrder(orderViewModel, listcart)
//             .then(resJSON => {
//                 console.log(resJSON.data);
//                 console.log('recieve data.................');
//                 if (resJSON.data.status == false) {
//                     console.log('true')
//                     component.setState({
//                         data: []
//                     },
//                         () => {

//                             Alert.alert(
//                                 'Annoucement',
//                                 resJSON.data.message ? resJSON.data.message : 'Your Order is successful',
//                                 [
//                                     {
//                                         text: 'OK', onPress: () => {
//                                             saveCart(this.state.data);
//                                             this.props.navigation.pop();
//                                         }
//                                     },
//                                 ],
//                                 { cancelable: false }
//                             )
//                             //this.props.navigation.pop()
//                         })

//                 } else {
                

//                     Alert.alert(
//                         'Annoucement',
//                         resJSON.data.message ? resJSON.data.message : 'Your Order is unsuccessful',
//                         [                         
//                           {text: 'OK', onPress: () => {
//                             saveCart(this.state.data);
//                             this.props.navigation.pop();
//                           }},
//                         ],
//                         { cancelable: true }
//                     )
//                 }
//             })
//             .catch((error) => {
//                 console.error('send data Error' + error);

//             });
//     }
//     // sendData = () => 
//     // {
//     //     Alert.alert(
//     //         'Annoucement',
//     //         'Your Order is successful',
//     //         [
//     //             {
//     //                 text: 'OK', onPress: () => {
//     //                     saveCart(this.state.data);
//     //                     this.props.navigation.pop();
//     //                 }
//     //             },
//     //         ],
//     //         { cancelable: false }
//     //     )
//     // }

//     renderItem = ({ item }) => {
//         return (
//             <TouchableOpacity>
//                 <View style={styles.Itemcontainer}>
//                     <View>
//                         <Image

//                             resizeMode="stretch"
//                             style={{
//                                 flex: 1,
//                                 alignSelf: 'stretch',
//                                 alignContent: 'center',
//                                 justifyContent: 'center',
//                                 height: 90,
//                                 width: 100,
//                                 borderTopLeftRadius: 5,
//                                 borderBottomLeftRadius: 5,
//                             }}
//                             source={{ uri: item.Image }}

//                         />
//                     </View>
//                     <View style={styles.ItemInfo}>
                      
//                         <View style={{width:200}}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 15,lineHeight:20 }}>
//                                 {item.Name}
//                             </Text>
//                         </View>
//                         <View style={{ paddingTop: '5%' }}>
//                             <Text style={{ fontSize: 16 }}>Số lượng: {item.Quantity}</Text>
//                         </View>
//                         <View  >
//                             <NumberFormat
//                                 value={item.Price}
//                                 displayType={'text'}
//                                 thousandSeparator={true}

//                                 renderText={value =>
//                                     <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
//                                         <Text style={{ paddingTop: '5%', fontSize: 16 }}>Giá: </Text>
//                                         <Input
//                                             style={{ color: 'red', fontSize: 16, paddingTop: '7%' }}
//                                             value={value}
//                                             keyboardType="numeric"
//                                         />
//                                         {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
//                                     </View>
//                                 }
//                             />
//                         </View>
//                         <View />
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         )
//     }

//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <ScrollView style={{ flex: 1 }}>
//                     <View style={styles.container}>

//                         <View style={styles.input2} >
//                             <View>
//                                 <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Thông tin giao hàng :</Text>
//                             </View>
//                             <View style={styles.viewStyle}>
//                                 <Text style={{ fontSize: 20, paddingTop: '5%' }}> Name: </Text>
//                                 <AutoGrowingTextInput
//                                     value={this.state.textValue}
//                                     onChange={(text) => this._onChangeName(text)}
//                                     style={styles.textInput}
//                                     //  placeholder={'Enter your name'}
//                                     //  placeholderTextColor='#66737C'
//                                     maxHeight={200}
//                                     minHeight={30}
//                                     enableScrollToCaret
//                                     ref={(r) => { this._textInput = r; }}
//                                 />
//                             </View>
//                             <View style={styles.viewStyle}>
//                                 <Text style={{ fontSize: 20, paddingTop: '5%' }}> Phone number: </Text>

//                                 <AutoGrowingTextInput
//                                     value={this.state.textValue}
//                                     onChange={(text) => this._onChangePhoneNumber(text)}
//                                     style={styles.textInput}
//                                     //   placeholder={'Enter your phone number'}
//                                     //  placeholderTextColor='#66737C'
//                                     maxHeight={200}
//                                     minHeight={30}
//                                     enableScrollToCaret
//                                     ref={(r) => { this._textInput = r; }}
//                                     blurOnSubmit={false}
//                                     errorStyle={{ textAlign: 'center', fontSize: 12 }}
//                                     errorMessage={this.state.phoneNumberValidate ? null : 'Please enter a valid email address'}
//                                 />
//                             </View>
//                             <View style={styles.viewStyle}>
//                                 <Text style={{ fontSize: 20, paddingTop: '5%' }}> Address: </Text>
//                                 <AutoGrowingTextInput
//                                     value={this.state.textValue}
//                                     onChange={(text) => this._onChangeAddress(text)}
//                                     style={styles.textInput}
//                                     //placeholder={'Enter your Address'}
//                                     // placeholderTextColor='#66737C'
//                                     maxHeight={200}
//                                     minHeight={30}
//                                     enableScrollToCaret
//                                     ref={(r) => { this._textInput = r; }}
//                                 />
//                             </View>
//                         </View>
//                         <View style={styles.input2}>
//                             <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5, paddingLeft: '2%', paddingTop: '5%' }}>Sản phẩm đã chọn</Text>
//                             <FlatList
//                                 data={this.state.data}
//                                 keyExtractor={(item, index) => index.toString()}
//                                 renderItem={this.renderItem}
//                             />
//                         </View>
//                         <View style={{ backgroundColor: '#fff', margin: 5, flexDirection: 'row' }}>

//                             <View style={{ flexDirection: 'column' ,paddingLeft:'5%'}}>
//                                 <View style={stylesCount.row}>
//                                     <View style={stylesCount.titleStyle}>
//                                         <Text style={stylesCount.fontStyle}>Số lượng sản phẩm: </Text>
//                                     </View>
//                                     <Text style={[stylesCount.valueStyle, stylesCount.fontStyle]}>{this.state.count} </Text>
//                                 </View>
//                                 <View style={stylesCount.row}>
//                                     <View style={stylesCount.titleStyle}>
//                                         <Text style={stylesCount.fontStyle}>Số tiền: </Text>
//                                     </View>
//                                     {/* <Text style={[stylesCount.valueStyle, stylesCount.fontStyle]}>{this.state.price}</Text> */}
//                                     <NumberFormat
//                                         value={this.state.price}
//                                         displayType={'text'}
//                                         thousandSeparator={true}

//                                         renderText={value =>
//                                             <View style={{paddingTop:'1%'}}>
                                               
//                                                 <Input
//                                                     style={{ color: 'red', fontSize: 16 }}
//                                                     value={value}
//                                                     keyboardType="numeric"
//                                                 />
//                                                 {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
//                                             </View>
//                                         }
//                                     />
//                                 </View>
//                                 <View style={stylesCount.row}>
//                                     <View style={stylesCount.titleStyle}>
//                                         <Text style={stylesCount.fontStyle1}>Giảm giá: </Text>
//                                     </View>
//                                     <Text style={[stylesCount.valueStyle, stylesCount.fontStyle1]}>{this.state.discount}</Text>
//                                 </View>
//                                 <View style={stylesCount.row}>
//                                     <View style={stylesCount.titleStyle}>
//                                         <Text style={stylesCount.fontStyle}>Tổng tiền: </Text>
//                                     </View>
//                                     {/* <Text style={[stylesCount.valueStyle, stylesCount.fontStyle]}>{this.state.price - this.state.discount}</Text> */}

//                                     <NumberFormat
//                                         value={this.state.price - this.state.discount}
//                                         displayType={'text'}
//                                         thousandSeparator={true}

//                                         renderText={value =>
//                                             <View  style={{paddingTop:'1%'}}>
                                               
//                                                 <Input
//                                                     style={{ color: 'red', fontSize: 16 }}
//                                                     value={value}
//                                                     keyboardType="numeric"
//                                                 />
//                                                 {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
//                                             </View>
//                                         }
//                                     />


//                                 </View>

//                             </View>

//                             <Button
//                                 title='Đặt hàng'
//                                 titleStyle={{ color: '#fff' }}
//                                 buttonStyle={{ width: 120, height: 40, backgroundColor: 'red', marginLeft: 40, marginTop: 120 }}
//                                 onPress={this.sendData}
//                             />



//                         </View>
//                         <View style={{ height: 10 }} />




//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         )
//     }
// }


// const styles = StyleSheet.create({
//     container: {

//         marginTop: 5,
//         flexDirection: 'column',
//         justifyContent: 'flex-start'
//     },
//     textInput: {
//         paddingLeft: 5,
//         fontSize: 10,
//         flex: 1,
//         backgroundColor: 'white',
//         borderWidth: 0,

//     },

//     input2: {
//         marginTop: 4,
//         backgroundColor: '#fff',
//         margin: 5,

//         flexDirection: 'column'
//     },
//     textInput: {
//         fontSize: 20,
//         margin: 5,
//     },
//     buttonStyle: {
//         height: 50,
//         width: 250,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgb(233,233,240)',
//         borderWidth: 2,
//         borderColor: 'black',
//         borderRadius: 30,
//     },
//     Itemcontainer: {
//         flex: 1,
//         flexDirection: 'row',
//       //  backgroundColor: '#E4E4E4',
//         margin: 5,
//         borderRadius: 5,
//         marginBottom: 10
//     },
//     ItemInfo: {
//         flexDirection: 'column',
//         //justifyContent: 'space-around',
//         paddingLeft: '3%',
       
//     },
//     viewStyle:
//     {

//         flexDirection: 'row',
//         borderBottomColor: 'blue',
//         borderBottomWidth: 1,
//         marginBottom: 5
//     }
// })


// const stylesCount = StyleSheet.create({
//     row: {

//         flexDirection: 'row',
//     },
//     fontStyle: {
//         fontSize: 16,
//         fontWeight: '500',
//         paddingTop:'5%'
//     },
//     fontStyle1: {
//         fontSize: 16,
//         fontWeight: '500',
//         paddingTop:'1%'
//     },
//     titleStyle: {

//         flexDirection: 'column',
//         alignItems: 'flex-end',
//     },
//     valueStyle: {

//     }
// })

// export default CheckOrder

import React, { Component } from 'react'
import { TextInput, FlatList, StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Text, ScrollView, Alert } from 'react-native'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import NumberFormat from 'react-number-format';
import { Input, Item, Label } from 'native-base';

import { Button } from 'react-native-elements'
import orderCard from '../../../Api/CartApi/orderCard'
import createOrder from './../../../Api/CartApi/createOrder'
import saveCart from '../../../Api/CartApi/saveCart';

class CheckOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            address: '',
            phoneNumberValidate: false,
            price: 0,
            count: 0,
            discount: 0,
            data: []
        }
    }

    componentWillMount() {
        console.log(this.props.navigation.getParam('data'))
        console.log('DATA')
        this.setState({
            data: this.props.navigation.getParam('data'),
            price: this.props.navigation.getParam('price'),
            count: this.props.navigation.getParam('quantity')
        }, () => {
            // console.log(this.props.navigation.getParam('data'))
            //console.log(this.props.navigation.getParam('price'))
            //console.log(this.props.navigation.getParam('quantity'))
            //console.log(this.state)
        })

    }
    componentDidMount() {
        //console.log('cart check')
        //console.log(this.state.data)
    }

    componentDidUpdate(prevPros, preState) {
        //console.log('did update');
        //console.log(this.props, this.state);
    }

    validatePhoneNumber(phoneNumber) {
        const val = /(09|01[2|6|8|9])+([0-9]{8})\b/
        //console.log('validate phone number: ',phoneNumber,val.test(phoneNumber))
        return val.test(phoneNumber)
    }

    _onChangeName(text) {
        this.setState({ name: text.nativeEvent.text || '' });
    }

    _onChangePhoneNumber(text) {
        this.setState({
            phoneNumber: text.nativeEvent.text || ''
        }, () => {
            this.setState({
                phoneNumberValidate: this.validatePhoneNumber(this.state.phoneNumber)
            })
        });
    }

    _onChangeAddress(text) {
        this.setState({ address: text.nativeEvent.text || '' });
    }

    sendData = () => {
        console.log('begin')
        const orderViewModel = {
            CustomerName: this.state.name || 'no',
            CustomerAddress: this.state.address||'no',
            CustomerEmail: 'no',
            CustomerMobile: this.state.phoneNumber||'no',
            CustomerMessage: 'no',
            PaymentMethod: 'CASH',
            BankCode: null,
            Status: false,
            //   'card': this.state.data
        };

        // console.log('infoset')
        // console.log(orderViewModel)
        let listcart = this.state.data ? this.state.data.map(x => {
            let obj = x
            obj.Quantity = obj.Quantity ? obj.Quantity : 1
            return obj
        }) : []
        //  console.log(orderViewModel)
        // console.log('afterConvert')
        // console.log(listcart)

        let component = this

        createOrder(orderViewModel, listcart)
            .then(resJSON => {
                console.log(resJSON.data);
                console.log('recieve data.................');
                if (resJSON.data.status == true) {
                    console.log('true')
                    component.setState({
                        data: []
                    },
                        () => {

                            Alert.alert(
                                'Annoucement',
                                resJSON.data.message ? resJSON.data.message : 'Your Order is successful',
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            console.log(this.state.data);
                                            saveCart(this.state.data);
                                            this.props.navigation.pop();
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                            //this.props.navigation.pop()
                        })

                } else {


                    Alert.alert(
                        'Annoucement',
                        resJSON.data.message ? resJSON.data.message : 'Your Order is unsuccessful',
                        [
                            {
                                text: 'OK', onPress: () => {
                                    // saveCart(this.state.data);
                                    // this.props.navigation.pop();
                                }
                            },
                        ],
                        { cancelable: true }
                    )
                }
            })
            .catch((error) => {
                console.error('send data Error' + error);

            });
    }
    // sendData = () => 
    // {
    //     Alert.alert(
    //         'Annoucement',
    //         'Your Order is successful',
    //         [
    //             {
    //                 text: 'OK', onPress: () => {
    //                     saveCart(this.state.data);
    //                     this.props.navigation.pop();
    //                 }
    //             },
    //         ],
    //         { cancelable: false }
    //     )
    // }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.Itemcontainer}>
                    <View>
                        <Image

                            resizeMode="stretch"
                            style={{
                                flex: 1,
                                alignSelf: 'stretch',
                                alignContent: 'center',
                                justifyContent: 'center',
                                height: 90,
                                width: 100,
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                            }}
                            source={{ uri: item.Image }}

                        />
                    </View>
                    <View style={styles.ItemInfo}>

                        <View style={{ width: 200 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, lineHeight: 20 }}>
                                {item.Name}
                            </Text>
                        </View>
                        <View style={{ paddingTop: '5%' }}>
                            <Text style={{ fontSize: 16 }}>Số lượng: {item.Quantity}</Text>
                        </View>
                        <View  >
                            <NumberFormat
                                value={item.Price}
                                displayType={'text'}
                                thousandSeparator={true}

                                renderText={value =>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={{ paddingTop: '5%', fontSize: 16 }}>Giá: </Text>
                                        <Input
                                            style={{ color: 'red', fontSize: 16, paddingTop: '7%' }}
                                            value={value}
                                            keyboardType="numeric"
                                        />
                                        {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
                                    </View>
                                }
                            />
                        </View>
                        <View />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>

                        <View style={styles.input2} >
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Thông tin giao hàng :</Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={{ fontSize: 20, paddingTop: '5%' }}> Name: </Text>
                                <AutoGrowingTextInput
                                    value={this.state.textValue}
                                    onChange={(text) => this._onChangeName(text)}
                                    style={styles.textInput}
                                    //  placeholder={'Enter your name'}
                                    //  placeholderTextColor='#66737C'
                                    maxHeight={200}
                                    minHeight={30}
                                    enableScrollToCaret
                                    ref={(r) => { this._textInput = r; }}
                                />
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={{ fontSize: 20, paddingTop: '5%' }}> Phone number: </Text>

                                <AutoGrowingTextInput
                                    value={this.state.textValue}
                                    onChange={(text) => this._onChangePhoneNumber(text)}
                                    style={styles.textInput}
                                    //   placeholder={'Enter your phone number'}
                                    //  placeholderTextColor='#66737C'
                                    maxHeight={200}
                                    minHeight={30}
                                    enableScrollToCaret
                                    ref={(r) => { this._textInput = r; }}
                                    blurOnSubmit={false}
                                    errorStyle={{ textAlign: 'center', fontSize: 12 }}
                                    errorMessage={this.state.phoneNumberValidate ? null : 'Please enter a valid email address'}
                                />
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={{ fontSize: 20, paddingTop: '5%' }}> Address: </Text>
                                <AutoGrowingTextInput
                                    value={this.state.textValue}
                                    onChange={(text) => this._onChangeAddress(text)}
                                    style={styles.textInput}
                                    //placeholder={'Enter your Address'}
                                    // placeholderTextColor='#66737C'
                                    maxHeight={200}
                                    minHeight={30}
                                    enableScrollToCaret
                                    ref={(r) => { this._textInput = r; }}
                                />
                            </View>
                        </View>
                        <View style={styles.input2}>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 5, paddingLeft: '2%', paddingTop: '5%' }}>Sản phẩm đã chọn</Text>
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderItem}
                            />
                        </View>
                        <View style={{ backgroundColor: '#fff', margin: 5, flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column', paddingLeft: '5%' }}>
                                <View style={stylesCount.row}>
                                    <View style={stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Số lượng sản phẩm: </Text>
                                    </View>
                                    <Text style={[stylesCount.valueStyle, stylesCount.fontStyle]}>{this.state.count} </Text>
                                </View>
                                <View style={stylesCount.row}>
                                    <View style={stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Số tiền: </Text>
                                    </View>
                                    {/* <Text style={[stylesCount.valueStyle, stylesCount.fontStyle]}>{this.state.price}</Text> */}
                                    <NumberFormat
                                        value={this.state.price}
                                        displayType={'text'}
                                        thousandSeparator={true}

                                        renderText={value =>
                                            <View style={{ paddingTop: '1%' }}>

                                                <Input
                                                    style={{ color: 'red', fontSize: 16 }}
                                                    value={value}
                                                    keyboardType="numeric"
                                                />
                                                {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
                                            </View>
                                        }
                                    />
                                </View>
                                <View style={stylesCount.row}>
                                    <View style={stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle1}>Giảm giá: </Text>
                                    </View>
                                    <Text style={[stylesCount.valueStyle, stylesCount.fontStyle1]}>{this.state.discount}</Text>
                                </View>
                                <View style={stylesCount.row}>
                                    <View style={stylesCount.titleStyle}>
                                        <Text style={stylesCount.fontStyle}>Tổng tiền: </Text>
                                    </View>
                                    {/* <Text style={[stylesCount.valueStyle, stylesCount.fontStyle]}>{this.state.price - this.state.discount}</Text> */}

                                    <NumberFormat
                                        value={this.state.price - this.state.discount}
                                        displayType={'text'}
                                        thousandSeparator={true}

                                        renderText={value =>
                                            <View style={{ paddingTop: '1%' }}>

                                                <Input
                                                    style={{ color: 'red', fontSize: 16 }}
                                                    value={value}
                                                    keyboardType="numeric"
                                                />
                                                {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
                                            </View>
                                        }
                                    />


                                </View>

                            </View>

                            <Button
                                title='Đặt hàng'
                                titleStyle={{ color: '#fff' }}
                                buttonStyle={{ width: 120, height: 40, backgroundColor: 'red', marginLeft: 40, marginTop: 120 }}
                                onPress={this.sendData}
                            />



                        </View>
                        <View style={{ height: 10 }} />




                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {

        marginTop: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    textInput: {
        paddingLeft: 5,
        fontSize: 10,
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 0,

    },

    input2: {
        marginTop: 4,
        backgroundColor: '#fff',
        margin: 5,

        flexDirection: 'column'
    },
    textInput: {
        fontSize: 20,
        margin: 5,
    },
    buttonStyle: {
        height: 50,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(233,233,240)',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30,
    },
    Itemcontainer: {
        flex: 1,
        flexDirection: 'row',
        //  backgroundColor: '#E4E4E4',
        margin: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    ItemInfo: {
        flexDirection: 'column',
        //justifyContent: 'space-around',
        paddingLeft: '3%',

    },
    viewStyle:
    {

        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        marginBottom: 5
    }
})


const stylesCount = StyleSheet.create({
    row: {

        flexDirection: 'row',
    },
    fontStyle: {
        fontSize: 16,
        fontWeight: '500',
        paddingTop: '5%'
    },
    fontStyle1: {
        fontSize: 16,
        fontWeight: '500',
        paddingTop: '1%'
    },
    titleStyle: {

        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    valueStyle: {

    }
})

export default CheckOrder

