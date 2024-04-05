import React, { useState } from 'react'
import './Qrcode.css'

const Qrcode = () => {
    const [img, setImg] = useState('');
    const [Loading,setLoading] = useState(false)
    const [qrdata, setqrData] = useState('pradeep')

   async function generate() {
    setLoading(true);
    try {
        const url =`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrdata) }&size=100x100`
        setImg(url);
    }catch(error){
        console.error('Error generating a QR code',error);
    }finally{
        setLoading(false);
    }

    }
    return (
        <>
            <div className='app-container'>
                <h1>QR CODE GENERATOR</h1>
                {Loading && <p>Please Wait..</p>}
                {img && <img src={img} alt="QR code" className='QRimage' />}
                <div>
                    <label htmlFor="datainput" className='input-label'>Data For Qr code</label>
                    <input type="text" id='datainput' placeholder='Enter Data for QR code' value={qrdata} onChange={(e)=>setqrData(e.target.value)} />
                    <label htmlFor="sizeinput" className='input-label'>Image Size(e.g..150):</label>
                    <input type="text" id='sizeinput' placeholder='Enter Image Size'  />
                    <button className='Generate-btn' onClick={()=>generate()}>Generate QR Code</button>
                    <button className='Download-btn'>Download QR Code</button>
                </div>
                <p className='footer'>Designed by <a href="#">akpradeep</a> </p>
            </div>
        </>
    )
}

export default Qrcode
