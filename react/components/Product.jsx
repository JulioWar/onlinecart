import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            product: {}
        }
    }

    render() {
        let redirect = '';

        if (this.state.redirect) {
            redirect = <Redirect to="/store"/>;
        }

        return (
            <div>
                {redirect}
                <h2>{this.state.product.description}</h2>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        <img src={'./assets/img/' + this.state.product.image} className="img-thumbnail" alt={this.state.product.description}/>
                    </div>
                    <div className="col-md-6">
                        <h4><b>Precio:</b> {this.state.product.price}</h4>
                        <h4><b>Unidades Disponibles:</b> {this.state.product.stock - this.state.product.amountInCart}</h4>
                    </div>
                </div>        
                <Link to="/store" className="btn btn-secondary mt-3">Atras</Link>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.products.length === 0) {
            this.setState({redirect: true});
        } else {
            const {description} = this.props.match.params;
            const result = this.props.products.filter((product) => {
                return product.description == description;
            })
    
            if (result.length > 0) {
                this.setState({
                    product: result[0]
                });
            } else {
                this.setState({redirect: true});
            }
        }
    }
}

export default Product;