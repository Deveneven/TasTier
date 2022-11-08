import {TextField} from '@material-ui/core';
import React, {useState} from 'react';
import './TextForm.scss';

const TextForm = (props: any) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [validResults, setValidResults] = useState<Array<string>>([]);

  const onBlur = (event: any) => {
    const {value} = !!event.target ? event.target : event;
    const results: Array<string> = [];

    if (props.required && !value) {
      setIsInvalid(true);
      results.push('Field cannot be empty');
    }
    if (props.regex) {
      const regex = new RegExp(props.regex);
      if (!regex.test(value)) {
        setIsInvalid(true);
        results.push('Incorrect entry');
      }
    }
    if (props.minLenght && value.length < props.minLenght ) {
      setIsInvalid(true);
      results.push(`Incorrect lenght min:${props.minLenght}`);
    }
    if (props.maxLenght && value.length > props.maxLenght) {
      setIsInvalid(true);
      results.push(`Incorrect lenght max:${props.maxLenght}`);
    }
    setValidResults(results);
  };

  const onFocus = () => {
    setIsInvalid(false);
    setValidResults([]);
  };

  return (
    <TextField
      error={isInvalid}
      onBlur={onBlur}
      onFocus={onFocus}
      helperText=
        {validResults.map((error, index) => {
          return (
            <span className='validation-helper-text' key={index + 1}>
              {error}<br />
            </span>
          );
        })}
      {...props}
    />
  );
};
export default TextForm;
