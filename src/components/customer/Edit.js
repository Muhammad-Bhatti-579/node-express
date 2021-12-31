import * as React from 'react';
import axios from "axios";
import withRouter from './withRouter.js';


class Edit extends React.Component{
    state = {Name: "", DOB: "", Balance: "", 
            Status: "", Type: "", ImageURL: "", submitSuccess: false, customer: {}, passedId: ""}
    

    

    componentDidMount(){
        console.log(this.props.params.id);
        const passedId = this.props.params.id;
        this.setState({passedId: this.props.params.id});
        axios.get('https://quiet-hollows-56074.herokuapp.com/customers/' + passedId).then(data=>{
            // this.setState({ customer: data.data});
            this.setState({Name: data.data.Name});
            this.setState({DOB: data.data.DOB});
            this.setState({Balance: data.data.Balance});
            this.setState({Type: data.data.Type});
            this.setState({Status: data.data.Status});
            // console.log("this is name" + this.state.Name);
            console.log("this is data from edit");
            console.log(data);     
        })

    }



    processFormSubmission = e =>{
        e.preventDefault();
        const formData = {
            Name: this.state.Name,
            DOB: this.state.DOB,
            Balance: this.state.Balance,
            Status: this.state.Status,
            Type: this.state.Type,
            ImageURL: this.state.ImageURL,
        }
        // console.log("this is form data")
        // console.log( formData);
        this.setState({submitSuccess: true});
        axios.put('https://quiet-hollows-56074.herokuapp.com/' + this.state.passedId , formData)
        .then(response => console.log(response));
    }

    handleInputChanges = e =>{
        e.preventDefault();
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
         console.log("this is target");
         console.log(e.currentTarget);
         console.log("this is value" + e.currentTarget.value);
    }



    render() 
    {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="editClass">       
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Edit Account </h2>  
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                        Account details have been successfully updated.
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="Name"> Full Name </label>
                            <input type="text" id="Name" defaultValue = {this.state.Name} onChange={(e) => this.handleInputChanges(e)} name="Name" className="form-control" placeholder="Enter customer's full name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Balance"> Balance </label>
                            <input type="number" id="Balance" defaultValue = {this.state.Balance} onChange={(e) => this.handleInputChanges(e)} name="Balance" className="form-control" placeholder="Enter customer's starting balance" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Type"> Account Type </label>
                            {/* <input type="text" id="Type" defaultValue = {this.state.Type} onChange={(e) => this.handleInputChanges(e)} name="Type" className="form-control" placeholder="Enter customer's account type" /> */}
                            <select id = "Type" defaultValue = {this.state.Type} onChange = {(e) => this.handleInputChanges(e)} name="Type" className="form-control" >  
                                {/* <option> ---Select Account Type--- </option>   */}
                                <option value ="Checking"> Checking </option>  
                                <option value = "Savings"> Savings </option>  
                                <option value = "Money Market"> Money Market </option>  
                            </select>  
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Status"> Account Status </label>
                            {/* <input type="text" id="Status" defaultValue = {this.state.Status} onChange={(e) => this.handleInputChanges(e)} name="Status" className="form-control" placeholder="Enter customer's account status" />  */}
                            <select id = "Status" defaultValue = {this.state.Status} onChange = {(e) => this.handleInputChanges(e)} name="Status" className="form-control" >  
                                {/* <option> ---Select Account Status--- </option>   */}
                                <option value ="Active"> Active </option>  
                                <option value = "Closed"> Closed </option>  
                                <option value = "Dormant"> Dormant </option>  
                            </select>  
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                            Edit Account
                            </button>
                            {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
           </div>
        )
    }
  
}

export default withRouter(Edit);
