import React, { useEffect, useState, useContext } from 'react'
import { Input, Button, Tooltip, List, Divider, Select } from 'antd'
import {EditOutlined, UnlockOutlined ,DeleteOutlined } from '@ant-design/icons'
import { AddNewUserModal as AddNewUser, DeleteUserModal as DeleteUser, ChangePasswordModal as ChangePassword, ChangeUserTypeModal as ChangeUserType } from '../components/Modals'
import { getAllUsers, getSearchedUsers } from '../client/client'
import { searchOnList, identificationList, userTypeList } from '../context/lists'
import { appContext } from '../context/appContext'
import Pagination from '../components/Pagination'
import * as lists from '../context/lists'

const EmitirFactura = () => {

	const {contextHolder} = useContext(appContext)

	return(
		<div className='EmitirFactura Page'>
			<Divider className='PageTitle'><h1>Emitir factura</h1></Divider>
			{contextHolder}
			<div className='listContainer Content' >
				<div className='row'>
					<Input.Search
						placeholder='Ingrese cedula del pagador'
						id='searchInput'
						onSearch={() => console.log("buscar cedula")}
						className='rowItem'/>
					<Input
						placeholder='Nombre:'
						className='rowItem'/>
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
						defaultValue={{value: 0, label: "Metodo de pago"}}/>
					<Input placeholder='Referencia' className='rowItem'/>
				</div>
				
				<Button>Emitir factura</Button>
			</div>

            <div className='EmptyFooter'/>
		</div>
	)
}

export default EmitirFactura