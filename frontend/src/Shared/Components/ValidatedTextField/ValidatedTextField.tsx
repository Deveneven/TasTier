import {TextField} from '@material-ui/core';
import React, {useState} from 'react';

const ValidatedTextField = (props: any) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const onBlur = (event: any) => {
    const {value} = !!event.target ? event.target : event;

    if (props.required) {
      checkIsRequired(value);
    }
    if (props.regex) {
      checkRegex(value);
    }
  };

  const checkIsRequired = (value) => {
    setIsInvalid(value ? false : true);
  };

  const checkRegex = (value) => {
    const regex = new RegExp(props.regex);
    setIsInvalid(regex.test(value) ? false : true);
  };

  return (
    <TextField
      error={isInvalid}
      onBlur={onBlur}
      {...props}
    />
  );
};
export default ValidatedTextField;
