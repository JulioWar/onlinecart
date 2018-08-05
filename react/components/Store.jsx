import React from 'react';
import update from 'immutability-helper';
import * as request from 'superagent';
import {baseUrl} from '../configs/constants';
// Components
import Item from './Item.jsx';


class Store extends React.Component {

    constructor() {
        super();
        this.state = {
            error: '',
            search: '',
            products: [],
            productsFilter: []
        };
    }

    updateProducts(products) {
        this.setState({
            products: [...proudcts]
        });
        this.props.productChanges(products)
    }

    onSearch(event) {
        let search = event.target.value;
        let products = [];

        if (search) {
            products = this.state.products.filter((item) => {
                return item.description && item.description.toString().toLowerCase().includes(search.toLowerCase());
            });
        } else {
            products = [...this.state.products];
        }
        this.setState({
            productsFilter: products,
            search: search
        });

    }

    addProduct(product, index) {
        this.props.addProductToCart(product);
        let item = Object.assign({}, product);

        item.amountInCart += product.amount;
        item.amount = 1; 
        this.handleAmountChanges(item, index)
    }

    handleAmountChanges(product, index) {
        const updatedProducts = update(this.state.products, {$splice: [[index, 1, product]]});
        index = this.state.productsFilter.findIndex((item) => item.id === product.id);
        const updatedProductFilter = update(this.state.productsFilter, {$splice: [[index, 1, product]]})
        this.setState({
            products: updatedProducts,
            productsFilter: updatedProductFilter
        });
        this.props.productChanges(updatedProducts);
    }

    getProducts() {
        return this.state.productsFilter.map((product, index) => {
            return <Item product={product} 
                    handleAmountChanges={this.handleAmountChanges.bind(this)}
                    addProduct={this.addProduct.bind(this)} index={index} key={index}/> ;
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <h3>Cat&aacute;logo de productos</h3>
                    </div>
                    <div className="col-md-4">
                        <h5>¿Qu&eacute; estas buscando?</h5>
                        <input type="search" 
                            className="form-control" 
                            placeholder="Buscar producto" 
                            value={this.state.search} 
                            onChange={this.onSearch.bind(this)}/>
                    </div>
                </div>
                <hr className="mt-5 mb-2"/>
                <div className="row catalog">
                    {this.getProducts()}
                </div>
            </div>
        )
    }

    componentWillMount() {
        request.get(`${baseUrl}/products.json`).end((err, res) => {
            if (err || !res.ok) {
                this.setState({error: 'Error en la conexion al servidor.'})
            } else {
                const products = res.body.map((item) => {
                    item.amount = 1;
                    item.amountInCart = this.props.cartProducts
                        .filter(i => i.id == item.id)
                        .map(i => i.amount)
                        .reduce((current, next) => current + next, 0);

                    return item;
                });
                this.setState({
                    products: [...products],
                    productsFilter: [...products]
                });
                this.props.productChanges(products);
            }
        });
    }
}

export default Store;