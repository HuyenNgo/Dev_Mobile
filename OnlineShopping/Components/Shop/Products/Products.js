/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import  NumberFormat from 'react-number-format';
import { Input, Item, Label } from 'native-base';

import React, { Component } from 'react';
import { Text, View, FlatList, Image, RefreshControl, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { SearchBar ,Button,Icon} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome'

import getCategories from '../../../Api/CategoriesApi/getAsyncStorageCategories'
import saveCategories from '../../../Api/CategoriesApi/saveCategories'

import { getAllProduct } from '../../../Api/ProductApi/getProduct';
import { pageSizeDefault } from '../../../Common/PaginationDefault';


const screen = require('Dimensions');
const window = screen.get('window');
const numColumns = 1;

export default class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchbarTxt: '',
      containerStyle: styles.flatContainer,
      itemStyle: styles.itemContainer,
      page: 0,
      totalPages: 1,
      refreshing: false,
      //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSource: [],
      categories: [],
      txtAll: "All",
    };
    //this.listeningCategoryParam();

  }


  componentDidMount() {
    // this.loadData();
    this.CrawlProductData("", 0, pageSizeDefault());
  }

  CrawlProductData(keyword, page, pageSize) {
    getAllProduct(keyword, page, pageSize)
      .then((responseJson) => {
        //console.log('lengthItems='+responseJson.Items.length+'- page= '+this.state.page+'- totalPage'+ this.state.totalPages);
        if (this.state.page < this.state.totalPages && responseJson.Items.length != 0) {
          //console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
          this.setState({
            //dataSource: this.state.dataSource.cloneWithRows(responseJson.Items),  
            dataSource: this.state.dataSource.concat(responseJson.Items),
            totalPages: responseJson.TotalPages,
            refreshing: false,
            page: this.state.page + 1,
          });
        } else {
          console.log('het du lieu, page= ' + this.state.page + '- total=' + this.state.totalPages)
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  // loadData = () => {
  //   console.log('loaddata page', this.state.page)
  //   getAllProduct('',this.state.page,pageSizeDefault)
  //     .then((responseJson) => {
  //       console.log(responseJson);
  //       console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
  //       this.setState({      
  //         dataSource: [...this.state.dataSource,...responseJson.Items],
  //         totalPages: responseJson.TotalPages,
  //         refreshing:false,
  //       });
  //       console.log(this.state)
  //     })
  //     .catch((error) => {
  //       console.log('is it here?')
  //       console.error(error);
  //     });
  // }

  //category passing pram
  // listeningCategoryParam(){       
  //   let { navigation } = this.props;
  //   navigation.addListener('didFocus', () => {                    
  //     getCategories()
  //       .then(resJSON => {
  //           this.setState({
  //             categories:resJSON, 
  //             txtAll:(resJSON.length==0)?"All":"",
  //             page:0,
  //             totalPages:1,
  //           },
  //           this.CrawlProductData("",0,pageSizeDefault())
  //           )                        
  //       });
  //   });
  // }

  loadMore = () => {
    if (this.state.page < this.state.totalPages - 1) {
      this.setState({
        page: this.state.page + 1,
      }, this.CrawlProductData("", this.state.page, pageSizeDefault()))
    }
  }
  // loadData = () => {
  //   console.log('loaddata page', this.state.page)
  //   getAllProduct('',this.state.page,2)
  //     .then((responseJson) => {
  //       console.log(responseJson);
  //       console.log( "current "+this.state.page+"- total:"+responseJson.TotalPages);
  //       this.setState({      
  //         dataSource: responseJson.Items,
  //         totalPages: responseJson.TotalPages,
  //         refreshing:false,
  //       });
  //       console.log(this.state)
  //     })
  //     .catch((error) => {
  //       console.log('is it here?')
  //       console.error(error);
  //     });
  // }
  loadNewData() {
    this.setState({
      page: 0,
      totalPages: 1,
      refreshing: false,
      txtAll: "All",
      categories: [],
      //dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      dataSource: []
    },
      async () => {
        await saveCategories(this.state.categories)
        await this.CrawlProductData("", 0, pageSizeDefault());
      }
    );
    //console.log('refresh: data='+this.state.dataSource.length+' - refreshing:'+this.state.refreshing+'- page='+this.state.page)

  }

  _keyExtractor = (item, index) => item.Name;

  onEndReached = () => {
    //this.CrawlProductData("",this.state.page,pageSizeDefault())
  }

  onClickItem(item) {
    this.props.navigation.navigate('Details', {
      item: item
    });
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });

  }

  onClickCategoryItem(item) {

    let newCategories = this.state.categories.filter(e => e.ID !== item.ID)

    this.setState({
      txtAll: (newCategories.length == 0) ? "All" : "",
      categories: [],
      categories: newCategories
    }, () => {
      //crawl new data by category
      saveCategories(this.state.categories)
    }
    );
  }

  onSearchSubmmit() {
    if (this.state.searchbarTxt != '') {
      this.props.navigation.navigate('Search', {
        txt: this.state.searchbarTxt
      });
    }
    //console.log('onSubmit: '+this.state.searchbarTxt);
  }

  pageDown = () => {
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      }, this.loadData)
    }
  }

  pageUp = () => {
    if (this.state.page < this.state.totalPages - 1) {
      this.setState({
        page: this.state.page + 1
      }, this.loadData)
    }
  }


  ViewItem(item) {
    return (
      <TouchableOpacity onPress={() => this.onClickItem(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.Image }} style={styles.imgItem} />
          <Text style={{ lineHeight: 20, paddingTop: '10%', fontWeight: '500',height:55 }}>{item.Name}</Text>
          {/* <Text style={{  }} >Giá: {item.Price}</Text> */}
          <NumberFormat
            value={item.Price}
            displayType={'text'}
            thousandSeparator={true}

            renderText={value =>
              <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Text style={{paddingTop:'11%',fontSize:15}}>Giá: </Text>
                <Input
                 style={{ color: 'red',fontSize:15,paddingTop:'8%'}}
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

  renderButton = () => {
    return (
      <TouchableOpacity
      
        onPress={this.loadMore}
      >
        
          <Icon
          name='refresh'
          color='#4388D6'
          containerStyle={{paddingBottom:'10%'}}
          />   
       


        
       
      </TouchableOpacity>
    )
  }

  resetData = () => {
    this.setState({
      page: 0,
      dataSource: [],
    }, this.loadData)
  }

  render() {
    if (this.state.refreshing) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    //this.listeningCategoryParam();

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View style={styles.header}>

          <SearchBar
            lightTheme={true}
            round
          
            inputStyle={{fontSize:16,color:'#fff'}}
            placeholder='Input text'
            placeholderTextColor='#fff'
            style={styles.SearchBar}
            containerStyle={styles.SearchBar}
            clearIcon={true}
            platform='android'
            searchIcon={true} // You could have passed `null` too
            //onClear={someMethod}
            onChangeText={(searchbarTxt) => this.setState({ searchbarTxt })}
            onSubmitEditing={this.onSearchSubmmit.bind(this)}
            value={this.state.searchbarTxt}
           
          />

          <View style={styles.categorySection}>
            <Text style={{ fontSize: 16 }}>Categories: {this.state.txtAll}
            </Text>
            <View>
              <FlatList

                style={styles.categoryList}
                horizontal
                data={this.state.categories}
                renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => this.onClickCategoryItem(item)}>
                    <View style={styles.categoryItem}>
                      <Text>{item.Name}</Text>
                    </View>
                  </TouchableOpacity>
                }
                keyExtractor={this._keyExtractor}
              />
            </View>
          </View>



          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}              //bool IsRefresh indicator
                onRefresh={this.loadNewData.bind(this)}         // If yes, do function
              //onRefresh={this.resetData}
              />
            }

            ListFooterComponent={this.renderButton}
            //onEndReachedThreshold={1}

            //read each data row by render Row with rowItem
            contentContainerStyle={{ backgroundColor: 'transparent' }}//this.state.containerStyle}
            data={this.state.dataSource}
            keyExtractor={this._keyExtractor}
            numColumns={2}
            renderItem={({ item }) =>
              this.ViewItem(item)
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
  
    backgroundColor: 'rgb(233,233,238)'
  },
  SearchBar: {
    backgroundColor: '#FF5722',
  },
  itemContainer: {
    paddingTop: '10%',
    paddingLeft: '15%',
    width: 170,
    marginBottom: 10,
    shadowOpacity: 0.2,
    // marginLeft: 10,
    // marginRight: 20,

    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    width: 250,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    marginBottom: 100,
  },
  flatContainer: {
    flexDirection: 'column',
    backgroundColor: '#CCC'
  },
  imgItem: {
    width: 120,///window.width/2-20,
    height: 100,///window.height/2,
    flex: 9,
    resizeMode: "stretch",
  },
  page: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 30,
  },
  categorySection: {
    height: 60,
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    display: 'none',

    //marginBottom:20
  },
  categoryList: {
    margin: 50
  },
  categoryItem: {
    marginRight: 5,
    marginLeft: 3,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 4,
  },

});

{/* <View style ={styles.page}>
<FAIcon
onPress = {this.pageDown}
name = 'chevron-left'
style = {{
    color: 'black',
    fontSize: 20
}}
/>
<Text style = {{color: 'black', fontSize: 20}}>{this.state.page+1}</Text>
<FAIcon
onPress = {this.pageUp}
name = 'chevron-right'
style = {{
    color: 'black',
    fontSize: 20
}}
/>
</View>  */}
