import React, { Component ,createContext } from 'react'
import {menuItems,detailProduct} from './data'

export const MenuContext=createContext();

class MenuContextProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cart:[],
             products:[...menuItems],
             subTotal:0,
             tax:0,
             total:0,
             detailProduct: detailProduct,
             num:null,
             randomTitle:null


        }
    }
    showItems =(id)=> {
    const item = this.state.products.find(item=>item.id===id)
    return item;
}

    getItem =(id)=>{
        const val = this.state.products.find(item=>item.id===id)
        return val;
    }
    
    increment =(id) =>{
        let tempCart = [...this.state.cart]
        const selectedProduct =tempCart.find(item =>item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product =tempCart[index];
        product.count = product.count+1;
        product.total = product.count * product.price;

        this.setState(() =>{
            return{cart:[...tempCart]}
        },this.cartTotal())
    }

    decrement =(id) =>{
        let tempCart = [...this.state.cart]
        const  selectedProduct=tempCart.find(item => item.id===id)
        const  index = tempCart.indexOf(selectedProduct)
        const product=tempCart[index]
        if(product.count>1)
        {
        product.count= product.count-1;
        product.total=product.count*product.price  ;
        this.setState(()=>{
            return {cart:[...tempCart]}
        },this.cartTotal())
        }
        else
        {
        this.deleteItem(id);
        this.cartTotal()
        }
        
        
    }
    handleDetail = (id) => {
    const item = this.showItems(id);
    this.setState(()=>{
        return {
            detailProduct:item
        }
    })
}


addToCart=(id)=>{
    let tempProducts=[...this.state.products];
    const index=tempProducts.indexOf(this.getItem(id))

    const product=tempProducts[index];
    product.inCart=true;
    product.count=1;
    const price =product.price;
    product.total=price;

    this.setState(()=>{
        return{
            products:tempProducts,
            cart:[...this.state.cart,product]
        }
    },()=>{
        this.cartTotal();
    })   
}



generateNum = () => {
    const num = Math.floor(Math.random()*9)+1;
    return num
}


generateTitle = () => {
    
    const number = this.generateNum();
    const item = this.showItems(number)
    this.setState(()=>{
        return{
            randomTitle:item.title,
            num:item.id
        }
    },()=>this.handleDetail(this.state.num))
} 


    cartTotal=()=>{
        let tempCart=[...this.state.cart];
        let st=0,ct=0;
        tempCart.map((item)=> st=st+item.total);
        let txyz=st*0.1;
        let t = parseFloat(txyz.toFixed(2))
        ct=t+st;
        this.setState(()=>{
            return{
                subTotal:st,
                tax:t,
                total:ct
            }
        })
    }




    deleteItem =(id)=>{
        let tempCart=[...this.state.cart]
        let wholeProduct=[...this.state.products]
        tempCart=tempCart.filter(item=>item.id!==id)
        const index=wholeProduct.indexOf(this.getItem(id))
        const removedProduct=wholeProduct[index]
        removedProduct.inCart=false;
        removedProduct.count=0;
        removedProduct.total=0;
        this.setState(()=>{
            return{
                cart:[...tempCart],
                product:[...wholeProduct]
            }
        })
    }

    render() {
        return (
            <MenuContext.Provider value={{menuItems:menuItems,
                                        detailProduct:detailProduct,
                                        increment:this.increment,
                                        decrement:this.decrement,
                                        ...this.state, 
                                        handleDetail:this.handleDetail,
                                         generateNum:this.generateNum,
                                          generateTitle:this.generateTitle,
                                          addToCart:this.addToCart
                                        }}>
                {this.props.children}
            </MenuContext.Provider>
        )
    }
}

export default MenuContextProvider
