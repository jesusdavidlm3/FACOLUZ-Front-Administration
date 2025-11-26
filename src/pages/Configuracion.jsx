import React, { useContext } from 'react';
import { Divider, Input, Button, Form} from 'antd';
import { appContext } from "../context/appContext";

const Configuracion = () => {
    const {contextHolder} = useContext(appContext);

    return(
        <div className='Configuracion Page'>
            <Divider className='PageTitle'><h1>Configuracion</h1></Divider>
            {contextHolder}
            <div className='listContainer Content' >
                <p>Aqui podras configurar la tasa de cambio y los precios de referencia de la aplicacion.</p>
                <div className='row'>
                    <Form.Item label="Tasa del dia:" className='rowItem'>
					<Input id='tasaDia' className='rowItem'/>
                    </Form.Item>
				</div>
                <div className='row'>
                    <Form.Item label="Precio de referencia (Consulta):" className='rowItem'>
					<Input id='referenciaConsulta' className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
				</div>
                <div className='row'>
                    <Form.Item label="Precio de referencia (Historia):" className='rowItem'>
					<Input id='referenciaHistoria' className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
				</div>
                <Button>Guardar cambios</Button>
            </div>
            <div className='EmptyFooter'/>
        </div>
    )
}

export default Configuracion;