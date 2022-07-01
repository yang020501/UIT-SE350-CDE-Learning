import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '../../contexts/constants'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ViewExams from '../exam/ViewExams'
import Table from 'react-bootstrap/Table'
import './listitem.css'

const ListExamItem = (props) => {
    console.log(props);
    const [Exams, setExams] = useState([]);
    const onUpdate = props.funcUpdate;
    const [Type, setType] = useState('')
    const [Id, setId] = useState('')
    const [Show, setShow] = useState(false);
    const [EModal, setModal] = useState(<></>)
    const [tmp, setTmp] = useState({})


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
    const handleView = (exam, user, view) => {
        setModal(<ViewExams props={{ isShow: true, func: handleClose2, exam: exam, User: user, view: view, Classes: props.Classes, Subjects: props.Subjects }} />)
        setShow(false)
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
    const handleShow2 = (exam, user) => {
        setShow(true)
        setType("Do")
        setTmp({
            exam: exam,
            user: user
        })

    }
    const ConfirmModal =
        (<div>
            <Modal
                show={Show}
                onHide={handleClose}
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <ModalHeader>
                    <Modal.Title>{Type.startsWith("Do") ? "Confirm to do the exam?" : `Confirm to ${Type.startsWith("delete") ? "delete" : "add"}`}</Modal.Title>
                </ModalHeader>
                <ModalBody>
                    {Type.startsWith("Do") ?
                        <span>
                            If you confirm to do, you will finish the exam on time<br />
                            Any action(done,close) will complete the Exams and can't be re-do !
                        </span> : "Do you sure to do this ?"}
                </ModalBody>
                <ModalFooter>
                    {
                        Type.startsWith("Do") ?
                            (<button className='btn btn-primary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={() => { handleView(tmp.exam, tmp.user) }}>Yes</button>)
                            : Type.startsWith("delete") ?
                                (<button className='btn btn-primary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={handleDelete}>Yes</button>)
                                : (<button className='btn btn-primary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={handleAdd}>Yes</button>
                                )
                    }
                    <button className='btn btn-secondary ' style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px' }} onClick={handleClose}>
                        No
                    </button>
                </ModalFooter>

            </Modal>
        </div >)


    useEffect(() => {
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
                    if (response[i].type === "EXAM")
                        tmp.push(response[i])
                }
            }
            else if (props.User.role === "STUDENT") {
                for (let i = 0; i < response.length; i++) {
                    if (response[i].lessonId.type === "EXAM")
                        tmp.push(response[i])
                }
            }
            setExams(tmp)
        })

    }, [props.Change, props.User, EModal])
    // check DOne or not
    const Check = (exam, index) => {
        let f = {
            lessonId: exam.lessonId._id,
            userId: exam.userId._id
        }
        const fecthData = async () => {
            const rs = await axios.get(`${apiUrl}/score/exam/${exam.lessonId._id}`, { params: f })
            return rs.data
        }
        fecthData().then(res => {
            let tmp = document.getElementsByName("span-status")
            let tmpbtn = document.getElementsByName("btn-view-done")
            console.log(tmpbtn);
            if (res) {
                tmp[index].innerText = "Done"
                tmpbtn[index].onclick = function () {
                    handleView(exam.lessonId, exam.userId)
                }
            }
            else {
                tmp[index].innerText = "Not Done"
                tmpbtn[index].onclick = function () {
                    handleShow2(exam.lessonId, exam.userId)
                }
            }

        })

    }

    return (
        <React.Fragment>
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
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    )
                                }
                            </thead>
                            <tbody>
                                {(props.User.role === "TEACHER") ?
                                    (
                                        (Exams.length === 0) ?
                                            (<tr><td colSpan={8}><div className='text-secondary fs-3 fw-3'>No Exams Found</div></td></tr>) :
                                            (
                                                Exams.map((exam, index) =>
                                                (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{exam.name}</td>
                                                        <td>{exam.subjectId.subjectName}</td>
                                                        <td>{exam.classId.className}</td>
                                                        <td>
                                                            {(props.Check) ?
                                                                <React.Fragment>
                                                                    <button type="button" className="btn btn-danger" onClick={() => handleShow(exam._id, "delete")} >
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
                                                                    <button className="btn btn-info" onClick={() => { handleView(exam, props.User, props.View) }} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                            width="16" height="16"
                                                                            fill="currentColor"
                                                                            className="bi bi-eye" viewBox="0 0 16 16">
                                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                                        </svg>
                                                                    </button>
                                                                </React.Fragment>
                                                                :
                                                                <button type="button" className="btn btn-success" onClick={() => handleShow(exam._id, "add")}  >
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
                                                        </td>
                                                    </tr>)
                                                )

                                            )

                                    ) :
                                    (
                                        (Exams.length === 0) ?
                                            (<tr><td colSpan={8}><div className='text-secondary fs-3 fw-3'>No Exams Found</div></td></tr>) :
                                            (

                                                Exams.map((exam, index) => {
                                                    Check(exam, index)
                                                    return (
                                                        (<tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{exam.lessonId.name}</td>
                                                            <td>{exam.lessonId.subjectId.subjectName}</td>
                                                            <td>{exam.lessonId.classId.className}</td>
                                                            <td>{exam.lessonId.userId.nameAccount}</td>
                                                            <td>{exam.lessonId.userId.code}</td>
                                                            <td>{
                                                                <span name={'span-status'}></span>
                                                            }
                                                            </td>
                                                            <td>

                                                                <button type="button" className="btn btn-danger" onClick={() => { handleShow(exam._id, "delete2") }}  >
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
                                                                <button className="btn btn-info" name='btn-view-done' >
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
                                                }

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
        </React.Fragment>
    )
}

export default ListExamItem