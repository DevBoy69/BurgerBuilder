import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger.components'
import BuildControls from '../../components/Burger/BuildControls/BuildControls.component'

const INGREDIENTS_COST = {
    salad:1,
    cheese:2,
    meat:4,
    bacon:4
}



export default class extends Component{

    state = {
        ingredients:{
            cheese:0,
            meat:0,
            bacon:0, 
            salad:0
        },
        totalPrice:4,
        purchasable:false
    }   

    AddIngredientsHandler = type =>{
        let OldCount = this.state.ingredients[type]
        let NewCount = OldCount + 1
        let UpdatedIngredients = {
            ...this.state.ingredients
        } 
        UpdatedIngredients[type] = NewCount

        let OldPrice = this.state.totalPrice
        let NewPrice = OldPrice + INGREDIENTS_COST[type]

        let purchasable = this.IsItPurchasable(NewPrice)

        this.setState({
            totalPrice:NewPrice,
            ingredients:UpdatedIngredients,
            purchasable
        })        
    }

    RemoveIngredientsHandler = type =>{
        let OldCount = this.state.ingredients[type]
        let NewCount = OldCount - 1
        if(NewCount<0) return
        let UpdatedIngredients = {
            ...this.state.ingredients
        } 
        UpdatedIngredients[type] = NewCount

        let OldPrice = this.state.totalPrice
        let NewPrice = OldPrice - INGREDIENTS_COST[type]

        let purchasable = this.IsItPurchasable(NewPrice)

        this.setState({
            totalPrice:NewPrice,
            ingredients:UpdatedIngredients,
            purchasable
        })
    }

    IsItPurchasable = (price) =>{
        return price !== 4 
    } 

    render(){
        return <div>
            <Burger ingredients = {this.state.ingredients} />
            <BuildControls purchasable={this.state.purchasable} price={this.state.totalPrice} AddIngr={this.AddIngredientsHandler} RemoveIngr={this.RemoveIngredientsHandler} ingredients={this.state.ingredients}/>
        </div>
    }
} 