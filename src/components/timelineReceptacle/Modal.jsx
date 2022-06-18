import {useState} from "react";
import ReactModal from "react-modal";
import styled from "styled-components";


export default function ModalScreen(status){
    console.log("status ", status)
    return(
        <ReactModal
            isOpen={ status}

            style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)'
                },
                content: {
                  position: 'absolute',
                  top: '40px',
                  left: '40px',
                  right: '40px',
                  bottom: '40px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '20px'
                } }}

            data={{ background: "#333333" }}

            testId={""}
        >
            <Delete>
                <p>Are you sure you want to delete this post?</p>
                <button class="cancel">No, go back</button>
                <button class="confirm">Yes, delete it</button>
            </Delete>
        </ReactModal>
    )
}
const Delete = styled.div`
    background-color: #333333;
    width: 597px;
    height: 262px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21.6px;
    p{
        text-align: center;
        font-size: 34px;
        line-height: 40.8px;
    }
    .cancel{
        background-color: #fff;
        color: #1877F2;
    }
    .confirm{
        background-color: #1877F2;
        color: #fff;
    }
`