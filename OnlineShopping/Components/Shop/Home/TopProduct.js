import React from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator, Dimensions, FlatList, TouchableOpacity } from 'react-native'

import { getTopProduct } from '../../../Api/ProductApi/getProduct'
import NumberFormat from 'react-number-format';
import { Input, Item, Label } from 'native-base';

import sp1 from './TempImage/sp1.jpeg'
import sp2 from './TempImage/sp2.jpeg'
import sp3 from './TempImage/sp3.jpeg'
import sp4 from './TempImage/sp4.jpeg'

const { height, width } = Dimensions.get('window');

const imageWidth = (width - 40) / 2 - 10;
const imageHeight = (361 / ((width - 40) / 2)) * 114 - 10;

class TopProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [],
            error: null,
        }
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
                <View style={styles.itemContainer}
                >
                    <Image source={{ uri: item.Image }}
                        style={styles.imgItem}
                    />
                    <Text style={{ marginTop: '10%', fontSize: 15,lineHeight:20,fontWeight:'500' }}>{item.Name}</Text>
                  {/* <Text style={{ marginTop: '5%', color: 'red' }}>Giá: {item.Price}</Text> */}
                    <NumberFormat
                        value={item.Price}
                        displayType={'text'}
                        thousandSeparator={true}

                        renderText={value =>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }}>
                                <Text style={{ paddingTop: '10%', fontSize: 15 }}>Giá: </Text>
                                <Input
                                    style={{ color: 'red', fontSize: 15 }}
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

    loadData() {

        console.log('loaddata')
        getTopProduct(4)
            .then((responseJS) => {
                //console.log(responseJS);
                this.setState({
                    data: responseJS,
                    refreshing: false
                })
            })
    }

    componentWillMount() {
        // console.log('topproduct mount');
        // console.log('props ',this.props);
        // console.log('state ',this.state);
    }

    componentDidMount() {
        this.loadData()
        // console.log('topproduct did mount');
        // console.log('props ',this.props);
        // console.log('state ',this.state);

    }


    render() {
        return (
            <View
                style={styles.wrapper}
            >
                <View
                    style={styles.textContainer}
                >
                    <Text style={styles.textTopProduct}> Top Product </Text>
                </View>
                <View
                    style={styles.body}
                >
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}

                        //  horizontal = {true}
                        numColumns={2}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        margin: 10,
      //  backgroundColor: 'rgb(233,233,238)',
        shadowOpacity: 0.2,
        borderRadius: 3
    },
    textContainer: {

        shadowColor: '#2E272B',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        height: 40,
        paddingBottom: 5
    },
    body: {
        flexDirection: 'column',
        //   alignItems: 'stretch',
        // flexWrap: 'wrap',
        shadowColor: '#2E272B',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    textTopProduct: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10
    },
    itemContainer: {
        marginBottom: 10,
        shadowOpacity: 0.2,

        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: '10%',
        width: 180

    },
    imgItem: {
        width: 120,///window.width/2-20,
        height: 100,///window.height/2,
        flex: 9,
        resizeMode: "stretch",

    },
})

export default TopProduct