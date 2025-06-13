import * as React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { CertificateProps } from '../types';
import { useAddCertificateMutation, useUpdateCertificateMutation } from '../api/certificate-api';
import { useGetSectionsQuery } from '@/domains/section/api';

type ManageCertificateProps = {
  id?: number;
  operation: 'Add' | 'Edit';
  methods: UseFormReturn<CertificateProps>;
};

export const ManageCertificate: React.FC<ManageCertificateProps> = ({ id, operation, methods }) => {
  const { data, isLoading } = useGetSectionsQuery();
  const [addNewCertificate, { isLoading: isAddingCertificate }] = useAddCertificateMutation();
  const [updateCertificate, { isLoading: isUpdatingCertificate }] = useUpdateCertificateMutation();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset
  } = methods;

  const isSectionPresent = (section: string) => {
    return getValues('sections').includes(section);
  };
  const handleChange = (section: string) => {
    const values = getValues('sections');
    if (values.includes(section)) {
      setValue(
        'sections',
        values.filter((v) => v !== section)
      );
    } else {
      setValue('sections', [...values, section]);
    }
  };

  const handleSave = async (data: CertificateProps) => {
    try {
      const { name, sections } = data;
      const sectionString = sections.length > 0 ? sections.join(',') : '';
      const result =
        operation === 'Add'
          ? await addNewCertificate({ name, sections: sectionString }).unwrap()
          : await updateCertificate({ id: id!, name, sections: sectionString }).unwrap();

      reset();
      toast.info(result?.message);
      navigate('/app/certificates');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      <Typography variant='subtitle1' sx={{ mb: 3 }}>
        {operation} Certificate
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <TextField
          {...register('name')}
          label='Certificate Name'
          fullWidth
          focused
          size='small'
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Sections</FormLabel>
          {isLoading ? (
            <>loading...</>
          ) : (
            data?.sections &&
            data?.sections.map(({ name }) => (
              <FormGroup key={name}>
                <Controller
                  name='sections'
                  control={control}
                  render={() => (
                    <FormControlLabel
                      label={name}
                      control={
                        <Checkbox
                          size='small'
                          checked={isSectionPresent(name)}
                          icon={<CheckBoxOutlineBlank />}
                          checkedIcon={<CheckBox />}
                          onChange={() => handleChange(name)}
                        />
                      }
                    />
                  )}
                />
              </FormGroup>
            ))
          )}
        </FormControl>

        <Box textAlign='center'>
          <LoadingButton
            type='submit'
            size='small'
            variant='contained'
            sx={{ mt: 4 }}
            loading={isAddingCertificate || isUpdatingCertificate}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};
