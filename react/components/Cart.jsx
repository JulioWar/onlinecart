import React from 'react';
import {Redirect} from 'react-router-dom';
import * as request from 'superagent';
import {baseUrl} from '../configs/constants';

class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            error: '',
            redirect: false,
            processing: false
        };
    }

    cancelCart() {
        this.props.deleteCartProducts();
        this.state.redirect = true;
    }

    payCart() {
        this.setState({processing: true});
        request.get(`${baseUrl}/products.json`).end((err, res) => {
            if (err || !res.ok) {
                this.setState({processing: false});
                alert('ocurrio un error al confirmar la compra, vuelva a intentarlo');
            } else {
                const products = res.body.map((product) => {
                    const products = this.props.cartProducts.filter(i => i.id == product.id)
                        .map(i => i.amount);
                    if (products.length > 0) {
                        product.stock -= products.reduce((current, next) => current + next, 0);
                    }

                    return product;
                });

                request.put(`${baseUrl}/products.json`, products).end((err, res) => {
                    this.setState({processing: false});
                    if (err || !res.ok) {
                        alert('ocurrio un error al confirmar la compra, vuelva a intentarlo');
                    } else {
                        this.props.deleteCartProducts();
                    }
                });
            }
        });
    }

    calculateTotal() {
        return this.props.cartProducts.map(item => (item.price * item.amount))
            .reduce((current, next) => {
                return current + next;
            }, 0);
    }

    renderProducts() {
        return this.props.cartProducts.map((item, index) => {
            return (
                <li className="list-group-item" key={index}>
                    <img src={'./assets/img/' + item.image} alt={item.description} className="float-left"/>
                    <h5 className="mt-0">{ item.description }</h5>
                    <p className="mb-2"><strong>Unidades:</strong> { item.amount }</p>
                    <p className="mt-0 mb-0"><strong>Subtotal:</strong> ${ item.amount * item.price }</p>
                </li>
            );
        });
    }

    render() {
        let btnText = 'Pagar';
        let redirect = '';
        if (this.state.processing) {
            btnText = 'Procesando...';
        }
        
        if (this.state.redirect === true) {
            redirect = <Redirect to='/store'/>;
        }

        return (
            <div className="row">
                {redirect}
                <div className="col-md-6">
                    <ul className="list-group">
                    {this.renderProducts()}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h2 className="mt-3">Total: ${ this.calculateTotal() }</h2>
                    <div className="btn-group">
                        <button className="btn btn-secondary" onClick={this.cancelCart.bind(this)}>
                            Cancelar
                        </button>
                        <button className="btn btn-secondary" onClick={this.payCart.bind(this)} disabled={this.state.processing || this.props.cartProducts.length === 0}>
                            {btnText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;