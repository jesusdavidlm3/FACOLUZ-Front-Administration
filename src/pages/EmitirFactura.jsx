import React, { useState, useContext, useEffect } from 'react'
import { Input, Button, Divider, Select } from 'antd'
import { getSearchedPayer, getIdInvoice } from '../client/client'
import { appContext } from '../context/appContext'
import * as lists from '../context/lists'

const EmitirFactura = () => {

	const {contextHolder} = useContext(appContext)

	const [paymentMethod, setPaymentMethod] = useState(null)
	const [payer, setPayer] = useState('')
	const [id, setId] = useState("")

	useEffect(() => {
		getId()
	}, [])

	const getId = async () => {
		const response = await getIdInvoice()
		if(response.status === 200){
			setId(response.data.id)
		return
		}
		const newId = "001"; // Ejemplo de ID
		//setId(newId);
	}

	const getPayer = async (identification) =>{
		try {
			const response = await getSearchedPayer(identification)
			if(response.status === 200){
				const searchedPayer = response.data[0]
				setPayer(searchedPayer)
			}
			else if(response.status === 404){
				message.error('El pagador no se encuentra registrado')
			}
		} catch (error) {
			
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
						onSearch={(value) => getPayer(value)}
						className='rowItem'/>
					<Input
						placeholder='Nombre:'
						className='rowItem' enabled={payer === null}
						value={payer !== null ? payer.name : ""}
					/>
					<Input placeholder='Telefono' className='rowItem' enabled={payer === null} value={payer !== null ? payer.phone : ""}/>
				</div>
				<div className='row'>
					<Select 
						options={lists.BillableItems}
						className='rowItem'
						defaultValue={{value: 0, label: "Servicio a cancelar"}}/>
					<Input 
						placeholder='Monto:'
						className='rowItem'/>
				</div>
				<div className='row'>
					<Select 
						options={lists.paymentMethods}
						className='rowItem'
						defaultValue={{value: 0, label: "Metodo de pago"}}
						onChange={(value) => setPaymentMethod(value)}
					/>
					<Input placeholder='Referencia' className='rowItem' disabled={paymentMethod !== 2}/>
				</div>
				
				<Button>Emitir factura</Button>
			</div>

            <div className='EmptyFooter'/>
		</div>
	)
}

export default EmitirFactura