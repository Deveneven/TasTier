import {TextField} from '@material-ui/core';
import React, {useState} from 'react';

const ValidatedTextField = (props: any) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [validResults, setValidResults] = useState<Array<string>>([]);

  const onBlur = (event: any) => {
    const {value} = !!event.target ? event.target : event;
    const results: Array<string> = [];

    if (props.required) {
      setIsInvalid(value ? false : true);
      results.push('Field cannot be empty');
      // setValidResults([...validResults, 'Field cannot be empty']);
    }
    if (props.regex) {
      const regex = new RegExp(props.regex);
      setIsInvalid(regex.test(value) ? false : true);
      results.push('Incorrect entry');
      // setValidResults([...validResults, 'Incorrect entry']);
    }
    if (props.minLenght) {
      setIsInvalid(value.length < props.minLenght ? true : false);
      results.push(`Incorrect lenght min:${props.minLenght}`);
      // setValidResults([...validResults, `Incorrect lenght min:${props.minLenght}`]);
    }
    if (props.maxLenght) {
      setIsInvalid(value.length > props.maxLenght ? true : false);
      results.push(`Incorrect lenght max:${props.maxLenght}`);
      // setValidResults([...validResults, `Incorrect lenght max:${props.maxLenght}`]);
    }
    console.log(results);
    setValidResults(results);
  };

  const onFocus = () => {
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
            <span key={index + 1}>{error}<br /></span>
          );
        })}
      {...props}
    />
  );
};
export default ValidatedTextField;
