import React from 'react';
import { Box, Typography, TextField, Button, Grid, Link, Card } from '@mui/material';

export default function AuthForm({ title, onSubmit, linkText, linkHref, onInputChange, fields }) {
    return (
        <Card
            sx={{
                padding: 4,
                width: 400,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                borderRadius: 3,
                backgroundColor: '#f5e8dc',
            }}
        >
            <Box textAlign="center" mb={3}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: '#6f4e37', fontFamily: 'serif', letterSpacing: 1 }}
                >
                    {title}
                </Typography>
            </Box>
            {fields.map((field, index) => (
                <TextField
                    key={index}
                    margin="normal"
                    fullWidth
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    onChange={onInputChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#6f4e37',
                            },
                            '&:hover fieldset': {
                                borderColor: '#8c5c3e',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#6f4e37',
                        },
                    }}
                />
            ))}
            <Button
                fullWidth
                variant="contained"
                onClick={onSubmit}
                sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: '#6f4e37',
                    ':hover': {
                        backgroundColor: '#8c5c3e',
                    },
                }}
            >
                {title}
            </Button>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Link href="/" variant="body2" underline="hover" sx={{ color: '#6f4e37' }}>
                        Back to home
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={linkHref} variant="body2" underline="hover" sx={{ color: '#6f4e37' }}>
                        {linkText}
                    </Link>
                </Grid>
            </Grid>
        </Card>
    );
}