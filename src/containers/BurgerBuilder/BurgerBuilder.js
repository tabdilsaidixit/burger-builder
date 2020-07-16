import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        price: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response => {
                //console.log(response);
                this.setState({ingredients:response.data});
            });
    }

    updatePurchaseState(currentIngredients) {
        const ingredients = {
            ...currentIngredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchaseable: sum > 0 });
    }
    moreHandler = (type) => {
        let currentIngredients = { ...this.state.ingredients };
        currentIngredients[type] = currentIngredients[type] + 1;

        let oldPrice = this.state.price;
        let currentPrice = INGREDIENT_PRICES[type] + oldPrice;
        this.setState({ ingredients: currentIngredients, price: currentPrice });
        this.updatePurchaseState(currentIngredients);

    }

    lessHandler = (type) => {
        let currentIngredients = { ...this.state.ingredients };
        if (currentIngredients[type] > 0) {
            currentIngredients[type] = currentIngredients[type] - 1;
            let oldPrice = this.state.price;
            let currentPrice = oldPrice - INGREDIENT_PRICES[type];
            this.setState({ ingredients: currentIngredients, price: currentPrice });
        }

        this.updatePurchaseState(currentIngredients);
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert("Continue");
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: 'sai',
        //         address: {
        //             street: 'test street',
        //             zipCode: '123',
        //             country: 'US'
        //         },
        //         email: "test@mail.com"
        //     },
        //     deliveryMethod: 'fast'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing:false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing:false });
        //     });

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' +encodeURIComponent(this.state.ingredients[i]) );
        }
        queryParams.push('price=' + this.state.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        }
        for (let disabledKey in disabledInfo) {
            disabledInfo[disabledKey] = disabledInfo[disabledKey] <= 0;
        }
        let orderSummary = null;

       

        let burger = <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger
                        ingredients={this.state.ingredients} />
    
                    <BuildControls
                        increment={this.moreHandler}
                        decrement={this.lessHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.price}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>
            );

            orderSummary =<OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinued={this.purchaseContinueHandler}
            purchaseCanceled={this.purchaseCancelHandler}
            price={this.state.price}
            />;
        }

         
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
       
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Auxiliary>

        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);