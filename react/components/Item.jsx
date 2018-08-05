import React from 'react';
import {Link} from 'react-router-dom';

class Item extends React.Component {
    constructor() {
        super();
    }

    addProduct() {
        this.props.addProduct(this.props.product, this.props.index);
    }

    handleAmountChanges(event) {
        const product = Object.assign({}, this.props.product);
        product.amount = Number(event.target.value);
        this.props.handleAmountChanges(product, this.props.index);
    }

    render() {
        return (
            <div className="col-lg-4 col-md-6 mt-3"> 
                <div className="card">
                    <div style={{
                        backgroundImage: 'url(./assets/img/' + this.props.product.image +' )'
                    }} className="card-image"/>
                    <div className="card-body">
                        <h4>{this.props.product.description}</h4>
                        <p><b>Precio:</b> ${this.props.product.price}</p>
                        <p><b>Unidades Disponibles</b> {this.props.product.stock - this.props.product.amountInCart}</p>
                        <div className="row mt-2">
                            <div className="col-4">
                                <Link to={'/store/product/' + this.props.product.description} className="btn btn-primary">
                                    Ver mas
                                </Link>
                            </div>
                            <div className="col-8 text-right align-text-top details">
                                <button className="btn btn-warning mr-1" onClick={this.addProduct.bind(this)}>Agregar</button>
                                <input type="number" 
                                    min="0" 
                                    value={this.props.product.amount}
                                    onChange={this.handleAmountChanges.bind(this)}
                                    className="form-control"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item;