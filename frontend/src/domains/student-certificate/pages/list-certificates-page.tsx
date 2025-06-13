import { Grid2 } from '@mui/material';
import { Info } from '@mui/icons-material';
import { PageContentHeader } from '@/components/page-content-header';
import { ManageCertificate } from '../components/manage-certificates';
import { CertificateData } from './certificate-data';



export const ListCertificates = () => {

  return (
    <>
      <PageContentHeader icon={<Info sx={{ mr: 1 }} />} heading='Certificate Information' />
      <Grid2 container columnSpacing={5} rowSpacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <ManageCertificate />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <CertificateData />
        </Grid2>
      </Grid2>
    </>
  );
};
