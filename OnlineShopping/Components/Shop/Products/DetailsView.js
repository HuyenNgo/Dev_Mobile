import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button,Icon } from 'react-native-elements'
import { WebView } from 'react-native';
import NumberFormat from 'react-number-format';
import { Input, Item, Label } from 'native-base';
import saveCart from '../../../Api/CartApi/saveCart'
import getCart from '../../../Api/CartApi/getCart'

import saveLikedCart from '../../../Api/CartApi/saveLikedCart'
import getLikedCart from '../../../Api/CartApi/getLikedCart'

import global from './../../../Common/global'

const screen = require('Dimensions');
const window = screen.get('window');

export default class DetailView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cartData: [],
      wishlist: [],
      Flag: false
    }
    this.CrawlCartData = this.CrawlCartData.bind(this)
    this.addProductToCart = this.addProductToCart.bind(this)
    this._onClick = this._onClick.bind(this)
    this._onWishListClick = this._onWishListClick.bind(this)
    this.addProductToWishList = this.addProductToWishList.bind(this)

    const { navigation } = this.props;

    item = navigation.getParam('item', 'NO-ID');
    navigation.addListener('didFocus', () => {
      this.setState({}, () => {
        this.CrawlCartData()
      })
    });
  }

  componentWillMount() {
    console.log(this.props);
  }

  addProductToWishList(product) {

    if (global.auth === true) {
      try {
        let isExist = this.state.wishlist.some(e => e.ID === product.ID);
        if (!isExist) {
          product.Quantity = 1;
          //console.log('flag add sucess= '+this.state.Flag)
          this.setState(
            {
              wishlist: this.state.wishlist.push(product), Flag: false
            },
          );
          saveLikedCart(this.state.wishlist)
          Alert.alert('Success', 'Product is added to your Wish List')
          this.props.navigation.navigate('Products');
          this.props.navigation.navigate('Home');
        } else {
          //console.log('sp da ton tai va '+ this.state.Flag)
          console.log('move to htis')
          Alert.alert('Annoucement', 'Product is exist in your Wish List')
        }
      } catch (e) {

      }
    } else {
      Alert.alert('Unsucess', 'You need to Login')
    }

  }

  addProductToCart(product) {
    //this.CrawlCartData();
    console.log('cartDataInit= ' + this.state.cartData)
    try {
      const isExist = this.state.cartData.some(e => e.ID === product.ID);
      console.log('check cartData= ' + this.state.cartData)
      if (!isExist && this.state.Flag) {
        product.Quantity = 1;

        this.setState(
          {
            cartData: this.state.cartData.push(product), Flag: false
          },
        );

        saveCart(this.state.cartData)
        Alert.alert('Success', 'Product is added to your Cart')
        this.props.navigation.navigate('Products');
        this.props.navigation.navigate('Cart');
      } else {
        Alert.alert('Annoucement', 'Product is exist in your Cart')
      }
    } catch (e) {

    }

  }

  CrawlCartData() {
    getCart()
      .then(resJSON => {
        this.setState({ cartData: resJSON, Flag: true })
      });

    getLikedCart()
      .then(resJSON => {
        this.setState({ wishlist: resJSON })
      });
  }

  _onClick(product) {
    //console.log('product data'+product)
    this.addProductToCart(product);
  }

  _onWishListClick(product) {
    //console.log('product data'+product)
    this.addProductToWishList(product);
  }


  render() {

    //console.log(item.Name);

    return (
      <ScrollView style={styles.container} >
        <Card
          title={item.Name}>
          <Image source={{ uri: item.Image }} style={styles.imgItem} />
          <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
            <NumberFormat
              value={item.Price}
              displayType={'text'}
              thousandSeparator={true}

              renderText={value =>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start',marginTop:10 }}>
                  <Text style={{  paddingTop:'12%',fontSize: 15 }}>Giá: </Text>
                  <Input
                    style={{ color: 'red', fontSize: 15,marginTop:20}}
                    value={value}
                    keyboardType="numeric"
                  />
                  {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
                </View>
              }
            />
            <Text style={{ fontSize:15 }}>Bảo hành: {item.Warranty} tháng</Text>
            <Text style={{ paddingTop: '5%' ,fontSize:15,lineHeight:20}}>Mô tả: {item.Description}</Text>
            {/* <Text>Content: {item.Content} </Text> */}


          </View>
          <Button
            title="ADD TO CART"
            icon={
              <Icon
              name='add-shopping-cart'
              color='#fff'
              containerStyle={{marginLeft:10}}
              />
            }
            iconLeft
            titleStyle={{ fontWeight: "700" ,color:'#fff'}}
            buttonStyle={styles.btnStyle}
            onPress={() => this._onClick(item)}
            containerStyle={{ marginTop: 20 }}
          />
          <Button
           icon={
            <Icon
            name='favorite-border'
            color='#fff'
            containerStyle={{marginLeft:10}}
            />
          }
          iconLeft
            title="ADD TO WISHLIST"
            titleStyle={{ fontWeight: "700" ,color:'#fff'}}
            buttonStyle={styles.wishbutton}
            onPress={() => this._onWishListClick(item)}
            containerStyle={{ marginTop: 5 }}
          />

        </Card>

      </ScrollView>
    );
  }

  componentDidMount() {
    //this.CrawlCartData()
    //this.setState({},()=> this.CrawlCartData())
    console.log('INIT DATA CART= ' + this.state.cartData)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:"#4FC3F7"
    backgroundColor: "white"
  },

  imgItem: {
    height: 180,
    width: 200,
    alignContent: 'center',
    marginLeft: 50,
    // flex:9,
    resizeMode: "stretch"
  },
  btnStyle: {
    //backgroundColor: "#2baf2b",
    backgroundColor: "#EE4D2D",
    height: 40,
    width:250,
    marginLeft:20,
    borderColor: "#EE4D2D",
    borderWidth: 0,
    borderRadius: 5
  },
  wishbutton: {
    backgroundColor: "blue",
    height: 40,
    width:250,
    marginLeft:20,
    borderColor: "blue",
    borderWidth: 0,
    borderRadius: 5,
  }
});