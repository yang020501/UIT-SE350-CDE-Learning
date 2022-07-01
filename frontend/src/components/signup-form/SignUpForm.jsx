import React from 'react'
import './signup-form.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useState } from 'react'
import AlertMessage from '../../pages/layout/AlertMessage'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../contexts/constants'
import { Loading } from '../loading/Loading'
export const SignUpForm = () => {

    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    // Data trong form
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        nameAccount: ''

    })

    const [radio, setRadio] = useState("Student");


    const { username, password, confirmPassword, nameAccount } = registerForm

    // cập nhật dữ liệu khi mà nhập trong input
    const onChangeRegisterForm = e => setRegisterForm({
        ...registerForm,
        [e.target.name]: e.target.value,

    }, setAlert(null))


    // Xử lý đoạn submit form
    const { registerUser } = useContext(AuthContext)
    const [alert, setAlert] = useState(null)


    // khi ấn submit form   

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Incorrect repeat password!' })
            setLoading(false)
            //setTimeout(() => setAlert(null), 5000)
            return
        }
        if (nameAccount === "") {
            setAlert({ type: 'danger', message: 'Missing Name!' })
            setLoading(false)
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                //setTimeout(() => setAlert(null), 5000)            
                setLoading(false)

            }
            else {
                // xử lý thay đổi role trong khi signup thành công
                const get = await axios.get(`${apiUrl}/user/verify`, { headers: { "Authorization": `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)}` } });
                let data = get.data.user
                if (radio === "Teacher") {
                     await axios.patch(`${apiUrl}/user/teacher/${data._id}`)
                }
                setLoading(false)
                setAlert({ type: 'success', message: registerData.message + "\nWait 2s to transfer to login page" })
                setTimeout(
                    () => { Navigate('/login') }
                    , 2000);
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    


    }

    return (
        <>
            <section className={`register-photo ${loading ? "opacity" : ""}`} style={{ padding: '80px 0' }}>
                <div className="form-container">
                    <div className="image-holder"></div>
                    <form onSubmit={handleRegister}>
                        <AlertMessage info={alert} />
                        <h2 className="text-center"><strong>Create</strong> an account.</h2>
                        <div className="mb-3"><input className="form-control" value={nameAccount} onChange={onChangeRegisterForm} type="text" name="nameAccount" placeholder="Your Name" /></div>
                        <div className="mb-3"><input className="form-control" value={username} onChange={onChangeRegisterForm} type="email" name="username" placeholder="Email" /></div>
                        <div className="mb-3"><input className="form-control" value={password} onChange={onChangeRegisterForm} type="password" name="password" placeholder="Password" /></div>
                        <div className="mb-3"><input className="form-control" valie={confirmPassword} onChange={onChangeRegisterForm} type="password" name="confirmPassword" placeholder="Password (repeat)" /></div>
                        <div className="mb-3">
                            <p>Choose your role for your account:</p>
                            <div className="form-check"><label className="form-check-label me-2"><input onChange={(e) => setRadio(e.target.value)} name="check" type="radio" value="Student" checked={radio === "Student"} />Student</label></div>
                            <div className="form-check"><label className="form-check-label me-2"><input onChange={(e) => setRadio(e.target.value)} name="check" type="radio" value="Teacher" checked={radio === "Teacher"} />Teacher</label></div>
                        </div>
                        <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Sign Up</button></div>
                        <Link className="already" to='/login' >You already have an account?  <em style={{ color: 'blue' }}>Login here</em> </Link>
                    </form>
                </div>
            </section>
            {loading && <Loading />}
        </>
    )
}
