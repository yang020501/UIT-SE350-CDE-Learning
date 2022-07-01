import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../contexts/constants'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ViewExercises from '../exercise/ViewExercises'
import Table from 'react-bootstrap/Table'
import './listitem.css'

const ListExerciseItem = (props) => {
    const [Exercises, setExercise] = useState([]);
    const onUpdate = props.funcUpdate;
    const [Type, setType] = useState('')
    const [Id, setId] = useState('')
    const [Show, setShow] = useState(false);
    const [EModal, setModal] = useState(<></>)

    /*Load Lessons by teacher id or code and sutdent lessons*/
    useEffect( () => {

        const loadLessons = async () => {
            //load Teacher
            if (props.User.role === "TEACHER") {
                try {
                    if (props.Code !== undefined) {
                        const result = await axios.get(`${apiUrl}/lesson/fromTeacher/getAll?code=${props.Code}`)
                        return result.data;
                    }
                    else {
                        const result = await axios.get(`${apiUrl}/lesson/fromTeacher/${props.User._id}`)
                        return result.data
                    }
                }
                catch (error) {
                    return error;
                }
            }
            //Load Student
            else if (props.User.role === "STUDENT") {
                try {
                    const result = await axios.get(`${apiUrl}/lesson/save/${props.User._id}`)
                    return result.data
                }
                catch (error) {
                    return error;
                }
            }
        }

        // the result is up to the code previous
        loadLessons().then((response) => {
            let tmp = []
            if (props.User.role === "TEACHER") {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].type === "EXERCISE")
                        tmp.push(response[i])
                }
            }
            else if (props.User.role === "STUDENT") {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].lessonId.type === "EXERCISE")
                        tmp.push(response[i])
                }
            }
            setExercise(tmp)
        })
    }, [props.Change, props.User, EModal])
    /*deleteLesson*/
    const handleDelete = async () => {
        if (Type === "delete") {
            try {
                await axios.delete(`${apiUrl}/lesson/${Id}`);
                onUpdate(true, "delete");
                handleClose();
            }
            catch (error) {
                console.log(error)
            }
        }
        else if (Type === "delete2") {
            try {
                 await axios.delete(`${apiUrl}/lesson/save/${Id}`);
                onUpdate(true, "delete");
                handleClose();
            }
            catch (error) {
                console.log(error)
            }

        }
    }
    //for student
    const handleAdd = async () => {
        if (props.UserSave.role === "STUDENT") {
            let request = {
                lessonId: Id,
                userId: props.UserSave._id
            }
            try {
                let bool = true
                const result = await axios.post(`${apiUrl}/lesson/save`, request);
                if (result.data === "lesson da save trong user")
                    bool = false
                onUpdate(bool, "add");
                handleClose();
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    const handleView = (exercise, user, view) => {
        setModal(<ViewExercises props={{ isShow: true, func: handleClose2, exercise: exercise, User: user, view: view, Classes: props.Classes, Subjects: props.Subjects }} />)
    }
    const handleClose2 = () => {
        setModal(null)
    }
    //
    const handleClose = () => setShow(false)
    const handleShow = (id, type) => {
        setShow(true);
        setType(type);
        setId(id);
    }
    const ConfirmModal =
        (<div>
            <Modal
                show={Show}
                onHide={handleClose}
                keyboard={false}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <ModalHeader>
                    <Modal.Title>{`Confirm to ${Type.startsWith("delete") ? "delete":"add"}?`}</Modal.Title>
                </ModalHeader>
                <ModalBody>
                    Do you sure to do this ?
                </ModalBody>
                <ModalFooter>
                    {Type.startsWith("delete") ?

                        (<button className='btn btn-primary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={handleDelete}>Yes</button>)
                        : (<button className='btn btn-primary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={handleAdd}>Yes</button>
                        )}
                    <button className='btn btn-secondary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={handleClose}>
                        No
                    </button>
                </ModalFooter>

            </Modal>
        </div >)

    return (
        <>
            <div className="container flex-column list-box" >
                <div className='row'>
                    <div className="col-md-12">
                        <Table responsive id="example" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                            <thead>
                                {(props.User.role === "TEACHER") ?
                                    (
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Subject</th>
                                            <th>Class</th>
                                            <th></th>
                                        </tr>
                                    )
                                    :
                                    (
                                        <tr>
                                            <th>Id</th>
                                            <th>Title</th>
                                            <th>Subject</th>
                                            <th>Class</th>
                                            <th>Teacher</th>
                                            <th>Teacher Code</th>
                                            <th></th>
                                        </tr>
                                    )
                                }
                            </thead>
                            <tbody>
                                {(props.User.role === "TEACHER") ?
                                    (
                                        (Exercises.length === 0) ?
                                            (<tr><td colSpan={8}><div className='text-secondary fs-3 fw-3'>No Exercises Found</div></td></tr>) :
                                            (
                                                Exercises.map((exercise, index) =>
                                                (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{exercise.name}</td>
                                                        <td>{exercise.subjectId.subjectName}</td>
                                                        <td>{exercise.classId.className}</td>
                                                        <td>
                                                            {(props.Check) ?
                                                                <button type="button" className="btn btn-danger" onClick={() => handleShow(exercise._id, "delete")} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-trash"
                                                                        viewBox="0 0 16 16">
                                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                    </svg>
                                                                </button>
                                                                :
                                                                <button type="button" className="btn btn-success" onClick={() => handleShow(exercise._id, "add")} >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        fill="currentColor"
                                                                        className="bi bi-heart-fill"
                                                                        viewBox="0 0 16 16">
                                                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                                    </svg>

                                                                </button>
                                                            }
                                                            <button className="btn btn-info" onClick={() => { handleView(exercise, props.User, props.View) }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    width="16" height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-eye" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>)
                                                )

                                            )

                                    ) :
                                    (
                                        (Exercises.length === 0) ?
                                            (<tr><td colSpan={8}><div className='text-secondary fs-3 fw-3'>No Exercises Found</div></td></tr>) :
                                            (
                                                Exercises.map((exercise, index) =>
                                                (
                                                    (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{exercise.lessonId.name}</td>
                                                        <td>{exercise.lessonId.subjectId.subjectName}</td>
                                                        <td>{exercise.lessonId.classId.className}</td>
                                                        <td>{exercise.lessonId.userId.nameAccount}</td>
                                                        <td>{exercise.lessonId.userId.code}</td>
                                                        <td>

                                                            <button type="button" className="btn btn-danger" onClick={() => { handleShow(exercise._id, "delete2") }} >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-trash"
                                                                    viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                </svg>
                                                            </button>

                                                            <button className="btn btn-info" onClick={() => { handleView(exercise.lessonId, props.User) }} >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-eye"
                                                                    viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    )

                                                )
                                                )
                                            )
                                    )
                                }
                            </tbody>
                        </Table>
                        {EModal}
                        {ConfirmModal}
                    </div>

                </div>
            </div>
        </>
    )
}

export default ListExerciseItem