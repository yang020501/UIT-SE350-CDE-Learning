import React from 'react'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import './Title.css'
const Title = (props) => {

    return (
        <div>
            <fieldset className='border p-2' disabled >
                <legend className='float-none w-auto p-1'>Detail</legend>
                <div className='row '>
                    <div className='col-lg-7 left-title'>
                        <div className='d-flex my-1  justify-content-start align-items-center'>
                            <Form.Label className='me-3 my-0 py-2'>Title</Form.Label>
                            <Form.Control
                                className='w-25'
                                defaultValue={props.exam.name}
                            />
                            <Form.Label className='mx-3 my-0 py-2'>Subject</Form.Label>
                            <Form.Control
                                className='w-25'
                                defaultValue={props.exam.subjectId.subjectName}
                            />
                            <Form.Label className='mx-3 my-0 py-2'>Class</Form.Label>
                            <Form.Control
                                className='w-25'
                                defaultValue={props.exam.classId.className}
                            />
                        </div>
                        <div className='d-flex my-1 justify-content-start align-items-center'>
                            <Form.Label className='me-3 my-0 py-2'>Time</Form.Label>
                            <Form.Control
                                className='w-25'
                                defaultValue={props.exam.time}
                            />
                            <Form.Label className='mx-3 my-0 py-2'>Create on</Form.Label>
                            <Form.Control
                                className='w-50'
                                defaultValue={props.exam.createAt}
                            />
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className='d-flex my-1 justify-content-start align-items-center'>
                            <Form.Label className='me-2 my-0 py-2'>Student name</Form.Label>
                            <Form.Control
                                className='w-75'
                                defaultValue={props.user.nameAccount}
                            />
                        </div>
                        <div className='d-flex my-1 justify-content-start align-items-center'>
                            <Form.Label className='me-2 my-0 py-2'>Teacher name</Form.Label>
                            <Form.Control
                                className='w-75'
                                defaultValue={props.exam.userId.nameAccount}
                            />
                        </div>
                        <div className='d-flex my-1 justify-content-start align-items-center'>
                            <Form.Label className=' my-0 py-2' style={{marginRight:'13px'}}>Teacher code     </Form.Label>
                            <Form.Control
                                className='w-25'
                                defaultValue={props.exam.userId.code}
                            />

                        </div>

                    </div>
                </div>

            </fieldset>
        </div>
    )
}

export default Title