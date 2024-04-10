import React, { useState } from 'react'
import './Qrcode.css'

const Qrcode = () => {
    const [img, setImg] = useState('');
    const [Loading,setLoading] = useState(false);
    const [qrdata, setqrData] = useState('');
    const [size,setSize] = useState('');

    async function generate() {
    setLoading(true);
    try {
        const url =`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrdata) }&size=${size}x${size}`
        setImg(url);
    }catch(error){
        console.error('Error generating a QR code',error);
    }finally{
        setLoading(false);
    }

    }
    function Downloadqr(){
            fetch(img).then((response)=>response.blob())
            .then((blob)=>{
                const link = document.createElement('a');
                link.href=URL.createObjectURL(blob);
                link.download="qr.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch((error)=>{
                console.error('Error Downloading the QR Code');
            })
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
                    <input type="text" id='sizeinput' placeholder='Enter Image Size' value={size} onChange={(d)=>setSize(d.target.value)}/>
                    <button className='Generate-btn' onClick={()=>generate()} disabled={Loading}>Generate QR Code</button>
                    <button className='Download-btn' onClick={()=>Downloadqr()}>Download QR Code</button>
                </div>
                <p className='footer'>Designed by <a href="#">akpradeep</a> </p>
            </div>
        </>
    )
}


export default Qrcode
