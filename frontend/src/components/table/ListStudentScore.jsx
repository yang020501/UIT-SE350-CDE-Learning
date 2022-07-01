import React, { useState } from 'react'
import Table from 'react-bootstrap/esm/Table'
import './listitem.css'

const ListStudentScore = (props) => {
    return (
        <div className="container flex-column list-box expand "  >
            <div className='row'>
                <div className="col-md-12 student-table  ">
                    <Table responsive id="example" className="table table-striped table-bordered " cellSpacing="0" width="100%" >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Student Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody  >
                            {
                                props.students.length === 0 ?
                                    <tr><td colSpan={8}><div className='text-secondary fs-3 fw-3'>No Students Found</div></td></tr>
                                    :
                                    props.students.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.userId.nameAccount}</td>
                                                <td>{item.scoreTotal}/{props.length}</td>
                                            </tr>
                                        )
                                    })


                            }

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ListStudentScore