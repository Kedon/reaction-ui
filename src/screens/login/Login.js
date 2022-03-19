import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import Modal from '../../components/modal/Modal';
import Input from '../../components/forms/input/Input';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import "./login.scss";


const Login = () => {
    const [username, setUsername] = useState('valdenir')
    const [password, setPassword] = useState('123456')
    const [user, setUser] = useState(null)
    const [modal, setModal] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [requesting, setRequesting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('userInfo')
        setUser(user)

    }, [localStorage.getItem('userInfo')])

    function toggleModal(status) {
        setModal(!modal)
    }

    function toggleModalCreate(status) {
        setModalCreate(!modalCreate)
    }

    function doLogin() {
        const params = {
            "identificador": username,
            "senha": password
        }
        if (username.trim().length === 0 || password.trim().length === 0) {
            alert('Usuário ou senha inválidos')
            return
        }
        localStorage.setItem('userInfo', JSON.stringify(params))
    }

    function handleSubmit(){
        localStorage.setItem('user', JSON.stringify({user: user, password: password}))
        navigate('/home')
    }

    if (!user) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center align-self-center p-lg-5 p-3 h-100 w-100">
                <div className="d-flex align-items-center mb-2 login-logo">
                    <Logo width={150} />
                </div>
                <Card
                    title="Fazer login"
                    //message={message}
                    //onPressEnter={handleSubmit}
                    footer={
                        <div className="d-flex justify-content-between">
                            <Button.Default onClick={toggleModalCreate}>
                                Não sou registrado
                            </Button.Default>
                            <Button.Primary dark onClick={handleSubmit} loading={requesting}>
                                Entrar
                            </Button.Primary>
                        </div>
                    }
                >
                    <Input
                        id="login"
                        className="mb-3"
                        autoComplete="off"
                        name="login"
                        placeholder="E-mail"
                        value={username}
                        //errorMessage={username.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'login').message : null}
                        maxLength={10}
                        fieldDescription={'Informe o seu email'}
                        onChange={e => setUsername(e.target.value)} />

                    <Input
                        type="password"
                        //className={`${password.trim().length === 0 && errors.find(f => f.field === 'password') ? 'is-invalid' : ''}`}
                        id="password"
                        autoComplete="off"
                        placeholder="Senha"
                        name="login"
                        onChange={e => setPassword(e.target.value)}
                        //errorMessage={password.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'password').message : null}
                        fieldDescription={null}
                        value={password} />
                    <a href="#" className="" onClick={e => { e.preventDefault(); toggleModal() }}><small>Esqueci minha senha</small></a>
                </Card>
                <Modal
                    show={modal}
                    title="Recuperação de conta"
                    position="center"
                    toggle={toggleModal}
                    size="sm"
                    footer={<div className="d-flex justify-content-between">
                        <Button.Cancel onClick={toggleModal} />
                        <Button.Primary dark /*onClick={handleSubmit} loading={requesting}*/>
                            Recuperar conta
                        </Button.Primary>
                    </div>
                    }>
                    <p>Informe o e-mail cadastrado. O mesmo que usa para acesso ao sistema.</p>
                    <Input
                        id="login"
                        //className={`mb-1 ${username.trim().length === 0 && errors.find(f => f.field === 'login') ? 'is-invalid' : ''}`}
                        autoComplete="off"
                        name="E-mail"
                        placeholder="E-mail"
                        value={''}
                        //errorMessage={username.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'login').message : null}
                        fieldDescription={null}
                        onChange={e => setUsername(e.target.value)} />
                </Modal>
                <Modal
                    show={modalCreate}
                    title="Recuperação de conta"
                    position="center"
                    toggle={toggleModalCreate}
                    footer={<div className="d-flex justify-content-between">
                        <Button.Cancel onClick={toggleModalCreate} />
                        <Button.Primary dark /*onClick={handleSubmit} loading={requesting}*/>
                            Criar conta
                        </Button.Primary>
                    </div>
                    }>
                    <p>Insira os dados abaixo para criar sua conta:</p>
                    <Input
                        id="name"
                        //className={`mb-1 ${username.trim().length === 0 && errors.find(f => f.field === 'login') ? 'is-invalid' : ''}`}
                        autoComplete="off"
                        name="name"
                        placeholder="Nome completo"
                        value={''}
                        //errorMessage={username.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'login').message : null}
                        fieldDescription={null}
                        onChange={e => setUsername(e.target.value)} />
                    <Input
                        id="email"
                        //className={`mb-1 ${username.trim().length === 0 && errors.find(f => f.field === 'login') ? 'is-invalid' : ''}`}
                        autoComplete="off"
                        name="E-mail"
                        placeholder="E-mail"
                        value={''}
                        //errorMessage={username.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'login').message : null}
                        fieldDescription={null}
                        onChange={e => setUsername(e.target.value)} />
                    <div className="d-flex">
                        <Input
                            type="password"
                            className="flex-grow-1 ml-1"
                            id="password"
                            autoComplete="off"
                            placeholder="Senha"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            //errorMessage={password.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'password').message : null}
                            fieldDescription={null}
                            value={password} />
                        <Input
                            type="password"
                            className="flex-grow-1"
                            id="password_confirmation"
                            autoComplete="off"
                            placeholder="Confirmação da senha"
                            name="login"
                            onChange={e => setPassword(e.target.value)}
                            //errorMessage={password.trim().length === 0 && errors.find(f => f.field === 'login') ? errors.find(f => f.field === 'password').message : null}
                            fieldDescription={null}
                            value={password} />
                    </div>
                </Modal>
            </div>

        )
    }
}

export default Login