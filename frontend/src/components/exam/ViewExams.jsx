import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import Accordion from '../accordion/Accordion'
import axios from 'axios'
import { apiUrl } from '../../contexts/constants'
import Quiz from '../quiz/Quiz'
import Title from '../quiz/title/Title'
import Question from '../quiz/question/Question'
import Answer from '../quiz/answer/Answer'
import ListStudentScore from '../table/ListStudentScore'
const ViewExams = ({ props }) => {

    const [list, setList] = useState(props.exam.exam)
    const [studentList, setStudentList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get(`${apiUrl}/score/allStudentInExam/${props.exam._id}`)
                setStudentList(rs.data)

            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    return (
        <React.Fragment>
            <Modal
                show={props.isShow}
                onHide={() => { props.func() }}
                backdrop="static"
                keyboard={false}
                size="lg"
                scrollable={true}
                dialogClassName="modal-100w"
                id="exam"
            >
                <ModalHeader closeButton>
                    <Modal.Title>Do the Exam</Modal.Title>
                </ModalHeader>
                <ModalBody id="exam-body">
                    {
                        props.User.role === "TEACHER" ?
                            <React.Fragment>
                                <div className=' row  '>
                                    <div className='col-lg-5 position-relative'>
                                        <div className=' left-content overflow-hidden '>
                                            <div className="container px-0 d-flex flex-column">
                                                <Form>
                                                    <fieldset className='border p-3' disabled >
                                                        <legend className='float-none w-auto p-1'>Exam</legend>
                                                        <Form.Group controlId='1'>
                                                            <Form.Label>Title</Form.Label>
                                                            <Form.Control
                                                                style={{ height: '100px' }}
                                                                required
                                                                as="textarea"
                                                                row={3}
                                                                name="name"
                                                                defaultValue={props.exam.name}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Please input the title.
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group>
                                                            <Form.Label>Subject</Form.Label>

                                                            <Form.Control
                                                                name="subjectId"
                                                                defaultValue={props.exam.subjectId.subjectName}
                                                            >
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please choose a Subject
                                                            </Form.Control.Feedback>

                                                        </Form.Group>
                                                        <FormGroup>
                                                            <Form.Label>Class</Form.Label>
                                                            <Form.Control
                                                                name="classId"
                                                                defaultValue={props.exam.classId.className}
                                                            >
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                Please choose a Class
                                                            </Form.Control.Feedback>
                                                        </FormGroup>
                                                    </fieldset>
                                                    <fieldset className='border p-3 ' disabled >
                                                        <legend className='float-none w-auto p-1 '>Students List</legend>
                                                        <ListStudentScore students={studentList} length={Object.keys(list.questions).length} />
                                                    </fieldset>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 right-content">
                                        <div className='container px-0 flex-column  '>
                                            {
                                                Object.keys(list.questions).map((item, index) => {

                                                    return (
                                                        <div key={index}>
                                                            <Accordion Title={`Question ${index + 1}`}
                                                                State={
                                                                    <React.Fragment>
                                                                        <div className='Content'>
                                                                            <Question question={list.questions[index + 1]} />
                                                                        </div>
                                                                        <Answer
                                                                            answer={list.answers[index + 1]}
                                                                            step={index + 1}
                                                                            checkAnswer={() => { return }}
                                                                            correctAnswer={list.correctAnswers[index + 1]}
                                                                            clickedAnswer={list.correctAnswers[index + 1]}
                                                                            check
                                                                        />
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Title exam={props.exam} user={props.User} />
                                <Quiz exam={props.exam} User={props.User} />
                            </React.Fragment>

                    }
                </ModalBody>
            </Modal>
        </React.Fragment >
    )
}

export default ViewExams