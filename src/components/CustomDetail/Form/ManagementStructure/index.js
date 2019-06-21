import React from 'react';
import cx from 'classnames';
import {Field} from "redux-form";
import TextField from "../../TextField";
import CheckboxField from "../../CheckboxField";

const ManagementStructureForm = () => (
  <div className={cx('block_item row align-items-stretch')}>

    <div className={cx('block_head col-12')}>
      Паспортные данные
    </div>

    <div className={cx('col-6 col-md-4')}>
      <Field
        name="userPassportNumber"
        component={TextField}
        label="Номер"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="userPassportDateIssue"
        component={TextField}
        label="Дата выдачи"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="userPassportOther"
        component={TextField}
        label="Иное"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="userPassportExpiryDate"
        component={TextField}
        label="Дата истечения полномочий"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="userPassportFoundationAuthority"
        component={TextField}
        label="Основание полномочий"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="userPassportCitizenship"
        component={TextField}
        label="Гражданство"
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="userPassportNameDocAppointment"
        component={TextField}
        label="Наименование документа о назначении на должность"
      />
    </div>

    <hr/>

    <div className={cx('col-12 justify-content-center m-b-15')}>
      <Field
        name="isPDLUser"
        component={CheckboxField}
        id="isPDLUser"
        type="checkbox"
        label="Является ПДЛ"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlPosition"
        component={TextField}
        label="Должность"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlEmployerName"
        component={TextField}
        label="Наименование работодателя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlEmployerDirection"
        component={TextField}
        label="Адрес работодателя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlEmployerRelationDegree"
        component={TextField}
        label="Степень родства"
      />
    </div>

    <hr/>

    <div className={cx('col-12 justify-content-center m-b-15')}>
      <Field
        name="isPDLRelation"
        component={CheckboxField}
        id="isPDLRelation"
        type="checkbox"
        label="Является родственником ПДЛ"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlRelationPosition"
        component={TextField}
        label="Должность"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlRelationEmployerName"
        component={TextField}
        label="Наименование работодателя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlRelationEmployerDirection"
        component={TextField}
        label="Адрес работодателя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="pdlRelationEmployerRelationDegree"
        component={TextField}
        label="Степень родства"
      />
    </div>

    <hr/>

    <div className={cx('col-12 justify-content-center m-b-15')}>
      <Field
        name="isMPDLRelation"
        component={CheckboxField}
        id="isMPDLRelation"
        type="checkbox"
        label="Является ли ЕИО/супруга ЕИО/супруг ЕИО/родственник ЕИО МПДЛ"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="mpdlRelationPosition"
        component={TextField}
        label="Должность"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="mpdlRelationEmployerName"
        component={TextField}
        label="Наименование работодателя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="mpdlRelationEmployerDirection"
        component={TextField}
        label="Адрес работодателя"
      />
    </div>
    <div className={cx('col-6 col-md-4')}>
      <Field
        name="mpdlRelationEmployerRelationDegree"
        component={TextField}
        label="Степень родства"
      />
    </div>

    <hr/>
  </div>
);

export default ManagementStructureForm;
