import * as React from 'react';
import { Box, Paper } from '@mui/material';

import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetCertificatesQuery } from '../api/certificate-api';
import { CertificateDataPropsWithId } from '../types';
// import { DeleteCertificate } from './delete-certificate';

export const CertificateData = () => {
  const { data, isLoading, isError, error } = useGetCertificatesQuery({});

  console.log(data);
  const columns: MRT_ColumnDef<CertificateDataPropsWithId>[] = React.useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title'
      },
      {
        accessorKey: 'ipfsHash',
        header: 'IPFP Hash'
      },
      {
        accessorKey: 'studentName',
        header: 'Student'
      }
    ],
    []
  );



  const table = useMaterialReactTable({
    data: isError ? [] : data?.certificates || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: false,
    positionActionsColumn: 'last',

    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>
    </>
  );
};
