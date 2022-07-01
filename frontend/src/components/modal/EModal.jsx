import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Form from 'react-bootstrap/Form'

import './modal.css'
import AlertMessage from '../../pages/layout/AlertMessage'


const EModal = ({ props }) => {
    const [code, setCode] = useState('');
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState(null)

    const onInputChange = e => {
        setCode(
            e.target.value
        )
        setAlert(null)
    }
    const handleSubmit = (bool, type) => {
        setValidated(bool);
        if (type === 'success') {
            setAlert({ type: 'success', message: "Find successfully!" })
        }
        else{
            setAlert({ type: 'danger', message: "Find failed!" })
        }
    }
    useEffect(() => {
        setValidated(false)
        setCode('')
        setAlert(null)
    }, [props.isShow])
    return (
        <Modal
            show={props.isShow}
            onHide={props.func}
            backdrop="static"
            keyboard={false}
        >
            <ModalHeader  >
                <Modal.Title>Find your teacher through ID</Modal.Title>
            </ModalHeader>
            <Form noValidate validated={validated} onSubmit={(e) => props.funcFind(code, e, handleSubmit)} >
                <ModalBody>

                    <div className="container d-flex flex-column">
                        <AlertMessage info={alert}></AlertMessage>
                        <Form.Control
                            type="text"
                            id="idTeacher"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Teacher code here"
                            value={code}
                            name="code"
                            required
                            onChange={onInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please input the Code.
                        </Form.Control.Feedback>
                        <div className='px-1'>
                            <Form.Text className='idTeacherHelpBlock' id="idTeacherHelpBlock" muted>
                                Your Teacher code must be at least 6 characters, and
                                must not contain spaces, special characters, or emoji.
                            </Form.Text>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-secondary' onClick={props.funcClose}>
                        Close
                    </button>
                    <button className='btn btn-primary px-4' >Find</button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default EModal