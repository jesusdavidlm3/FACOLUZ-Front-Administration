import React, { useEffect, useContext, useState } from 'react';
import { Divider, Input, Button, Form} from 'antd';
import { appContext } from "../context/appContext";
import { getSettings} from "../client/client";

const Configuracion = () => {
    const {messageApi,contextHolder, prices,setPrices} = useContext(appContext);
    const [ciaConsulta, setCiaConsulta] = useState(prices.ciaConsulta);
    const [ciaHistoria, setCiaHistoria] = useState(prices.ciaHistoria);
    const [cianConsulta, setCianConsulta] = useState(prices.cianConsulta);
    const [cianHistoria, setCianHistoria] = useState(prices.cianHistoria);
    const [cirugia, setCirugia] = useState(prices.cirugia);
    const [endodoncia, setEndodoncia] = useState(prices.endodoncia);
    const [ortodoncia, setOrtodoncia] = useState(prices.ortodoncia);
    const [peridoncia, setPeridoncia] = useState(prices.peridoncia);
    const [protesisTotal, setProtesisTotal] = useState(prices.protesisTotal);
    const [protesisParcialRemovible, setProtesisParcialRemovible] = useState(prices.protesisParcialRemovible);
    const [protesisParcialFija, setProtesisParcialFija] = useState(prices.protesisParcialFija);
    const [emergenciaCIA, setEmergenciaCIA] = useState(prices.emergenciaCia);
    const [emergenciaCIAN, setEmergenciaCIAN] = useState(prices.emergenciaCian);

// Validación: no vacío y sólo números (acepta enteros y decimales)
    const isNumeric = (v) => {
        if (v === '' || v === null || v === undefined) return false;
        return /^-?\d+(\.\d+)?$/.test(String(v).trim());
    };

    const validateFields = () => {
    // lista de pares [valor, etiqueta amena]
        const fields = [
            [ciaConsulta, 'CIA (Consulta)'],
            [ciaHistoria, 'CIA (Historia)'],
            [cianConsulta, 'CIAN (Consulta)'],
            [cianHistoria, 'CIAN (Historia)'],
            [cirugia, 'Cirugía'],
            [endodoncia, 'Endodoncia'],
            [ortodoncia, 'Ortodoncia'],
            [peridoncia, 'Peridoncia'],
            [protesisTotal, 'Prótesis Total'],
            [protesisParcialRemovible, 'Prótesis Parcial Removible'],
            [protesisParcialFija, 'Prótesis Parcial Fija'],
            [emergenciaCIA, 'Emergencia CIA'],
            [emergenciaCIAN, 'Emergencia CIAN'],
        ];

        let hasError = false;

        fields.forEach(([value, label]) => {
            const trimmed = value === undefined || value === null ? '' : String(value).trim();
            if (trimmed === '') {
            messageApi.open({
                type: 'error',
                content: `${label}: no puede estar vacío`
            });
            hasError = true;
            return;
            }
            if (!isNumeric(trimmed)) {
            messageApi.open({
                type: 'error',
                content: `${label}: debe ser un número válido`
            });
            hasError = true;
            }
        });

        return !hasError;
    };

    const saveSettings = async () => {
        if (!validateFields()) {
            return;
        }

        const newPrices = {
            CIAConsulta: ciaConsulta,
            CIAHistoria: ciaHistoria,
            CIANConsulta: cianConsulta,
            CIANHistoria: cianHistoria,
            Cirugia: cirugia,
            Endodoncia: endodoncia,
            Ortodoncia: ortodoncia,
            Peridoncia: peridoncia,
            ProtesisTotal: protesisTotal,
            ProtesisParcialRemovible: protesisParcialRemovible,
            ProtesisParcialFija: protesisParcialFija,
            EmergenciaCIA: emergenciaCIA,
            EmergenciaCIAN: emergenciaCIAN,
        };

        try {
            await setPrices(newPrices);
            messageApi.open({
                type: 'success',
                content: 'Precios cambiados con exito'
            });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Error al guardar la configuración'
            });
        }
    };


    return(
        <div className='Configuracion Page'>
            <Divider className='PageTitle'><h1>Configuracion</h1></Divider>
            {contextHolder}
            <div className='listContainer Content' >
                <p>Aqui podras configurar los precios de referencia de los diferentes servicios. El monto debe ser en $.</p>
                <div className='row'>
                    <Form.Item label="Precio de CIA (Consulta):" className='rowItem'>
                    <Input id='CIA(Consulta)' value={ciaConsulta} onChange={(e) => setCiaConsulta(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                    <Form.Item label="Precio de CIA (Historia):" className='rowItem'>
                    <Input id='CIA(Historia)' value={ciaHistoria} onChange={(e) => setCiaHistoria(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <div className='row'>
                    <Form.Item label="Precio de CIAN (Consulta):" className='rowItem'>
                    <Input id='CIAN(Consulta)' value={cianConsulta} onChange={(e) => setCianConsulta(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                    <Form.Item label="Precio de CIAN (Historia):" className='rowItem'>
                    <Input id='CIAN(Historia)' value={cianHistoria} onChange={(e) => setCianHistoria(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <div className='row'>
                    <Form.Item label="Precio de Cirugia:" className='rowItem'>
                    <Input id='Cirugia' value={cirugia} onChange={(e) => setCirugia(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                    <Form.Item label="Precio de Endodoncia:" className='rowItem'>
                    <Input id='Endodoncia' value={endodoncia} onChange={(e) => setEndodoncia(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <div className='row'>
                    <Form.Item label="Precio de Ortodoncia:" className='rowItem'>
                    <Input id='Ortodoncia' value={ortodoncia} onChange={(e) => setOrtodoncia(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                    <Form.Item label="Precio de Peridoncia:" className='rowItem'>
                    <Input id='Peridoncia' value={peridoncia} onChange={(e) => setPeridoncia(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <div className='row'>
                    <Form.Item label="Precio de Protesis Total:" className='rowItem'>
                    <Input id='ProtesisTotal' value={protesisTotal} onChange={(e) => setProtesisTotal(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                    <Form.Item label="Precio de Protesis Parcial Removible:" className='rowItem'>
                    <Input id='ProtesisParcialRemovible' value={protesisParcialRemovible} onChange={(e) => setProtesisParcialRemovible(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <div className='row'>
                    <Form.Item label="Precio de Protesis Parcial Fija:" className='rowItem'>
                    <Input id='ProtesisParcialFija' value={protesisParcialFija} onChange={(e) => setProtesisParcialFija(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                    <Form.Item label="Precio de Emergencia CIA:" className='rowItem'>
                    <Input id='EmergenciaCIA' value={emergenciaCIA} onChange={(e) => setEmergenciaCIA(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <div className='row'>
                    <Form.Item label="Precio de Emergencia CIAN:" className='rowItem'>
                    <Input id='EmergenciaCIAN' value={emergenciaCIAN} onChange={(e) => setEmergenciaCIAN(e.target.value)} className='rowItem' placeholder='Monto en $:'/>
                    </Form.Item>
                </div>
                <Button variant='solid' color='primary' onClick={()=>saveSettings()}>Guardar cambios</Button>
            </div>
            <div className='EmptyFooter'/>
        </div>
    )
}

export default Configuracion;