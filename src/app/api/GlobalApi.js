const { default: axios } = require('axios');

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory=()=>axiosClient.get('/categories?populate=*');

const getSliders=()=>axiosClient.get('/sliders?filters[active][$eq]=true&populate=*').then(resp =>{
    return resp.data.data
});

const getBrand=()=>axiosClient.get('/brands?populate=*').then(resp =>{
    return resp.data.data
})


const getAllProducts=()=>axiosClient.get('/products?filters[isFeatured][$eq]=true&populate=*').then(resp =>{
    return resp.data.data
});


const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp =>{
    return resp.data.data
});

const getBrandList=()=>axiosClient.get('/products?populate=*&filters[brand][slug][$eq]=${slug}')


const getProductByCategory= (category) =>axiosClient.get('/products?filters[category][$eq]='+category+"&populate=*").then(resp =>{
    return resp.data.data
});


// Asignas el objeto a una variable antes de exportarlo
const apiClient = {
    getCategory,
    getSliders,
    getBrand,
    getAllProducts,
    getCategoryList,
    getBrandList,
    getProductByCategory

};


export default apiClient; 
