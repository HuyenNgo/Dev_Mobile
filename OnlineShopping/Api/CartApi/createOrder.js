// import getUrl from '../../Common/UrlConfig';
// import axios from 'axios';
// import {Alert } from 'react-native'

// export default createOrder =  (orderViewModel, listcart) =>{ 

// let url = getUrl() + 'shoppingcart/createcart';

//     let parameters = {
//         orderViewModel: orderViewModel,
//         listcart: listcart,
//     }
    

// console.log(url);
// //console.log(parameters);

// return axios.post(
//     url,
//     parameters
// ).then(response=>{
//    console.log(response)
//    return response
// })

// // return  axios({
// //         url: url,
// //         method: 'post',
// //         data: (parameters),
// //         headers: {
// //         Accept: 'application/json',
// //         'Content-Type': 'application/json',
// //         }
// //     });    
// }

import getUrl from '../../Common/UrlConfig';
import axios from 'axios';
import {Alert } from 'react-native'

export default createOrder =  (orderViewModel, listcart) =>{ 

let url = getUrl() + 'shoppingcart/createcart';

    let parameters = {
        orderViewModel: orderViewModel,
        listcart: listcart,
    }
    

console.log(url);
//console.log(parameters);  

// return axios.post(
//     url,
//     parameters
// )

return  axios({
        url: url,
        method: 'post',
        data: (parameters),
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    });    
}