import * as React from 'react';
import axios from 'axios';


class Create extends React.Component{
    state = {Name: "", DOB: "", Balance: "", 
            Status: "", Type: "", ImageURL: "", submitSuccess: false}


    processFormSubmission = e =>{
        e.preventDefault();
        const formData = {
            Name: this.state.Name,
            DOB: this.state.DOB,
            Balance: this.state.Balance,
            Status: "Active",
            Type: this.state.Type,
            ImageURL: this.state.ImageURL,
        }

        console.log("this is form data")
        console.log( formData);
        this.setState({submitSuccess: true});
        axios.post('https://quiet-hollows-56074.herokuapp.com/', formData)
        .then(response => console.log(response));

    }

    handleInputChanges = e =>{
        e.preventDefault();
        this.setState(
            {[e.currentTarget.name]: e.currentTarget.value}
        )
        // console.log("this is target");
        // console.log(e.currentTarget);
        // console.log("this is value" + e.currentTarget.value);
    }


    render() 
    {
        const { submitSuccess, loading } = this.state;
        return (
            <div className= "createClass">
                <div className={"col-md-12 form-wrapper"}>
                    <h2> New Account </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                        Fill the form below to open a new account
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                        The form was successfully submitted! Click Existing Accounts to find the newly opened account
                        </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="Name"> Full Name </label>
                            <input type="text" id="Name" onChange={(e) => this.handleInputChanges(e)} name="Name" className="form-control" placeholder="Enter customer's full name" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="DOB"> Date of Birth </label>
                            <input type="date" id="DOB" onChange={(e) => this.handleInputChanges(e)} name="DOB" className="form-control" placeholder="Enter customer's date of birth" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Balance"> Starting Balance </label>
                            <input type="number" id="Balance" onChange={(e) => this.handleInputChanges(e)} name="Balance" className="form-control" placeholder="Enter customer's starting balance" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Type"> Account Type </label>
                            {/* <input type="text" id="Type" onChange={(e) => this.handleInputChanges(e)} name="Type" className="form-control" placeholder="Enter customer's account type" /> */}
                            <select id = "Type" defaultValue = {this.state.Type} onChange = {(e) => this.handleInputChanges(e)} name="Type" className="form-control" >  
                                <option> ---Select Account Type--- </option>  
                                <option value ="Checking"> Checking </option>  
                                <option value = "Savings"> Savings </option>  
                                <option value = "Money Market"> Money Market </option>  
                            </select>
                        
                        
                        </div>
          
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                            Submit
                            </button>
                            {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;