import React, { useContext, useState } from 'react'
import { logo } from '../../assets/img'
import './login-form.css'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import AlertMessage from '../../pages/layout/AlertMessage'
import { Loading } from '../loading/Loading'


const LoginForm = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    // Data trong form
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    // cập nhật dữ liệu khi mà nhập trong input
    const onChangeLoginForm = e => setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value
    }, setAlert(null))


    // Xử lý đoạn submit form
    const { loginUser } = useContext(AuthContext)
    const [alert, setAlert] = useState(null)


    // khi ấn submit form   
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await loginUser(loginForm)
            if (result === undefined) {
                setLoading(true)

            }
            if (result.success) {
                setAlert(null)
                setLoading(false)
                navigate('/main')
            } else {

                setAlert({ type: 'danger', message: result.message })
                setLoading(false)

                //setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }


    }


    return (
        <>
            <section className={`login-clean ${loading ? "opacity" : ""}`}>
                <div className="container flex-column">
                    <div className="row align-items-center padding-mobile">
                        <div className="col-md-6 col-align-left"><img id="logo" src={logo} alt='logo' /></div>
                        <div className="col-md-6 col-align-right padding-top-18" style={{ marginTop: '50px' }}>
                            <form onSubmit={handleLogin}>

                                <AlertMessage info={alert} />
                                <h2 className="visually-hidden">Login Form</h2>
                                <div className="illustration">
                                    <i className="icon ion-ios-navigate" style={{ color: '#5595f0' }}></i>
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" value={loginForm.username} onChange={onChangeLoginForm} type="email" name="username" placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" value={loginForm.password} onChange={onChangeLoginForm} type="password" name="password" placeholder="Password" />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary d-block w-100" type="submit" style={{ opacity: 0.92, background: '#468bef' }}>
                                        Log In
                                    </button>
                                </div><Link to='/signup' className='link'>Sign-up</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {loading && <Loading />}


        </>
    )
}

export default LoginForm