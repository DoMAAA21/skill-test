import * as React from 'react';
import { Box, Button } from '@mui/material';
import { Add, InfoOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { PageContentHeader } from '@/components/page-content-header';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { UserAccountBasic } from '@/components/user-account-basic';
import { useGetCertificatesQuery } from '../api/certifcate-api';



export const ListCertificates: React.FC = () => {
 
  const { data, isLoading, isError, error } = useGetCertificatesQuery({});


  return (
    <>
      <Box sx={{ display: 'flex', mb: 1 }}>
        <Box sx={{ ml: 'auto' }}>
          <Button
            size='small'
            color='primary'
            variant='contained'
            startIcon={<Add />}
            component={Link}
            to='/app/certificates/add'
          >
            Add New Certificate
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 10 }} />
      <PageContentHeader icon={<InfoOutlined sx={{ mr: 1 }} />} heading='Certificate Information' />
   
    </>
  );
};
