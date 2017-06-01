import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import {Col} from 'react-bootstrap/lib';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ModalComponent from './ModalComponent';
import {connect} from 'react-redux';
import {addModal} from './reducers/popup/actions';

@connect(state => ({modals: state.modals}), {addModal})
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modals: [],
        currentModal: null,
        isCheckedAll: false,
        isOpen: false,
        name: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.modals) {
      this.setState({
          modals: nextProps.modals.map(modal => (<ModalComponent key={modal.name} name={modal.name} onClose={(e) => this._openModal(e)} />))
      })
    }
  }
  _onChange = (e) => {
    this.setState({
        isOpen: false,
        currentModal: this.state.modals[e.target.value]
    })
  };
  _openModal = (e) => this.setState({isOpen: this.state.isCheckedAll});
  render() {
    const {addModal} = this.props;
    const {isCheckedAll, isOpen, modals, currentModal, name} = this.state;
    return (
      <div className="container" style={{marginTop: 50}}>
        <div className="row">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <div className="row">
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={3}>
                  Modal name
                </Col>
                <Col sm={6}>
                  <FormControl onChange={(e) => this.setState({name: e.target.value})} type="text" placeholder="Enter modal name" />
                </Col>
                <Col sm={3}>
                  <Button className="btn-success" onClick={() => addModal(name)}>Add modal</Button>
                </Col>
              </FormGroup>
            </div>
            <div className="row" style={{marginTop: 30}}>
              <div className="col-xs-12 col-md-6">
                <Button onClick={() => this.setState({isOpen: true})}>Open popup</Button>
              </div>
              <div className="col-xs-12 col-md-6">
                <Checkbox onChange={() => this.setState({isCheckedAll: !this.state.isCheckedAll, isOpen: false})}>
                  Check all popups
                </Checkbox>
              </div>
            </div>
            <FormGroup controlId="formControlsSelect" style={{marginTop: 50}}>
              <ControlLabel>Select popup</ControlLabel>
              <FormControl componentClass="select" onChange={(e) => this._onChange(e)} placeholder="select">
                <option>Popup list</option>
                {modals.map((item, index) => (<option key={index} value={index}>Popup {index + 1}</option>))}
              </FormControl>
            </FormGroup>
              {isCheckedAll && isOpen && modals.map(item => item)}
              {!isCheckedAll && isOpen && currentModal}
          </div>
        </div>
      </div>
    );
  }
}
