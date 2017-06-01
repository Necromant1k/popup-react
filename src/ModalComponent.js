import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

export default class ModalComponent extends Component {
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