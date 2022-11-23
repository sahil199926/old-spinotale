import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { user } = action.payload
            // isAuthenticated
            return {
                ...state,
                isAuthenticated: true,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => {
        Promise.resolve()
    },
    logout: () => {},
    register: () => {
        Promise.resolve()
    },
})

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_API}/gettoken`, {
                username:email,
                password,
            })
            setSession(response.data.access)
            let data = {
                _id: '62a71dc6cd6a62d86ca4449e',
                name: 'Apex',
                email: 'admin0130@weaddo.com',
                role: 'admin',
                status: 'active',
            }
            message.success('logged in successfully.');
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: data,
                },
            })
        } catch (error) {
            message.error(error.error)
        }
    }

    const register = async (data) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API}/auth/register`,
                { ...data }
            )
            message.success(response.data.message)
            setSession(response.data.token)
            dispatch({
                type: 'REGISTER',
                payload: {
                    user: response.data.data,
                },
            })
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (error) {
            message.error(error.error)
        }
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                if (accessToken) {
                    setSession(accessToken)
                    let response = {
                        success: true,
                        message: 'Found my details.',
                        data: {
                            _id: '62a71dc6cd6a62d86ca4449e',
                            company: 'aasdf',
                            industry: 'Automotive',
                            country: { name: 'Anguilla', code: 'AI' },
                            role: 'admin',
                            name: 'asdfasdf',
                            email: 'admin0130@weaddo.com',
                            createdAt: '2022-06-13T11:21:42.082Z',
                            updatedAt: '2022-06-13T11:21:42.082Z',
                        },
                    }
                    // const header = {headers: {"Authorization" : `Bearer ${accessToken}`} }
                    // const response = await axios.get(`${process.env.REACT_APP_BASE_API}/auth/me`, header)
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: response.data,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
