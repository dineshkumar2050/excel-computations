import React from 'react';
import Select from './Select';

export default function FilterByAttributes({ }) {
  return (
    <div>
        <h3>Filter By Attributes</h3>
        <Select
            name={'columnAttribute'}
            id={'columnAttribute'}
        />
        <div className="multipleValues">
            
        </div>
    </div>
  )
}
