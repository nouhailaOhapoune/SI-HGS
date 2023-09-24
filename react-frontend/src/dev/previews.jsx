import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import EmployeesTable from "../pages/EmployeesPage/components/EmployeesTable/EmployeesTable";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/EmployeesTable">
                <EmployeesTable/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews