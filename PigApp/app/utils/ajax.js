// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import Api from '../constants/Api';

// // // 自定义 fetch，加上了登录参数
// // const fetchRequest = async (url, method = 'GET', params) => {
// //   const userToken = await AsyncStorage.getItem('userToken');
// //   const auth = userToken ? {Authorization: `Bearer ${userToken}`} : {};
// //   const body = params ? {body: JSON.stringify(params)} : {};

// //   const header = {
// //     Accept: 'application/json',
// //     'Content-Type': 'application/json',
// //     ...auth,
// //   };

// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       let response = await fetch(Api + url, {
// //         method: method,
// //         headers: header,
// //         ...body,
// //       });

// //       // 认证失败：登录超时，或账号被禁用
// //       if (response.status == '401') {
// //         throw new Error('unauthorized');
// //       }

// //       let responseJson = await response.json();
// //       resolve(responseJson);
// //     } catch (err) {
// //       reject(err);
// //     }
// //   });
// // };

// // export default fetchRequest;




// function toForm(data) {
//   let formData = new FormData()
//   let keyArr = Object.keys(data)
//   if (keyArr.length < 1){return {}}
//   keyArr.map((item) => {
//       formData.append(item, data[item])
//   })
//   return formData
// }

// function toJsonStr(data) {
//   return JSON.stringify(data)
// }

// function formatData(headers, data) {
//   if (!headers || !headers['Content-Type'] || headers['Content-Type'] === 'application/x-www-form-urlencoded'){
//       return toForm(data)
//   }

//   switch (headers['Content-Type']) {
//       case 'application/json':
//           return toJsonStr(data)
//       default :
//           return toForm(data)
//   }
// }

// export default ajax = ({url, method, data, dataType, headers, success, error, complete}) => {

//   console.log(url)

//   let options = {}

//   //默认method
//   options['method'] = method || 'GET'

//   //默认header
//   options['headers'] = Object.assign({
//       'Content-Type': 'application/x-www-form-urlencoded', //默认格式
//       'credentials': 'include', //包含cookie
//       'mode': 'cors', //允许跨域
//   }, headers)

//   //处理body
//   options.method.toUpperCase() === 'POST' && (options['json'] == data ? formatData(headers, data) : '')

//   fetch(url, options).then((response) => 
//       response.json()
//   ).then((responseJson) => {
//       success && success(responseJson)
//       complete && complete(responseJson)
//   }).catch((err) => {
//       error && error(err)
//       complete && complete()
//   })

// }

/**
 * Created by HuangXiaoFeng on 2018-02-23.
 * 封装fetch
 *
 */

function toForm(data) {
    let formData = new FormData();
    let keyArr = Object.keys(data);
    if (keyArr.length < 1) { return {} }
    keyArr.map((item) => {
        formData.append(item, data[item]);
    });
    return formData;
}

function toJsonStr(data) {
    return JSON.stringify(data);
}

function formatData(headers, data) {
    if (!headers || !headers['Content-Type'] || headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        return toForm(data);
    }
    switch (headers['Content-Type']) {
        case 'application/json':
            return toJsonStr(data);
        default:
            return toForm(data);
    }
}


const ajax = ({ url, method, data, dataType, headers, success, error, complete }) => {

    console.log(url);
    let options = {};

    //默认method
    options['method'] = method || 'GET';

    //默认headers
    options['headers'] = Object.assign({
        'Content-Type': 'application/json; charset=utf-8', //默认格式
          'credentials': 'include', //包含cookie
          'mode': 'cors', //允许跨域
    }, headers);

    //处理body
    options.method.toUpperCase() === 'POST' && (options['body'] = data ? formatData(headers, data) : '');

    fetch(url, options)
        .then((response) => !dataType || dataType === 'json' ? response.json() : response.text())
        .then((responseJson) => {
            success && success(responseJson);
            complete && complete(responseJson);
        }).catch((err) => {
            error(err);
            complete && complete();
        });
};

export default ajax;
