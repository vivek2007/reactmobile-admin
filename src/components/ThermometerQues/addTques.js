import React from 'react';
import Page from 'components/Page';
import axios from 'axios';
import AppConstants from 'AppConstants';
import {ReactTitle} from 'react-meta-tags';
import  { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from 'reactstrap';
import Loading from 'assets/img/loader.gif';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Switch from "react-switch";
class AddTques extends React.Component{
    constructor(){
        super();
        this.state = {
            question : '',
            status: true,
            question_error : false,
            loading : "",
            errors : {},
            errMsg : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }
    handleInputChange(e){
        this.setState({[e.target.name]:e.target.value})
        if(e.target.name == "question"){
            if(e.target.value != ""){
                this.setState({question_error:false})
            }else{
                this.setState({question_error:true})
            }
        }
        
    }
    handleStatusChange(checked){
        this.setState({status : checked})
    }
    handleValidation(){
        let errors = {};
        let formIsValid = true;
        if (!this.state.question){
            formIsValid = false;
            errors["question"] = "Please enter question";
            ReactDOM.findDOMNode(this.refs.question).focus();
        }
        this.setState({
            errors: errors,
            question_error : true,
        });
        return formIsValid;
    }
    handleSubmit(e){
        e.preventDefault();
        let formval={}
        if(this.handleValidation()){
            this.setState({loading:1});
            formval = {
                'question': this.state.question,
                'status': this.state.status,
            }
            axios.post(AppConstants.API+'/thermometerQues/addThermometerQuestion',formval)
                .then(res => { 
                    // console.log(res)
                    if(res.data.Status == "Success"){
                        setTimeout((e) => {
                            this.props.history.push('/thermoques');
                        }, 2000);
                        setTimeout(() => {
                          this.setState({
                            loading:'',
                            errMsg:  (<div className="alert alert-success fade show mt-3">{res.data.msg}</div>),
                          });
                        }, 1000);
                    }
                    else{
                        setTimeout(() => {
                          this.setState({
                            loading:'',
                            errMsg:  (<div className="alert alert-danger fade show mt-3">{res.data.msg}</div>),
                          });
                        }, 1000);
                    }
            })
        }
    }
    componentDidMount(){
        var element = document.getElementById("navItem-Thermometer Questions-0");
        element.classList.add("active");
    }
    render(){
        return(
            <Page title="Add Thermometer Question" /*breadcrumbs={[{ name: 'Call Center', active: true }]}*/>
                <ul className="cst-breadcrumb">
                    <li><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li><Link to={'/thermoques'}>Thermometer Questions</Link></li>
                    <li>Add Thermometer Question</li>
                </ul>
                <ReactTitle title="Add Qustion"/>
                <Row>
                    <Col xl={12} lg={12} md={12}>
                        <Card>
                            <CardBody>
                                <Form name="addTques" onSubmit= { this.handleSubmit }>
                                    <FormGroup row>
                                        <Label for="question" sm={2}>
                                            Question <span>*</span>
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                            type="text"
                                            name="question"
                                            placeholder="Question"                      
                                            value={this.state.question}
                                            onChange={ this.handleInputChange }  
                                            // autoComplete="nope" 
                                            ref ="question"           
                                            />
                                            {this.state.question_error == true ? <span className="error" style={{color: 'red'}}>{this.state.errors["question"]}</span>:""}
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="status" sm={2}>
                                            Status
                                        </Label>
                                        
                                        
                                        <Col sm={10}>
                                        <Switch onChange={this.handleStatusChange.bind(this)} checked={this.state.status} 
                                         uncheckedIcon={
                                            <div
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                width:"150px",
                                                color: "#000",
                                                fontWeight: "bold",
                                                paddingRight: 2
                                                }}
                                            >
                                                Inactive
                                            </div>
                                            }
                                            checkedIcon={
                                            <div
                                                style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                fontSize: 15,
                                                width:"180px",
                                                fontWeight: "bold",
                                                color: "#000",
                                                paddingRight: 2
                                                }}
                                            >
                                                Active
                                            </div>
                                            }
                                            onColor = "#45b649"
                                            offColor = "#ffd700"
                                            className="react-switch"
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            handleDiameter={30}
                                        />

                                
                                     
                                        </Col>
                                    </FormGroup>
                                    <FormGroup check row>
                                        <Col sm={{ size: 10, offset: 2 }}>
                                            <Button className="btn btn-primary" onClick={ this.handleSubmit } title="Save"> Save    <div style={this.state.loading ? {} : { display: 'none' }} className="image-fill w-25 loader-div">               <div class="clearfix">
  <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div></div></Button>&nbsp;
                                            <Link to={"/thermoques"} className="btn btn-danger" title="Cancel">&nbsp;Cancel</Link>
                                        </Col>
                                    </FormGroup>
                                    {this.state.errMsg}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
  });
export default connect(mapStateToProps, {})(AddTques);