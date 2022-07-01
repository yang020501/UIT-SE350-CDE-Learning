import React, { useEffect, useState } from 'react'
import { book, exercise } from '../../assets/img'
import AlertMessage from '../layout/AlertMessage'
import NavbarItem from '../../components/navbar/NavbarItem'
import ListLessonItem from '../../components/table/ListLessonItem'
import ListExerciseItem from '../../components/table/ListExerciseItem'
import CreateLesson from '../../components/lesson/CreateLesson'
import axios from 'axios'
import { apiUrl } from '../../contexts/constants'
import CreateExercises from '../../components/exercise/CreateExercises'
import CreateExams from '../../components/exam/CreateExams'
import Footer from '../../components/footer/Footer'

import './teacher.css'
import ListExamItem from '../../components/table/ListExamItem'

const Teacher = ({ User }) => {

    const [State, setState] = useState(<ListLessonItem Title={"Lectures"} User={User} Check />)
    const [Modal, setModal] = useState(<></>)
    const [onUpdateList, setUpdateList] = useState("Lectures")
    const [Type, setType] = useState("Lectures")
    const [alert, setAlert] = useState(null)

    //getclass
    const [Classes, setClasses] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${apiUrl}/lesson/class`);
                setClasses(result.data);
                return result;
            } catch (error) {
                return error;
            }
        }
        fetchData()
    }, [])
    //getSubject
    const [Subjects, setSubjects] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${apiUrl}/lesson/subject`);
                setSubjects(result.data);
                return result;
            } catch (error) {
                return error;
            }
        }
        fetchData();
    }, [])
    //create button to open Modal
    const handleCreate = () => {
        if (Type === "Lectures") {
            setModal(<CreateLesson props={{ isShow: true, func: handleClose, Classes: Classes, Subjects: Subjects, UserId: User._id, funcUpdate: Update }}></CreateLesson>)

        }
        else if (Type === "Exercises") {
            setModal(<CreateExercises props={{ isShow: true, func: handleClose, Classes: Classes, Subjects: Subjects, UserId: User._id, funcUpdate: Update }} />)
        }
        else if (Type === "Exams") {
            setModal(<CreateExams props={{ isShow: true, func: handleClose, Classes: Classes, Subjects: Subjects, UserId: User._id, funcUpdate: Update }} />)
        }
    }
    const handleClose = () => {
        setModal(null)
    }
    //Update for create lesson and delete lesson
    const Update = (bool, type) => {
        if (type === "delete") {
            setAlert({ type: 'success', message: `Delete ${Type} successfully!` })
        }
        setUpdateList(null)
    }
    //Nav click
    const handleExams = () => {
        setState(<ListExamItem Title={"Exams"} User={User} Check Change={onUpdateList} funcUpdate={Update} Classes={Classes} Subjects={Subjects} />)
        setType("Exams")
        setUpdateList("Exams")
    }
    const handleExercises = () => {
        setState(<ListExerciseItem Title={"Exercises"} User={User} Check Change={onUpdateList} funcUpdate={Update} Classes={Classes} Subjects={Subjects} />)
        setType("Exercises")
        setUpdateList("Exercises")
    }
    const handleLectures = () => {
        setState(<ListLessonItem Title={"Lectures"} User={User} Check Change={onUpdateList} funcUpdate={Update} />)
        setType("Lectures")
        setUpdateList("Lectures")
    }

    useEffect(() => {
        if (Type === "Lectures")
            handleLectures();
        if (Type === "Exercises")
            handleExercises();
        if (Type === "Exams")
            handleExams();
    }, [onUpdateList, Type])
    useEffect(() => {
        setTimeout(() => {
            setAlert(null)
        }, 5000)
    }, [alert])
    //
    const navItem = [{ name: 'Lectures', func: handleLectures, src: book },
    { name: 'Exercises', func: handleExercises, src: exercise },
    { name: 'Exams', func: handleExams, src: exercise }]
    return (
        <React.Fragment>
            <div className='container-fluid page flex-column text-center d-flex pb-5 '>

                <div className='row justify-content-center' >
                    {navItem.map((Item, index) => {
                        return (<NavbarItem key={index} item={Item} type={Type}></NavbarItem>)
                    }
                    )}
                </div>
                <div className='container btn-box'>
                    <button className='btn btn-primary create-btn'
                        onClick={handleCreate}
                    >Create
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="18" height="18"
                            fill="currentColor"
                            className='bi bi-plus-circle create-btn-svg'
                            viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </button>
                    <div className='col-lg-2 aligns-item-center d-flex flex-row'>
                        <div className='flex-grow-1 m-auto'>
                            Code:
                        </div>
                        <div className='flex-row-1 m-auto fs-3 fw-3'>
                            {User.code}
                        </div>
                    </div>
                </div>

                <div className=' container mt-3 d-flex mb-0'>
                    <AlertMessage info={alert} />
                </div>
                <div className='spacing'>
                    {State}
                </div>
            </div>
            {Modal}

        </React.Fragment >
    )
}

export default Teacher