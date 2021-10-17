import React, {useEffect, useState} from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
function Preview(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [bookPreview, setBookPreview] = useState()
    useEffect(() => {
        if(props.preview){
            setBookPreview(props.preview)
        }
        
    }, [props.preview])
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <div>
        <Document
            file={bookPreview}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <Page pageNumber={pageNumber} />
        </Document>
        <div style={{display:"flex"}}>
        <Button type="primary" shape="circle" icon={<LeftOutlined/>} onClick={()=> {
            if(pageNumber !== 0) {
                setPageNumber(prev => prev - 1)
            }
        }}/>
        <p>Page {pageNumber} of {numPages}</p>
        <Button type="primary" shape="circle" icon={<RightOutlined />}
            onClick={()=> {
            if(pageNumber <= numPages) {
                setPageNumber(prev => prev +1)
            }
        }}
        />
        </div>
    </div>
    )
}

export default Preview
