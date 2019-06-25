import React, {Fragment} from 'react';
import cx from 'classnames';
import {Field} from "redux-form";

import TextField from "../../TextField";
import CheckboxField from "../../CheckboxField";

const CheckDocForm = ({ title, headerNode, submitNode }) => (
  <Fragment>
    <h1 className={cx('task-header__title block_header_top col-12')}>
      {title}
    </h1>
    <div className={cx('col-6')}>
      <div className={cx('doucum')}>
        <img src="/mocksApi/1.png" alt="" />
        <img src="/mocksApi/1.png" alt="" />
        <img src="/mocksApi/1.png" alt="" />
        <img src="/mocksApi/1.png" alt="" />
      </div>
    </div>
    <div className={cx('col-6')}>
      <div className={cx('task-form__wrap block')}>
        {headerNode}
        <div className={cx('block_item-out')}>
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
            </div><div className={cx('col-12')}>
            <Field
              name="liveDirectionSigner"
              component={TextField}
              label="Адрес места жительства (регистрации) / места прибывания"
            />
          </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="phoneSigner"
                component={TextField}
                label="Телефон"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="innSigner"
                component={TextField}
                label="ИНН"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="emailSigner"
                component={TextField}
                label="E-mail"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="passportSeriesSigner"
                component={TextField}
                label="Серия"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="passportNumberSigner"
                component={TextField}
                label="Номер паспорта"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="passportDateIssueSigner"
                component={TextField}
                label="Дата выдачи"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="passportIssuedBySigner"
                component={TextField}
                label="Кем выдан"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="passportDivisionCodeSigner"
                component={TextField}
                label="Код подразделения"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="positionSigner"
                component={TextField}
                label="Должность"
              />
            </div>

            <hr />

            <div className={cx('block_head col-12')}>
              Основание полномочий
            </div>

            <div className={cx('col-6 col-md-4')}>
              <Field
                name="flDocActingProxySigner"
                component={TextField}
                label="Действует по договоренности"
                defaultValue="Да"
                disabled
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="flDocProxySigner"
                component={TextField}
                label="Договоренность"
                defaultValue="Документ"
                disabled
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="flDocNumberSigner"
                component={TextField}
                label="Номер"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="flDocNameSigner"
                component={TextField}
                label="Наименование"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="flDocDateProxySigner"
                component={TextField}
                label="Дата договоренности"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="flDocProxyTermSigner"
                component={TextField}
                label="Срок договоренности"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="warrantyLimitSigner"
                component={TextField}
                label="Ограничение по сумме гарантии"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="restrictionAmountContractSigner"
                component={TextField}
                label="Ограничение по сумме договора"
              />
            </div>

            <hr/>

            <div className={cx('col-12 justify-content-center m-b-15')}>
              <Field
                name="isPDLUserSigner"
                component={CheckboxField}
                id="isPDLUser"
                type="checkbox"
                label="Является ПДЛ"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlPositionSigner"
                component={TextField}
                label="Должность"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlEmployerNameSigner"
                component={TextField}
                label="Наименование работодателя"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlEmployerDirectionSigner"
                component={TextField}
                label="Адрес работодателя"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlEmployerRelationDegreeSigner"
                component={TextField}
                label="Степень родства"
              />
            </div>

            <hr/>

            <div className={cx('col-12 justify-content-center m-b-15')}>
              <Field
                name="isPDLRelationSigner"
                component={CheckboxField}
                id="isPDLRelation"
                type="checkbox"
                label="Является родственником ПДЛ"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlRelationPositionSigner"
                component={TextField}
                label="Должность"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlRelationEmployerNameSigner"
                component={TextField}
                label="Наименование работодателя"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlRelationEmployerDirectionSigner"
                component={TextField}
                label="Адрес работодателя"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="pdlRelationEmployerRelationDegreeSigner"
                component={TextField}
                label="Степень родства"
              />
            </div>

            <hr/>

            <div className={cx('col-12 justify-content-center m-b-15')}>
              <Field
                name="isMPDLRelationSigner"
                component={CheckboxField}
                id="isMPDLRelation"
                type="checkbox"
                label="Является ли ЕИО/супруга ЕИО/супруг ЕИО/родственник ЕИО МПДЛ"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="mpdlRelationPositionSigner"
                component={TextField}
                label="Должность"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="mpdlRelationEmployerNameSigner"
                component={TextField}
                label="Наименование работодателя"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="mpdlRelationEmployerDirectionSigner"
                component={TextField}
                label="Адрес работодателя"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="mpdlRelationEmployerRelationDegreeSigner"
                component={TextField}
                label="Степень родства"
              />
            </div>
            <div className={cx('col-12')}>
              <Field
                name="mpdlRelationEmployerDocSigner"
                component={TextField}
                label="Данные документа, подтверждающего право иностранного гражданина или лица без гражданства на пребывание в РФ"
              />
            </div>
            <div className={cx('col-6 col-md-4')}>
              <Field
                name="mpdlRelationEmployerMigrationCardSigner"
                component={TextField}
                label="Данные миграционной карты"
              />
            </div>

            <hr/>

          </div>
        </div>
        {submitNode}
      </div>
    </div>
  </Fragment>
);

export default CheckDocForm;
