import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

import  NumberFormat from 'react-number-format';
import { Input, Item, Label } from 'native-base';

import { getAllProduct } from '../../../Api/ProductApi/getProduct';
import { pageSizeDefault } from '../../../Common/PaginationDefault';

const numColumns = 2;
const screen = require('Dimensions');
const window = screen.get('window');

export default class SearchResultView extends Component {
  constructor(props) {
    super(props)
    var txtSearching = ''
    this.state = {
      dataSource: []
    }

  }

  CrawlProductData(keyword, page, pageSize) {

    getAllProduct(keyword, page, pageSize)
      .then((responseJson) => {
        if (responseJson.Items.length != 0) {
          this.setState({
            dataSource: responseJson.Items
          });
          console.log(this.state.dataSource.length)

        } else {
          console.log('khong tim thay du lieu')
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }
  _keyExtractor = (item, index) => item.Name;

  onClickItem(item) {
    this.props.navigation.navigate('Details', {
      item: item
    });
  }

  render() {
    const { navigation } = this.props;
    txtSearching = navigation.getParam('txt', 'NO-TXT');
    console.log(this.state.dataSource.length)
    if (this.state.dataSource.length != 0) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.resultStyle}> Kết quả tìm kiếm "{txtSearching}": </Text>
          <FlatList

            //read each data row by render Row with rowItem
           // contentContainerStyle={this.state.containerStyle}
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            numColumns={numColumns}
            renderItem={({ item }) =>
              this.ViewItem(item)
            }
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.resultStyle}> Không tìm thấy kết quả </Text>
        </View>
      );
    }

  }

  // ViewItem(item){
  //     return(
  //       <TouchableOpacity onPress={()=> this.onClickItem(item)}>
  //         <View style={styles.itemContainer}>
  //                 { <Image source={{uri:item.Image}} style={styles.imgItem}/> }
  //                 <Text style={{flex:1}}>{item.Name}</Text> 
  //                 <Text style={{flex:1}}>Giá: {item.Price}</Text>                
  //         </View>
  //       </TouchableOpacity> 
  //     );
  //   }
  ViewItem(item) {
    return (
      <TouchableOpacity onPress={() => this.onClickItem(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.Image }} style={styles.imgItem} />
          <Text style={{ lineHeight: 20, paddingTop: '10%', fontWeight: '500', height: 55,width:150 }}>{item.Name}</Text>
          {/* <Text style={{  }} >Giá: {item.Price}</Text> */}
          <NumberFormat
            value={item.Price}
            displayType={'text'}
            thousandSeparator={true}

            renderText={value =>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' ,paddingLeft:'5%',height:80,marginTop:5}}>
                <Text style={{ paddingTop: '5%', fontSize: 15 }}>Giá: </Text>
                <Input
                  style={{ color: 'red', fontSize: 15, paddingTop: '8%' }}
                  value={value}
                  keyboardType="numeric"
                />
                {/* // <Text style={{paddingTop:'11%',fontSize:15,fontWeight:'300'}}>(VNĐ)</Text> */}
              </View>
            }
          />
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    this.CrawlProductData(txtSearching, 0, pageSizeDefault() + 3);
  }
}

const styles = StyleSheet.create({

  itemContainer: {
    flex: 1,
    //margin: 5,
    marginBottom:20,
    paddingLeft:'5%',
   // width: window.width / 2,
  //  height: window.height / 2,
    backgroundColor: '#E9E9EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatContainer: {
    flexDirection: 'column',
    backgroundColor: '#E9E9EF'
  },
  imgItem: {
    width: 140,///window.width/2-20,
    height: 160,///window.height/2,

    resizeMode: "stretch"
  },
  resultStyle: {
    fontSize: 20,
    paddingLeft:'5%',
    marginBottom: 30,
    marginTop:10,
    fontWeight: '500',
    // font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
    fontFamily: 'sans-serif',
  },

});