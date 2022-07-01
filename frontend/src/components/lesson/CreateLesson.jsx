import React, {  useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import axios from 'axios'
import { apiUrl } from '../../contexts/constants'
import AlertMessage from '../../pages/layout/AlertMessage'

import './Lesson.css'

const CreateLesson = ({ props }) => {
    const initialForm = {
        name: '',
        subjectId: props.Subjects[0]._id,
        classId: props.Classes[0]._id,
        header: '',
        userId: props.UserId

    }
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState(null)
    const [lessonForm, setlessonForm] = useState(initialForm)
    const { name, subjectId, classId, header } = lessonForm

    const onChangelessonForm = e => {
        setlessonForm({
            ...lessonForm,
            [e.target.name]: e.target.value,

        })
        setAlert(null)

    }
    const onUpdate = props.funcUpdate;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
            setValidated(true)
            console.log('fail')
        }
        else {
            try {
                const response = await axios.post(`${apiUrl}/lesson/`, lessonForm)
                console.log(response.data)
                if (response.data !== undefined) {
                    console.log('success', response);
                    setAlert({ type: 'success', message: "Your lesson created successfully!" })
                    setlessonForm(initialForm)
                    setValidated(false)
                    onUpdate();
                }
            }
            catch (error) {
                if (error.response.data) {
                    console.log(error);
                    return error.response.data;
                }
                console.log(error);
                return { success: false, message: error.message }
            }
        }


    };
    return (
        <Modal
            show={props.isShow}
            onHide={props.func}
            backdrop="static"
            keyboard={false}

        >
            <ModalHeader closeButton>
                <Modal.Title>Create your lesson</Modal.Title>
            </ModalHeader>
            <ModalBody>
                <div className='container d-flex flex-column'>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                        <AlertMessage info={alert} />

                        <Form.Group controlId='1'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                style={{ height: '200px' }}
                                required
                                as="textarea"
                                row={3}
                                onChange={onChangelessonForm}
                                name="name"
                                value={name}

                            />
                            <Form.Control.Feedback type="invalid">
                                Please input the title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Select aria-label="Default select example"
                                name="subjectId"

                                onChange={onChangelessonForm}
                                value={subjectId}>
                                {props.Subjects.map((subject, index) => {
                                    return (
                                        <option key={index} value={`${subject._id}`}>{`${subject.subjectName}`}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Subject
                            </Form.Control.Feedback>
                        </Form.Group>
                        <FormGroup>
                            <Form.Label>Class</Form.Label>
                            <Form.Select aria-label="Default select example"
                                name="classId"

                                onChange={onChangelessonForm}
                                value={classId}>
                                {props.Classes.map((_class, index) => {
                                    return (
                                        <option key={index} value={`${_class._id}`}>{`${_class.className}`}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Class
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Link Video Lesson:</Form.Label>
                            <Form.Control
                                required
                                type="url"
                                name="header"
                                onChange={onChangelessonForm}
                                value={header}
                           

                            />
                            <Form.Control.Feedback type="invalid">
                                Input the url of the video
                            </Form.Control.Feedback>
                        </FormGroup>
                        <div className='text-end mt-2'>
                            <button className='btn btn-primary px-4 me-0 ' type='submit' >Create</button>
                        </div>
                    </Form>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default CreateLesson