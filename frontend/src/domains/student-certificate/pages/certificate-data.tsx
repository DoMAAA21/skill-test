import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetCertificatesQuery } from '../api/certificate-api';
import { CertificateDataPropsWithId } from '../types';
// import { DeleteCertificate } from './delete-certificate';

export const CertificateData = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [certificateId, setCertificateId] = React.useState<number>(0);
  const { data, isLoading, isError, error } = useGetCertificatesQuery({});

  const columns: MRT_ColumnDef<CertificateDataPropsWithId>[] = React.useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title'
      },
      {
        accessorKey: 'sections',
        header: 'Section'
      }
    ],
    []
  );

  const openModal = (leaveId: number) => {
    setCertificateId(leaveId);
    setIsOpen((isOpen) => !isOpen);
  };

  const closeModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.certificates || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id }
      } = row;
      return (
        <>
          <IconButton
            title='Edit certificate'
            color='info'
            component={Link}
            to={`/app/certificates/edit/${id}`}
          >
            <Edit />
          </IconButton>
          <IconButton title='Delete certificate' color='error' onClick={() => openModal(id)}>
            <Delete />
          </IconButton>
        </>
      );
    },
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

      {/* {isOpen && <DeleteCertificate certificateId={certificateId} closeModal={closeModal} />} */}
    </>
  );
};
