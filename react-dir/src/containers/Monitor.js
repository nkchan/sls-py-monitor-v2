import React,{Component} from "react";
import "./Monitor.css";
import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import { Modal,Button } from 'react-bootstrap';
import config from "../config"

const API_URL = config.apiGateway.URL + '/'+ config.apiGateway.STAGE;

const REQUEST_URL =  API_URL+'/get_site'
const REGISTER_URL = API_URL+'/register'
const DELETE_URL =   API_URL+'/remove'
export default class  Monitor extends Component {

    constructor(props) {
        super(props)
        this.getData = this.getData.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleShow2 = this.handleShow2.bind(this)
        this.handleClose2 = this.handleClose2.bind(this)
        this.GetSiteData = this.GetSiteData.bind(this)
        this.SendSiteData = this.SendSiteData.bind(this)
        this.DeleteSiteSet = this.DeleteSiteSet.bind(this)
        this.SendDeleteSite = this.SendDeleteSite.bind(this)

        this.state = {
            data: [],
            show: false,
            remove: false,
            site: '',
            url:'',
            id: ''
        };
    }

    getData () {
        superagentJsonapify(superagent);
        superagent
            .get(REQUEST_URL)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((res) => {
                    this.setState({data: res.body})
                }
            )
     }
    componentDidMount() {
        this.getData()
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose2() {
        this.setState({ remove: false });
    }

    handleShow2() {
        this.setState({ remove: true });
    }
    GetSiteData(event) {
        switch(event.target.name){
            case "name":
                this.setState({site:event.target.value});
                break;
            case "url":
                this.setState({url:event.target.value});
            break;
        default:
            break;
        }
    }
    SendSiteData(){
        superagentJsonapify(superagent);
        superagent.post(REGISTER_URL).send({name:this.state.site,url:this.state.url}).catch(err=>{console.log(err.message)})
        this.setState({site:'',url:''})
        this.setState({show:false});
        this.props.history.push('/')
    }
    DeleteSiteSet(event) {
        this.setState({remove: true});
        console.log(event.currentTarget.getAttribute('data-id'));
        this.setState({id:event.currentTarget.getAttribute('data-id')})
        this.setState({site:event.currentTarget.getAttribute('data-name')})
        this.setState({url:event.currentTarget.getAttribute('data-url')})
    }
    SendDeleteSite(){
        superagentJsonapify(superagent);
        superagent.post(DELETE_URL).send({id:this.state.id}).catch(err => {console.log(err.message)})
        this.setState({id:'',site:'',url:''})
        this.setState({remove: false});
		this.props.history.push('/')
    }
    render(){
        return (
                <div className="row">
                <div className="col-md-12">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#regsite" onClick={this.handleShow}>Register Website</button>
                </div>
                <table className="table table-striped">
                <thead>
                <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Status</th>
                </tr>
                </thead>
                <tbody>
            {this.state.data.map((item) => {
PTION
                    return (
                            <tr key={item.id} data-toggle="modal" data-target="#removesite" data-id={item.id}
                        data-name={item.name} data-url={item.url}  onClick={this.DeleteSiteSet}>
                            <td>{item.name}</td>
                            <td>{item.url}</td>
                            <td>{item.code}</td>
                            </tr>
                    )
            })}
            </tbody>
                </table>

                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header>
                <Modal.Title>Register Website</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="modal-body">
                <div className="form-group">
                <div className="col-sm-2">
                <label htmlFor="name" className="control-label">Name:</label>
                </div>
                <div className="col-sm-10">
                <input type="text" name="name" className="form-control" id="name" onChange={this.GetSiteData}  placeholder="Name"/>
                </div>
                </div>
                <div className="form-group">
                <div className="col-sm-2">
                <label htmlFor="site" className="control-label">URL:</label>
                </div>
                <div className="col-sm-10">
                <input type="url" name="url" className="form-control" id="url"  onChange={this.GetSiteData}  placeholder="http://www.example.com"/>
                </div>
                </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
                <Button onClick={this.SendSiteData}>Register</Button>
                </Modal.Footer>
                </Modal>

                <Modal show={this.state.remove} onHide={this.handleClose2}>
                <Modal.Header>
                <Modal.Title>Remove Site</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p>Are you sure you want remove this website from monitoring list?</p>
                <p><strong id="siteinfoModal">{this.state.site}({this.state.url})</strong></p> 
                </Modal.Body>

                <Modal.Footer>
                <Button onClick={this.handleClose2}>Close</Button>
                <Button bsStyle="primary" onClick= {this.SendDeleteSite}>Save changes</Button>
                </Modal.Footer>
                </Modal>

                </div>


        )}
}
