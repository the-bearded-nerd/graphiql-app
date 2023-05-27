import { createStyles } from '@mantine/core';

export const useRequestStyles = createStyles((theme) => ({
  form: {
    alignSelf: 'stretch',
    width: '100%',
  },
  input: {
    // height: 500,
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
    flexGrow: 1,
  },
}));
