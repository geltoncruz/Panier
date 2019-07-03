/**
 * @author Gelton Cruz
 * @file Item.jsx
 */
import React from 'react'

export default class Item extends React.Component {
    render(){
        return(
            <li key={this.props.item.id}>
                {this.props.item.id} - {this.props.item.productName} - ${this.props.item.price} 
                <button onClick={()=> this.props.recevoirItem(this.props.item)}>Panier</button>
            </li>
        )
    }
}   