import React, { useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
    InputLabel,
    Select,
    FormControl,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetStudentsQuery } from '@/domains/student/api';
import { useAddCertificateMutation } from '../api/certificate-api';


type FormFields = {
    title: string;
    student_id: number;
    file: FileList;
};

export const ManageCertificate: React.FC = () => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<FormFields>();

    const { data: studentData, isLoading: isLoadingStudents } = useGetStudentsQuery({}); // Provide appropriate query if needed
    const [addCertificate, { isLoading }] = useAddCertificateMutation();
    const [fileName, setFileName] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: FormFields) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('student_id', data.student_id.toString());
        formData.append('file', data.file[0]);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const result = await addCertificate(formData as any).unwrap();
            toast.success(result.message || 'Certificate added successfully');
            reset();
            navigate('/app/certificates');
        } catch (error) {
            toast.error('Failed to add certificate');
        }
    };

    return (
        <Box component={Paper} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
            <Typography variant='h6' gutterBottom>
                Add Certificate
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <TextField
                    {...register('title', { required: 'Certificate title is required' })}
                    label='Certificate Title'
                    fullWidth
                    margin='normal'
                    size='small'
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />

                <FormControl fullWidth margin='normal' size='small' error={!!errors.student_id}>
                    <InputLabel>Select Student</InputLabel>
                    <Controller
                        name='student_id'
                        control={control}
                        rules={{ required: 'Student is required' }}
                        render={({ field }) => (
                            <Select {...field} label='Select Student'>
                                {isLoadingStudents ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    studentData?.students.map((student) => (
                                        <MenuItem key={student.id} value={student.id}>
                                           {student.name} ({student.email}) 
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        )}
                    />
                </FormControl>

                <FormControl fullWidth margin='normal'>
                    <Controller
                        name='file'
                        control={control}
                        rules={{ required: 'Certificate file is required' }}
                        render={({ field }) => (
                            <>
                                <Button variant='outlined' component='label'>
                                    Upload Certificate File
                                    <input
                                        type='file'
                                        hidden
                                        accept='.pdf,.png,.jpg,.jpeg'
                                        onChange={(e) => {
                                            const fileList = e.target.files;
                                            if (fileList?.[0]) {
                                                setFileName(fileList[0].name);
                                                field.onChange(fileList); // ✅ manually set FileList in react-hook-form
                                            }
                                        }}
                                    />
                                </Button>
                                {fileName && (
                                    <Typography variant='body2' sx={{ mt: 1 }}>
                                        Selected: {fileName}
                                    </Typography>
                                )}
                                {errors.file && (
                                    <Typography color='error' variant='body2'>
                                        {errors.file.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </FormControl>

                <Box textAlign='center'>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={isLoading}
                        sx={{ mt: 3 }}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </form>
        </Box>
    );
};
