import React from 'react';
import cx from 'classnames';
import { Field } from 'redux-form';

import TextField from "../../TextField";
import CheckboxField from '../../CheckboxField';
import LoadDoc from '../../LoadDoc';

const PhysicalPersonForm = () => (
  <div className={cx('block_item row align-items-stretch')}>

    <div className={cx('block_head col-12')}>
      Личные данные
    </div>

    <div className={cx('col-6 col-md-4')}>
      <Field
        name="lastName"
        component={TextField}
        label="Фамилия"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="firstName"
        component={TextField}
        label="Имя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="middleName"
        component={TextField}
        label="Отчество"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="gender"
        component={TextField}
        label="Пол"
        defaultValue="Мужской"
        disabled
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="birthDate"
        component={TextField}
        label="Дата рождения"
        defaultValue="30.04.2019"
        disabled
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="birthPlace"
        component={TextField}
        label="Место рождения"
        defaultValue="Москва"
        disabled
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="liveDirection"
        component={TextField}
        label="Адрес места жительства (регистрации) / места прибывания"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="phone"
        component={TextField}
        label="Телефон"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="inn"
        component={TextField}
        label="ИНН"
      />
    </div>
    <div className={cx('col-12 justify-content-center')}>
      <Field
        name="isPDL"
        component={CheckboxField}
        id="isPDL"
        type="checkbox"
        label="Является ПДЛ"
      />
    </div>
    <div className={cx('col-12 justify-content-center')}>
      <Field
        name="isPDL"
        component={CheckboxField}
        id="isPDL"
        type="checkbox"
        label="Является родственником ПДЛ"
        defaultValue={true}
      />
    </div>

    <hr />

    <div className={cx('block_head col-12')}>
      Роли физлица в организации
    </div>

    <div className={cx('col-12 justify-content-center m-b-15')}>
      <Field
        name="isShareholder"
        component={CheckboxField}
        id="isShareholder"
        type="checkbox"
        label="Акционер/Учредитель (1 и более %)"
        defaultValue={true}
      />
    </div>
    <div className={cx('col-12 justify-content-center')}>
      <Field
        name="equityInterest"
        component={TextField}
        label="Доля в уставном капитале"
      />
    </div>
    <div className={cx('col-12 justify-content-center m-b-15')}>
      <Field
        name="singleExecutive"
        component={CheckboxField}
        id="singleExecutive"
        type="checkbox"
        label="Единоличный исполнительный орган"
        defaultValue={true}
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="position"
        component={TextField}
        label="Должность"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="position"
        component={TextField}
        label="Дата назначения на должность"
      />
    </div>
    <div className={cx('col-12 justify-content-center m-b-15')}>
      <Field
        name="isBeneficiary"
        component={CheckboxField}
        id="isBeneficiary"
        type="checkbox"
        label="Бенифициар"
        defaultValue={true}
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="shareInCapital"
        component={TextField}
        label="Доля в уставном капитале"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="citizenship"
        component={TextField}
        label="Гражданство"
        defaultValue="русский"
        disabled
      />
    </div>

    <hr />

    <div className={cx('block_head col-12')}>
      Документ, удостоверяющий личность
    </div>

    <div className={cx('col-6 col-md-4')}>
      <Field
        name="passportSeries"
        component={TextField}
        label="Серия"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="passportNumber"
        component={TextField}
        label="Номер"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="passportDateIssue"
        component={TextField}
        label="Дата выдачи"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="passportIssuedBy"
        component={TextField}
        label="Кем выдан"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="passportDivisionCode"
        component={TextField}
        label="Код подразделения"
      />
    </div>

    <hr />

    <div className={cx('block_head col-12')}>
      Документ о назначении на должность
    </div>

    <div className={cx('col-6 col-md-4')}>
      <Field
        name="positionDateIssue"
        component={TextField}
        label="Дата выдачи"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="positionNumber"
        component={TextField}
        label="Номер"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="positionTermOffice"
        component={TextField}
        label="Срок действия полномочий"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="positionDocName"
        component={TextField}
        label="Наименование документа"
      />
    </div>

    <hr />

    <div className={cx('block_head col-12')}>
      Документы ФЛ
    </div>

    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocActingProxyText"
        component={TextField}
        label="Действует по доверенности"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocActingProxyYes"
        component={TextField}
        label="Действует по доверенности"
        defaultValue="Да"
        disabled
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocProxy"
        component={TextField}
        label="Доверенность"
        defaultValue="Документ"
        disabled
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocNumber"
        component={TextField}
        label="Номер"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocName"
        component={TextField}
        label="Наименование"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocDateProxy"
        component={TextField}
        label="Дата договоренности"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="flDocProxyTerm"
        component={TextField}
        label="Срок договоренности"
      />
    </div>

    <div className={cx('col-12')} />

    <div className={cx('col-6 col-md-6')}>
      <LoadDoc name="Документ_1.pdf" file="/url/to/file1" />
    </div>
    <div className={cx('col-6 col-md-6')}>
      <LoadDoc name="Документ_2.pdf" file="/url/to/file2" />
    </div>

    <div className={cx('col-12')} />

  </div>
);

export default PhysicalPersonForm;
