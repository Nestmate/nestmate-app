import { styled } from '@stitches/react';

export const BaseButton = styled('button', {
    backgroundColor: 'gainsboro',
    borderRadius: '9999px',
    fontSize: '13px',
    padding: '10px 15px',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  });

export const PrimaryButton = styled(BaseButton, {
  borderRadius: 0,
  backgroundColor: 'hotpink',
  color: 'white',
  '&:hover': {
    backgroundColor: 'deeppink',
  },
});

