import React,{ useContext, useEffect, useState } from 'react'
import { Input, Button, Tooltip, List, Divider } from 'antd'
import {ApiOutlined } from '@ant-design/icons'
import { getAllUsers, getSearchedSDeactivatedUsers,getDeactivatedUsers, getInvoicesById } from '../client/client'
import { searchOnList, identificationList, userTypeList } from '../context/lists'
import { ReactivateUserModal as ReactivateUser } from '../components/Modals'
import { appContext } from '../context/appContext'
import Pagination from "../components/Pagination"

const VerificarFactura = () => {
	const {contextHolder} = useContext(appContext)

	const [showList, setShowList] = useState([])
	const [page, setPage] = useState(1)

	const getContent = async() => {
		const param = document.getElementById("SearchField").value
		const res = await getInvoicesById(param, page)
		setShowList(res.data)
	}

	return(
		<div className='VerificarFactura Page'>
			<Divider className='PageTitle'><h1>Verificar factura</h1></Divider>
			{contextHolder}
			<div className='searchBar' >
				<Input
					placeholder='Ingrese cedula del paciente'
					id="SearchField"/>
					<Button onClick={getContent}>Consultar</Button>
			</div>
			<div className='listContainer Content' >
				<List bordered className='mainList'>
					{ showList.map(item => (
						<List.Item className='listItem' >
							<div className='info'>
								<h4>{item.patientId} {item.patientName} - {item.billableitem} - {item.date} </h4>
							</div>
							{/* <div className='buttons'>
								<Tooltip onClick={() => {setSelectedItem(item); setReactivateModal(true)}} title='Reactivar'><Button shape='circle' variant='solid' color='primary' size='large' icon={<ApiOutlined />} /></Tooltip>
							</div> */}
						</List.Item>
					)) }
					<Pagination page={page} setPage={setPage}/>
				</List>
			</div>

			<div className='EmptyFooter'/>
		</div>
	)
}

export default VerificarFactura