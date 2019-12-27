import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Image, ActivityIndicator, Dimensions, RefreshControl, FlatList, TouchableOpacity, Platform } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'

//import * as API from '../../../Api/CategoriesApi'
//import getAllProduct from '../../../Api/ProductApi/getAllProduct';
import getGategory from '../../../Api/CategoriesApi/getCategory'
import { pageSizeDefault } from '../../../Common/PaginationDefault';

const { height, width } = Dimensions.get('window');
import NumberFormat from 'react-number-format';
import { Input, Item, Label } from 'native-base';

//const imageWidth = (width - 40)/2-10;
//const imageHeight = (361/((width - 40)/2))*114-10;
const imageWidth = 140;
const imageHeight = 100;
class CategoryDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            IDCategory: navigation.getParam('item').ID,
            refreshing: false,
            data: [],
            error: null,
            searchbarTxt: '',
            totalPage: 0,
            page: 1,
            totalPages: 0,
        }
    }

    componentWillMount() {
        console.log('category detail mount');
        console.log(this.props);
        console.log(this.state);
    }

    componentDidMount() {
        this.loadData()
        console.log('category detail did mount');
    }

    pageDown = () => {
        if (this.state.page > 1) {
            this.setState({
                page: this.state.page - 1
            }, this.loadData)
        }
    }

    pageUp = () => {
        if (this.state.page < this.state.totalPages) {
            this.setState({
                page: this.state.page + 1
            }, this.loadData)
        }
    }

    loadData = () => {
        console.log('loaddata')
        getGategory(this.state.IDCategory, this.state.page, pageSizeDefault())
            .then((responseJS) => {
                console.log(responseJS);
                this.setState({
                    data: responseJS.Items,
                    totalPages: responseJS.TotalPages,
                    refreshing: false
                })
            })
            .catch(err => console.log(err));
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Details', {
                        item: item
                    });
                }}
            >
                <View style={stylesProductList.productContainer}>
                    <Image source={{ uri: item.Image }} style={stylesProductList.productImage} />
                    <Text style={stylesProductList.productName}> {item.Name}</Text>
                    <NumberFormat
                        value={item.Price}
                        displayType={'text'}
                        thousandSeparator={true}

                        renderText={value =>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{  fontSize: 15 ,paddingTop:'5%'}}>Giá: </Text>
                                <Input
                                    style={{ color: 'red', fontSize: 15,  }}
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

    render() {
        if (this.state.data.length == 0) {
            return (
                <View style={styles.nodatastyle}>
                    <Text style={{ fontSize: 30 }}>NO DATA</Text>
                </View>
            );
        } else {
            return (
                <SafeAreaView>
                    <View style={styles.wrapper}>
                        <View style={styles.textContainer} >
                            <Text style={styles.textTopProduct}> {this.props.navigation.getParam('item').Name} </Text>
                        </View>
                        <View style={styles.page}>
                            <FAIcon
                                onPress={this.pageDown}
                                name='chevron-left'
                                style={{
                                    color: '#4877F8',
                                    fontSize: 18
                                }}
                            />
                            <Text style={{ color: 'black', fontSize: 20 }}>{this.state.page}</Text>
                            <FAIcon
                                onPress={this.pageUp}
                                name='chevron-right'
                                style={{
                                    color: '#4877F8',
                                    fontSize: 18
                                }}
                            />
                        </View>

                        {/* //<View style={styles.body}> */}
                            <FlatList
                                style={styles.listStyle}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.loadData.bind(this)}
                                    />
                                }
                                data={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderItem}
                             
                                numColumns={2}
                            />
                        
                    </View>
                </SafeAreaView>
            );
        }

    }
}

const styles = StyleSheet.create({
    wrapper: {

        backgroundColor: '#E9E9EE',
         marginBottom:10,
         flexDirection:'column'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#DFE2E5',
        borderBottomWidth: 1,
        backgroundColor:'#FF5722',
        height: 60,
        marginBottom: 5,
        // paddingTop: Platform.OS === 'ios' ? 0 : 50,
        // height : 40 + (Platform.OS === 'ios' ? 0 : 50),
        paddingBottom: 5,
    },
    page: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-around',
        height: 22,
    },
    body: {
        flexDirection: 'column',
        //justifyContent: 'space-around',
        //alignItems: 'stretch',//stretch,//baseline
         flexWrap: 'wrap',
        // height:450,
        shadowColor: '#2E272B',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    textTopProduct: {
        fontSize: 20,
        color: '#fff',
       
      

    },
    nodatastyle: {
        justifyContent: 'center',
     //   flex: 1,
        alignItems: 'center',
    },
    listStyle: {
        marginTop: 30
    }
})


const stylesProductList = StyleSheet.create({
    productContainer: {
        marginBottom: 10,
        shadowOpacity: 0.2,
        paddingLeft:'10%'
        // marginLeft: 10,
        //  marginRight: 10,
        // alignItems: 'center'
    },
    productImage: {
        height: imageHeight,
        width: imageWidth,
        resizeMode: "stretch"
    },
    productName: {
        color: 'black',
        width: 150,
        height:55,
        lineHeight:20,
        paddingTop:'5%'


    },
    productPrice: {

        color: 'black',


    }
})

export default CategoryDetail