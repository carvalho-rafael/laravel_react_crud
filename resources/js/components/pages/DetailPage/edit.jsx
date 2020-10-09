import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import Form from './form';
import Alert from '../../utils/alert';

function Edit(props) {

    const [product, setProduct] = useState([])
    const id = props.location.state.id;
    const [sent, setSent] = useState(false)

    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("success")
    const [alertContent, setAlertContent] = useState("Registro cadastrado com sucesso!!")
    const [isLoading, setIsLoading] = useState(false)

    const updateProduct = (data) => {
        data.append("_method", 'PUT');

        api.post('products/' + id, data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        }).then(response => {
            setIsLoading(false)
            setIsLoading(true)
            if (response.data.message !== "ok") {
                setAlertContent("Erro ao Cadastrar Produto :( Tente novamente!")
                setAlertType("danger")
            } else {
                setAlertContent("Registro cadastrado com sucesso!!")
                setAlertType("success")
                setSent(true)
                setSent(false)
                getProduct()
            }
            setAlert(true)
            setTimeout(() =>
                setAlert(false), 2000
            )
        })
    }
    const getProduct = () => {
        api.get('products/' + id).then(response => {
            setProduct(response.data);
        });
    }
    useEffect(() => {
        getProduct()
    }, []);

    return (
        <>
            <header>
                <Alert content={alertContent} alert={alert} alertType={alertType}></Alert>
            </header>
            <Form product={product} buttonLabel={"update"} action={updateProduct} sent={sent} isLoading={isLoading}/>
        </>
    )
}

export default Edit;