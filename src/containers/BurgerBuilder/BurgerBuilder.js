import React, { Component } from "react";
import Auxiliary from '../../hoc/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 4,
        purchaseable: false,
        purchasing:false
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
    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        alert("Continue");
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        }
        for (let disabledKey in disabledInfo) {
            disabledInfo[disabledKey] = disabledInfo[disabledKey] <= 0;
        }
        return (
            <Auxiliary>
                <Modal show = {this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseContinued ={this.purchaseContinueHandler}
                    purchaseCanceled= {this.purchaseCancelHandler}
                    price = {this.state.price}
                    />
                </Modal>
                <Burger
                    ingredients={this.state.ingredients} />
                
                <BuildControls
                    increment={this.moreHandler}
                    decrement={this.lessHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.price}
                    purchaseable={this.state.purchaseable}
                    ordered = {this.purchaseHandler}
                />
               
            </Auxiliary>

        );
    }
}

export default BurgerBuilder;