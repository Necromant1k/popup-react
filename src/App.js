import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Modal from 'react-bootstrap/lib/Modal';

class CustomModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: true
        };
    }
    _onClose = () => {
      this.props.onClose();
      this.setState({showModal: false});
    };
    render() {
        return (
            <Modal show={this.state.showModal} onHide={() => this._onClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{this.props.name}</h4>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this._onClose()}>Close</Button>
              </Modal.Footer>
            </Modal>
        )
    }
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modals: [
          <CustomModal name="Popup 1" onClose={(e) => this._openModal(e)} />,
          <CustomModal name="Popup 2" onClose={(e) => this._openModal(e)}/>,
          <CustomModal name="Popup 3" onClose={(e) => this._openModal(e)}/>
        ],
        currentModal: null,
        isCheckedAll: false,
        isOpen: false
    };
  }
  _onChange = (e) => {
    this.setState({
        isOpen: false,
        currentModal: this.state.modals[e.target.value]
    })
  };
  _openModal = (e) => this.setState({isOpen: this.state.isCheckedAll});
  render() {
    const {isCheckedAll, isOpen, modals, currentModal} = this.state;
    return (
      <div className="container" style={{marginTop: 50}}>
        <div className="row">
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <div className="row">
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
