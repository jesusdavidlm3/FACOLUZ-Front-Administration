import { getAllInvoices } from '../client/client'
import { useEffect, useState } from 'react'
import { searchOnList } from '../context/lists'
import * as lists from '../context/lists'
import React from 'react'
import { Button, Divider, List } from 'antd'
import { getTime, getDate } from '../functions/formatDates'
import Pagination from "../components/Pagination"

const ConsultarRegistros = () => {

    const [showList, setShowList] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getContent()
    }, [page])

    const getContent = async() => {
        const res = await getAllInvoices(page)
        setShowList(res.data)
    }

    return(
        <div className="ConsultarRegistros Page">
            <Divider className='PageTitle'><h1>Historial de facturacion</h1></Divider>
            <Button className='generateReport' type='primary' >Generar Reporte</Button>
            <div className='listContainer Content'>
                <List bordered className='mainList' size='small'>
                    {showList.map(item => (
                        <List.Item className='listItem'>
                            <h4>
                                {item.patientId} {item.patientName} - {item.billableitem} - {item.date}
                            </h4>
                        </List.Item>
                    ))}
                <Pagination page={page} setPage={setPage}/>
                </List>
            </div>
            <div className='EmptyFooter'/>
        </div>
    )
}

export default ConsultarRegistros