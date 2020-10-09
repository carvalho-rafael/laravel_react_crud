import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api'
import Form from './form';
import Alert from '../../utils/alert';

function Create(props) {
    const isMounted = useRef(true)
    const [reset, setReset] = useState(false)

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("success")
    const [alertContent, setAlertContent] = useState("Registro cadastrado com sucesso!!")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const createProduct = (data) => {
        api.post('products', data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        }).then(response => {
            if (isMounted.current) {
                setIsLoading(false)
                setIsLoading(true)
                if (response.data.message !== "ok") {
                    setAlertContent("Erro ao Cadastrar Produto :( Tente novamente!")
                    setAlertType("danger")
                } else {
                    setAlertContent("Registro cadastrado com sucesso!!")
                    setAlertType("success")
                    setReset(true)
                    setReset(false)
                }
                setAlert(true)
                setTimeout(() => {
                    if (isMounted.current)
                        setAlert(false)
                }, 2000
                )
            }

        })
    }

    return (
        <>
            <header>
                <Alert content={alertContent} alert={alert} alertType={alertType}></Alert>
            </header>
            <Form buttonLabel={"create"} action={createProduct} reset={reset} isLoading={isLoading} />
        </>
    )
}

export default Create;