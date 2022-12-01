import React, { useMemo } from 'react'
import MaterialReactTable from 'material-react-table';
const data = [
    {
      firstName: 'Dylan',
      lastName: 'Murray',
      address: '261 Erdman Ford',
      city: 'East Daphne',
      state: 'Kentucky',
    },
    {
      firstName: 'Raquel',
      lastName: 'Kohler',
      address: '769 Dominic Grove',
      city: 'Columbus',
      state: 'Ohio',
    },
    {
      firstName: 'Ervin',
      lastName: 'Reinger',
      address: '566 Brakus Inlet',
      city: 'South Linda',
      state: 'West Virginia',
    },
    {
      firstName: 'Brittany',
      lastName: 'McCullough',
      address: '722 Emie Stream',
      city: 'Lincoln',
      state: 'Nebraska',
    },
    {
      firstName: 'Branson',
      lastName: 'Frami',
      address: '32188 Larkin Turnpike',
      city: 'Charleston',
      state: 'South Carolina',
    },
  ];



export const TableMaterialReact = () => {

    const columns = useMemo(
        () => [
            {
                accessorKey: 'firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'city',
                header: 'City',
            },
            {
                accessorKey: 'address',
                header: 'Address',
            },
            //column definitions...
            {
                accessorKey: 'state',
                // enableColumnOrdering: false, //disable column ordering for this column,
                header: 'State',
            },
        ],
        [],
    );


    return (
        <MaterialReactTable columns={columns} data={data} enableColumnOrdering />
    )
}
