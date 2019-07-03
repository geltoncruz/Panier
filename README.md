![](https://thepracticaldev.s3.amazonaws.com/i/u7p8g6e1ysxbp9lpmhx8.jpg)

Salut, comme je l'ai dit dans l'article précédent, je suis en train d'apprendre à écrire en français, je vais donc essayer d'écrire sur la technologie, un moyen très simple de pratiquer mon écriture en français.

Et, aujourd'hui je vais parler sur comment faire um simple communication des Composants parent à enfant et des Composants enfants à parent e en train de usage de ReactJs.

Cette application fait une allusion a une list d'acheter, une Panier et ses articles pour ajouter à Panier.

Pour commencer, je veux crois qu tu a dejá installé node,npm et react framework, alors, passon à la première étape du développement.

Dans votre terminal écrivez pour creer la application.

```sh
npx create-react-app <app-name>
```
> Es-ce que connaissez-vous le npx?. A prochain je vais ecrit sur cette technologie.

Après crèe l'application, ouvre ton IDE pour travailler et Allons-y.  

Tout d'abord je vais effacer archive App.js et creer un nouvelle dossier qu s'appelerais components.
Dans de dossier components je crèe l'archive Panier.jsx

```sh
rm src/App.js App.css App.test.js
cd src && mkdir Component && cd Component/
>> Panier.jsx
```

Dans archive Panier.jsx nous allons creer la classe de composant.

```jsx
/**
 * @author Gelton Cruz
 * @file Panier.jsx
 */
import React from 'react'

export default class Panier extends React.Component {

}
```
Aprés nous allons evoluer, pour ajouter le method render

```jsx
/**
 * @author Gelton Cruz
 * @file Panier.jsx
 */
import React from 'react'

export default class Panier extends React.Component {

    render() {
        return (
            <div>
                <h1>List d'achet':</h1>
                <ul>
                    <li>1 - Fejão - $2.5<button>Panier</button></li>
                    <li>2 - Macarrão - $3.5<button>Panier</button></li>
                    <li>3 - Acuçar - $4.5<button>Panier</button></li>
                    <li>4 - Pera - $5<button>Panier</button></li>
                    <li>5 - Morango - $5.5<button>Panier</button></li>
                </ul>
                <p>Prix à payer: $0</p>
                <p>quantité d'articles: 0</p>
            </div>
        )
    }
}
```
Nous allons maintenant créer une liste statique pour représenter chaque élément de la liste et la charger dans son composant enfant respectif.

```jsx
constructor(props) {
        super(props)

        this.state = {
            Items: [
                { id: 1, productName: 'Les haricots', price: 2.50 },
                { id: 2, productName: 'Des pâtes', price: 3.50 },
                { id: 3, productName: 'Biére', price: 4.50 },
                { id: 4, productName: 'Pour', price: 5 },
                { id: 5, productName: 'Fraise', price: 5.50 },
            ],
        }
}
    
```
Pour créer le nouveau composant, vous devez accéder au dossier des composants et créer le fichier Item.jsx

```sh
>> Item.jsx
```

```jsx
/**
 * @author Gelton Cruz
 * @file Item.jsx
 */
import React from 'react'

export default class Item extends React.Component {

    render(){
        return(
            <li>1 - Fejão - $2.5<button>Panier</button></li>
        )
    }
}
```
Pour ajouter le nouvelle composant dans le Panier est très simple. il suffit d'importer le composant et mettre dans le panier.

```jsx
/**
 * @author Gelton Cruz
 * @file Panier.jsx
 */
import React from 'react'
import Item from './Item'

export default class Panier extends React.Component {

    render() {
        return (
            <div>
                <h1>List d'achet':</h1>
                <ul>
                    <Item />
                </ul>
                <p>Prix à payer: $0</p>
                <p>quantité d'articles: 0</p>
            </div>
        )
    }
}
```

Pour faire la repetition j'ai utilisé le méthod map().
La manière que nous allons envoyer les données pour le composant Item serais à travérs de une props item.


```jsx
//Panier.jsx
                <ul>
                {
                 this.state.Items.map((item, i) => (
                   <Item key={i.toString()} item={item} />
                      ))
                    }
                </ul>
```
Dans de composant Item nous devons recevoir les données de remplir le template de composant.

```jsx
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
                <button>Panier</button>
            </li>
        )
    }
}
```

Si vous suivez toutes les étapes, votre écran ressemblera à ceci:

![](https://thepracticaldev.s3.amazonaws.com/i/yxbviq4hzem4oh1h9kmw.png)


## La dernière étape sera:
1. Appuyez sur le bouton panier pour ajouter l'article au panier.
2. Modifier le nombre d'articles dans le panier tant que vous avez un article.
3. mettre à jour le prix total du panier.

### 1.  
Creer le event click et ajoutez le method anonyme, pour invoque le method que toi vá creer avec le item en tant que parametre _RecevoirItem(item)_;

```jsx
// Item.jsx
<button onClick={()=> this.props.recevoirItem(this.props.item)}>Panier</button>
```

### 2.

Tout d'abord, nous devons ajouter le «panier» de structures pour sauver les donnés
Après, Le composant parent, "panier" doit recevoir le item

```jsx
//Panier.jsx

this.state = {
             ...
            Panier: []
        }
```
```jsx
//Panier.jsx

        recevoirItem  = item => {
        this.state.Panier.push(item);
        this.setState({Panier: this.state.Panier})
}
```
```jsx
//Panier.jsx

render(){

...
<ul>
...
  <Item key={i.toString()} item={item} recevoirItem={this.recevoirItem} />

    }
```
```jsx
//Panier.jsx
...

render(){

...
<p>quantité d'articles: {this.state.Panier.length <= 0 ? `Panier vide` : this.state.Panier.length}</p>

```
### 3.
Utilisez la méthode _reduce()) pour accéder à chaque prix et additionner le total:

```jsx

<p>Price à payer: $ { parseFloat(this.state.Panier.reduce((acc,prx) => acc + prx.price, 0)) }</p>
```

Et pour finir tu doit importer le composant panier dans le ficher index.js et utilisér le composant.

```jsx
// index.js
import Panier from './Component/Panier'

ReactDOM.render(<Panier />, document.getElementById('root'));
```

En suite, le code complete de les trois fichiers:

```jsx
/**
 * @author Gelton Cruz
 * @file index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Panier from './Component/Panier'

ReactDOM.render(<Panier />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```
```jsx
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
```
```jsx
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
```

Excuse-moi pour mon français et merci á tous!