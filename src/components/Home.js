import * as React from 'react';
import Footer from "./Footer";
import axios from 'axios'
import {Link} from 'react-router-dom';





class Home extends React.Component {
  state = {customers: []};




    async componentDidMount(){
        await fetch("https://quiet-hollows-56074.herokuapp.com/customers", {
            headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'      
            }
        })
        .then(response => response.json())
        .then(data => this.setState({customers: data}));

        console.log("this is data");
        console.log(this.state.customers);
    }


    async deleteCustomer(id) {
        axios.delete(`https://quiet-hollows-56074.herokuapp.com/${id}`).then(res => {
            const index = this.state.customers.findIndex(customer => customer.id === id);
            console.log("this is index" + index);
            // console.log("this is res dot data");
            // console.log(res.data);
            // console.log("this is res")
            // console.log(res);
            // console.log("this is id" + id);  
            window.location.reload();
        })
 
    }

    render() {
        const customers = this.state.customers;
        return (
            <div className = "homeClass">
                {customers.length === 0 && (
                    <div className="text-center">
                        <h2>No customer found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Customer Name</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Account Balance</th>
                                    <th scope="col">Account Status</th>
                                    <th scope="col">Account Type</th>
                                    <th scope="col">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {customers && customers.map(customer =>
                                    <tr key={customer.id}>
                                        <td>{customer.Name}</td>
                                        <td>{customer.DOB}</td>
                                        <td>{customer.Balance}</td>
                                        <td>{customer.Status}</td>
                                        <td>{customer.Type}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Account </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Account</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer year = "2021" />
            </div>
        
        )
    }

}

export default Home;


