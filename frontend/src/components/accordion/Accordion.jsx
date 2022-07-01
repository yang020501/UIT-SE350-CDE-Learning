import React, { useEffect, useState } from 'react'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

const Accordion = (props) => {
    const [Collapsed, setCollapsed] = useState("collapsed")
    const [collapse, setcollapse] = useState("collapse")
    const [show, setShow] = useState("")
    const [height, setheight] = useState("0px")

    /*   const handleClick = () => {
          if (Collapsed === "collapsed") {
              setCollapsed("");
              setcollapse("collapsing")
  
              setTimeout(() => {                
                  setShow("show")
                  setcollapse("collapse")
              }, 400)
  
          }
          else {
              setCollapsed("collapsed")
              setShow("")
              setTimeout(() => {
                  setcollapse("collapsing")
                  setheight("0px")
              }, 300)
              setTimeout(() => {
                  setcollapse("collapse")
              }, 500);
  
  
          }
  
      } */
    useEffect(() => {


    }, [])

    return (
        <>
            <div className='row' style={{ marginTop: '10px' }}>
                <MDBAccordion initialActive={0}  >
                    <MDBAccordionItem collapseId={1} headerTitle={props.Title}>
                        {props.State}
                    </MDBAccordionItem>
                </MDBAccordion>
            </div>
            {/*  <div className='accordion'>
                <div className='accordion-item'>
                    <h2 className='accordion-header'>
                        <button className={`accordion-button ${Collapsed}`} onClick={handleClick} type='button'>
                            {props.Title}
                        </button>
                    </h2>
                    <div id={1} className= {`${collapse}  ${show}`}  >
                        <div className='accordion-body'>
                            <div className='container list-box'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        {props.State}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div> 
 */}

        </>
    )
}

export default Accordion