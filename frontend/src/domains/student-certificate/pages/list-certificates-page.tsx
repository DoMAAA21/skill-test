import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageContentHeader } from '@/components/page-content-header';
import { CertificateProps, CertificateSchema } from '../types';
// import { ManageCertificate } from '../../components';
import { CertificateData } from './certificate-data';

const initialState = {
  certificate: '',
  sections: []
};

export const ListCertificates = () => {
//   const methods = useForm<CertificateProps>({
//     defaultValues: initialState,
//     resolver: zodResolver(CertificateSchema)
//   });

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Certificate Information' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        {/* <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageCertificate operation='Add' methods={methods} />
        </Grid2> */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <CertificateData />
        </Grid2>
      </Grid2>
    </>
  );
};
