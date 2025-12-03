import React, { useState, useContext, useEffect } from 'react'
import { Input, Button, Divider, Select } from 'antd'
import { issueInvoice, getSearchedPatient, getIdInvoice } from '../client/client'
import { appContext } from '../context/appContext'
import * as lists from '../context/lists'

const EmitirFactura = () => {

	const {contextHolder} = useContext(appContext)

	const [selectedBillable, setSelectedBillable] = useState({value: 0, label: "Servicio a cancelar:", price: 0})
	const [paymentMethod, setPaymentMethod] = useState({value: 0, label: "Metodo de pago"})
	const [reference, setReference] = useState('')
	const [payerId,setPayerId] = useState('')
	const [patient, setPatient] = useState('')
	const [amount, setAmount] = useState('0 Bs.')
	const [dolarPrice, setDolarPrice] = useState(3)
	const [id, setId] = useState("")

	useEffect(() => {
		getId()
	}, [])

	const updateAmount = (billable, payment) => {
		const servicePrice = lists.searchFullOnList(lists.BillableItems, billable).price

		console.log(servicePrice)
		console.log(selectedBillable)
		console.log(paymentMethod)

		if(payment == 3){
			setAmount(`${servicePrice}$`)
		}else{
			setAmount(`${(servicePrice * dolarPrice)} Bs.`)
		}
	}

	const getId = async () => {
		const response = await getIdInvoice()
		if(response.status === 200){
			setId(response.data.id)
		return
		}
		const newId = "001"; // Ejemplo de ID
		//setId(newId);
	}

	const updateBillable = (e) => {
		setSelectedBillable(e)
		updateAmount(e, paymentMethod)
	}

	const updatePayment = (e) => {
		setPaymentMethod(e)
		updateAmount(selectedBillable, e)
	}

	const getpatient = async (identification) =>{
		try {
			const response = await getSearchedPatient(identification)
			if(response.status === 200){
				const searchedpatient = response.data[0]
				setPatient(searchedpatient)
			}
			else if(response.status === 404){
				message.error('El pagador no se encuentra registrado')
			}
		} catch (error) {
			
		}
	}

	const submitIssueInvoice = async () => {
		if(selectedBillable.value==0 || paymentMethod.value==0 || payerId=='' || patient=='' || amount=='0 Bs.'){
			messageApi.open({
				type: 'error',
				content: 'Debe ingresar todos los datos'
			})
		}else{
			const data = {
				payerId: payerId,
				billableItem: selectedBillable.value,
				currency: paymentMethod.value,
				reference: reference,
				amount: amount,
			}
			const res = await issueInvoice(data)
			if(res.status == 200){
				messageApi.open({
					type: 'success',
					content: 'Factura creada con exito'
				})
				updateList()
				onCancel()
			}else{
				messageApi.open({
					type: 'error',
					content: res.response.data
				})
			}
		}
	}
	
	return(
		<div className='EmitirFactura Page'>
			<Divider className='PageTitle'><h1>Emitir factura</h1></Divider>
			{contextHolder}
			<div className='listContainer Content' >
				<h3>Nº de factura {id}</h3>
				<div className='row'>
					<Input.Search
						placeholder='Ingrese cedula'
						id='searchInput'
						value={payerId}
						onSearch={(value) => getpatient(value)}
						className='rowItem'/>
					<Input
						placeholder='Nombre:'
						className='rowItem' enabled={patient === null}
						value={patient !== null ? patient.name : ""}
						disabled={true}
					/>
				</div>
				<div className='row'>
					<Select 
						options={lists.BillableItems}
						className='rowItem'
						defaultValue={{value: 0, label: "Servicio a cancelar", price: 0}}
						value={selectedBillable}
						onChange={updateBillable}/>
					<Input 
						placeholder='Monto:'
						className='rowItem'
						value={`Monto: ${amount}`}
						disabled={true}/>
				</div>
				<div className='row'>
					<Select 
						options={lists.paymentMethods}
						className='rowItem'
						defaultValue={{value: 0, label: "Metodo de pago"}}
						value={paymentMethod}
						onChange={updatePayment}
					/>
					<Input placeholder='Referencia' className='rowItem' disabled={paymentMethod !== 2}/>
				</div>
				
				<Button onClick={submitIssueInvoice}>Emitir factura</Button>
			</div>

            <div className='EmptyFooter'/>
		</div>
	)
}

export default EmitirFactura