
import React from 'react'
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'

import * as API from '../../../Api/CategoriesApi'
import getCategories from '../../../Api/CategoriesApi/getAsyncStorageCategories'
import saveCategories from '../../../Api/CategoriesApi/saveCategories'



const { height, width } = Dimensions.get('window');

const imageWidth = (width - 40) / 2 - 10;
const imageHeight = (361 / ((width - 40) / 2)) * 114 - 10;

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [],
            error: null,
            categories: []
        }

    }

    onPressCategory(item) {
        const isExist = this.state.categories.some(e => e.ID === item.ID);
        console.log('prepare passing Category: ' + item.Name);
        if (!isExist) {
            this.setState({
                categories: this.state.categories.concat(item)
            },
                async () => {
                    saveCategories(this.state.categories)
                    await this.props.navigation.navigate('Products', {
                        //CategoryItem:item
                    });
                }
            )
        } else {
            this.props.navigation.navigate('Products', {
                //CategoryItem:item
            });
        }
    }
    renderItem = ({ item }) => {
        //console.log(item.Name);
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('CategoryDetail', {
                        item: item
                    });
                }}

            //onPress ={()=>this.onPressCategory(item)}
            >
                <View
                    style={stylesProductList.productContainer}
                >
                    <View
                        style={stylesProductList.productContainer2}
                    >
                        <Image
                            source={{ uri: item.Image }} style={stylesProductList.imgItem}
                        />
                    </View>
                    <Text style={stylesProductList.productName}> {item.Name}</Text>

                </View>

            </TouchableOpacity>
        );
    }

    loadData = () => {
        console.log('loaddata Cateogory View');
        API.getAllCategory()
            .then((responseJS) => {
                this.setState({
                    data: responseJS,
                    refreshing: false
                })
            })
        console.log('Cateogory View state', this.state);
    }

    componentDidMount() {
        console.log('Cateogory View did mount');
        this.loadData();
    }

    // renderItem({ item, index }) {
    //     console.log(item);
    //     if (item.empty){
    //         return (
    //             <View style={[styles.listItem, styles.listItemEmpty]} />
    //         )
    //     }
    //     console.log('here');
    //     return (
    //         <TouchableOpacity 
    //             style ={styles.listItem}
    //             onPress= {()=> {
    //                 this.props.navigation.navigate('CategoryDetail', {
    //                     item: item
    //                     });
    //             }}
    //         >
    //             <Image
    //                source={{uri:item.Image}}
    //                 imageStyle = {{
    //                     resizeMode: 'cover',
    //                 }}
    //                 style = {{
    //                     // flex: 1,
    //                     // alignSelf: 'stretch',
    //                     // borderRadius: 10,
    //                     // height : 100,
    //                     // alignItems: 'center',
    //                     // justifyContent : 'center',
    //                     // backgroundColor: 'blue'
    //                     width:200,
    //                     height:200

    //                 }}
    //             >
    //                 {/* <Text size = 'large' bold = {true} > {item.Name}</Text> */}
    //             </Image>
    //         </TouchableOpacity>
    //     )
    // }

    createRow = (data, column) => {
        const rows = Math.floor(data.length / column);
        let lastRowElements = data.length - rows * column;

        while (lastRowElements !== column) {
            data.push({
                id: `empty-${lastRowElements}`,
                name: `empty-${lastRowElements}`,
                empty: true,
            });
            lastRowElements += 1;
        }

        return data;
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View
                    // style = {styles.wrapper}
                    >
                        <View
                            style={styles.body}
                        >
                            <FlatList
                                data={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderItem}
                                horizontal={false}
                                numColumns={2}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Category

const styles = StyleSheet.create({
    wrapper: {
        flex: 2,
        marginTop: 20,
        backgroundColor: 'rgb(233,233,238)',
    },
    body: {
        margin: 20,
        flexDirection: 'row',

        //flexWrap: 'wrap',
        flexGrow: 1,
        flexBasis: 0,
    },
    listItem: {
        flex: 1,
        backgroundColor: "#dcda48",
        flexGrow: 1,
        margin: 7,
        height: 100,
        flexBasis: 0
    },
})

const stylesProductList = StyleSheet.create({
    productContainer: {
        margin: 10,
        paddingLeft: '5%',
        // alignItems: 'center',

       // backgroundColor: '#fff',
        // height: 40,
        // flexGrow: 1,
        // flexBasis: 0,
        //  flex: 1,


    },
    productContainer2: {

        alignItems: 'center',
        justifyContent:'center',
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        borderWidth: 1,
        borderColor:'#EEF9FF',
        backgroundColor: '#EEF9FF',
        // height: 40,
        // flexGrow: 1,
        // flexBasis: 0,
        //  flex: 1,


    },
    productImage: {
        backgroundColor: 'red',
        height: imageHeight,
        width: imageWidth
    },
    productName: {
      
        alignContent:'center',
        //  color : 'black',
        fontWeight: '300',
        fontSize: 20,
     
        
    },
    imgItem: {
        width: 90,
        height: 60,
        resizeMode: "stretch"
       // backgroundColor: '#fff'
    }
})