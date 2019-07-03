/**
 * @author Gelton Cruz
 * @file Panier.jsx
 */
import React from 'react'
import Item from './Item'

export default class Panier extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Items: [
                { id: 1, productName: 'Les haricots', price: 2.50 },
                { id: 2, productName: 'Des pâtes', price: 3.50 },
                { id: 3, productName: 'Acuçar', price: 4.50 },
                { id: 4, productName: 'Pour', price: 5 },
                { id: 5, productName: 'Fraise', price: 5.50 },
            ],
            Panier: []
        }
    }

    recevoirItem = item => {
        this.state.Panier.push(item);
        this.setState({ Panier: this.state.Panier })
    }

    render() {
        return (
            <div>
                <h1>List d'achet':</h1>
                <ul>
                    {
                        this.state.Items.map((item, i) => (
                            <Item key={i.toString()} item={item} recevoirItem={this.recevoirItem} />
                        ))
                    }
                </ul>
                <p>Prix à payer: $ {parseFloat(this.state.Panier.reduce((acc, prx) => acc + prx.price, 0))}</p>
                <p>quantité d'articles: {this.state.Panier.length <= 0 ? `Panier vide` : this.state.Panier.length}</p>
            </div>
        )
    }
}