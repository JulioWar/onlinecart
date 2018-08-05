import React from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import update from 'immutability-helper';
// Components
import Store from './Store.jsx';
import Cart from './Cart.jsx';
import Product from './Product.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            products: [],
            cartProducts: []
        };
    }

    logOut() {
        localStorage.removeItem('user');
        this.setState({redirect: true});
    }

    onProductsChange(products) {
        this.setState({
            products: [...products]
        });
    }

    addProductToCart(product) {
        let products = update(this.state.cartProducts, {$push: [product]});
        this.setState({cartProducts: products});
    }

    deleteCartProducts() {
        this.setState({cartProducts: []});
    }

    render() {
        let redirect = '';
        let badge  = '';

        if (this.state.cartProducts.length > 0) {
            badge = <span className="badge badge-danger">{this.state.cartProducts.length}</span>;
        }

        if (this.state.redirect === true) {
            redirect = <Redirect to="/login" />;
        }
        return (
            <div className="store">
                {redirect}
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">La Bodega</a>
                    <button className="navbar-toggler" type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/store" className="nav-link"><i className="fa fa-th"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/store/cart" className="nav-link">
                                <i className="fa fa-shopping-cart"></i>
                                {badge}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" ><i className="fa fa-inbox"></i></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.logOut.bind(this)}>
                                <i className="fa fa-sign-out-alt"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                    </nav>

                    <div className="card mt-4 mb-5">
                    <div className="card-body ">
                        <Switch>
                            <Route exact path="/store/" render={() => (
                                <Store productChanges={this.onProductsChange.bind(this)} 
                                    cartProducts={this.state.cartProducts}
                                    addProductToCart={this.addProductToCart.bind(this)} />
                            )}/>
                            <Route path="/store/cart" render={(props) => (
                                <Cart {...props} 
                                    deleteCartProducts={this.deleteCartProducts.bind(this)}
                                    cartProducts={this.state.cartProducts}/>
                            )}/>
                            <Route path="/store/product/:description" 
                                render={(props) => (
                                <Product {...props} products={this.state.products}/>
                            )}/>
                        </Switch>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;