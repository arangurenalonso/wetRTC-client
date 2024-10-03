import { FormHelperText } from '@mui/material';

type ErrorMessageProps = {
  errorMessage?: string;
};

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <>
      {errorMessage && (
        <FormHelperText sx={{ color: 'error.main' }}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};

export default ErrorMessage;
