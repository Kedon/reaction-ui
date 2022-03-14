import React, { useState, useEffect } from 'react'
import Table from '../../components/table/Table'
import EmptyState from '../../components/emptyState/EmptyState';
import { moneyMask } from '../../utils/money-mask';
import SearchBar from '../../components/searchbar/Searchbar';
import Button from '../../components/button/Button';
import Input from '../../components/forms/input/Input';
import Select from '../../components/forms/select/Select';
import Modal from '../../components/modal/Modal';
import { errorHandle, errorConciliation } from '../../utils/error-handle';
import { useToast } from '../../components/toast';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../global/redux/actions/product';


const usuario = null
const fakeOptions = [
    { value: 'on_hold', label: 'on hold', option: 'on_hold'},
    { value: 'delivered', label: 'devlivered', option: 'delivered'},
    { value: 'canceled', label: 'canceled', option: 'canceled'},
    { value: 'pending', label: 'pending', option: 'pending'}
]


const Home = () => {

    const product = useSelector(state => state)

    const toast = useToast()
    const [data, setData] = useState({
        columns: [
            { name: "rowId", label: null, ordering: null, hidden: true },
            { name: "id", label: "id", ordering: 'id', hidden: false, textAlign: 'center' },
            { name: "img", label: "Imagem", ordering: null, hidden: true },
            { name: "order_status", label: "Status", ordering: 'order_status', hidden: false, textAlign: 'center' },
            { name: "name", label: "Produto", ordering: 'name' },
            { name: "price", label: "Preço", ordering: 'Price', textAlign: 'center' },
            { name: "popularityLabel", label: "Popularidade", ordering: "popularityLabel", textAlign: 'center' },
        ],
        ordering: {
            column: 'Nome',
            order: 0 /*ASC*/
        },
        rows: [],
        loading: false,
        totalRows: 0,
        page_size: 15,
        page: 1,
    });
    const [filtered, setFiltered] = useState(null)
    const [fields, setFields] = useState({
        id: null,
        order_status: null,
        name: '',
        price: '0',
        popularity: ''
    })
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [errors, setErrors] = useState([])
    const [ errorFields, setErrorFields ] = useState( null )
    const [ loading, setLoading ] = useState([])
    useEffect(() => {
        fetchProducts()
    })
    useEffect(() => {
        console.log(product)
    }, [product])
    useEffect(() => {
        /*const products = productsJson
        setData({
            ...data,
            rows: products.map(m => {
                let product = m
                const image = <img style={{ width: 72 }} className="p-1" src={require("../../assets/images/elements/" + 'apple-watch.png')} />
                product.rowId = product.id
                product.popularityLabel = <div className={product.popularity.color}>{product.popularity.popValue}</div>
                product.price = moneyMask(product.price)
                product.img = image
                return product
            }),
            totalRows: products.length
        })*/
    }, [])

    useEffect(() => {
        if(!modal){
            setErrors([])
            setFields({
                id: null,
                order_status: null,
                name: '',
                price: '0',
                popularity: ''
            })
        }
    }, [modal])

    function toggleModal(status) {
        setModal(!modal)
    }

    function changeColumnOrdering(params) {
        setData({ ...data, ordering: params })
    }

    function toggleDeleteModal(item) {
        setDeleteModal(!deleteModal)
        setSelectedItem(!deleteModal ? item : null)
    }

    function handleRowAction(action, item) {
        console.log(item)
        if (action === 'edit') {
            setFields({
                rowId: item.id,
                name: item.name,
                price: item.price,
                popularity: item.popularity.popValue,
                order_status: fakeOptions.find( f => f.label === item.order_status)
                //region: { value: item.codigoRegiao, label: item.descricaoRegiao + ` [${item.identificadorRegiao}]`, option: item.identificadorRegiao },
            }, setModal(true))
        } else if (action === 'delete') {
            toggleDeleteModal(item)
        }
    }

    function handleFilterUsers(e) {
        console.log(e)
        setSearchTerm(e)
    }

    function handleAddRow() {
        setErrors([])
        setFields({
            id: null,
            order_status: null,
            name: '',
            price: '',
            popularity: ''
        }, toggleModal())
    }

    function hanleAddItem(){
        const id = Number(data.rows.map( m => m.codigo ).sort((a,b) => a - b ).pop()) + 1
        const newItem = {
            codigo: id,
            codigoEmpresa: 1,
            Identificador: fields.identificator,
            codigoTipoUsuario: 1,
            IdentificadorTipoUsuario: fields.type && fields.type.value,
            DescricaoTipoUsuario: fields.type && fields.type.label,
            identificador: fields.identificator,
            nome: fields.name,
            nomeEmpresa: null,
            token: null,
            trocarSenha: false,
            status: "Ativo",
            acoesSistema: [],
            filiais: [1],
            senha: fields.password
        }


        console.log(newItem)
        const errors  = validate()
        console.log(errors)
        if( errors ){
            setErrors(errors)
        } else {

            setLoading(true)
            usuario.cadastrar({
                codigoTipoUsuario: newItem.codigoTipoUsuario,
                identificador:  newItem.identificador,
                nome: newItem.nome,
                senha:newItem.senha,
                codigoFiliais: newItem.filiais
            }).then( res => {
                setLoading(false)

                const rows = [res.data, ...data.rows]
                setData({...data, rows: rows })
                setErrors([])
                setFields({
                    codigo: null,
                    identificator: '',
                    name: '',
                    type: null,
                    password:''
                })
                setModal(false)
                setErrorFields(null)

            }).catch( err => {
                setLoading(false)
                const error = errorHandle(err)
                const fields = {
                    Identificador: 'identificator',
                    Nome: 'name',
                }
                const errorFlds = errorConciliation(fields, err)
                setErrorFields( errorFlds )
                
                toast.add({ message: error, color: 'warning', autoClose: 7000 })
            })
    
            
        }

    }

    function hanleSaveItem(){
        const errors  = validate()
        if( errors ){
            setErrors(errors)
        } else {
            const { codigo, identificator, name, type, password } = fields
            setLoading(true)
            usuario.alterar({
                codigo: codigo,
                codigoTipoUsuario: type && type.value,
                identificador:  identificator,
                nome: name,
                senha: password && password.trim().length > 0  ? password : null,
                codigoFiliais: [1]
            }).then(res => {
                setLoading(false)
                setData({...data, rows: data.rows.map( m => {
                    let item = m
                    if(item.codigo === codigo){
                        item = res.data
                    }
                    return item
                })}, setModal(false))
                setErrorFields(null)

            }).catch( err => {
                setLoading(false)
                const error = errorHandle(err)
                const fields = {
                    Identificador: 'identificator',
                    Nome: 'name',
                }
                const errorFlds = errorConciliation(fields, err)
                setErrorFields( errorFlds )
                toast.add({ message: error, color: 'warning', autoClose: 7000 })
            })
            
        }
    }

    function hanleDeleteItem(){
        console.log(selectedItem)
        const { codigo, identificator, name, type, password } = fields
            setLoading(true)
            usuario.delete(selectedItem.codigo).then(res => {
                setLoading(false)
                setData({...data, rows: data.rows.filter( f => f.codigo !== selectedItem.codigo )}, setModal(false))
                toggleDeleteModal(null)
            }).catch( err => {
                setLoading(false)
                console.log(err)
            })
    }

    function validate(){
        let err = []
        const { codigo, identificator, name, type, password } = fields
        console.log({ codigo, identificator, name, type, password })
        if(!identificator || identificator.trim().length === 0){
            err = [...err, {
                field: 'identificator',
                message: 'Informe o identificador'
            }]
        }

        if(!name || name.trim().length < 3){
            err = [...err, {
                field: 'name',
                message: 'Informe o nome com pelo menos 3 caractéres'
            }]
        }

        if(!type || !type.option){
            err = [...err, {
                field: 'type',
                message: 'Selecione um tipo de usuário'
            }]
        }

        if( !codigo && (!password || password.trim().length === 0)){
            err = [...err, {
                field: 'password',
                message: 'Informe a senha do usuário'
            }]
        }

        if(err.length > 0){
            return err
        } else {
            return null
        }
    }

    function handleInputChange(e){
        console.log(e.target.name)
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
        //remove possíveis erros de validação do front
        setErrors(errors.filter( f => f.field !== e.target.name ))

        //remove possíveis erros de validação do back
        let newErrorFields = errorFields
        errorFields && delete newErrorFields[e.target.name]
        setErrorFields( newErrorFields )
    }

    function handleSetFields(item){
        setFields({...fields, [item.name]: item.option})
        setErrors(errors.filter( f => f.field !== item.name ))
    }

    return (
        <div className='mh-100 w-100 d-flex flex-column'>
            <h1 className="text-center justify-content-start mt-3 mb-1">Produtos</h1>
            <div className='d-flex w-100 mb-2 mt-2'>
                <SearchBar
                    placeholder={"Pesquise por identificador, nome ou tipo de usuário"}
                    className="mb-0"
                    handleTermFilter={handleFilterUsers}
                    dynamic={true}
                />
                <div className="ms-2">
                    <Button.Add dark onClick={handleAddRow} />
                </div>
            </div>
            <Table
                columns={data.columns}
                ordering={data.ordering}
                changeColumnOrdering={changeColumnOrdering}
                rows={filtered ? filtered : data.rows}
                loading={data.loading}
                views={[15, 30, 50, 100]}
                pageSize={data.page_size}
                serverPagination
                serverTotalRows={data.totalRows}
                handleToggleArchived={null}
                archived={null}
                highlightRow={{
                    rowId: fields.rowId ? fields.rowId : selectedItem && selectedItem.rowId ? selectedItem.rowId : null,
                    color: modal ? 'primary' : deleteModal ? 'danger' : null
                }}
                onChangeServerPagination={(e) =>
                    setData({
                        ...data,
                        page: e.page,
                        page_size: e.page_size,
                    })
                }
                //customBody={{ columns: ["due_date", "payment_date", "status"], rows: null, custom: (row, column) => handleCustomBody(row, column) }}
                administrator={true}
                handleRowAction={handleRowAction}
                emptyState={
                    <EmptyState
                        illustration={<img src={require(`../../assets/images/nothing_here_find.svg`)} width="180" style={{ marginBottom: 20 }} alt="" />}
                        //loading={loading}
                        title="Nada encontrado"
                        description="Não foram encontrados registros para o termo pesquisado."
                    />
                }
            //functionEdit={(e) => handleToUpdateBilling(e)}
            //functionDelete={(e) => handleDeleteBilling(e)}
            />
            <Modal
                show={modal}
                title={ fields.codigo ? 'Editar produto' : 'Adicionar novo produto' }
                position="center"
                toggle={toggleModal}
                onPressEnter={() => console.log('enterPressed')}
                footer={<div className="d-flex justify-content-between">
                    <Button.Cancel dark onClick={toggleModal} />
                    {fields.codigo ?
                        <Button.Save dark onClick={hanleSaveItem} /> :
                        <Button.Add dark onClick={hanleAddItem} />
                    }
                </div>}>
                <Select
                    className={`mb-3`}
                    id="order_status"
                    autoComplete="off"
                    placeholder="Status do pedido"
                    name="order_status"
                    //onChange={ e => setPassword(e.target.value)}  
                    errorMessage={errors.find(f => f.field === 'type') ? errors.find(f => f.field === 'type').message : null}
                    fieldDescription={null}
                    value={fields.order_status}
                    onChange={e => handleSetFields(e)}
                    options={fakeOptions}
                />

                <Input
                    id="name"
                    className={`mb-3`}
                    autoComplete="off"
                    name="name"
                    placeholder="Nome do produto"
                    value={fields.name}
                    errorMessage={errors.find(f => f.field === 'name') ? errors.find(f => f.field === 'name').message : null}
                    warningMessage={errorFields && errorFields.name ? errorFields.name : null}
                    fieldDescription={null}
                    onChange={e => handleInputChange(e)}
                    maxLength={200}
                    fieldDescription="Máximo 200 caracteres"
                />

                <Input
                    id="price"
                    className={`mb-3`}
                    autoComplete="off"
                    name="price"
                    placeholder="Preço"
                    value={moneyMask(fields.price)}
                    errorMessage={errors.find(f => f.field === 'price') ? errors.find(f => f.field === 'price').message : null}
                    warningMessage={errorFields && errorFields.price ? errorFields.price : null}
                    fieldDescription={null}
                    onChange={e => handleInputChange(e)}
                />


                <Input
                    type="number"
                    id="popularity"
                    className={`mb-3`}
                    autoComplete="off"
                    name="popularity"
                    placeholder="Popularidade"
                    value={fields.popularity}
                    errorMessage={errors.find(f => f.field === 'popularity') ? errors.find(f => f.field === 'popularity').message : null}
                    fieldDescription={null}
                    onChange={e => handleInputChange(e)}
                    minValue={0}
                    maxValue={100}
                    fieldDescription="Número, de 0 a 100"
                />
            </Modal>
            <Modal 
                show={deleteModal}
                title="Apagar produto"
                position="center"
                toggle={toggleDeleteModal}
                enterPressed={ () => console.log('enterPressed')}
                color="danger"
                footer={<div className="d-flex justify-content-between">
                    <Button.Cancel dark onClick={toggleDeleteModal} />
                    <Button.Delete dark onClick={hanleDeleteItem} />
                </div>}>
                    <p>Este item será apagado definitivamente e não será mais possível recuperá-lo.</p>
                    <p>Clique em "apagar" para confirmar.</p>
            </Modal>
        </div>
    )
}

export default Home