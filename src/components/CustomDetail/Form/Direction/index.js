import React from 'react';
import {Field} from 'redux-form';
import cx from 'classnames';

import TextField from '../../TextField';

const DirectionForm = () => (
  <div className={cx('block_item row align-items-stretch')}>
    <div className={cx('block_head col-12')}>
      Адрес компании
    </div>

    <div className="col-6 col-md-4">
      <Field
        name="directionType"
        component={TextField}
        label="Тип адреса"
        defaultValue="Фактический"
        disabled
      />
    </div>
    <div className="col-6 col-md-4">
      <Field
        name="directionLow"
        component={TextField}
        label="Аренда или собственность"
        defaultValue="Аренда"
        disabled
      />
    </div>
    <div className="col-6 col-md-4">
      <Field
        name="directionLegal"
        component={TextField}
        label="Совпадает с юридическим?"
        defaultValue="Да"
        disabled
      />
    </div>

    <div className="col-12 col-md-12">
      <Field
        name="direction"
        component={TextField}
        label="Адрес"
        defaultValue="Москва, ул. Тверская"
        disabled
      />
    </div>
  </div>
);

export default DirectionForm;
